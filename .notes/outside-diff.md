Some comments are outside the diff and can’t be posted inline due to platform limitations.

⚠️ Outside diff range comments (31)
src/lib/ai/bias-detection/python-bridge.ts (1)
139-156: Requests can deadlock: queue never (re)starts after first idle.

processQueue() runs once in the constructor; after it exits, subsequent calls to makeRequest()/queueRequest() won’t start processing. This will hang Promises.

Start the processor whenever a new item is enqueued:

   return new Promise((resolve, reject) => {
@@
       this.requestQueue.sort((a, b) => b.priority - a.priority)
+      // Ensure the processor is running
+      if (!this.processingQueue) {
+        void this.processQueue()
+      }
     })
   }
src/lib/services/performance-optimizer.ts (2)
126-167: maxConnections not enforced; track active vs idle connections

Currently, maxConnections is compared to idle length, so new connections can be created unbounded when none are idle. Track “active” counts and enforce total = active + idle.

Apply diffs:

@@
 export class PerformanceOptimizer {
   private config: OptimizationConfig
   private metrics: PerformanceMetrics
   private connectionPool: Map<string, unknown[]>
   private cache: Map<string, { value: unknown; timestamp: number; accessCount: number }>
   private circuitBreakers: Map<string, { failures: number; lastFailure: number; state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' }>
-  private batchQueues: Map<string, { items: unknown[]; timer: NodeJS.Timeout | null }>
+  private batchQueues: Map<string, { items: unknown[]; timer: NodeJS.Timeout | null }>
+  private activeCounts: Map<string, number>
@@
   constructor(config: Partial<OptimizationConfig> = {}) {
@@
     this.connectionPool = new Map()
     this.cache = new Map()
     this.circuitBreakers = new Map()
     this.batchQueues = new Map()
+    this.activeCounts = new Map()
     this.metricsHistory = []
@@
   async acquireConnection(poolName: string, factory: () => Promise<unknown>): Promise<unknown> {
     if (!this.connectionPool.has(poolName)) {
       this.connectionPool.set(poolName, [])
     }
+    if (!this.activeCounts.has(poolName)) {
+      this.activeCounts.set(poolName, 0)
+    }
 
     const pool = this.connectionPool.get(poolName)!
+    const getActive = () => this.activeCounts.get(poolName) ?? 0
     
     // Return existing connection if available
     if (pool.length > 0) {
-      return pool.pop()
+      this.activeCounts.set(poolName, getActive() + 1)
+      return pool.pop()
     }
 
     // Create new connection if under limit
-    if (pool.length < this.config.connectionPool.maxConnections) {
+    if (getActive() + pool.length < this.config.connectionPool.maxConnections) {
       try {
         const connection = await factory()
         logger.debug(`Created new connection for pool: ${poolName}`)
+        this.activeCounts.set(poolName, getActive() + 1)
         return connection
       } catch (error: unknown) {
         logger.error(`Failed to create connection for pool: ${poolName}`, { error })
         throw error
       }
     }
@@
   releaseConnection(poolName: string, connection: unknown): void {
     if (!this.connectionPool.has(poolName)) {
       return
     }
 
     const pool = this.connectionPool.get(poolName)!
+    const active = this.activeCounts.get(poolName) ?? 0
+    if (active > 0) this.activeCounts.set(poolName, active - 1)
     if (pool.length < this.config.connectionPool.maxConnections) {
       pool.push(connection)
     }
   }
Also applies to: 169-179, 58-66, 114-121

395-401: Monitoring interval is never cleared; add handle and clear in cleanup

StartMonitoring sets an interval without clearing it, causing leaks in long-lived apps/tests.

@@
 export class PerformanceOptimizer {
@@
-  private batchQueues: Map<string, { items: unknown[]; timer: NodeJS.Timeout | null }>
+  private batchQueues: Map<string, { items: unknown[]; timer: NodeJS.Timeout | null }>
+  private metricsIntervalId: NodeJS.Timeout | null
@@
-    this.metricsHistory = []
+    this.metricsHistory = []
+    this.metricsIntervalId = null
@@
   private startMonitoring() {
-    setInterval(() => {
+    this.metricsIntervalId = setInterval(() => {
       this.updateMetrics()
       this.checkAlerts()
     }, this.config.monitoring.metricsInterval)
   }
@@
   cleanup() {
     // Clear all timers
     for (const batch of this.batchQueues.values()) {
       if (batch.timer) {
         clearTimeout(batch.timer)
       }
     }
+    if (this.metricsIntervalId) {
+      clearInterval(this.metricsIntervalId)
+      this.metricsIntervalId = null
+    }
Also applies to: 500-507, 58-66, 114-121

src/components/analytics/__tests__/PatternVisualization.test.tsx (1)
65-71: Fix undefined variable in test: handlePatternSelect is not defined

This test passes an undefined symbol, causing a ReferenceError.

   it('renders all sections with data', () => {
-    render(
+    const handlePatternSelect = vi.fn()
+    render(
       <PatternVisualization
         trends={mockTrends}
         onPatternSelect={handlePatternSelect}
       />,
     )
src/hooks/useMemory.ts (2)
3-8: Missing MemoryHistoryItem type (or wrong import) — breaks typing

UseMemoryReturn and getMemoryHistory reference MemoryHistoryItem but it isn’t imported here. Import it from the memory client (or change the type).

 import {
   memoryManager,
   type MemoryEntry,
   type SearchOptions,
   type MemoryStats,
+  type MemoryHistoryItem,
 } from '@/lib/memory/memory-client'
@@
 export interface UseMemoryReturn {
@@
-  getMemoryHistory: () => Promise<MemoryHistoryItem[]>
+  getMemoryHistory: () => Promise<MemoryHistoryItem[]>
@@
-  const getMemoryHistory = useCallback(async (): Promise<MemoryHistoryItem[]> => {
+  const getMemoryHistory = useCallback(async (): Promise<MemoryHistoryItem[]> => {
If MemoryHistoryItem doesn’t exist, change both occurrences to unknown[] and update callers.

Also applies to: 45-46, 232-239

178-183: Unify addUserPreference param type with interface

Interface expects unknown; implementation narrows to string|number|boolean|object and may be incompatible under strictFunctionTypes.

-  const addUserPreference = useCallback(
-    async (preference: string, value: string | number | boolean | object): Promise<void> => {
+  const addUserPreference = useCallback(
+    async (preference: string, value: unknown): Promise<void> => {
       await memoryManager.addUserPreference(userId, preference, value)
       await refreshMemories()
     },
     [userId, refreshMemories],
   )
src/lib/services/patient-rights/dataDeleteService.ts (4)
3-5: Remove self-import and use local interface directly.

This file imports its own type alias from itself, which is unnecessary and can confuse TS/module resolution.

Apply:

-import type {
-  DataDeletionRequest as DeletionRequest,
-} from './dataDeleteService'
69-72: Use the locally-declared type for the collection.

Switch the generic to the local interface after removing the self-import.

-const collection = db.collection<DeletionRequest>('dataDeletionRequests')
+const collection = db.collection<DataDeletionRequest>('dataDeletionRequests')
90-95: Align collection generic with the local type.

-const collection = db.collection<DeletionRequest>('dataDeletionRequests')
+const collection = db.collection<DataDeletionRequest>('dataDeletionRequests')
160-176: findOneAndUpdate result handling is incorrect. Use result.value.

Mongo Node driver returns { value, ... }, not the document itself. Current cast will mis-shape the record and may break audit/deletion logic.

Verify driver major version (expect >=4):

#!/bin/bash
jq -r '.dependencies.mongodb // .devDependencies.mongodb // "not-found"' package.json
Fix:

-const result = await collection.findOneAndUpdate(
+const result = await collection.findOneAndUpdate(
   { id: params.id },
   { $set: updateData },
   { returnDocument: 'after' },
 )
-
-if (!result) {
+const updated = (result as { value: DataDeletionRequest | null }).value
+if (!updated) {
   throw new Error('Failed to update data deletion request')
 }
-
-const updatedRequest = result as DataDeletionRequest
+const updatedRequest = updated
src/components/ai/chat/useChatCompletion.ts (1)
349-361: Avoid duplicating the user message on retries and fix onComplete content.

User message is appended inside the retry loop (duplicates on failures), and onComplete uses a stale messages reference. Append once and pass the assistant text.

-  // Implement retry logic with exponential backoff
-  let retries = 0
-  let success = false
-
-  while (retries < maxRetries && !success) {
+  // Implement retry logic with exponential backoff
+  let retries = 0
+  let success = false
+  // Add user message once
+  const userMessage: AIMessage = {
+    role: 'user',
+    content: message,
+    name: context?.name || '',
+    ...context,
+  }
+  const baseMessages = [...messages, userMessage]
+  setMessages(baseMessages)
+
+  while (retries < maxRetries && !success) {
     try {
-      // Add user message to chat
-      const userMessage: AIMessage = {
-        role: 'user',
-        content: message,
-        name: context?.name || '',
-        ...context,
-      }
-      
-      const updatedMessages = [...messages, userMessage]
-      setMessages(updatedMessages)
+      const updatedMessages = baseMessages
       const response = await makeRequest(updatedMessages)
@@
-          if (streamingEnabled) {
+          if (streamingEnabled) {
             // Handle streaming response
@@
-                  if (data?.finishReason === 'stop' || data?.done) {
-                    break
-                  }
+                  if (data?.finishReason === 'stop' || data?.done) {
+                    break
+                  }
                 } catch {
                   // Skip invalid JSON
                 }
               }
             }
+            // streaming finished
+            if (onComplete) {
+              onComplete(assistantMessage)
+            }
           } else {
             // Handle non-streaming response
             const data = await response.json()
             const assistantMessage = data.choices?.[0]?.message?.content || ''
             
             setMessages(prev => [...prev, {
               role: 'assistant',
               content: assistantMessage,
               name: '',
             }])
+            if (onComplete) {
+              onComplete(assistantMessage)
+            }
           }
@@
-          if (onComplete) {
-            onComplete(messages[messages.length - 1]?.content || '')
-          }
+          // onComplete handled per-branch above
Also applies to: 441-451, 470-474

src/lib/ai/bias-detection/job-queue.ts (1)
75-96: Make processing mutually exclusive and update job status/metrics.

Without toggling this.processing, concurrent submit() calls can run processNext in parallel. Also, errors log job.error which is never set.

   private async processNext() {
-    if (this.processing || this.queue.length === 0) {
-      return
-    }
-    const id = this.queue.shift()!
-    const job = this.jobs.get(id)
-    if (!job) {
-      return
-    }
-    
-    try {
-      // Job processing logic would go here
-    } catch (_err: any) {
-      
-      console.error(`[JobQueue] Job failed`, { jobId: job.id, error: job.error, finishedAt: Date.now() })
-    }
-    
-    // Process next job in queue
-    if (this.queue.length > 0) {
-      this.processNext()
-    }
+    if (this.processing || this.queue.length === 0) return
+    this.processing = true
+    const id = this.queue.shift()!
+    const job = this.jobs.get(id)
+    if (!job) {
+      this.processing = false
+      if (this.queue.length > 0) this.processNext()
+      return
+    }
+    job.status = 'in_progress'
+    job.startedAt = Date.now()
+    try {
+      // Job processing logic would go here
+      job.status = 'completed'
+      job.finishedAt = Date.now()
+    } catch (_err: unknown) {
+      job.status = 'failed'
+      job.error = _err instanceof Error ? _err.message : String(_err)
+      job.finishedAt = Date.now()
+      console.error(`[JobQueue] Job failed`, { jobId: job.id, error: job.error, finishedAt: job.finishedAt })
+    } finally {
+      this.processing = false
+      if (this.queue.length > 0) this.processNext()
+    }
   }
src/components/session/MultidimensionalEmotionChart.tsx (2)
3-3: Use type-only import to actually benefit from dynamic loading.

Static runtime import pulls three into the bundle despite dynamic import.

-import * as THREE from 'three'
+import type * as THREE from 'three'
545-565: Leak: window resize listener isn’t removed; broaden disposal of non-Mesh materials/geometries.

Ensure the resize handler is removed and free GPU resources for Points, Line, Sprite, and textures.

-      window.addEventListener('resize', handleResize)
+      window.addEventListener('resize', handleResize)
+      cleanupResizeRef.current = () => {
+        window.removeEventListener('resize', handleResize)
+      }
-      if (sceneRef.current) {
-        sceneRef.current.traverse((object) => {
-          if (object instanceof THREE.Mesh) {
-            object.geometry?.dispose()
-            if (Array.isArray(object.material)) {
-              object.material.forEach((material) => material.dispose())
-            } else {
-              object.material?.dispose()
-            }
-          }
-        })
-      }
+      if (sceneRef.current) {
+        sceneRef.current.traverse((object) => {
+          // dispose geometry if present
+          // @ts-expect-error runtime guards
+          object.geometry?.dispose?.()
+          // dispose material(s) including textures for Mesh/Line/Points/Sprite
+          // @ts-expect-error runtime guards
+          const mats = Array.isArray(object.material) ? object.material : [object.material]
+          for (const m of mats) {
+            // @ts-expect-error runtime guards
+            m?.map?.dispose?.()
+            // @ts-expect-error
+            m?.dispose?.()
+          }
+        })
+      }
@@
-      // Clear object pools
-      cleanupObjectPool.clear()
+      // Clear object pools
+      cleanupObjectPool.forEach(objs => {
+        for (const obj of objs) {
+          // @ts-expect-error runtime guards
+          obj.geometry?.dispose?.()
+          // @ts-expect-error
+          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
+          for (const m of mats) {
+            // @ts-expect-error
+            m?.map?.dispose?.()
+            // @ts-expect-error
+            m?.dispose?.()
+          }
+        }
+      })
+      cleanupObjectPool.clear()
+      // Remove resize listener
+      cleanupResizeRef.current?.()
+      cleanupResizeRef.current = null
Add outside the effect (supporting snippet):

// declare near other refs
const cleanupResizeRef = useRef<null | (() => void)>(null)
Also applies to: 571-606

src/lib/utils/safe-fetch.ts (1)
54-58: Handle Request and URL inputs correctly; keep options optional to avoid breaking callers.

Request.toString() returns "[object Request]"; validate using Request.url. Also keep options optional for backward compatibility.

-export const safeFetch = async (
+export const safeFetch = async (
   url: string | URL | Request,
-  options?: RequestInit & { timeout?: number; maxResponseSize?: number },
+  options?: RequestInit & { timeout?: number; maxResponseSize?: number },
 ): Promise<Response> => {
-  const urlString = typeof url === 'string' ? url : url.toString()
+  const urlString =
+    typeof url === 'string'
+      ? url
+      : url instanceof Request
+        ? url.url
+        : url instanceof URL
+          ? url.toString()
+          : String(url)
src/lib/fhe/seal-pattern-recognition.ts (1)
32-40: Fix field name mismatch: _sealOperations vs. sealOperations.

Constructor assigns to a non-existent property; class field remains uninitialized.

 export class SealPatternRecognitionService implements FHEService {
   private sealService: SealService
-  private _sealOperations: SealOperations
+  private _sealOperations: SealOperations
@@
   constructor() {
     this.sealService = SealService.getInstance()
-    this.sealOperations = new SealOperations(this.sealService)
+    this._sealOperations = new SealOperations(this.sealService)
     this.enhancedService = createEnhancedFHEService()
   }
src/lib/ai/PixelatedEmpathyAgent.ts (1)
131-183: Fix compile-time error in JSON.parse and strengthen SSE parsing

The argument to JSON.parse is incorrectly cast to unknown, causing a TS error; also keep the parsed value as unknown while yielding.

-              try {
-                const data = JSON.parse(line.slice(6) as unknown);
-                yield data;
-              } catch {
+              try {
+                const payload = JSON.parse(line.slice(6)) as unknown
+                yield payload
+              } catch {
                 // Skip invalid JSON
               }
Optional robustness (chunk reassembly, abort signal) can be added later.

src/components/chat/MemoryAwareChatSystem.tsx (1)
71-79: Memoize getConversationSummary to avoid re-running effect every render

getConversationSummary is recreated on each render but listed as an effect dependency, causing unnecessary re-runs.

-import { useState, useEffect, useCallback } from 'react'
+import { useState, useEffect, useCallback } from 'react'
@@
-  const getConversationSummary = async () => {
+  const getConversationSummary = useCallback(async () => {
     // This is a placeholder. In a real implementation, you might call an API.
     const summary = `This has been a productive conversation about ${
       memory.stats?.totalMemories
     } topics.`;
     return summary;
-  };
+  }, [memory.stats?.totalMemories]);
@@
-  }, [messages, getConversationSummary])
+  }, [messages, getConversationSummary])
Also applies to: 80-85, 1-1

src/lib/state/enhanced-persistence.ts (2)
268-287: Use the same type guard in cleanupOldFormDrafts

Eliminate assertions and simplify the predicate.

-    Object.keys(formDrafts).forEach((key) => {
-      const draft = formDrafts[key]
-      if (
-        draft &&
-        typeof draft === 'object' &&
-        draft !== null &&
-        'timestamp' in draft &&
-        typeof (draft as Record<string, unknown>)['timestamp'] === 'number'
-      ) {
-        const draftWithTimestamp = draft as Record<string, unknown> & {
-          timestamp: number
-        }
-        if (now - ((draftWithTimestamp)['timestamp'] as number) > draftTimeout) {
-          delete formDrafts[key]
-        }
-      }
-    })
+    Object.keys(formDrafts).forEach((key) => {
+      const draft = formDrafts[key]
+      if (hasTimestamp(draft) && now - draft.timestamp > draftTimeout) {
+        delete formDrafts[key]
+      }
+    })
108-108: Fix Node/browser timer typing

NodeJS.Timeout can conflict in browser builds. Use a portable type.

-  private cleanupTimer: NodeJS.Timeout | null = null
+  private cleanupTimer: ReturnType<typeof setInterval> | null = null
src/lib/ai/crisis/CrisisSessionFlaggingService.ts (1)
171-178: Harden null checks for routingDecision/metadata

typeof null === 'object'. Null currently passes and will store nulls. Exclude null explicitly.

-      const safeRoutingDecision =
-        request.routingDecision !== undefined && typeof request.routingDecision === 'object'
-          ? request.routingDecision
-          : undefined;
+      const safeRoutingDecision =
+        request.routingDecision !== undefined &&
+        request.routingDecision !== null &&
+        typeof request.routingDecision === 'object'
+          ? request.routingDecision
+          : undefined;

-      const safeMetadata =
-        request.metadata !== undefined && typeof request.metadata === 'object' && !Array.isArray(request.metadata)
-          ? request.metadata
-          : {};
+      const safeMetadata =
+        request.metadata !== undefined &&
+        request.metadata !== null &&
+        typeof request.metadata === 'object' &&
+        !Array.isArray(request.metadata)
+          ? request.metadata
+          : {};
Also applies to: 175-177

src/components/demo/__tests__/integration/APIServiceIntegration.test.tsx (1)
1-6: Compile error: re-declaring imported identifiers (safeFetch, validateUrlForSSRF, ALLOWED_DOMAINS)

You import these names and then declare consts with the same names in the same module. This shadows imports and fails with “Identifier has already been declared.”

Fix by removing the conflicting imports (keep the local test harness), or rename locals. Minimal fix (remove imports):

-import {
-  safeFetch,
-  validateUrlForSSRF,
-} from '@/lib/utils/safe-fetch'
-import { ALLOWED_DOMAINS } from '@/lib/constants'
+// Using local test harness implementations for SSRF validation and safeFetch
Also applies to: 12-28, 34-70, 71-139, 140-159

src/lib/utils/json-validator.ts (1)
233-279: Expand nested validation; fix object-type guard in helper

Consider validating nested shapes (suicidalIdeation.present/severity enum, selfHarm.present/risk/frequency enums, arrays of { factor }, resources.crisis entries).
Current validateObjectShape accepts any truthy value for 'object' (arrays slip through). Strengthen it.
Apply to helper (outside this hunk):

-    if (typeDesc.includes('object') && !value) {
-      return { success: false, error: `${prop} must be an object` }
-    }
+    if (typeDesc.includes('object')) {
+      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
+        return { success: false, error: `${prop} must be a non-null object` }
+      }
+    }
Optional nested checks here:

// suicidalIdeation
const si = data.assessment.suicidalIdeation as Record<string, unknown>
if (typeof si.present !== 'boolean') return { success: false, error: 'assessment.suicidalIdeation.present must be boolean' }
const SI_SEV = ['with_intent','with_plan','active','passive','none'] as const
if (!SI_SEV.includes(si.severity as any)) return { success: false, error: 'assessment.suicidalIdeation.severity has invalid value' }

// selfHarm
const sh = data.assessment.selfHarm as Record<string, unknown>
if (typeof sh.present !== 'boolean') return { success: false, error: 'assessment.selfHarm.present must be boolean' }
const SH_RISK = ['high','moderate','low'] as const
const SH_FREQ = ['daily','frequent','occasional','rare','none'] as const
if (!SH_RISK.includes(sh.risk as any)) return { success: false, error: 'assessment.selfHarm.risk has invalid value' }
if (!SH_FREQ.includes(sh.frequency as any)) return { success: false, error: 'assessment.selfHarm.frequency has invalid value' }

// risk/protective factors arrays of objects with { factor: string }
for (const [name, arr] of [['riskFactors', data.riskFactors], ['protectiveFactors', data.protectiveFactors]] as const) {
  for (let i = 0; i < (arr as unknown[]).length; i++) {
    const item = (arr as unknown[])[i] as Record<string, unknown>
    if (!item || typeof item !== 'object' || typeof item.factor !== 'string') {
      return { success: false, error: `${name}[${i}].factor must be a string` }
    }
  }
}
src/services/mongodb.dao.ts (4)
103-110: findOneAndUpdate return handling is incorrect (use .value).

MongoDB driver returns a wrapper object with a value property. Spreading result will not yield the document and _id will be undefined.

Apply:

-    const result = await collection.findOneAndUpdate(
+    const { value } = await collection.findOneAndUpdate(
       { _id: new ObjectId(id) },
       { $set: { ...safeUpdates, updatedAt: new Date() } },
       { returnDocument: 'after' },
     )
-
-    return result ? { ...result, id: result._id?.toString() } : null
+    return value ? { ...value, id: value._id?.toString() } : null
280-287: findOneAndUpdate return handling is incorrect here as well.

-    const result = await collection.findOneAndUpdate(
+    const { value } = await collection.findOneAndUpdate(
       { _id: new ObjectId(id) },
       { $set: { ...safeUpdates, updatedAt: new Date() } },
       { returnDocument: 'after' },
     )
-
-    return result ? { ...result, id: result._id?.toString() } : null
+    return value ? { ...value, id: value._id?.toString() } : null
337-350: findOneAndUpdate return handling is incorrect in resolveFlag.

-    const result = await collection.findOneAndUpdate(
+    const { value } = await collection.findOneAndUpdate(
       { _id: new ObjectId(id) },
       {
         $set: {
           resolved: true,
           resolvedAt: new Date(),
           resolvedBy: new ObjectId(resolvedBy),
         },
       },
       { returnDocument: 'after' },
     )
-
-    return result ? { ...result, id: result._id?.toString() } : null
+    return value ? { ...value, id: value._id?.toString() } : null
408-419: findOneAndUpdate return handling is incorrect in updateConsent.

-    const result = await collection.findOneAndUpdate(
+    const { value } = await collection.findOneAndUpdate(
       { userId: new ObjectId(userId), consentType },
       { $set: updateData },
       { upsert: true, returnDocument: 'after' },
     )
-
-    if (!result) {
+    if (!value) {
       throw new Error('Failed to update consent')
     }
-
-    return { ...result, id: result._id?.toString() }
+    return { ...value, id: value._id?.toString() }
src/lib/auth/azure-supabase-integration.ts (2)
318-331: findOneAndUpdate return handling is incorrect (use .value).

You treat the wrapper as the document. Use the value property and re-check null.

-      const mongoUser = await usersCollection.findOneAndUpdate(
+      const { value: mongoUser } = await usersCollection.findOneAndUpdate(
         { azure_id: azureUser.id },
         {
           $set: {
             metadata: {
               azureAD: azureUser,
               lastLogin: new Date().toISOString(),
               provider: 'azure-ad',
             },
             updatedAt: new Date(),
           }
         },
         { returnDocument: 'after' }
       )
383-391: Avoid passing undefined in MongoDB filter; guard invalid userId early.

If userId is invalid, current code builds { _id: undefined }. Skip the update and log a warning instead.

-      await usersCollection.updateOne(
-        { _id: isValidObjectId(userId) ? new ObjectId(userId) : undefined },
-        {
-          $set: {
-            'metadata.lastLogout': new Date().toISOString(),
-            updatedAt: new Date(),
-          }
-        }
-      )
+      if (isValidObjectId(userId)) {
+        await usersCollection.updateOne(
+          { _id: new ObjectId(userId) },
+          {
+            $set: {
+              'metadata.lastLogout': new Date().toISOString(),
+              updatedAt: new Date(),
+            }
+          }
+        )
+      } else {
+        logger.warn('Skipping logout metadata update due to invalid userId', { userId })
+      }
src/services/mongoAuth.service.ts (1)
61-63: Never default JWT_SECRET; fail fast if missing.

Hardcoding a fallback secret is a critical security risk. Require JWT_SECRET to be set.

-export class MongoAuthService {
-  private readonly JWT_SECRET: string = process.env['JWT_SECRET'] || 'your-secret-key'
-  private readonly JWT_EXPIRES_IN: string = process.env['JWT_EXPIRES_IN'] || '7d'
+export class MongoAuthService {
+  private readonly JWT_SECRET: string = (() => {
+    const v = process.env['JWT_SECRET']
+    if (!v) throw new Error('JWT_SECRET must be configured')
+    return v
+  })()
+  private readonly JWT_EXPIRES_IN: string = process.env['JWT_EXPIRES_IN'] || '7d'
src/utils/auth.ts (1)
129-154: Placeholder auth verification is unsafe—implement real JWT verification with custom errors

The current implementation accepts any Bearer token without verification and returns a mock user. This is a production-blocking security issue.

Apply this diff to harden verification and header parsing:

 export async function verifyAuthToken(
   authHeader: string | null,
 ): Promise<AuthInfo> {
-  if (!authHeader || !authHeader.startsWith('Bearer ')) {
-    throw new Error('Invalid or missing authorization token')
-  }
-
-  const token = authHeader.split(' ')[1]
-
-  // Here you would typically verify the token against a secret,
-  // check its expiration, and decode it to get user information.
-  // For this example, we'll return a mock AuthInfo object.
-  // Replace this with your actual implementation.
-
-  // Example of what you might get from a decoded JWT
-  const decodedPayload = {
-    userId: 'mock-user-id',
-    role: 'user' as const,
-  }
-
-  return {
-    userId: decodedPayload.userId,
-    role: decodedPayload.role,
-    session: token ?? '',
-  }
+  if (!authHeader) {
+    throw new AuthError('Missing Authorization header', 'MALFORMED_AUTH_HEADER')
+  }
+
+  const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim())
+  if (!match) {
+    throw new AuthError('Malformed Authorization header', 'MALFORMED_AUTH_HEADER')
+  }
+  const token = match[1]
+
+  const secret = process.env.JWT_SECRET
+  if (!secret) {
+    throw new AuthError('Server misconfiguration: JWT_SECRET is unset', 'CONFIG_ERROR', 500)
+  }
+
+  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
+
+  const role = payload.role
+  if (!isRole(role)) {
+    throw new AuthError('Invalid role in token', 'INVALID_TOKEN')
+  }
+  const userId = typeof payload.sub === 'string' ? payload.sub : ''
+
+  return { userId, role, session: token }
 }
Add these supporting types/imports once (top-level):

import { jwtVerify } from 'jose'

export type AuthErrorCode = 'MALFORMED_AUTH_HEADER' | 'INVALID_TOKEN' | 'CONFIG_ERROR'

export class AuthError extends Error {
  constructor(message: string, public code: AuthErrorCode, public status = 401) {
    super(message)
    this.name = 'AuthError'
  }
}

const isRole = (x: unknown): x is Role =>
  x === 'admin' || x === 'user' || x === 'therapist'
I can wire this to your existing error middleware and add unit tests (valid/expired/invalid signature, wrong role, missing header). Want me to push a patch?