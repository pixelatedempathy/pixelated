/**
 * Context-Objective Mapper
 * Maps different context types to appropriate objective weights for mental health AI
 */

import { ContextType } from '../core/objectives'

export interface ContextualObjectiveWeights {
  empathy: number
  safety: number
  correctness: number
  professionalism: number
  informativeness: number
  bias_detection?: number
  cultural_sensitivity?: number
}

/**
 * Get contextual objective weights based on the detected context
 */
export function getContextualObjectiveWeights(
  context: ContextType,
): ContextualObjectiveWeights {
  switch (context) {
    case ContextType.CRISIS:
      return {
        safety: 0.4,
        empathy: 0.3,
        professionalism: 0.15,
        correctness: 0.1,
        informativeness: 0.05,
      }

    case ContextType.SUPPORT:
      return {
        empathy: 0.35,
        safety: 0.25,
        professionalism: 0.2,
        correctness: 0.15,
        informativeness: 0.05,
      }

    case ContextType.INFORMATIONAL:
      return {
        correctness: 0.3,
        informativeness: 0.3,
        professionalism: 0.2,
        empathy: 0.15,
        safety: 0.05,
      }

    case ContextType.EDUCATIONAL:
      return {
        correctness: 0.3,
        informativeness: 0.3,
        professionalism: 0.2,
        empathy: 0.15,
        safety: 0.05,
      }

    case ContextType.GENERAL:
    default:
      return {
        empathy: 0.2,
        safety: 0.2,
        correctness: 0.2,
        professionalism: 0.2,
        informativeness: 0.2,
      }
  }
}

/**
 * Get default objective weights when no specific context is detected
 */
export function getDefaultObjectiveWeights(): ContextualObjectiveWeights {
  return getContextualObjectiveWeights(ContextType.GENERAL)
}
