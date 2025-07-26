/**
 * Utility functions for parsing semantic evidence responses
 * Extracted from EvidenceExtractor for better testability and separation of concerns
 */

import { z } from 'zod'
import { getClinicalAnalysisLogger } from '@/lib/logging/standardized-logger'
// Import shared types to avoid circular dependencies
import type { EvidenceItem } from '../types'

const logger = getClinicalAnalysisLogger('general')

/**
 * Zod schema for validating semantic evidence responses from LLM
 * Using a lenient approach to let business logic handle edge cases
 */
const SemanticEvidenceResponseSchema = z.object({
  evidence: z.array(z.unknown()).min(0), // Accept array of any types, validate items individually
})

/**
 * Parse LLM response for semantic evidence with robust schema validation
 * This function is extracted from EvidenceExtractor to enable independent testing
 */
export function parseSemanticEvidenceResponse(
  response: string,
): EvidenceItem[] {
  try {
    // Step 1: Parse JSON safely
    let parsedResponse: unknown
    try {
      parsedResponse = JSON.parse(response)
    } catch (parseError) {
      logger.error('Invalid JSON in semantic evidence response', {
        error: parseError,
        responseLength: response.length,
        responsePreview: response.substring(0, 200),
      })
      return []
    }

    // Step 2: Validate structure using Zod schema
    const validationResult =
      SemanticEvidenceResponseSchema.safeParse(parsedResponse)

    if (!validationResult.success) {
      logger.error('Schema validation failed for semantic evidence response', {
        validationErrors: validationResult.error.errors,
        receivedData: parsedResponse,
        responsePreview: response.substring(0, 200),
      })
      return []
    }

    const validatedData = validationResult.data

    // Step 3: Additional business logic validation
    if (validatedData.evidence.length === 0) {
      logger.warn('Semantic evidence response contains empty evidence array')
      return []
    }

    // Step 4: Transform validated data to EvidenceItem format
    const evidenceItems: EvidenceItem[] = []

    for (const item of validatedData.evidence) {
      // Handle potentially malformed items that passed the lenient schema
      if (!item || typeof item !== 'object') {
        logger.warn('Skipping non-object evidence item', { item })
        continue
      }

      const evidenceObj = item as Record<string, unknown>

      // Extract and validate text field
      const rawText = evidenceObj['text']
      if (typeof rawText !== 'string') {
        logger.warn('Skipping evidence item with non-string text', { item })
        continue
      }

      const trimmedText = rawText.trim()
      if (!trimmedText) {
        logger.warn('Skipping evidence item with empty text', { item })
        continue
      }

      // Extract and validate confidence
      let confidence = 0.5 // default
      if (typeof evidenceObj['confidence'] === 'number') {
        confidence = Math.min(Math.max(evidenceObj['confidence'], 0), 1)
      }

      // Extract and validate clinical relevance
      const rawClinicalRelevance = evidenceObj['clinicalRelevance']
      let clinicalRelevance = 0.5 // default
      if (typeof rawClinicalRelevance === 'number') {
        clinicalRelevance = Math.min(Math.max(rawClinicalRelevance, 0), 1)
      } else if (typeof rawClinicalRelevance === 'string') {
        // Convert string values to numbers for backward compatibility
        switch (rawClinicalRelevance) {
          case 'critical':
            clinicalRelevance = 1.0
            break
          case 'significant':
            clinicalRelevance = 0.75
            break
          case 'supportive':
            clinicalRelevance = 0.5
            break
          case 'contextual':
            clinicalRelevance = 0.25
            break
        }
      }

      // Extract other fields with safe defaults
      const category =
        typeof evidenceObj['category'] === 'string'
          ? evidenceObj['category']
          : 'semantic_analysis'
      const rationale =
        typeof evidenceObj['rationale'] === 'string'
          ? evidenceObj['rationale']
          : 'Generated via semantic analysis'

      const evidenceItem: EvidenceItem = {
        text: trimmedText,
        type: 'direct_quote' as const,
        confidence,
        relevance:
          confidence > 0.7 ? 'high' : confidence > 0.4 ? 'medium' : 'low',
        category,
        clinicalRelevance,
        metadata: {
          semanticRationale: rationale,
        },
      }

      evidenceItems.push(evidenceItem)
    }

    logger.info('Successfully parsed semantic evidence response', {
      originalCount: validatedData.evidence.length,
      validCount: evidenceItems.length,
      highConfidenceCount: evidenceItems.filter((item) => item.confidence > 0.7)
        .length,
    })

    return evidenceItems
  } catch (error) {
    logger.error('Unexpected error during semantic evidence parsing', {
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      responseLength: response.length,
      responsePreview: response.substring(0, 200),
    })
    return []
  }
}

/**
 * Validate a single evidence item object
 * Useful for testing individual validation logic
 */
export function validateEvidenceItem(item: unknown): {
  isValid: boolean
  evidenceItem?: EvidenceItem
  errors: string[]
} {
  const errors: string[] = []

  if (!item || typeof item !== 'object') {
    errors.push('Item is not an object')
    return { isValid: false, errors }
  }

  const evidenceObj = item as Record<string, unknown>

  // Validate text field
  const rawText = evidenceObj['text']
  if (typeof rawText !== 'string') {
    errors.push('Text field is not a string')
    return { isValid: false, errors }
  }

  const trimmedText = rawText.trim()
  if (!trimmedText) {
    errors.push('Text field is empty after trimming')
    return { isValid: false, errors }
  }

  // Extract and validate confidence
  let confidence = 0.5 // default
  if (typeof evidenceObj['confidence'] === 'number') {
    confidence = Math.min(Math.max(evidenceObj['confidence'], 0), 1)
  } else if (evidenceObj['confidence'] !== undefined) {
    errors.push('Confidence field is not a number, using default')
  }

  // Extract and validate clinical relevance
  const rawClinicalRelevance = evidenceObj['clinicalRelevance']
  let clinicalRelevance = 0.5 // default
  if (typeof rawClinicalRelevance === 'number') {
    clinicalRelevance = Math.min(Math.max(rawClinicalRelevance, 0), 1)
  } else if (typeof rawClinicalRelevance === 'string') {
    // Convert string values to numbers for backward compatibility
    switch (rawClinicalRelevance) {
      case 'critical':
        clinicalRelevance = 1.0
        break
      case 'significant':
        clinicalRelevance = 0.75
        break
      case 'supportive':
        clinicalRelevance = 0.5
        break
      case 'contextual':
        clinicalRelevance = 0.25
        break
    }
  } else if (rawClinicalRelevance !== undefined) {
    errors.push('Invalid clinical relevance value, using default')
  }

  // Extract other fields with safe defaults
  const category =
    typeof evidenceObj['category'] === 'string'
      ? evidenceObj['category']
      : 'semantic_analysis'
  const rationale =
    typeof evidenceObj['rationale'] === 'string'
      ? evidenceObj['rationale']
      : 'Generated via semantic analysis'

  const evidenceItem: EvidenceItem = {
    text: trimmedText,
    type: 'direct_quote' as const,
    confidence,
    relevance: confidence > 0.7 ? 'high' : confidence > 0.4 ? 'medium' : 'low',
    category,
    clinicalRelevance,
    metadata: {
      semanticRationale: rationale,
    },
  }

  return {
    isValid: true,
    evidenceItem,
    errors,
  }
}
