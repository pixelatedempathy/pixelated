# Phase 7 Rate Limiting Service - Pseudocode

## 🎯 Module Overview
Implements configurable rate limiting with distributed support, role-based limits, and integration with Phase 6 MCP server for tracking and monitoring.

## 📋 Core Components

### 1. Rate Limiting Engine
```typescript
// Rate Limiting Engine - Core rate limiting logic
module RateLimitingEngine {
  
  // Check if request is within rate limits
  function checkRateLimit(request: RateLimitRequest): RateLimitResult {
    // TEST: Request within limits returns allowed status
    // TEST: Request exceeding limits returns blocked status
    // TEST: Rate limit counters are properly incremented
    // TEST: Distributed rate limiting works across instances
    
    const {
      userId,
      ipAddress,
      endpoint,
      method,
      userRole,
      requestWeight = 1
    } = request
    
    // Get applicable rate limit configurations
    const configs = getApplicableRateLimitConfigs(endpoint, method, userRole)
    
    if (configs.length === 0) {
      // No rate limits configured, allow request
      return createAllowedResult('no_limits_configured')
    }
    
    // Check each rate limit configuration
    for (const config of configs) {
      const result = checkIndividualRateLimit(config, request)
      
      if (!result.allowed) {
        // Rate limit exceeded, return blocked result
        return result
      }
    }
    
    // All rate limits passed, allow request
    return createAllowedResult('within_limits')
  }
  
  // Check individual rate limit configuration
  function checkIndividualRateLimit(config: RateLimitConfig, request: RateLimitRequest): RateLimitResult {
    // TEST: Config with user ID scope checks user-specific limits
    // TEST: Config with IP scope checks IP-specific limits
    // TEST: Config with endpoint scope checks endpoint-specific limits
    // TEST: Admin bypass roles skip rate limiting
    
    const { userId, ipAddress, userRole, requestWeight } = request
    
    // Check if user role has bypass permission
    if (config.bypassRoles.includes(userRole)) {
      return createAllowedResult('bypass_role')
    }
    
    // Generate rate limit key based on configuration scope
    const rateLimitKey = generateRateLimitKey(config, request)
    
    // Get current usage from Redis
    const currentUsage = getCurrentUsage(rateLimitKey)
    
    // Check if limit would be exceeded
    if (currentUsage + requestWeight > config.limit) {
      // Rate limit exceeded
      const resetTime = calculateResetTime(config.window)
      const retryAfter = calculateRetryAfter(resetTime)
      
      // Log rate limit violation
      logRateLimitViolation(config, request, currentUsage, requestWeight)
      
      // Update Phase 6 MCP server with rate limit event
      updatePhase6RateLimitEvent(request, config, currentUsage)
      
      return createBlockedResult(
        'rate_limit_exceeded',
        config.limit,
        currentUsage,
        resetTime,
        retryAfter
      )
    }
    
    // Increment usage counter
    incrementUsage(rateLimitKey, requestWeight, config.window)
    
    // Calculate remaining requests
    const remaining = config.limit - (currentUsage + requestWeight)
    
    return createAllowedResult('within_limit', config.limit, currentUsage + requestWeight, remaining)
  }
  
  // Generate rate limit key based on configuration
  function generateRateLimitKey(config: RateLimitConfig, request: RateLimitRequest): string {
    // TEST: Key includes all relevant scope components
    // TEST: Key is consistent for same request parameters
    // TEST: Distributed flag affects key generation
    
    const parts = ['rate_limit', config.id]
    
    // Add scope-specific components
    if (config.scope.userId && request.userId) {
      parts.push(`user:${request.userId}`)
    }
    
    if (config.scope.ipAddress) {
      parts.push(`ip:${request.ipAddress}`)
    }
    
    if (config.scope.endpoint) {
      parts.push(`endpoint:${request.endpoint}`)
    }
    
    if (config.scope.method) {
      parts.push(`method:${request.method}`)
    }
    
    if (config.distributed) {
      parts.push('distributed')
    }
    
    return parts.join(':')
  }
  
  // Increment usage counter in Redis
  function incrementUsage(key: string, weight: number, window: number): void {
    // TEST: Usage counter increments by correct weight
    // TEST: Counter expires after window duration
    // TEST: Distributed increment works across instances
    
    const redis = getRedisClient()
    
    // Use Redis pipeline for atomic operations
    const pipeline = redis.pipeline()
    
    // Increment counter
    pipeline.incrby(key, weight)
    
    // Set expiration if key is new
    pipeline.expire(key, window)
    
    // Execute pipeline
    pipeline.exec()
    
    // For distributed rate limiting, replicate to other instances
    if (isDistributedMode()) {
      replicateUsageIncrement(key, weight, window)
    }
  }
  
  // Get current usage from Redis
  function getCurrentUsage(key: string): number {
    // TEST: Returns correct usage count
    // TEST: Returns 0 for non-existent keys
    // TEST: Handles Redis connection failures gracefully
    
    try {
      const redis = getRedisClient()
      const usage = redis.get(key)
      
      return parseInt(usage || '0', 10)
    } catch (error) {
      // Log Redis error
      logError('Redis connection failed during rate limit check', error)
      
      // Fallback: allow request if Redis is unavailable
      return 0
    }
  }
}
```

### 2. Rate Limit Configuration Service
```typescript
// Rate Limit Configuration Service - Manage rate limit rules
module RateLimitConfigurationService {
  
  // Create new rate limit configuration
  function createRateLimitConfig(configData: RateLimitConfigInput): RateLimitConfig {
    // TEST: Valid configuration data creates new config
    // TEST: Invalid configuration data throws validation error
    // TEST: Duplicate configurations are prevented
    
    // Validate input data
    validateRateLimitConfigInput(configData)
    
    // Check for conflicting configurations
    checkForConflicts(configData)
    
    // Create configuration object
    const config: RateLimitConfig = {
      id: generateUniqueId(),
      name: configData.name,
      description: configData.description,
      endpoint: configData.endpoint,
      method: configData.method || 'ALL',
      userRole: configData.userRole || 'ALL',
      limit: configData.limit,
      window: configData.window,
      burstLimit: configData.burstLimit || configData.limit,
      scope: {
        userId: configData.scope?.userId || false,
        ipAddress: configData.scope?.ipAddress || true,
        endpoint: configData.scope?.endpoint || true,
        method: configData.scope?.method || false
      },
      bypassRoles: configData.bypassRoles || [],
      distributed: configData.distributed || false,
      customHeaders: configData.customHeaders || {},
      enabled: configData.enabled !== false,
      createdAt: currentTimestamp(),
      updatedAt: currentTimestamp()
    }
    
    // Store configuration in database
    storeRateLimitConfig(config)
    
    // Cache configuration in Redis
    cacheRateLimitConfig(config)
    
    // Log configuration creation
    logSecurityEvent(SecurityEventType.RATE_LIMIT_CONFIG_CREATED, null, {
      configId: config.id,
      configName: config.name,
      limit: config.limit,
      window: config.window
    })
    
    // Update Phase 6 MCP server with configuration change
    updatePhase6RateLimitConfig(config, 'created')
    
    return config
  }
  
  // Update existing rate limit configuration
  function updateRateLimitConfig(configId: string, updates: Partial<RateLimitConfigInput>): RateLimitConfig {
    // TEST: Valid updates modify existing config
    // TEST: Non-existent config throws not found error
    // TEST: Updated config is properly cached
    
    // Get existing configuration
    const existingConfig = getRateLimitConfig(configId)
    
    if (!existingConfig) {
      throw new NotFoundError('Rate limit configuration not found')
    }
    
    // Validate updates
    validateRateLimitConfigUpdates(updates)
    
    // Apply updates
    const updatedConfig = {
      ...existingConfig,
      ...updates,
      id: existingConfig.id, // Prevent ID changes
      createdAt: existingConfig.createdAt, // Prevent creation date changes
      updatedAt: currentTimestamp()
    }
    
    // Store updated configuration
    storeRateLimitConfig(updatedConfig)
    
    // Update cache
    cacheRateLimitConfig(updatedConfig)
    
    // Clear existing rate limit counters if config changed significantly
    if (hasSignificantChanges(existingConfig, updatedConfig)) {
      clearRateLimitCounters(existingConfig)
    }
    
    // Log configuration update
    logSecurityEvent(SecurityEventType.RATE_LIMIT_CONFIG_UPDATED, null, {
      configId: configId,
      changes: getConfigChanges(existingConfig, updatedConfig)
    })
    
    // Update Phase 6 MCP server with configuration change
    updatePhase6RateLimitConfig(updatedConfig, 'updated')
    
    return updatedConfig
  }
  
  // Get rate limit configurations for endpoint and method
  function getApplicableRateLimitConfigs(endpoint: string, method: string, userRole: UserRole): RateLimitConfig[] {
    // TEST: Returns relevant configurations for endpoint/method/role
    // TEST: Respects configuration priority rules
    // TEST: Filters out disabled configurations
    
    // Get all active configurations from cache
    const allConfigs = getAllActiveRateLimitConfigs()
    
    // Filter configurations based on applicability
    const applicableConfigs = allConfigs.filter(config => {
      // Check if configuration is enabled
      if (!config.enabled) {
        return false
      }
      
      // Check endpoint match
      if (!matchesEndpoint(config.endpoint, endpoint)) {
        return false
      }
      
      // Check method match
      if (!matchesMethod(config.method, method)) {
        return false
      }
      
      // Check role match
      if (!matchesRole(config.userRole, userRole)) {
        return false
      }
      
      return true
    })
    
    // Sort by priority (more specific configurations first)
    return sortConfigsByPriority(applicableConfigs)
  }
  
  // Get rate limit statistics
  function getRateLimitStatistics(timeRange: TimeRange): RateLimitStatistics {
    // TEST: Returns accurate statistics for time range
    // TEST: Handles empty time ranges gracefully
    // TEST: Aggregates data from multiple sources
    
    const stats = {
      totalRequests: 0,
      allowedRequests: 0,
      blockedRequests: 0,
      topBlockedEndpoints: [],
      topBlockedIPs: [],
      topBlockedUsers: [],
      averageResponseTime: 0,
      configurations: [],
      timeRange: timeRange
    }
    
    // Get request data from Redis/Database
    const requestData = getRateLimitRequestData(timeRange)
    
    // Calculate statistics
    stats.totalRequests = requestData.total
    stats.allowedRequests = requestData.allowed
    stats.blockedRequests = requestData.blocked
    stats.averageResponseTime = calculateAverageResponseTime(requestData)
    
    // Get top blocked entities
    stats.topBlockedEndpoints = getTopBlockedEndpoints(requestData)
    stats.topBlockedIPs = getTopBlockedIPs(requestData)
    stats.topBlockedUsers = getTopBlockedUsers(requestData)
    
    // Get configuration statistics
    stats.configurations = getConfigurationStatistics()
    
    // Update Phase 6 MCP server with statistics
    updatePhase6RateLimitStatistics(stats)
    
    return stats
  }
}
```

### 3. Distributed Rate Limiting Service
```typescript
// Distributed Rate Limiting Service - Handle rate limiting across multiple instances
module DistributedRateLimitingService {
  
  // Synchronize rate limit data across instances
  function synchronizeRateLimitData(key: string, localUsage: number): void {
    // TEST: Local usage is broadcast to other instances
    // TEST: Remote usage updates are received and applied
    // TEST: Conflict resolution handles concurrent updates
    
    if (!isDistributedMode()) {
      return
    }
    
    const syncData = {
      key: key,
      usage: localUsage,
      timestamp: currentTimestamp(),
      instanceId: getInstanceId()
    }
    
    // Broadcast to other instances via Redis pub/sub
    publishRateLimitSync(syncData)
    
    // Request current state from other instances
    requestRateLimitState(key)
  }
  
  // Handle incoming rate limit synchronization data
  function handleRateLimitSync(syncData: RateLimitSyncData): void {
    // TEST: Remote usage updates are properly applied
    // TEST: Outdated updates are ignored
    // TEST: Instance conflicts are resolved
    
    const { key, usage, timestamp, instanceId } = syncData
    
    // Ignore updates from self
    if (instanceId === getInstanceId()) {
      return
    }
    
    // Ignore outdated updates
    if (timestamp < getLastSyncTimestamp(key)) {
      return
    }
    
    // Get current local state
    const localState = getLocalRateLimitState(key)
    
    // Merge usage data (take maximum to be conservative)
    const mergedUsage = Math.max(localState.usage, usage)
    
    // Update local state if different
    if (mergedUsage !== localState.usage) {
      updateLocalRateLimitState(key, mergedUsage, timestamp)
      
      // Log synchronization event
      logSecurityEvent(SecurityEventType.RATE_LIMIT_SYNC, null, {
        key: key,
        localUsage: localState.usage,
        remoteUsage: usage,
        mergedUsage: mergedUsage,
        sourceInstance: instanceId
      })
    }
  }
  
  // Resolve conflicts in distributed rate limiting
  function resolveRateLimitConflict(key: string, conflictingStates: RateLimitState[]): RateLimitState {
    // TEST: Conflict resolution selects appropriate state
    // TEST: Timestamp-based resolution works correctly
    // TEST: Usage-based resolution works correctly
    
    if (conflictingStates.length === 0) {
      return createEmptyRateLimitState()
    }
    
    if (conflictingStates.length === 1) {
      return conflictingStates[0]
    }
    
    // Sort by timestamp (newest first)
    const sortedByTimestamp = conflictingStates.sort((a, b) => b.timestamp - a.timestamp)
    
    // If timestamps are very close (within 1 second), use maximum usage
    const newestTimestamp = sortedByTimestamp[0].timestamp
    const oldestTimestamp = sortedByTimestamp[sortedByTimestamp.length - 1].timestamp
    
    if (newestTimestamp - oldestTimestamp < 1000) {
      // Use maximum usage for conservative rate limiting
      const maxUsage = Math.max(...conflictingStates.map(state => state.usage))
      return {
        ...sortedByTimestamp[0],
        usage: maxUsage
      }
    }
    
    // Use newest state
    return sortedByTimestamp[0]
  }
  
  // Handle instance failure and recovery
  function handleInstanceFailure(failedInstanceId: string): void {
    // TEST: Failed instance rate limit data is cleaned up
    // TEST: Other instances take over failed instance's load
    // TEST: Rate limiting continues correctly after failure
    
    logSecurityEvent(SecurityEventType.INSTANCE_FAILURE, null, {
      failedInstanceId: failedInstanceId,
      timestamp: currentTimestamp()
    })
    
    // Clean up rate limit data from failed instance
    cleanupFailedInstanceData(failedInstanceId)
    
    // Redistribute load from failed instance
    redistributeFailedInstanceLoad(failedInstanceId)
    
    // Notify other instances about failure
    broadcastInstanceFailure(failedInstanceId)
  }
}
```

### 4. Rate Limit Monitoring and Alerting
```typescript
// Rate Limit Monitoring Service - Monitor and alert on rate limit events
module RateLimitMonitoringService {
  
  // Monitor rate limit violations and trigger alerts
  function monitorRateLimitViolation(violation: RateLimitViolation): void {
    // TEST: Violations are properly logged and tracked
    // TEST: Alert thresholds trigger notifications
    // TEST: Escalation happens for severe violations
    
    // Log violation for analysis
    logRateLimitViolation(violation)
    
    // Check if alert should be triggered
    if (shouldTriggerAlert(violation)) {
      triggerRateLimitAlert(violation)
    }
    
    // Check for escalation
    if (shouldEscalate(violation)) {
      escalateRateLimitIssue(violation)
    }
    
    // Update real-time metrics
    updateRateLimitMetrics(violation)
    
    // Check for attack patterns
    checkForAttackPatterns(violation)
  }
  
  // Check if rate limit violation indicates potential attack
  function checkForAttackPatterns(violation: RateLimitViolation): void {
    // TEST: DDoS patterns are detected correctly
    // TEST: Brute force patterns are detected correctly
    // TEST: False positives are minimized
    
    const patterns = [
      checkForDDoSPattern,
      checkForBruteForcePattern,
      checkForCredentialStuffingPattern,
      checkForScrapingPattern
    ]
    
    for (const patternCheck of patterns) {
      const pattern = patternCheck(violation)
      
      if (pattern.detected) {
        handleAttackPattern(pattern, violation)
        break
      }
    }
  }
  
  // Generate real-time rate limit dashboard data
  function generateDashboardData(): RateLimitDashboardData {
    // TEST: Dashboard data is current and accurate
    // TEST: Data includes all required metrics
    // TEST: Performance impact is minimal
    
    const currentTime = currentTimestamp()
    
    return {
      timestamp: currentTime,
      summary: getRateLimitSummary(),
      topViolations: getTopViolations(),
      trends: getRateLimitTrends(),
      activeConfigurations: getActiveConfigurations(),
      systemHealth: getSystemHealth(),
      alerts: getActiveAlerts(),
      recommendations: generateRecommendations()
    }
  }
  
  // Generate recommendations based on rate limit data
  function generateRecommendations(): RateLimitRecommendation[] {
    // TEST: Recommendations are relevant to current situation
    // TEST: Recommendations are actionable
    // TEST: Priority levels are appropriate
    
    const recommendations = []
    
    // Analyze current rate limit configurations
    const configs = getAllActiveRateLimitConfigs()
    const stats = getRateLimitStatistics({ start: getLast24Hours(), end: currentTimestamp() })
    
    // Check for overly restrictive configurations
    const restrictiveConfigs = configs.filter(config => {
      const configStats = stats.configurations.find(cs => cs.configId === config.id)
      return configStats && configStats.blockRate > 0.1 // More than 10% block rate
    })
    
    if (restrictiveConfigs.length > 0) {
      recommendations.push({
        type: 'ADJUST_LIMITS',
        priority: 'HIGH',
        description: 'Some rate limit configurations are blocking too many legitimate requests',
        affectedConfigs: restrictiveConfigs.map(c => c.id),
        suggestedAction: 'Consider increasing limits or adjusting scopes'
      })
    }
    
    // Check for underutilized configurations
    const underutilizedConfigs = configs.filter(config => {
      const configStats = stats.configurations.find(cs => cs.configId === config.id)
      return configStats && configStats.utilization < 0.1 // Less than 10% utilization
    })
    
    if (underutilizedConfigs.length > 0) {
      recommendations.push({
        type: 'OPTIMIZE_CONFIGS',
        priority: 'MEDIUM',
        description: 'Some rate limit configurations are underutilized',
        affectedConfigs: underutilizedConfigs.map(c => c.id),
        suggestedAction: 'Consider tightening limits or removing unused configurations'
      })
    }
    
    return recommendations
  }
}
```

## 🧪 TDD Anchors Summary

### Core Test Scenarios
1. **Rate Limit Check**: Requests within limits are allowed
2. **Rate Limit Exceeded**: Requests exceeding limits are blocked
3. **Configuration Priority**: More specific configurations take precedence
4. **Role Bypass**: Admin roles bypass rate limits correctly
5. **Distributed Sync**: Rate limit data syncs across instances
6. **Redis Failover**: Graceful handling of Redis failures
7. **Configuration Updates**: Changes apply immediately
8. **Statistics Accuracy**: Metrics reflect actual usage
9. **Attack Detection**: Malicious patterns are identified
10. **Alert Generation**: Appropriate alerts are triggered

### Edge Cases
1. **Concurrent Requests**: Race conditions handled correctly
2. **Clock Skew**: Time differences between instances handled
3. **Network Partitions**: Split-brain scenarios resolved
4. **Configuration Conflicts**: Overlapping rules resolved
5. **Instance Failures**: Failed instances don't affect others
6. **Key Expiration**: Redis key expiration handled correctly
7. **Weight Calculations**: Request weights applied accurately
8. **Window Boundaries**: Rate limit windows reset correctly
9. **Burst Handling**: Burst limits enforced properly
10. **Emergency Overrides**: Emergency bypass mechanisms work

---

*This pseudocode provides a comprehensive rate limiting system with distributed support, real-time monitoring, and seamless integration with the Phase 6 MCP server for tracking and analytics.*