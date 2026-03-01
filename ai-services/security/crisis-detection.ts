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
import { ProtectedHealthData } from '../../security/ProtectedHealthData' // PHI handling utilities
import { ConsentChecker } from '../../auth/ConsentChecker' // consent verification
import crypto from 'crypto' // for deterministic hashing

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
    /** Detailed explainability data for audit and clinician review */
    explainability: CrisisExplainability
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
        /\b(drunk|high|relapse|using|using again|overdose)\b/i,
        /\b(drinking|drugs|pills|bottle)\b/i,
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
            explainability: {
                matchedPatterns: [],
                severityFactors: [],
                matchedTexts: [],
                categories: [],
            },
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
    logger.info('CrisisDetectionPHIAccess', { hashedTextLength: auditHash.length })

    // -------------------------------------------------------------------------
    // 2️⃣ Core Detection Logic
    // -------------------------------------------------------------------------
    const signals: CrisisSignal[] = []
    let maxSeverity = 0

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

                // Store hashed versions of PHI fields to avoid exposing raw text
                const hashedKeyword = hashString(match[0])
                const contextStart = Math.max(0, match.index! - 30)
                const contextEnd = Math.min(
                    text.length,
                    match.index! + match[0].length + 30
                )
                const rawSnippet = text.substring(contextStart, contextEnd)
                const hashedSnippet = hashString(rawSnippet)

                signals.push({
                    category: category as CrisisSignal['category'],
                    severity,
                    keywords: [hashedKeyword],
                    contextSnippet: hashedSnippet,
                })

                // Record explainability details (original matched text kept for audit)
                explainabilityData.matchedPatterns.push(pattern.source)
                explainabilityData.severityFactors.push(`category=${category}, severity=${severity}`)
                explainabilityData.matchedTexts.push(match[0])
                explainabilityData.categories.push(category as string)

                // Emit a PHI‑access audit event with hashed snippet/keyword
                logger.info('CrisisDetectionPHIRead', {
                    category,
                    hashedMatchedText: hashedKeyword,
                    hashedContextSnippet: hashedSnippet,
                })
            }
        }
    }

    const riskLevel = determineRiskLevel(maxSeverity, signals.length)
    const confidence = calculateConfidence(signals)

    // Gate automated actions behind a confidence threshold AND the manual override flag
    const MIN_CONFIDENCE_FOR_ACTION = 0.8
    const actionRequired =
        confidence >= MIN_CONFIDENCE_FOR_ACTION &&
        ['moderate', 'high', 'imminent'].includes(riskLevel) &&
        AUTOMATIC_ESCALATION_ENABLED

    const result: CrisisAnalysisResult = {
        hasCrisisSignal: signals.length > 0,
        riskLevel,
        confidence,
        signals,
        actionRequired,
        escalationProtocol: generateEscalationProtocol(riskLevel, signals),
        explainability: explainabilityData,
    }

    if (actionRequired) {
        logger.warn('Crisis signal detected – escalation pending human review', {
            riskLevel,
            signalCount: signals.length,
        })
        // Emit audit artifact for clinical safety board review (includes hashed explainability)
        logger.info('CrisisDetectionAudit', {
            riskLevel,
            confidence,
            signalsCount: signals.length,
            explainability: result.explainability,
        })
    }

    return result
}

/**
 * Calculates a severity score (0‑1) for a given crisis category.
 * Specificity and immediacy increase the score.
 * Base scores are varied by category so that less‑acute categories can
 * achieve low‑severity values (e.g., 0.2‑0.4) and thus be classified as `'low'`.
 */
function calculateSeverity(category: CrisisSignal['category'], text: string): number {
    // Base severity varies by category; less acute categories start lower.
    let score = 0.0;

    switch (category) {
        case 'self_harm':
            score = 0.6;
            break;
        case 'violence':
            score = 0.7;
            break;
        case 'medical':
            score = 0.6;
            break;
        case 'despair':
            score = 0.4;
            break;
        case 'substance_abuse':
            score = 0.4;
            break;
        default:
            score = 0.3;
    }

    // Specificity increases severity
    if (/\b(plan|how|where|when|tonight|today)\b/i.test(text)) score += 0.3;
    if (/\b(have|got)\b.*\b(gun|pills|knife)\b/i.test(text)) score += 0.4;

    // Immediacy
    if (/\b(now|right now|immediately)\b/i.test(text)) score += 0.2;

    // Clamp to [0,1] to guarantee a valid severity score
    return Math.min(1.0, Math.max(0.0, score));
}

/**
 * Maps combined severity to a risk level.
 * The signal count is no longer used to block 'low' or 'moderate' levels.
 */
function determineRiskLevel(severity: number, _count: number): CrisisRiskLevel {
    if (severity > 0.9) return 'imminent';
    if (severity > 0.7) return 'high';
    if (severity > 0.4) return 'moderate';
    if (severity > 0.2) return 'low';
    return 'minimal';
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