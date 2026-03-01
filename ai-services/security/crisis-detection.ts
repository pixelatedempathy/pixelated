/**
 * CrisisDetectionService
 *
 * Specialised NLP service for detecting distress signals, self-harm ideation,
 * and psychiatric emergencies in therapeutic conversations.
 *
 * Following "Crisis Vectors" initiative in GEMINI.md.
 */

import { createBuildSafeLogger } from '../../logging/build-safe-logger'

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
export function detectCrisisSignals(text: string): CrisisAnalysisResult {
    if (!text) {
        return {
            hasCrisisSignal: false,
            riskLevel: 'minimal',
            confidence: 1.0,
            signals: [],
            actionRequired: false,
            escalationProtocol: [],
        }
    }

    const signals: CrisisSignal[] = []
    let maxSeverity = 0

    for (const [category, patterns] of Object.entries(CRISIS_PATTERNS)) {
        for (const pattern of patterns) {
            const match = text.match(pattern)
            if (match) {
                const severity = calculateSeverity(category as CrisisSignal['category'], text)
                maxSeverity = Math.max(maxSeverity, severity)

                // Capture raw snippet for audit before redaction
                const rawSnippet = text.substring(
                    Math.max(0, match.index! - 30),
                    Math.min(text.length, match.index! + match[0].length + 30)
                )
                // Emit HIPAA audit event
                logger.info('HIPAA_AUDIT', {
                    event: 'PHI_ACCESS',
                    category,
                    snippetLength: rawSnippet.length,
                })

                signals.push({
                    category: category as CrisisSignal['category'],
                    severity,
                    keywords: ['[REDACTED]'], // Redact keyword content
                    contextSnippet: '[REDACTED]', // Redact context snippet
                })
            }
        }
    }

    const riskLevel = determineRiskLevel(maxSeverity, signals.length)
    const confidence = calculateConfidence(signals)

    // Clinical Decision Support Safeguards: only act when confidence is sufficient
    const confidenceThreshold = 0.8
    const actionRequired = confidence >= confidenceThreshold && ['moderate', 'high', 'imminent'].includes(riskLevel)
    const humanReviewRequired = !actionRequired // true when confidence is low or risk level not actionable

    // Build an explainability string for audit & human review
    const explanation = [
        `Detected ${signals.length} crisis signal(s).`,
        `Risk level: ${riskLevel}.`,
        `Confidence: ${confidence.toFixed(2)}.`,
        `Threshold met: ${confidence >= confidenceThreshold}.`,
        `Action required: ${actionRequired}.`,
        `Human review required: ${humanReviewRequired}.`
    ].join(' ')

    // Emit an audit‑level log entry (does not contain raw PHI beyond what already exists)
    logger.info('CrisisDetectionAudit', {
        riskLevel,
        confidence,
        signalCount: signals.length,
        explanation,
    })

    // Log warning only when an action is actually required (per original behaviour)
    if (actionRequired) {
        logger.warn('Crisis signal detected', { riskLevel, signalCount: signals.length })
    }

    const result: CrisisAnalysisResult = {
        hasCrisisSignal: signals.length > 0,
        riskLevel,
        confidence,
        signals,
        actionRequired,
        humanReviewRequired,
        escalationProtocol: generateEscalationProtocol(riskLevel, signals),
        explanation,
    }

    return result
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
    if (/\b(plan|how|where|when|tonight|today)\b/i.test(text)) score += 0.3
    if (/\b(have|got)\b.*\b(gun|pills|knife)\b/i.test(text)) score += 0.4

    // Immediacy
    if (/\b(now|right now|immediately)\b/i.test(text)) score += 0.2

    return Math.min(1.0, score);
}

function determineRiskLevel(severity: number, _count: number): CrisisRiskLevel {
    // Risk level now depends only on severity, making 'low' reachable
    if (severity > 0.9) return 'imminent';
    if (severity > 0.7) return 'high';
    if (severity > 0.4) return 'moderate';
    if (severity > 0.2) return 'low';
    return 'minimal';
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