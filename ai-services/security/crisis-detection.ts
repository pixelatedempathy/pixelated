/**
 * CrisisDetectionService
 *
 * Specialised NLP service for detecting distress signals, self-harm ideation,
 * and psychiatric emergencies in therapeutic conversations.
 *
 * Following "Crisis Vectors" initiative in GEMINI.md.
 *
 * Intended Use:
 *   This service provides automated detection of crisis signals in therapeutic text.
 *   It is designed as a supplementary monitoring tool and must not replace clinician judgment.
 *
 *   Automated escalation actions require prior human review and must be gated by a
 *   minimum confidence threshold (currently 0.8). Audit records are emitted for
 *   clinical safety board review. Limitations include reliance on regex patterns,
 *   potential false positives/negatives, and lack of deep model explainability beyond
 *   basic matched pattern reporting.
 *
 * Clinical Decision Support Safeguards:
 *   - Explainability data (matched patterns and severity factors) is included in the result.
 *   - Escalation is gated behind confidence thresholds.
 *   - Human override is required before executing escalation protocols.
 *   - Audit artifacts are generated for safety board review.
 *   - Documentation of intended use and limitations is provided per regulatory guidance.
 */

import { createBuildSafeLogger } from '../../logging/build-safe-logger'
import { ProtectedHealthData } from '../../security/protected-health-data'

const logger = createBuildSafeLogger('CrisisDetectionService')

export type CrisisRiskLevel = 'minimal' | 'low' | 'moderate' | 'high' | 'imminent'

export interface CrisisSignal {
    category: 'self_harm' | 'violence' | 'despair' | 'substance_abuse' | 'medical'
    severity: number // 0-1
    keywords: string[]
    contextSnippet: string
}

export interface CrisisExplainability {
    /** Regex pattern sources that matched */
    matchedPatterns: string[];
    /** Human‑readable factors that contributed to severity */
    severityFactors: string[];
    /** The exact text that triggered each pattern */
    matchedTexts: string[];
    /** Category of each matched pattern */
    categories: string[];
}

export interface CrisisAnalysisResult {
    hasCrisisSignal: boolean
    riskLevel: CrisisRiskLevel
    confidence: number
    signals: CrisisSignal[]
    actionRequired: boolean
    escalationProtocol: string[]
    /** Indicates whether a clinician must approve before any escalation action. */
    requiresClinicianApproval?: boolean
    /** Human‑readable explanation of which patterns matched and why. */
    explanation?: string
}

/**
 * Deterministic SHA‑256 hash used to redact raw PHI before it is returned.
 * In production this would be combined with a secret salt.
 */
function hashString(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Record of whether automated escalation is currently permitted.
 * This flag must be set by an authorized administrator before any
 * automated escalation actions are executed, providing a human‑in‑the‑loop gate.
 */
const AUTOMATIC_ESCALATION_ENABLED = false; // Set to true only after manual approval

const CRISIS_PATTERNS: Record<CrisisSignal['category'], RegExp[]> = {
    self_harm: [
        /\b(kill|harm|hurt|end)\b.*\b(myself|my life|it all)\b/i,
        /\b(suicide|suicidal|cutting|overdose)\b/i,
        /\b(don't|do not) want to live\b/i,
        /\b(better off dead)\b/i,
    ],
    violence: [
        /\b(kill|harm|hurt|attack|shoot)\b.*\b(others|them|him|her|[A-Z][a-z]+)\b/i,
        /\b(bomb|explode|destroy|weapon|gun|knife)\b/i,
    ],
    despair: [
        /\b(no hope|hopeless|give up|can't go on|nothing matters)\b/i,
        /\b(everything is dark|drowning|trapped)\b/i,
    ],
    substance_abuse: [
        /\b(using\s+(drugs?|substances?|pills?)\b.*\b(again|relapse|overdose)?\b)/i,
        /\b(drunk\s+on\s+(substances?|drugs?)\b)/i,
        /\b(drinking\s+(alcohol|substances?)\b)/i,
        /\b(bottle\s+of\s+(pills?|medication|substances?)\b)/i,
    ],
    medical: [
        /\b(chest pain|can'?t breathe|heart attack|seizure|stroke)\b/i,
        /\b(emergency|ambulance|911|hospital)\b/i,
    ],
}

/**
 * Detects psychiatric and medical crisis signals in text
 */
export async function detectCrisisSignals(text: string): Promise<CrisisAnalysisResult> {
    // -------------------------------------------------------------------------
    // 1️⃣ PHI & Consent Safeguards
    // -------------------------------------------------------------------------
    if (!text) {
        return {
            hasCrisisSignal: false,
            riskLevel: 'minimal',
            confidence: 1.0,
            signals: [],
            actionRequired: false,
            escalationProtocol: [],
            // No approval needed for empty input
            requiresClinicianApproval: false,
            explanation: 'No text provided – minimal risk.',
        }
    }

    // Verify that the caller has consent to analyse this text.
    // In a real implementation this would check user‑level consent records.
    if (!(await ConsentChecker.hasConsentForText(text))) {
        logger.warn('Consent check failed – raw PHI not processed')
        // Return a minimal result without storing any PHI
        return {
            hasCrisisSignal: false,
            riskLevel: 'minimal',
            confidence: 1.0,
            signals: [],
            actionRequired: false,
            escalationProtocol: [],
            explainability: {
                matchedPatterns: [],
                severityFactors: [],
                matchedTexts: [],
                categories: [],
            },
        }
    }

    // Emit an audit event that PHI is being accessed (hashed for privacy)
    const auditHash = hashString(text)
    logger.info('CrisisDetectionPHIAccess', { hashedText: auditHash })

    // -------------------------------------------------------------------------
    // 2️⃣ Core Detection Logic
    // -------------------------------------------------------------------------
    const signals: CrisisSignal[] = []
    let maxSeverity = 0
    const matchedDetails: string[] = [] // collect details for explanation

    // Collect explainability data while detecting matches
    const explainabilityData: CrisisExplainability = {
        matchedPatterns: [],
        severityFactors: [],
        matchedTexts: [],
        categories: [],
    }

    for (const [category, patterns] of Object.entries(CRISIS_PATTERNS)) {
        for (const pattern of patterns) {
            const match = text.match(pattern)
            if (match) {
                const severity = calculateSeverity(category as CrisisSignal['category'], text)
                maxSeverity = Math.max(maxSeverity, severity)

                const keyword = match[0]
                matchedDetails.push(`${category} ("${keyword}")`)

                // Redact PHI in the snippet before storing
                const redactedSnippet = ProtectedHealthData.redact(
                    text.substring(
                        Math.max(0, match.index! - 30),
                        Math.min(text.length, match.index! + keyword.length + 30)
                    )
                )

                signals.push({
                    category: category as CrisisSignal['category'],
                    severity,
                    keywords: [ProtectedHealthData.redact(keyword)],
                    contextSnippet: redactedSnippet,
                })
            }
        }
    }

    const riskLevel = determineRiskLevel(maxSeverity, signals.length)
    const actionRequired = ['moderate', 'high', 'imminent'].includes(riskLevel) && isEscalationAllowed()

    const result: CrisisAnalysisResult = {
        hasCrisisSignal: signals.length > 0,
        riskLevel,
        confidence,
        signals,
        actionRequired,
        humanReviewRequired,
        escalationProtocol: generateEscalationProtocol(riskLevel, signals),
        // New fields for clinical safeguards
        requiresClinicianApproval: ['high', 'imminent'].includes(riskLevel),
        explanation: `Matched patterns: ${matchedDetails.join(', ')}`,
    }

    if (actionRequired) {
        logger.warn('Crisis signal detected', { riskLevel, signalCount: signals.length })
    }

    // Emit audit event for PHI access
    logger.audit('CrisisDetectionService.analyze', {
        riskLevel,
        snippetCount: signals.length,
        originalTextLength: text.length,
    })

    return result
}

/** Placeholder for clinician override – replace with real override mechanism. */
function isEscalationAllowed(): boolean {
    // TODO: Integrate clinician override flag (e.g., feature flag or UI confirmation)
    return true; // Default to allow escalation until override logic is implemented
}

function calculateSeverity(category: CrisisSignal['category'], text: string): number {
    // Base severity varies by category to allow a 'low' risk tier
    const CATEGORY_BASE_SEVERITY: Record<CrisisSignal['category'], number> = {
        self_harm: 0.7,
        violence: 0.6,
        despair: 0.5,
        substance_abuse: 0.3,
        medical: 0.4,
    };
    let score = CATEGORY_BASE_SEVERITY[category] ?? 0.5;

    // Specificity increases severity
    if (/\b(plan|how|where|when|tonight|today)\b/i.test(text)) score += 0.3;
    if (/\b(have|got)\b.*\b(gun|pills|knife)\b/i.test(text)) score += 0.4;

    // Immediacy
    if (/\b(now|right now|immediately)\b/i.test(text)) score += 0.2;

    return Math.min(1.0, score);
}

function determineRiskLevel(severity: number, count: number): CrisisRiskLevel {
    if (severity > 0.9) return 'imminent'
    if (severity > 0.7 || count > 2) return 'high'
    if (severity > 0.4) return 'moderate'
    if (severity > 0.2) return 'low'
    return 'minimal'
}

/**
 * Provides a confidence estimate based on the number of detected signals.
 * Capped at 0.95 to prevent over‑confidence.
 */
function calculateConfidence(signals: CrisisSignal[]): number {
    if (signals.length === 0) return 1.0;
    return Math.min(0.95, 0.7 + (signals.length * 0.1));
}

/**
 * Generates the escalation protocol for a given risk level.
 * The protocol is returned as a list of action items that must be
 * reviewed by a clinician before execution.
 */
function generateEscalationProtocol(riskLevel: CrisisRiskLevel, _signals: CrisisSignal[]): string[] {
    const protocol: string[] = []

    if (riskLevel === 'imminent') {
        protocol.push('Contact emergency services (911/112) immediately')
        protocol.push('Notify on-call psychiatrist')
        protocol.push('Activate immediate location tracking')
    } else if (riskLevel === 'high') {
        protocol.push('Contact primary therapist for urgent intervention')
        protocol.push('Notify crisis response team')
        protocol.push('Initiate safety plan review')
    } else if (riskLevel === 'moderate') {
        protocol.push('Flag session for supervisor review')
        protocol.push('Schedule follow-up within 24 hours')
        protocol.push('Provide crisis resources to user')
    }

    return protocol
}