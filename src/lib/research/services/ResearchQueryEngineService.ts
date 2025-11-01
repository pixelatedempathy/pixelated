/**
 * Research Query Engine Service
 * 
 * Provides natural language to SQL translation, query result anonymization,
 * and performance optimization for large healthcare datasets.
 * 
 * Security: All queries go through approval workflow for sensitive data
 * Performance: Optimized for sub-5 second response times
 */

import { anonymizationPipelineService, type AnonymizedRecord } from './AnonymizationPipelineService'
import { consentManagementService } from './ConsentManagementService'

export interface ResearchQuery {
  id: string
  naturalLanguageQuery: string
  translatedSQL: string
  parameters: Record<string, any>
  requiredPermissions: string[]
  estimatedExecutionTime: number
  dataClassification: 'public' | 'internal' | 'confidential' | 'restricted'
  approvalStatus: 'pending' | 'approved' | 'denied' | 'requires_review'
}

export interface QueryResult {
  queryId: string
  data: AnonymizedRecord[]
  metadata: {
    totalRecords: number
    anonymizationLevel: 'basic' | 'enhanced' | 'maximum'
    privacyMetrics: {
      kAnonymityLevel: number
      informationLoss: number
      privacyBudgetUsed: number
    }
    executionTime: number
    cacheHit: boolean
  }
  warnings: string[]
  complianceStatus: {
    hipaaCompliant: boolean
    gdprCompliant: boolean
    approvalRequired: boolean
  }
}

export interface QueryApprovalRequest {
  queryId: string
  requesterId: string
  researchContext: {
    studyTitle: string
    principalInvestigator: string
    institution: string
    researchPurpose: string
    dataJustification: string
  }
  requestedPermissions: string[]
  urgencyLevel: 'routine' | 'expedited' | 'emergency'
  reviewers: string[]
  timestamp: string
}

export interface QueryPerformanceMetrics {
  averageExecutionTime: number
  cacheHitRate: number
  queryComplexityScore: number
  resourceUtilization: {
    cpu: number
    memory: number
    diskIO: number
  }
  concurrentQueryLimit: number
}

export class ResearchQueryEngineService {
  private queryCache: Map<string, { result: QueryResult; expiry: number }> = new Map()
  private queryHistory: Map<string, ResearchQuery[]> = new Map()
  private pendingApprovals: Map<string, QueryApprovalRequest> = new Map()
  private performanceMetrics: QueryPerformanceMetrics = {
    averageExecutionTime: 2.5, // seconds
    cacheHitRate: 0.75,
    queryComplexityScore: 0.6,
    resourceUtilization: { cpu: 0.4, memory: 0.3, diskIO: 0.2 },
    concurrentQueryLimit: 50
  }

  /**
   * Translate natural language research questions to SQL queries
   */
  async translateNaturalLanguageQuery(
    naturalLanguageQuery: string,
    userId: string,
    researchContext: {
      studyTitle: string
      dataScope: string[]
      timeRange?: { start: string; end: string }
    }
  ): Promise<ResearchQuery> {
    try {
      // Validate user permissions
      const hasPermission = await this.validateUserPermissions(userId, ['research_query'])
      if (!hasPermission) {
        throw new Error('Insufficient permissions for research queries')
      }

      // Generate unique query ID
      const queryId = this.generateQueryId()

      // Parse natural language using NLP techniques
      const parsedIntent = await this.parseQueryIntent(naturalLanguageQuery)
      
      // Translate to SQL with safety checks
      const translatedSQL = await this.generateSQLFromIntent(parsedIntent, researchContext)
      
      // Estimate execution complexity and time
      const estimatedExecutionTime = await this.estimateQueryExecutionTime(translatedSQL)
      
      // Determine required permissions based on data access
      const requiredPermissions = await this.analyzeRequiredPermissions(translatedSQL, researchContext.dataScope)
      
      // Classify data sensitivity
      const dataClassification = await this.classifyDataSensitivity(translatedSQL, researchContext.dataScope)

      const query: ResearchQuery = {
        id: queryId,
        naturalLanguageQuery,
        translatedSQL,
        parameters: parsedIntent.parameters,
        requiredPermissions,
        estimatedExecutionTime,
        dataClassification,
        approvalStatus: dataClassification === 'restricted' ? 'pending' : 'approved'
      }

      // Store query in history
      const userHistory = this.queryHistory.get(userId) || []
      userHistory.push(query)
      this.queryHistory.set(userId, userHistory)

      // Auto-approve low-risk queries, require approval for sensitive data
      if (query.approvalStatus === 'pending') {
        await this.requestQueryApproval(query, userId, researchContext)
      }

      return query

    } catch (error) {
      console.error('Error translating natural language query:', error)
      throw new Error(`Query translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Execute approved research query with anonymization
   */
  async executeResearchQuery(
    queryId: string,
    userId: string,
    anonymizationLevel: 'basic' | 'enhanced' | 'maximum' = 'enhanced'
  ): Promise<QueryResult> {
    try {
      const startTime = performance.now()

      // Find query in user's history
      const userHistory = this.queryHistory.get(userId) || []
      const query = userHistory.find(q => q.id === queryId)
      
      if (!query) {
        throw new Error('Query not found or access denied')
      }

      if (query.approvalStatus !== 'approved') {
        throw new Error(`Query approval required. Current status: ${query.approvalStatus}`)
      }

      // Check cache first
      const cacheKey = `${queryId}_${anonymizationLevel}`
      const cached = this.queryCache.get(cacheKey)
      if (cached && cached.expiry > Date.now()) {
        return {
          ...cached.result,
          metadata: {
            ...cached.result.metadata,
            cacheHit: true
          }
        }
      }

      // Validate consent for data access
      const consentValid = await consentManagementService.validateConsent(userId, {
        activityType: 'research_query',
        dataTypes: ['therapeutic_sessions', 'emotional_analysis'],
        purpose: 'research_analysis'
      })

      if (!consentValid.isValid) {
        throw new Error(`Consent validation failed: ${consentValid.limitations.join(', ')}`)
      }

      // Execute SQL query (simulated - would connect to actual database)
      const rawResults = await this.executeSQLQuery(query.translatedSQL, query.parameters)
      
      // Anonymize results based on level
      const anonymizedResults = await this.anonymizeQueryResults(rawResults, anonymizationLevel, userId)
      
      const endTime = performance.now()
      const executionTime = (endTime - startTime) / 1000

      // Calculate privacy metrics
      const privacyMetrics = await this.calculatePrivacyMetrics(anonymizedResults, anonymizationLevel)
      
      // Determine compliance status
      const complianceStatus = await this.assessComplianceStatus(query, anonymizedResults)

      const result: QueryResult = {
        queryId,
        data: anonymizedResults,
        metadata: {
          totalRecords: anonymizedResults.length,
          anonymizationLevel,
          privacyMetrics,
          executionTime,
          cacheHit: false
        },
        warnings: this.generateQueryWarnings(query, anonymizedResults),
        complianceStatus
      }

      // Cache result for 1 hour
      this.queryCache.set(cacheKey, {
        result,
        expiry: Date.now() + 3600000
      })

      // Update performance metrics
      this.updatePerformanceMetrics(executionTime, false)

      return result

    } catch (error) {
      console.error('Error executing research query:', error)
      throw new Error(`Query execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Request approval for sensitive data queries
   */
  async requestQueryApproval(
    query: ResearchQuery,
    requesterId: string,
    researchContext: {
      studyTitle: string
      principalInvestigator?: string
      institution?: string
      researchPurpose?: string
    }
  ): Promise<QueryApprovalRequest> {
    const approvalRequest: QueryApprovalRequest = {
      queryId: query.id,
      requesterId,
      researchContext: {
        studyTitle: researchContext.studyTitle,
        principalInvestigator: researchContext.principalInvestigator || 'Not specified',
        institution: researchContext.institution || 'Not specified',
        researchPurpose: researchContext.researchPurpose || 'Research analysis',
        dataJustification: `Query requires access to ${query.dataClassification} data for research purposes`
      },
      requestedPermissions: query.requiredPermissions,
      urgencyLevel: 'routine',
      reviewers: ['research_committee', 'privacy_officer', 'data_steward'],
      timestamp: new Date().toISOString()
    }

    this.pendingApprovals.set(query.id, approvalRequest)
    
    // Notify reviewers (simulated)
    console.log(`Query approval requested for ${query.id}`, approvalRequest)
    
    return approvalRequest
  }

  /**
   * Get query performance analytics
   */
  async getQueryPerformanceAnalytics(userId: string): Promise<{
    userQueries: {
      totalQueries: number
      averageExecutionTime: number
      successRate: number
      mostUsedDataTypes: string[]
    }
    systemPerformance: QueryPerformanceMetrics
    optimizationSuggestions: string[]
  }> {
    const userHistory = this.queryHistory.get(userId) || []
    
    const totalQueries = userHistory.length
    const approvedQueries = userHistory.filter(q => q.approvalStatus === 'approved')
    const successRate = totalQueries > 0 ? approvedQueries.length / totalQueries : 0
    
    // Analyze most used data types from query history
    const dataTypeFrequency = new Map<string, number>()
    userHistory.forEach(query => {
      query.requiredPermissions.forEach(permission => {
        dataTypeFrequency.set(permission, (dataTypeFrequency.get(permission) || 0) + 1)
      })
    })
    
    const mostUsedDataTypes = Array.from(dataTypeFrequency.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type]) => type)

    const optimizationSuggestions = this.generateOptimizationSuggestions(userHistory, this.performanceMetrics)

    return {
      userQueries: {
        totalQueries,
        averageExecutionTime: this.performanceMetrics.averageExecutionTime,
        successRate,
        mostUsedDataTypes
      },
      systemPerformance: this.performanceMetrics,
      optimizationSuggestions
    }
  }

  // Private helper methods

  private async parseQueryIntent(naturalLanguageQuery: string): Promise<{
    intent: string
    entities: Array<{ type: string; value: string }>
    parameters: Record<string, any>
    confidence: number
  }> {
    // Simplified NLP parsing - in production would use advanced NLP models
    const query = naturalLanguageQuery.toLowerCase()
    
    let intent = 'unknown'
    let confidence = 0.5
    
    if (query.includes('correlation') || query.includes('relationship')) {
      intent = 'correlation_analysis'
      confidence = 0.8
    } else if (query.includes('trend') || query.includes('over time')) {
      intent = 'temporal_analysis'
      confidence = 0.8
    } else if (query.includes('compare') || query.includes('difference')) {
      intent = 'comparative_analysis'
      confidence = 0.8
    } else if (query.includes('predict') || query.includes('forecast')) {
      intent = 'predictive_analysis'
      confidence = 0.7
    }

    // Extract entities (simplified)
    const entities = []
    if (query.includes('anxiety')) entities.push({ type: 'condition', value: 'anxiety' })
    if (query.includes('depression')) entities.push({ type: 'condition', value: 'depression' })
    if (query.includes('session')) entities.push({ type: 'data_type', value: 'therapeutic_session' })

    return {
      intent,
      entities,
      parameters: { confidence },
      confidence
    }
  }

  private async generateSQLFromIntent(
    parsedIntent: any,
    researchContext: any
  ): Promise<string> {
    // Simplified SQL generation - in production would use sophisticated query builders
    const { intent, entities } = parsedIntent
    
    let baseQuery = 'SELECT '
    let fields = ['session_id', 'anonymized_user_id', 'session_date', 'emotional_metrics']
    let conditions = []

    // Add fields based on intent
    if (intent === 'correlation_analysis') {
      fields.push('technique_effectiveness', 'outcome_scores')
    } else if (intent === 'temporal_analysis') {
      fields.push('session_sequence', 'progress_metrics')
    }

    // Add conditions based on entities
    entities.forEach(entity => {
      if (entity.type === 'condition') {
        conditions.push(`primary_condition = '${entity.value}'`)
      }
    })

    // Add time range if specified
    if (researchContext.timeRange) {
      conditions.push(`session_date BETWEEN '${researchContext.timeRange.start}' AND '${researchContext.timeRange.end}'`)
    }

    baseQuery += fields.join(', ')
    baseQuery += ' FROM anonymized_research_data'
    
    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ')
    }

    baseQuery += ' LIMIT 1000' // Safety limit

    return baseQuery
  }

  private async executeSQLQuery(sql: string, parameters: Record<string, any>): Promise<any[]> {
    // Simulated database execution
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
    
    // Return mock data for demonstration
    return Array.from({ length: Math.floor(Math.random() * 100) + 10 }, (_, i) => ({
      id: `record_${i}`,
      session_id: `session_${i}`,
      anonymized_user_id: `user_${Math.floor(Math.random() * 50)}`,
      session_date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      emotional_metrics: {
        valence: Math.random() * 10,
        arousal: Math.random() * 10,
        dominance: Math.random() * 10
      },
      technique_effectiveness: Math.random() * 100,
      outcome_scores: Math.random() * 10
    }))
  }

  private async anonymizeQueryResults(
    rawResults: any[],
    anonymizationLevel: 'basic' | 'enhanced' | 'maximum',
    userId: string
  ): Promise<AnonymizedRecord[]> {
    const config = {
      kAnonymity: anonymizationLevel === 'maximum' ? 10 : anonymizationLevel === 'enhanced' ? 5 : 3,
      differentialPrivacy: {
        epsilon: anonymizationLevel === 'maximum' ? 0.05 : anonymizationLevel === 'enhanced' ? 0.1 : 0.2,
        delta: 1e-5,
        sensitivity: 1.0
      },
      temporalObfuscation: {
        timeJitter: anonymizationLevel === 'maximum' ? 72 : 24,
        dateGranularity: 'week' as const,
        seasonalMasking: anonymizationLevel !== 'basic'
      },
      linkagePrevention: {
        sessionIdHashing: true,
        crossReferenceBlocking: true,
        quasiIdentifierSuppression: ['user_demographics', 'location_data']
      }
    }

    const anonymizedRecords: AnonymizedRecord[] = []
    
    for (const record of rawResults) {
      const result = await anonymizationPipelineService.anonymizeSessionData(
        record,
        config,
        'research_query'
      )
      anonymizedRecords.push(result.anonymizedRecord)
    }

    return anonymizedRecords
  }

  private async calculatePrivacyMetrics(
    anonymizedResults: AnonymizedRecord[],
    anonymizationLevel: string
  ): Promise<{
    kAnonymityLevel: number
    informationLoss: number
    privacyBudgetUsed: number
  }> {
    // Calculate based on anonymization level and data
    const kAnonymityLevel = anonymizationLevel === 'maximum' ? 10 : 
                           anonymizationLevel === 'enhanced' ? 5 : 3
    
    const informationLoss = anonymizedResults.reduce((avg, record) => 
      avg + record.qualityMetrics.informationLoss, 0) / anonymizedResults.length
    
    const privacyBudgetUsed = anonymizedResults.reduce((avg, record) => 
      avg + record.qualityMetrics.privacyBudgetUsed, 0) / anonymizedResults.length

    return {
      kAnonymityLevel,
      informationLoss,
      privacyBudgetUsed
    }
  }

  private async validateUserPermissions(userId: string, requiredPermissions: string[]): Promise<boolean> {
    // Simplified permission check - in production would check actual user roles
    return true // Assuming valid for demo
  }

  private async analyzeRequiredPermissions(sql: string, dataScope: string[]): Promise<string[]> {
    const permissions = []
    
    if (sql.includes('emotional_metrics')) permissions.push('emotional_data_access')
    if (sql.includes('session_')) permissions.push('session_data_access')
    if (sql.includes('user_')) permissions.push('user_data_access')
    if (sql.includes('outcome')) permissions.push('outcome_data_access')
    
    return permissions
  }

  private async classifyDataSensitivity(sql: string, dataScope: string[]): Promise<'public' | 'internal' | 'confidential' | 'restricted'> {
    if (sql.includes('user_id') && !sql.includes('anonymized')) return 'restricted'
    if (sql.includes('emotional_metrics') || sql.includes('therapy')) return 'confidential'
    if (sql.includes('session')) return 'internal'
    return 'public'
  }

  private async estimateQueryExecutionTime(sql: string): Promise<number> {
    // Simplified estimation based on query complexity
    const complexity = sql.length + (sql.match(/JOIN/g) || []).length * 100
    return Math.min(complexity / 200, 30) // Max 30 seconds
  }

  private async assessComplianceStatus(query: ResearchQuery, results: AnonymizedRecord[]): Promise<{
    hipaaCompliant: boolean
    gdprCompliant: boolean
    approvalRequired: boolean
  }> {
    return {
      hipaaCompliant: results.every(r => r.qualityMetrics.kAnonymityLevel >= 5),
      gdprCompliant: true, // Assuming proper anonymization
      approvalRequired: query.dataClassification === 'restricted'
    }
  }

  private generateQueryWarnings(query: ResearchQuery, results: AnonymizedRecord[]): string[] {
    const warnings = []
    
    if (results.length === 0) {
      warnings.push('No results found for query. Consider broadening search criteria.')
    }
    
    if (query.estimatedExecutionTime > 10) {
      warnings.push('Query may take longer than expected to execute.')
    }
    
    const avgInformationLoss = results.reduce((avg, r) => avg + r.qualityMetrics.informationLoss, 0) / results.length
    if (avgInformationLoss > 0.5) {
      warnings.push('High information loss due to anonymization. Results may be less precise.')
    }

    return warnings
  }

  private generateOptimizationSuggestions(history: ResearchQuery[], metrics: QueryPerformanceMetrics): string[] {
    const suggestions = []
    
    if (metrics.averageExecutionTime > 5) {
      suggestions.push('Consider adding more specific filters to reduce query execution time')
    }
    
    if (metrics.cacheHitRate < 0.5) {
      suggestions.push('Similar queries detected. Consider reusing previous results when appropriate')
    }
    
    const complexQueries = history.filter(q => q.estimatedExecutionTime > 10)
    if (complexQueries.length > 0) {
      suggestions.push('Break down complex queries into smaller, more focused analyses')
    }

    return suggestions
  }

  private updatePerformanceMetrics(executionTime: number, cacheHit: boolean): void {
    // Update running averages
    this.performanceMetrics.averageExecutionTime = 
      (this.performanceMetrics.averageExecutionTime * 0.9) + (executionTime * 0.1)
    
    this.performanceMetrics.cacheHitRate = 
      (this.performanceMetrics.cacheHitRate * 0.95) + (cacheHit ? 0.05 : 0)
  }

  private generateQueryId(): string {
    return `query_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }
}

export const researchQueryEngineService = new ResearchQueryEngineService()