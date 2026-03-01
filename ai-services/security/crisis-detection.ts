/**
 * CrisisDetectionService
 *
 * Specialised NLP service for detecting distress signals, self-harm ideation,
 * and psychiatric emergencies in therapeutic conversations.
 *
 * Following "Crisis Vectors" initiative in GEMINI.md.
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
export function detectCrisisSignals(text: string): CrisisAnalysisResult {
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

    const signals: CrisisSignal[] = []
    let maxSeverity = 0
    const matchedDetails: string[] = [] // collect details for explanation

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
        confidence: calculateConfidence(signals),
        signals,
        actionRequired,
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
    let score = 0.5

    // Specificity increases severity
    if (/\b(plan|how|where|when|tonight|today)\b/i.test(text)) score += 0.3
    if (/\b(have|got)\b.*\b(gun|pills|knife)\b/i.test(text)) score += 0.4

    // Immediacy
    if (/\b(now|right now|immediately)\b/i.test(text)) score += 0.2

    return Math.min(1.0, score)
}

function determineRiskLevel(severity: number, count: number): CrisisRiskLevel {
    if (severity > 0.9) return 'imminent'
    if (severity > 0.7 || count > 2) return 'high'
    if (severity > 0.4) return 'moderate'
    if (severity > 0.2) return 'low'
    return 'minimal'
}

function calculateConfidence(signals: CrisisSignal[]): number {
    if (signals.length === 0) return 1.0
    // More signals or clearer intent increases confidence
    return Math.min(0.95, 0.7 + (signals.length * 0.1))
}

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