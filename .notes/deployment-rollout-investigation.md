# Kubernetes Deployment Rollout Failure - Investigation Report

## Problem Summary
Production deployment is stuck with `ProgressDeadlineExceeded` error. New ReplicaSet has 1/1 replicas but rollout is not progressing, indicating the new pod is not becoming ready.

## Root Cause Analysis

### 1. **Startup Initialization Blocking** ⚠️ CRITICAL
- **Location**: `src/pages/app.astro` - initialization runs during SSR startup
- **Issue**: Database initialization (`initializeSecurityDatabase()`) may block or fail
- **Impact**: If MongoDB connection fails or times out, initialization throws error which could prevent server from becoming ready
- **Evidence**: 
  - `src/lib/db/security/schema.ts` connects to MongoDB on startup
  - If `MONGODB_URI` is missing, uses mock client (but still might cause issues)
  - Initialization errors are thrown (not caught gracefully)

### 2. **Readiness Probe Configuration** ⚠️ HIGH
- **Current**: `initialDelaySeconds: 5` 
- **Issue**: May be too short if:
  - Database connections take time
  - Security initialization is slow
  - Application startup exceeds 5 seconds
- **Recommendation**: Increase to `15-30` seconds for production workloads with initialization

### 3. **Rollout Strategy Constraints** ⚠️ MEDIUM
- **Current**: `maxUnavailable: 0` (zero downtime)
- **Issue**: Requires new pod to be fully ready before old pods terminate
- **Impact**: If new pod fails readiness checks, rollout stalls completely
- **Trade-off**: Zero downtime vs. deployment reliability

### 4. **Health Endpoint** ✅ GOOD
- **Status**: Using `/api/health/simple` is correct
- **Note**: Endpoint is lightweight and doesn't depend on full initialization
- **Potential Issue**: If server isn't responding at all, health check will fail

### 5. **Resource Constraints** ⚠️ TO INVESTIGATE
- **Requests**: CPU: 200m, Memory: 512Mi
- **Limits**: CPU: 1000m, Memory: 1Gi
- **Issue**: Cluster might not have capacity for surge pod (4 pods temporarily with maxSurge: 1)
- **Action Needed**: Check cluster resource availability during deployments

## Immediate Fixes Required

### Fix 1: Increase Readiness Probe Initial Delay
**File**: `k8s/azure/production/deployment.yaml`
```yaml
readinessProbe:
  httpGet:
    path: /api/health/simple
    port: http
  initialDelaySeconds: 30  # Increased from 5
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3
```

**Rationale**: Allows time for:
- Database connections (MongoDB)
- Security initialization
- Application startup
- First request processing

### Fix 2: Make Initialization Non-Blocking
**File**: `src/pages/app.astro`
- Wrap initialization in try-catch that doesn't throw
- Log errors but allow server to continue
- Health endpoint should work even if initialization is pending

**Alternative**: Move initialization to background task that doesn't block server startup

### Fix 3: Add Startup Timeout Protection
- Add timeout wrapper for initialization
- If initialization exceeds X seconds, log warning and continue
- Prevents hanging on slow/failed database connections

## Diagnostic Steps Added

✅ Added comprehensive diagnostic step in Azure pipeline that runs when rollout fails:
- Deployment status and conditions
- Pod status and events
- Recent Kubernetes events
- ReplicaSet status
- Troubleshooting guidance

## Recommended Actions

### Immediate (This Deployment)
1. ✅ Use diagnostic output from pipeline to identify specific pod issue
2. Check pod logs: `kubectl logs -n pixelated-production -l app=pixelated-app --tail=100`
3. Check pod events: `kubectl describe pod <pod-name> -n pixelated-production`
4. Verify MongoDB connectivity from pod

### Short-term (Next Deployment)
1. ✅ Increase readiness probe initialDelaySeconds to 30
2. Make initialization non-blocking with timeout
3. Add startup health check that doesn't require full initialization
4. Consider adjusting rollout strategy if cluster has resource constraints

### Long-term (Architecture)
1. Move initialization to background workers
2. Implement progressive readiness (basic health → full readiness)
3. Add initialization status endpoint separate from health
4. Consider using init containers for database setup

## Configuration Recommendations

### Option A: Keep Zero Downtime (Current)
- Requires: Sufficient cluster resources for surge
- Requires: Fast, reliable startup (< 30s)
- Benefit: True zero downtime deployments

### Option B: Allow Brief Downtime (Alternative)
```yaml
rollingUpdate:
  maxSurge: 1
  maxUnavailable: 1  # Changed from 0
```
- Benefit: Easier rollouts, more tolerant of slow startups
- Trade-off: Brief moment with 2/3 pods during rollout

### Option C: Progressive Rollout
- Use readiness gates or custom readiness logic
- Allow basic health checks before full initialization
- Gradually enable traffic as initialization completes

## Monitoring & Alerts

Add monitoring for:
1. Pod startup time (from creation to ready)
2. Initialization duration
3. Readiness probe failures
4. Database connection times
5. Deployment rollout duration

## Next Steps

1. ✅ Review diagnostic output from failed deployment
2. ✅ Implement readiness probe delay increase
3. ⏳ Test initialization timeout handling
4. ⏳ Monitor next deployment for improvements
5. ⏳ Adjust strategy based on results

---

**Investigation Date**: 2025-12-01  
**Status**: In Progress - Awaiting diagnostic data from failed deployment

