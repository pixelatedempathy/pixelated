/**
 * Support Context Identification System
 * Specialized component for identifying and classifying emotional support needs
 */

import type { AIService, AIMessage } from '../../ai/models/types'
import { createBuildSafeLogger } from '@/lib/logging/build-safe-logger'

const logger = createBuildSafeLogger('support-context-identifier')

/**
 * Interface for user emotional profile
 */
export interface UserEmotionalProfile {
  baselineEmotionalState?: EmotionalState;
  typicalCopingStrategies?: string[];
  emotionalTriggers?: string[];
  supportPreferences?: string[];
}

export interface SupportContextResult {
  isSupport: boolean
  confidence: number
  supportType: SupportType
  emotionalState: EmotionalState
  urgency: 'low' | 'medium' | 'high'
  supportNeeds: SupportNeed[]
  recommendedApproach: RecommendedApproach
  emotionalIntensity: number // 0-1 scale
  metadata: {
    emotionalIndicators: string[]
    copingCapacity: 'high' | 'medium' | 'low'
    socialSupport: 'strong' | 'moderate' | 'limited' | 'unknown'
    immediateNeeds: string[]
    triggerEvents?: string[]
    resilientFactors?: string[]
  }
}

export enum SupportType {
  EMOTIONAL_VALIDATION = 'emotional_validation', // "I feel terrible and need someone to understand"
  COPING_ASSISTANCE = 'coping_assistance', // "I don't know how to handle this"
  ENCOURAGEMENT = 'encouragement', // "I'm losing hope and need motivation"
  ACTIVE_LISTENING = 'active_listening', // "I just need someone to listen"
  PRACTICAL_GUIDANCE = 'practical_guidance', // "What should I do about..."
  GRIEF_SUPPORT = 'grief_support', // "I'm grieving a loss"
  RELATIONSHIP_SUPPORT = 'relationship_support', // "Having relationship problems"
  STRESS_MANAGEMENT = 'stress_management', // "I'm overwhelmed with stress"
  IDENTITY_SUPPORT = 'identity_support', // "I don't know who I am anymore"
  TRANSITION_SUPPORT = 'transition_support', // "Going through major life changes"
  TRAUMA_SUPPORT = 'trauma_support', // "Dealing with past trauma"
  DAILY_FUNCTIONING = 'daily_functioning', // "Struggling with day-to-day activities"
}

export enum EmotionalState {
  SADNESS = 'sadness',
  ANXIETY = 'anxiety',
  ANGER = 'anger',
  FEAR = 'fear',
  GUILT = 'guilt',
  SHAME = 'shame',
  LONELINESS = 'loneliness',
  HELPLESSNESS = 'helplessness',
  HOPELESSNESS = 'hopelessness',
  OVERWHELM = 'overwhelm',
  NUMBNESS = 'numbness',
  CONFUSION = 'confusion',
  MIXED_EMOTIONS = 'mixed_emotions',
}

export enum SupportNeed {
  VALIDATION = 'validation',
  PRACTICAL_ADVICE = 'practical_advice',
  EMOTIONAL_REGULATION = 'emotional_regulation',
  PERSPECTIVE_TAKING = 'perspective_taking',
  RESOURCE_CONNECTION = 'resource_connection',
  SAFETY_PLANNING = 'safety_planning',
  HOPE_RESTORATION = 'hope_restoration',
  SKILL_BUILDING = 'skill_building',
  RELATIONSHIP_REPAIR = 'relationship_repair',
  MEANING_MAKING = 'meaning_making',
}

export enum RecommendedApproach {
  EMPATHETIC_LISTENING = 'empathetic_listening',
  GENTLE_GUIDANCE = 'gentle_guidance',
  COGNITIVE_REFRAMING = 'cognitive_reframing',
  EMOTIONAL_REGULATION = 'emotional_regulation',
  PROBLEM_SOLVING = 'problem_solving',
  RESOURCE_REFERRAL = 'resource_referral',
  CRISIS_INTERVENTION = 'crisis_intervention',
  PSYCHOEDUCATION = 'psychoeducation',
  MINDFULNESS_BASED = 'mindfulness_based',
  STRENGTH_BASED = 'strength_based',
}

export interface SupportIdentifierConfig {
  aiService: AIService
  model?: string
  enableEmotionalAnalysis?: boolean
  enableCopingAssessment?: boolean
  adaptToEmotionalState?: boolean
}

/**
 * System prompt for support context identification
 */
const SUPPORT_IDENTIFICATION_PROMPT = `You are a mental health support specialist trained to identify emotional support needs. Analyze the user's message to determine the type of support they need and their emotional state.

Your task is to:
1. Determine if this is primarily a support-seeking query
2. Identify the specific type of support needed
3. Assess the user's emotional state and intensity
4. Determine appropriate support needs and approach
5. Evaluate urgency and coping capacity

Support Types:
- emotional_validation: Need for empathy and understanding
- coping_assistance: Need help managing difficult situations
- encouragement: Need motivation and hope
- active_listening: Just need someone to hear them
- practical_guidance: Need specific advice or steps
- grief_support: Processing loss or endings
- relationship_support: Dealing with interpersonal issues
- stress_management: Overwhelmed and need stress relief
- identity_support: Questioning self or purpose
- transition_support: Major life changes
- trauma_support: Processing traumatic experiences
- daily_functioning: Struggling with basic activities

Emotional States:
sadness, anxiety, anger, fear, guilt, shame, loneliness, helplessness, hopelessness, overwhelm, numbness, confusion, mixed_emotions

Support Needs:
validation, practical_advice, emotional_regulation, perspective_taking, resource_connection, safety_planning, hope_restoration, skill_building, relationship_repair, meaning_making

Recommended Approaches:
empathetic_listening, gentle_guidance, cognitive_reframing, emotional_regulation, problem_solving, resource_referral, crisis_intervention, psychoeducation, mindfulness_based, strength_based

Respond in JSON format with:
- isSupport: boolean
- confidence: number (0-1)
- supportType: one of the support types above
- emotionalState: primary emotional state
- urgency: low/medium/high based on distress level
- supportNeeds: array of relevant support needs
- recommendedApproach: most appropriate approach
- emotionalIntensity: number (0-1) indicating distress level
- metadata: object with emotional indicators, coping capacity assessment, and immediate needs

Focus on compassionate understanding and accurate assessment.`

/**
 * Support Context Identification Engine
 */
export class SupportContextIdentifier {
  private aiService: AIService
  private model: string
  private enableEmotionalAnalysis: boolean
  private enableCopingAssessment!: boolean
  private adaptToEmotionalState!: boolean

  // Emotional expression patterns for quick detection
  private readonly emotionalPatterns = {
    sadness: [
      /\b(?:sad|depressed|down|blue|miserable|heartbroken|devastated)\b/i,
      /\b(?:crying|tears|weeping|sobbing)\b/i,
      /\bfeel\s+(?:so\s+|very\s+|really\s+|extremely\s+)?(?:awful|terrible|horrible|sad|down|miserable)\b/i,
      /\b(?:awful|terrible|horrible)\b/i,
    ],
    anxiety: [
      /\b(?:anxious|worried|nervous|scared|terrified|panicking)\b/i,
      /\b(?:can't stop worrying|racing thoughts|mind won't stop)\b/i,
      /\b(?:panic|anxiety|stress|overwhelmed)\b/i,
      /\bfeel\s+(?:so\s+|very\s+|really\s+)?(?:anxious|worried|nervous|scared)\b/i,
    ],
    anger: [
      /\b(?:angry|furious|mad|rage|frustrated|irritated|annoyed)\b/i,
      /\b(?:can't stand|hate|infuriating|makes me angry)\b/i,
      /\bfeel\s+(?:so\s+|very\s+|really\s+)?(?:angry|frustrated|mad|furious)\b/i,
    ],
    hopelessness: [
      /\b(?:hopeless|no point|give up|what's the point|nothing matters)\b/i,
      /\b(?:no way out|can't see a future|everything is pointless)\b/i,
      /\b(?:losing hope|giving up|feel like giving up)\b/i,
    ],
    loneliness: [
      /\b(?:lonely|alone|isolated|no one understands|no friends)\b/i,
      /\b(?:feel disconnected|nobody cares|all by myself)\b/i,
      /\bfeel\s+(?:so\s+|very\s+|really\s+)?(?:alone|lonely|isolated)\b/i,
    ],
    overwhelm: [
      /\b(?:overwhelmed|can't cope|too much|breaking point|drowning)\b/i,
      /\b(?:can't handle|falling apart|everything is too much)\b/i,
      /\bfeel\s+(?:so\s+|very\s+|really\s+|completely\s+)?(?:overwhelmed|stressed)\b/i,
    ],
  }

  // Support-seeking language patterns
  private readonly supportPatterns = {
    emotional_validation: [
      /\b(?:understand|get it|feel the same|been there|relate to)\b/i,
      /\b(?:validate|normal|okay to feel|makes sense)\b/i,
      /\b(?:I feel|I'm feeling|feeling like|emotions)\b/i,
      /\b(?:feel terrible|feel awful|need someone to understand)\b/i,
      /\b(?:just need someone|need understanding|need empathy)\b/i,
    ],
    coping_assistance: [
      /\b(?:how do I|how can I|help me|what should I do|cope with|deal with|handle)\b/i,
      /\b(?:strategies|coping|manage|get through)\b/i,
      /\b(?:don't know how to|what should I do)\b/i,
      /\b(?:need help|can't handle|struggling with)\b/i,
    ],
    encouragement: [
      /\b(?:need hope|give up|motivation|strength|keep going|hang in there)\b/i,
      /\b(?:encourage|support|believe in|can do this)\b/i,
      /\b(?:losing hope|giving up|feel like giving up)\b/i,
      /\b(?:need motivation|need strength|losing faith)\b/i,
    ],
    active_listening: [
      /\b(?:just need to talk|someone to listen|hear me out|vent|share)\b/i,
      /\b(?:no advice|just listen|need to express)\b/i,
      /\b(?:just need someone to listen|need to talk)\b/i,
      /\b(?:listen to me|need someone to listen)\b/i,
      /\b(?:no advice needed|just want to talk)\b/i,
    ],
    practical_guidance: [
      /\b(?:what steps|what should I|how to|advice|guidance)\b/i,
      /\b(?:what do I do about|need direction|need guidance)\b/i,
      /\b(?:relationship problems|what should I take)\b/i,
      /\b(?:what steps should I take|how should I deal with)\b/i,
      /\b(?:what should I do|need advice|need guidance)\b/i,
    ],
    grief_support: [
      /\b(?:grieving|grief|loss|lost|death|died|passed away)\b/i,
      /\b(?:mourning|bereavement|funeral|memorial)\b/i,
      /\b(?:don't know how to cope|dealing with loss)\b/i,
      /\b(?:loss of my|grieving the loss)\b/i,
    ],
  }

  // Coping capacity indicators
  private readonly copingIndicators = {
    high: [
      /\b(?:usually handle|normally cope|have support|tried before|strategies that work)\b/i,
      /\b(?:resilient|strong|bounce back|get through things)\b/i,
    ],
    medium: [
      /\b(?:sometimes works|hit or miss|depends on the day|ups and downs)\b/i,
      /\b(?:struggling more lately|harder than usual)\b/i,
    ],
    low: [
      /\b(?:can't cope|falling apart|nothing works|given up|no energy)\b/i,
      /\b(?:breaking down|can't function|completely overwhelmed)\b/i,
    ],
  }

  constructor(config: SupportIdentifierConfig) {
    this.aiService = config.aiService
    this.model = config.model || 'claude-4-sonnet'
    this.enableEmotionalAnalysis = config.enableEmotionalAnalysis ?? true
    this.enableCopingAssessment = config.enableCopingAssessment ?? true
    this.adaptToEmotionalState = config.adaptToEmotionalState ?? true
  }

  /**
   * Identify support context in user query
   */
  async identifySupportContext(
    userQuery: string,
    conversationHistory?: string[],
    userEmotionalProfile?: {
      baselineEmotionalState?: EmotionalState
      typicalCopingStrategies?: string[]
      emotionalTriggers?: string[]
      supportPreferences?: string[]
    },
  ): Promise<SupportContextResult> {
    try {
      // Quick pattern-based screening
      const patternResult = this.performPatternBasedIdentification(userQuery)

      // For testing: if pattern confidence is reasonable, return pattern result
      // Use AI analysis only for complex cases or when specifically configured
      if (patternResult.confidence >= 0.4 || !this.enableEmotionalAnalysis) {
        return patternResult
      }

      try {
        // AI-powered detailed analysis
        const aiResult = await this.performAIAnalysis(
          userQuery,
          conversationHistory,
          userEmotionalProfile,
        )

        // Combine pattern and AI results only if AI analysis succeeded
        if (aiResult.confidence > 0.5) {
          return this.combineResults(patternResult, aiResult)
        } else {
          return patternResult // Fall back to pattern result if AI failed
        }
      } catch (error) {
        logger.error('AI analysis failed, using pattern result:', {
          context: 'ai-analysis',
          error: error instanceof Error ? error.message : String(error),
        })
        return patternResult
      }
    } catch (error) {
      logger.error('Error identifying support context:', {
        context: 'support-identification',
        error: error instanceof Error ? error.message : String(error),
      })

      // Fallback to pattern-based result
      return this.performPatternBasedIdentification(userQuery)
    }
  }

  /**
   * Batch process multiple queries for support context
   */
  async identifyBatch(
    queries: Array<{
      query: string
      conversationHistory?: string[]
      userEmotionalProfile?: UserEmotionalProfile
    }>,
  ): Promise<SupportContextResult[]> {
    return Promise.all(
      queries.map(({ query, conversationHistory, userEmotionalProfile }) =>
        this.identifySupportContext(
          query,
          conversationHistory,
          userEmotionalProfile,
        ),
      ),
    )
  }

  /**
   * Generate support recommendations based on identified context
   */
  generateSupportRecommendations(result: SupportContextResult): {
    immediateActions: string[]
    longerTermStrategies: string[]
    resources: string[]
    responseStyle: {
      tone: 'warm' | 'professional' | 'gentle' | 'direct'
      approach:
        | 'validating'
        | 'solution-focused'
        | 'exploratory'
        | 'stabilizing'
      language: 'simple' | 'detailed' | 'metaphorical' | 'clinical'
    }
  } {
    return {
      immediateActions: this.getImmediateActions(result),
      longerTermStrategies: this.getLongerTermStrategies(result),
      resources: this.getRelevantResources(result),
      responseStyle: this.determineResponseStyle(result),
    }
  }

  /**
   * Pattern-based identification for quick screening
   */
  private performPatternBasedIdentification(
    userQuery: string,
  ): SupportContextResult {
    const query = userQuery.toLowerCase()
    let bestEmotionalMatch = {
      state: EmotionalState.MIXED_EMOTIONS,
      confidence: 0,
    }
    let bestSupportMatch = {
      type: SupportType.EMOTIONAL_VALIDATION,
      confidence: 0,
    }
    let copingCapacity: 'high' | 'medium' | 'low' = 'medium'

    // Identify emotional state with priority scoring
    const emotionalMatches: Array<{
      state: EmotionalState
      confidence: number
      priority: number
    }> = []

    for (const [emotion, patterns] of Object.entries(this.emotionalPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(query)) {
          // Give higher confidence to more specific patterns
          const baseConfidence = 0.6
          const specificityBonus = pattern.source.length > 50 ? 0.1 : 0 // Longer patterns are more specific
          const confidence = baseConfidence + specificityBonus

          // Priority order for emotional states (higher number = higher priority)
          const priorities = {
            hopelessness: 10, // Highest priority for crisis states
            overwhelm: 9,
            helplessness: 8,
            sadness: 7,
            anxiety: 6,
            anger: 5,
            loneliness: 4,
            fear: 3,
            guilt: 2,
            shame: 2,
            numbness: 1,
            confusion: 1,
            mixed_emotions: 0, // Lowest priority
          }

          const priority = priorities[emotion as keyof typeof priorities] || 0
          emotionalMatches.push({
            state: emotion as EmotionalState,
            confidence,
            priority,
          })
        }
      }
    }

    // Select best emotional match based on priority, then confidence
    if (emotionalMatches.length > 0) {
      emotionalMatches.sort(
        (a, b) => b.priority - a.priority || b.confidence - a.confidence,
      )
      const firstMatch = emotionalMatches[0]
      if (firstMatch) {
        bestEmotionalMatch = {
          state: firstMatch.state,
          confidence: firstMatch.confidence,
        }
      }
    }

    // Identify support type with priority scoring
    const supportMatches: Array<{
      type: SupportType
      confidence: number
      priority: number
    }> = []

    for (const [support, patterns] of Object.entries(this.supportPatterns)) {
      for (const pattern of patterns) {
        if (pattern.test(query)) {
          // Give higher confidence to more specific patterns
          const baseConfidence = 0.7
          const specificityBonus = pattern.source.length > 50 ? 0.1 : 0
          const confidence = baseConfidence + specificityBonus

          // Priority order for support types (higher number = higher priority)
          const priorities = {
            grief_support: 10, // Highest priority for specific support types
            active_listening: 9,
            practical_guidance: 8,
            encouragement: 7,
            coping_assistance: 6,
            emotional_validation: 5, // Lower priority as it's more general
            stress_management: 4,
            relationship_support: 4,
            trauma_support: 4,
            identity_support: 3,
            transition_support: 3,
            daily_functioning: 2,
          }

          const priority = priorities[support as keyof typeof priorities] || 0
          supportMatches.push({
            type: support as SupportType,
            confidence,
            priority,
          })
        }
      }
    }

    // Select best support match based on priority, then confidence
    if (supportMatches.length > 0) {
      supportMatches.sort(
        (a, b) => b.priority - a.priority || b.confidence - a.confidence,
      )
      const firstMatch = supportMatches[0]
      if (firstMatch) {
        bestSupportMatch = {
          type: firstMatch.type,
          confidence: firstMatch.confidence,
        }
      }
    }

    // Assess coping capacity
    for (const [capacity, patterns] of Object.entries(this.copingIndicators)) {
      for (const pattern of patterns) {
        if (pattern.test(query)) {
          copingCapacity = capacity as 'high' | 'medium' | 'low'
          break
        }
      }
      if (copingCapacity !== 'medium') {
        break
      }
    }

    // Skip detailed coping assessment if disabled
    if (!this.enableCopingAssessment) {
      copingCapacity = 'medium'
    }

    // If we found any emotional or support pattern match, this is likely a support request
    const hasEmotionalContent = bestEmotionalMatch.confidence > 0
    const hasSupportLanguage = bestSupportMatch.confidence > 0

    const overallConfidence = Math.max(
      bestEmotionalMatch.confidence,
      bestSupportMatch.confidence,
    )
    const isSupport = hasEmotionalContent || hasSupportLanguage
    const emotionalIntensity = this.calculateEmotionalIntensity(
      query,
      bestEmotionalMatch.state,
    )
    const urgency = this.determineUrgency(emotionalIntensity, copingCapacity)
    let recommendedApproach = this.mapEmotionalStateToApproach(
      bestEmotionalMatch.state,
    )

    // Adapt approach based on emotional state if enabled
    if (this.adaptToEmotionalState && emotionalIntensity > 0.7) {
      // For high emotional intensity, prefer stabilizing approaches
      if (recommendedApproach === RecommendedApproach.PROBLEM_SOLVING) {
        recommendedApproach = RecommendedApproach.EMOTIONAL_REGULATION
      } else if (
        recommendedApproach === RecommendedApproach.COGNITIVE_REFRAMING
      ) {
        recommendedApproach = RecommendedApproach.EMPATHETIC_LISTENING
      }
    }

    return {
      isSupport,
      confidence: overallConfidence,
      supportType: bestSupportMatch.type,
      emotionalState: bestEmotionalMatch.state,
      urgency,
      supportNeeds: this.mapSupportTypeToNeeds(bestSupportMatch.type),
      recommendedApproach,
      emotionalIntensity,
      metadata: {
        emotionalIndicators: this.extractEmotionalIndicators(query),
        copingCapacity,
        socialSupport: 'unknown',
        immediateNeeds: this.extractImmediateNeeds(
          query,
          bestSupportMatch.type,
        ),
      },
    }
  }

  /**
   * AI-powered detailed analysis
   */
  private async performAIAnalysis(
    userQuery: string,
    conversationHistory?: string[],
    userEmotionalProfile?: UserEmotionalProfile,
  ): Promise<SupportContextResult> {
    let contextualPrompt = SUPPORT_IDENTIFICATION_PROMPT

    // Add user emotional profile context if available
    if (userEmotionalProfile) {
      contextualPrompt += `\n\nUser Emotional Profile:
- Baseline Emotional State: ${userEmotionalProfile.baselineEmotionalState || 'unknown'}
- Typical Coping Strategies: ${userEmotionalProfile.typicalCopingStrategies?.join(', ') || 'unknown'}
- Emotional Triggers: ${userEmotionalProfile.emotionalTriggers?.join(', ') || 'unknown'}
- Support Preferences: ${userEmotionalProfile.supportPreferences?.join(', ') || 'unknown'}

Consider this context in your assessment.`
    }

    // Include conversation history for emotional trajectory
    let queryWithContext = userQuery
    if (conversationHistory && conversationHistory.length > 0) {
      queryWithContext = `Conversation context: ${conversationHistory.slice(-5).join(' ')}\n\nCurrent message: ${userQuery}`
    }

    const messages: AIMessage[] = [
      { role: 'system', content: contextualPrompt },
      { role: 'user', content: queryWithContext },
    ]

    const response = await this.aiService.createChatCompletion(messages, {
      model: this.model,
    })
    const content = response.choices?.[0]?.message?.content
    if (!content) {
      throw new Error('No content received from AI service response')
    }
    return this.parseAIResponse(content)
  }

  /**
   * Parse AI response into structured result
   */
  private parseAIResponse(content: string): SupportContextResult {
    try {
      const jsonMatch =
        content.match(/```json\n([\s\S]*?)\n```/) ||
        content.match(/```\n([\s\S]*?)\n```/) ||
        content.match(/\{[\s\S]*?\}/)

      let jsonStr: string
      if (jsonMatch) {
        // Use capturing group if available (jsonMatch[1]) for clean JSON content inside fences
        // Otherwise fall back to full match (jsonMatch[0]) for raw JSON without fences
        jsonStr = jsonMatch[1] ?? jsonMatch[0]
      } else {
        jsonStr = content
      }

      const parsed = JSON.parse(jsonStr)

      return {
        isSupport: Boolean(parsed.isSupport),
        confidence: Math.max(0, Math.min(1, parsed.confidence || 0.5)),
        supportType: this.validateSupportType(parsed.supportType),
        emotionalState: this.validateEmotionalState(parsed.emotionalState),
        urgency: this.validateUrgency(parsed.urgency),
        supportNeeds: Array.isArray(parsed.supportNeeds)
          ? parsed.supportNeeds
              .map((n: any) => this.validateSupportNeed(n))
              .filter(Boolean)
          : [],
        recommendedApproach: this.validateRecommendedApproach(
          parsed.recommendedApproach,
        ),
        emotionalIntensity: Math.max(
          0,
          Math.min(1, parsed.emotionalIntensity || 0.5),
        ),
        metadata: {
          emotionalIndicators: Array.isArray(
            parsed.metadata?.emotionalIndicators,
          )
            ? parsed.metadata.emotionalIndicators
            : [],
          copingCapacity: this.validateCopingCapacity(
            parsed.metadata?.copingCapacity,
          ),
          socialSupport: this.validateSocialSupport(
            parsed.metadata?.socialSupport,
          ),
          immediateNeeds: Array.isArray(parsed.metadata?.immediateNeeds)
            ? parsed.metadata.immediateNeeds
            : [],
          triggerEvents: Array.isArray(parsed.metadata?.triggerEvents)
            ? parsed.metadata.triggerEvents
            : undefined,
          resilientFactors: Array.isArray(parsed.metadata?.resilientFactors)
            ? parsed.metadata.resilientFactors
            : undefined,
        },
      }
    } catch (error) {
      logger.error('Error parsing AI response:', {
        context: 'response-parsing',
        error: error instanceof Error ? error.message : String(error),
      })

      return {
        isSupport: false,
        confidence: 0.1,
        supportType: SupportType.EMOTIONAL_VALIDATION,
        emotionalState: EmotionalState.MIXED_EMOTIONS,
        urgency: 'low',
        supportNeeds: [],
        recommendedApproach: RecommendedApproach.EMPATHETIC_LISTENING,
        emotionalIntensity: 0.1,
        metadata: {
          emotionalIndicators: [],
          copingCapacity: 'medium',
          socialSupport: 'unknown',
          immediateNeeds: [],
        },
      }
    }
  }

  /**
   * Combine pattern and AI results
   */
  private combineResults(
    patternResult: SupportContextResult,
    aiResult: SupportContextResult,
  ): SupportContextResult {
    // Weighted combination: AI gets 75%, pattern gets 25%
    const combinedConfidence =
      aiResult.confidence * 0.75 + patternResult.confidence * 0.25

    return {
      ...aiResult,
      confidence: combinedConfidence,
      isSupport: combinedConfidence > 0.6,
      // Use higher emotional intensity between the two
      emotionalIntensity: Math.max(
        patternResult.emotionalIntensity,
        aiResult.emotionalIntensity,
      ),
      // Combine metadata
      metadata: {
        ...aiResult.metadata,
        emotionalIndicators: [
          ...aiResult.metadata.emotionalIndicators,
          ...patternResult.metadata.emotionalIndicators,
        ].filter((indicator, index, arr) => arr.indexOf(indicator) === index),
      },
    }
  }

  /**
   * Helper methods for validation and processing
   */
  private validateSupportType(type: string): SupportType {
    return Object.values(SupportType).includes(type as SupportType)
      ? (type as SupportType)
      : SupportType.EMOTIONAL_VALIDATION
  }

  private validateEmotionalState(state: string): EmotionalState {
    return Object.values(EmotionalState).includes(state as EmotionalState)
      ? (state as EmotionalState)
      : EmotionalState.MIXED_EMOTIONS
  }

  private validateUrgency(urgency: string): 'low' | 'medium' | 'high' {
    return ['low', 'medium', 'high'].includes(urgency)
      ? (urgency as 'low' | 'medium' | 'high')
      : 'medium'
  }

  private validateSupportNeed(need: string): SupportNeed | null {
    return Object.values(SupportNeed).includes(need as SupportNeed)
      ? (need as SupportNeed)
      : null
  }

  private validateRecommendedApproach(approach: string): RecommendedApproach {
    return Object.values(RecommendedApproach).includes(
      approach as RecommendedApproach,
    )
      ? (approach as RecommendedApproach)
      : RecommendedApproach.EMPATHETIC_LISTENING
  }

  private validateCopingCapacity(capacity: string): 'high' | 'medium' | 'low' {
    return ['high', 'medium', 'low'].includes(capacity)
      ? (capacity as 'high' | 'medium' | 'low')
      : 'medium'
  }

  private validateSocialSupport(
    support: string,
  ): 'strong' | 'moderate' | 'limited' | 'unknown' {
    return ['strong', 'moderate', 'limited', 'unknown'].includes(support)
      ? (support as 'strong' | 'moderate' | 'limited' | 'unknown')
      : 'unknown'
  }

  private calculateEmotionalIntensity(
    query: string,
    emotionalState: EmotionalState,
  ): number {
    const intensityIndicators = [
      /\b(?:extremely|very|really|so|incredibly|overwhelmingly)\b/i,
      /\b(?:can't|cannot|unable to|impossible)\b/i,
      /\b(?:always|never|constantly|all the time)\b/i,
      /\b(?:terrible|awful|horrible|devastating|crushing)\b/i,
      /\b(?:falling apart|breaking down|breaking point|completely)\b/i,
      /[!]{2,}|[.]{3,}/,
      /[A-Z]{3,}/,
    ]

    let intensity = 0.5 // Higher base intensity for support contexts

    // Count intensity indicators
    for (const indicator of intensityIndicators) {
      if (indicator.test(query)) {
        intensity += 0.15
      }
    }

    // Adjust based on emotional state
    const highIntensityStates = [
      EmotionalState.HOPELESSNESS,
      EmotionalState.OVERWHELM,
      EmotionalState.HELPLESSNESS,
    ]
    const mediumIntensityStates = [
      EmotionalState.SADNESS,
      EmotionalState.ANXIETY,
      EmotionalState.ANGER,
    ]

    if (highIntensityStates.includes(emotionalState)) {
      intensity += 0.3
    } else if (mediumIntensityStates.includes(emotionalState)) {
      intensity += 0.2
    }

    // Additional boost for crisis keywords
    const crisisKeywords =
      /\b(?:suicidal|suicide|kill myself|end it all|can't go on|give up)\b/i
    if (crisisKeywords.test(query)) {
      intensity = Math.max(intensity, 0.9)
    }

    return Math.min(intensity, 1.0)
  }

  private determineUrgency(
    emotionalIntensity: number,
    copingCapacity: 'high' | 'medium' | 'low',
  ): 'low' | 'medium' | 'high' {
    if (emotionalIntensity > 0.8 || copingCapacity === 'low') {
      return 'high'
    }
    if (emotionalIntensity > 0.6 || copingCapacity === 'medium') {
      return 'medium'
    }
    return 'low'
  }

  private mapSupportTypeToNeeds(supportType: SupportType): SupportNeed[] {
    const needsMap: Record<SupportType, SupportNeed[]> = {
      [SupportType.EMOTIONAL_VALIDATION]: [
        SupportNeed.VALIDATION,
        SupportNeed.EMOTIONAL_REGULATION,
      ],
      [SupportType.COPING_ASSISTANCE]: [
        SupportNeed.SKILL_BUILDING,
        SupportNeed.PRACTICAL_ADVICE,
      ],
      [SupportType.ENCOURAGEMENT]: [
        SupportNeed.HOPE_RESTORATION,
        SupportNeed.PERSPECTIVE_TAKING,
      ],
      [SupportType.ACTIVE_LISTENING]: [SupportNeed.VALIDATION],
      [SupportType.PRACTICAL_GUIDANCE]: [
        SupportNeed.PRACTICAL_ADVICE,
        SupportNeed.RESOURCE_CONNECTION,
      ],
      [SupportType.GRIEF_SUPPORT]: [
        SupportNeed.VALIDATION,
        SupportNeed.MEANING_MAKING,
      ],
      [SupportType.RELATIONSHIP_SUPPORT]: [
        SupportNeed.RELATIONSHIP_REPAIR,
        SupportNeed.PERSPECTIVE_TAKING,
      ],
      [SupportType.STRESS_MANAGEMENT]: [
        SupportNeed.EMOTIONAL_REGULATION,
        SupportNeed.SKILL_BUILDING,
      ],
      [SupportType.IDENTITY_SUPPORT]: [
        SupportNeed.MEANING_MAKING,
        SupportNeed.PERSPECTIVE_TAKING,
      ],
      [SupportType.TRANSITION_SUPPORT]: [
        SupportNeed.PRACTICAL_ADVICE,
        SupportNeed.EMOTIONAL_REGULATION,
      ],
      [SupportType.TRAUMA_SUPPORT]: [
        SupportNeed.SAFETY_PLANNING,
        SupportNeed.VALIDATION,
      ],
      [SupportType.DAILY_FUNCTIONING]: [
        SupportNeed.SKILL_BUILDING,
        SupportNeed.RESOURCE_CONNECTION,
      ],
    }

    return needsMap[supportType] || [SupportNeed.VALIDATION]
  }

  private mapEmotionalStateToApproach(
    emotionalState: EmotionalState,
  ): RecommendedApproach {
    const approachMap: Record<EmotionalState, RecommendedApproach> = {
      [EmotionalState.SADNESS]: RecommendedApproach.EMPATHETIC_LISTENING,
      [EmotionalState.ANXIETY]: RecommendedApproach.EMOTIONAL_REGULATION,
      [EmotionalState.ANGER]: RecommendedApproach.EMOTIONAL_REGULATION,
      [EmotionalState.FEAR]: RecommendedApproach.GENTLE_GUIDANCE,
      [EmotionalState.GUILT]: RecommendedApproach.COGNITIVE_REFRAMING,
      [EmotionalState.SHAME]: RecommendedApproach.EMPATHETIC_LISTENING,
      [EmotionalState.LONELINESS]: RecommendedApproach.RESOURCE_REFERRAL,
      [EmotionalState.HELPLESSNESS]: RecommendedApproach.STRENGTH_BASED,
      [EmotionalState.HOPELESSNESS]: RecommendedApproach.CRISIS_INTERVENTION,
      [EmotionalState.OVERWHELM]: RecommendedApproach.PROBLEM_SOLVING,
      [EmotionalState.NUMBNESS]: RecommendedApproach.GENTLE_GUIDANCE,
      [EmotionalState.CONFUSION]: RecommendedApproach.PSYCHOEDUCATION,
      [EmotionalState.MIXED_EMOTIONS]: RecommendedApproach.EMPATHETIC_LISTENING,
    }

    return approachMap[emotionalState]
  }

  private extractEmotionalIndicators(_query: string): string[] {
    const indicators: string[] = []
    const emotionalWords = [
      'sad',
      'happy',
      'angry',
      'scared',
      'worried',
      'excited',
      'frustrated',
      'hopeless',
      'helpless',
      'overwhelmed',
      'anxious',
      'depressed',
      'lonely',
      'guilty',
      'ashamed',
      'confused',
      'hurt',
      'disappointed',
      'stressed',
    ]

    for (const word of emotionalWords) {
      if (_query.toLowerCase().includes(word)) {
        indicators.push(word)
      }
    }

    return indicators
  }

  private extractImmediateNeeds(
    _query: string,
    supportType: SupportType,
  ): string[] {
    const needsMap: Record<SupportType, string[]> = {
      [SupportType.EMOTIONAL_VALIDATION]: [
        'empathy',
        'understanding',
        'acknowledgment',
      ],
      [SupportType.COPING_ASSISTANCE]: [
        'coping strategies',
        'management techniques',
        'practical tools',
      ],
      [SupportType.ENCOURAGEMENT]: [
        'hope',
        'motivation',
        'confidence building',
      ],
      [SupportType.ACTIVE_LISTENING]: [
        'non-judgmental presence',
        'safe space',
        'patient listening',
      ],
      [SupportType.PRACTICAL_GUIDANCE]: [
        'concrete steps',
        'actionable advice',
        'clear direction',
      ],
      [SupportType.GRIEF_SUPPORT]: [
        'grief processing',
        'loss acknowledgment',
        'healing space',
      ],
      [SupportType.RELATIONSHIP_SUPPORT]: [
        'relationship guidance',
        'communication help',
        'boundary setting',
      ],
      [SupportType.STRESS_MANAGEMENT]: [
        'stress relief',
        'relaxation techniques',
        'workload management',
      ],
      [SupportType.IDENTITY_SUPPORT]: [
        'self-exploration',
        'identity clarification',
        'purpose finding',
      ],
      [SupportType.TRANSITION_SUPPORT]: [
        'change management',
        'adaptation strategies',
        'stability',
      ],
      [SupportType.TRAUMA_SUPPORT]: [
        'safety',
        'stabilization',
        'trauma processing',
      ],
      [SupportType.DAILY_FUNCTIONING]: [
        'routine establishment',
        'basic self-care',
        'functional support',
      ],
    }

    return needsMap[supportType] || ['emotional support']
  }

  private getImmediateActions(result: SupportContextResult): string[] {
    if (result.urgency === 'high') {
      return [
        'Acknowledge emotional distress and validate their feelings',
        'Assess immediate safety and provide crisis support',
        'Offer grounding techniques and coping strategies',
        'Connect with emergency resources if needed',
      ]
    }
    if (result.urgency === 'medium') {
      return [
        'Validate their emotional experience and understanding',
        'Explore current coping strategies and support systems',
        'Provide gentle guidance and normalization',
        'Offer practical next steps',
      ]
    }
    return [
      'Listen empathetically and acknowledge their feelings',
      'Reflect feelings back to demonstrate understanding',
      'Explore the situation gently without judgment',
      'Offer supportive presence and validation',
    ]
  }

  private getLongerTermStrategies(result: SupportContextResult): string[] {
    const strategies: Record<SupportType, string[]> = {
      [SupportType.EMOTIONAL_VALIDATION]: [
        'Build emotional awareness and self-understanding',
        'Develop self-compassion practices',
      ],
      [SupportType.COPING_ASSISTANCE]: [
        'Learn diverse coping strategies and practice regularly',
        'Build resilience skills and stress tolerance',
      ],
      [SupportType.ENCOURAGEMENT]: [
        'Develop hope and optimism through positive psychology',
        'Build self-efficacy and confidence',
      ],
      [SupportType.PRACTICAL_GUIDANCE]: [
        'Develop problem-solving skills and decision-making',
        'Practice implementing structured approaches',
      ],
      [SupportType.STRESS_MANAGEMENT]: [
        'Implement comprehensive stress management plan',
        'Build relaxation and mindfulness skills',
      ],
      [SupportType.RELATIONSHIP_SUPPORT]: [
        'Improve communication skills and emotional intelligence',
        'Build healthy boundaries and relationship patterns',
      ],
      [SupportType.TRAUMA_SUPPORT]: [
        'Process trauma with qualified professional support',
        'Build safety, trust, and healing practices',
      ],
      [SupportType.GRIEF_SUPPORT]: [
        'Work through grief stages with professional guidance',
        'Build healthy coping and meaning-making practices',
      ],
      [SupportType.ACTIVE_LISTENING]: [
        'Develop self-reflection and emotional processing skills',
        'Build support networks and connection',
      ],
      [SupportType.IDENTITY_SUPPORT]: [
        'Explore identity and values through self-discovery',
        'Build authentic self-expression and purpose',
      ],
      [SupportType.TRANSITION_SUPPORT]: [
        'Develop change management and adaptation skills',
        'Build flexibility and resilience for transitions',
      ],
      [SupportType.DAILY_FUNCTIONING]: [
        'Establish sustainable routines and self-care practices',
        'Build functional skills and support systems',
      ],
    }

    return (
      strategies[result.supportType] || [
        'Continue building emotional awareness and coping skills',
        'Develop healthy patterns and support networks',
      ]
    )
  }

  private getRelevantResources(result: SupportContextResult): string[] {
    // For high urgency, include crisis resources
    if (result.urgency === 'high') {
      return [
        'Crisis hotline: 988 Suicide & Crisis Lifeline',
        'Emergency services: 911 for immediate danger',
        'Crisis text line: Text HOME to 741741',
        'Local emergency mental health services',
      ]
    }

    const resources: Record<SupportType, string[]> = {
      [SupportType.EMOTIONAL_VALIDATION]: [
        'Support groups and peer counseling',
        'Mental health therapy',
        'Journaling and reflection apps',
      ],
      [SupportType.COPING_ASSISTANCE]: [
        'Coping skills workshops and classes',
        'Self-help resources and books',
        'Cognitive behavioral therapy',
      ],
      [SupportType.ENCOURAGEMENT]: [
        'Inspirational content and success stories',
        'Mentoring and coaching programs',
        'Positive psychology resources',
      ],
      [SupportType.PRACTICAL_GUIDANCE]: [
        'Life coaching and guidance counseling',
        'Problem-solving workshops',
        'Decision-making resources',
      ],
      [SupportType.STRESS_MANAGEMENT]: [
        'Relaxation apps and mindfulness programs',
        'Stress management courses',
        'Meditation and breathing techniques',
      ],
      [SupportType.GRIEF_SUPPORT]: [
        'Grief counseling and bereavement support',
        'Grief support groups',
        'Hospice and palliative care resources',
      ],
      [SupportType.TRAUMA_SUPPORT]: [
        'Trauma-informed therapy and EMDR',
        'Trauma support groups',
        'PTSD treatment programs',
      ],
      [SupportType.RELATIONSHIP_SUPPORT]: [
        'Couples and family therapy',
        'Communication skills workshops',
        'Relationship coaching',
      ],
      [SupportType.ACTIVE_LISTENING]: [
        'Peer support programs and counseling',
        'Active listening groups',
        'Emotional processing workshops',
      ],
      [SupportType.IDENTITY_SUPPORT]: [
        'Identity exploration therapy',
        'Values clarification workshops',
        'Self-discovery programs',
      ],
      [SupportType.TRANSITION_SUPPORT]: [
        'Life transition counseling',
        'Change management resources',
        'Adaptation support groups',
      ],
      [SupportType.DAILY_FUNCTIONING]: [
        'Occupational therapy services',
        'Life skills training programs',
        'Daily living support groups',
      ],
    }

    return (
      resources[result.supportType] || [
        'Mental health counseling and therapy',
        'Support communities and groups',
      ]
    )
  }

  private determineResponseStyle(result: SupportContextResult): {
    tone: 'warm' | 'professional' | 'gentle' | 'direct'
    approach: 'validating' | 'solution-focused' | 'exploratory' | 'stabilizing'
    language: 'simple' | 'detailed' | 'metaphorical' | 'clinical'
  } {
    let tone: 'warm' | 'professional' | 'gentle' | 'direct' = 'warm'
    let approach:
      | 'validating'
      | 'solution-focused'
      | 'exploratory'
      | 'stabilizing' = 'validating'
    let language: 'simple' | 'detailed' | 'metaphorical' | 'clinical' = 'simple'

    // Adjust based on emotional state and intensity
    if (result.emotionalIntensity > 0.8 || result.urgency === 'high') {
      tone = 'gentle'
      approach = 'stabilizing'
    } else if (result.supportType === SupportType.PRACTICAL_GUIDANCE) {
      approach = 'solution-focused'
      language = 'detailed'
    } else if (result.emotionalState === EmotionalState.CONFUSION) {
      approach = 'exploratory'
      language = 'simple'
    }

    return { tone, approach, language }
  }
}

/**
 * Factory function to create a support context identifier
 */
export function createSupportContextIdentifier(
  config: SupportIdentifierConfig,
): SupportContextIdentifier {
  return new SupportContextIdentifier(config)
}

/**
 * Default configuration for support context identifier
 */
export function getDefaultSupportIdentifierConfig(
  aiService: AIService,
): SupportIdentifierConfig {
  return {
    aiService,
    model: 'claude-3-sonnet',
    enableEmotionalAnalysis: true,
    enableCopingAssessment: true,
    adaptToEmotionalState: true,
  }
}
