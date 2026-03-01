/**
 * PII Scrubber
 *
 * Utility for redacting Personally Identifiable Information (PII) from therapeutic transcripts.
 * Essential for HIPAA compliance and ensuring psychological safety in training sessions.
 */

import { createBuildSafeLogger } from '../../logging/build-safe-logger'
import { requireConsent } from '../../security/consent'

const logger = createBuildSafeLogger('PIIScrubber')

export interface ScrubberOptions {
    maskType?: 'placeholder' | 'redacted' | 'randomized'
    enabledCategories?: PIICategory[]
    customReplacements?: Record<string, string>
}

export type PIICategory =
    | 'names'
    | 'emails'
    | 'phones'
    | 'addresses'
    | 'ssn'
    | 'dates'
    | 'financial'

const PII_PATTERNS: Record<PIICategory, RegExp> = {
    names: /\b(?:Mr\.|Ms\.|Mrs\.|Dr\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g, // Simple name detection
    emails: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phones: /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    addresses: /\b\d{1,5}\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:St|Ave|Rd|Blvd|Ln|Ct|Dr)\b/g,
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    dates: /\b(?:(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4})|(?:[A-Z][a-z]+\s+\d{1,2},\s+\d{4}))\b/g,
    financial: /\b(?:\d{4}-){3}\d{4}\b/g, // Credit card format
}

const PLACEHOLDERS: Record<PIICategory, string> = {
    names: '[NAME]',
    emails: '[EMAIL]',
    phones: '[PHONE]',
    addresses: '[ADDRESS]',
    ssn: '[SSN]',
    dates: '[DATE]',
    financial: '[FINANCIAL]',
}

/**
 * Generates a randomized placeholder for a given PII category.
 * Appends a random numeric suffix to make each redaction unique.
 */
function getRandomizedPlaceholder(category: PIICategory): string {
    const base = PLACEHOLDERS[category];
    const randomSuffix = Math.floor(Math.random() * 1000).toString();
    return `${base.replace(/[\[\]]/g, '')}${randomSuffix}`;
}

/**
 * Redacts PII from text based on configured categories
 */
export function scrubPII(text: string, options: ScrubberOptions = {}): string {
    if (!text) return text

    // Ensure PHI processing is consented and audited before touching the text
    ensurePHIProcessingAllowed('scrubPII')

    const {
        maskType = 'placeholder',
        enabledCategories = ['names', 'emails', 'phones', 'ssn'],
        customReplacements = {},
    } = options

    // Validate maskType
    const validMaskTypes = ['placeholder', 'redacted', 'randomized'] as const
    if (!validMaskTypes.includes(maskType as any)) {
        throw new Error(`Invalid maskType: "${maskType}". Valid values are: ${validMaskTypes.join(', ')}`)
    }

    let scrubbedText = text

    // Apply custom replacements first
    for (const [target, replacement] of Object.entries(customReplacements)) {
        const escapedTarget = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        scrubbedText = scrubbedText.replace(new RegExp(escapedTarget, 'g'), replacement)
    }

    // Apply category-based scrubbing
    for (const category of enabledCategories) {
        const pattern = PII_PATTERNS[category]
        if (!pattern) continue

        if (maskType === 'placeholder') {
            scrubbedText = scrubbedText.replace(pattern, PLACEHOLDERS[category])
        } else if (maskType === 'redacted') {
            scrubbedText = scrubbedText.replace(pattern, '[REDACTED]')
        } else if (maskType === 'randomized') {
            scrubbedText = scrubbedText.replace(pattern, getRandomizedPlaceholder(category))
        } else {
            // Fail fast for unsupported mask types to avoid silent data leakage
            throw new Error(`Unsupported maskType: ${maskType}. Allowed values are 'placeholder', 'redacted', 'randomized'.`);
        }
    }

    // Validate maskType to catch future typos early
    if (!['placeholder', 'redacted', 'randomized'].includes(maskType)) {
        throw new Error(`Unsupported maskType: "${maskType}". Valid values are "placeholder", "redacted", or "randomized".`);
    }

    // Emit HIPAA audit event for PHI access
    logger.info('HIPAA audit: scrubPII accessed text', {
        accessedAt: new Date().toISOString(),
        function: 'scrubPII',
        categories: enabledCategories,
        originalLength: text.length,
        newLength: scrubbedText.length,
    })

    logger.debug('Text scrubbed for PII', {
        originalLength: text.length,
        newLength: scrubbedText.length,
        categoriesUsed: enabledCategories,
    });

    return scrubbedText;
}

/**
 * Scans text for PII without modifying it
 */
export function scanForPII(text: string): {
    found: boolean
    categories: PIICategory[]
    count: number
} {
    // Verify consent before accessing PHI
    requireConsent('scanForPII')

    const result = {
        found: false,
        categories: [] as PIICategory[],
        count: 0,
    };

    for (const [category, pattern] of Object.entries(PII_PATTERNS)) {
        const matches = text.match(pattern);
        if (matches && matches.length > 0) {
            result.found = true;
            result.categories.push(category as PIICategory);
            result.count += matches.length;
        }
    }

    // Emit HIPAA audit event for PHI access
    logger.info('HIPAA audit: scanForPII accessed text', {
        accessedAt: new Date().toISOString(),
        function: 'scanForPII',
        categories: result.categories,
        matchCount: result.count,
    })

    return result
}