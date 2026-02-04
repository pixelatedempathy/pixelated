/**
 * @file useConversationMemory.ts
 * @module hooks/useConversationMemory
 * @description
 *   Provides a modular React hook for managing conversational session state, history, and progress metrics
 *   in the Pixelated Empathy dashboard. This hook composes session timing, progress/milestone, and message
 *   management logic into a single, ergonomic API for therapist-client chat and analytics.
 *
 *   - Session timing and metrics logic is delegated to `useSessionTimingMetrics`.
 *   - Progress and milestone logic is delegated to `useSessionProgressMilestones`.
 *   - Message and session state logic is managed locally and integrated with the above.
 *
 *   All state is strictly typed and designed for extensibility and testability.
 *
 *   Usage:
 *     const {
 *       memory, progress, progressSnapshots, progressMetrics,
 *       addMessage, setSessionState, setProgress, addProgressSnapshot,
 *       updateSkillScore, updateConversationFlow, addMilestone, resetSession, setMemory
 *     } = useConversationMemory();
 */

// Session timing/metrics logic (active/idle/paused/ended spans, durations, etc.)
// Progress and milestone tracking (progress %, skill scores, milestones, etc.)
<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react'
import { useSessionTimingMetrics } from './useSessionTimingMetrics'
=======
<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react'
import { useSessionTimingMetrics } from './useSessionTimingMetrics'
=======
import { useState, useRef, useEffect, useCallback } from 'react'
>>>>>>> origin/master
>>>>>>> origin/master
import { useSessionProgressMilestones } from './useSessionProgressMilestones'
import type { SessionProgressMetrics } from '@/types/dashboard'

/**
 * Represents the conversational memory state for a session.
 * - `history`: Array of chat messages with role and message.
 * - `context`: Arbitrary session context (e.g., topic, metadata).
 * - `sessionState`: Current session state ('idle', 'active', 'paused', 'ended').
 */
interface ConversationMemory {
  history: Array<{ role: 'therapist' | 'client'; message: string }>
  // Prefer unknown to any for safety; callers can cast if they know the shape.
  context: Record<string, unknown>
  sessionState: 'idle' | 'active' | 'paused' | 'ended'
}

/**
 * Internal memory state used by timing and progress hooks. Extends ConversationMemory
 * with progress-related fields expected by `useSessionTimingMetrics`.
 */
interface MemoryState extends ConversationMemory {
  progress: number
  progressSnapshots: Array<{ timestamp: string; value: number }>
  progressMetrics: SessionProgressMetrics
}

/**
 * React hook for managing conversational session memory, progress, and metrics.
 *
 * @param initialState - Optional initial state for memory, progress, and metrics.
 * @returns Object containing:
 *   - memory: ConversationMemory (history, context, sessionState)
 *   - progress: number (current progress %)
 *   - progressSnapshots: Array of progress snapshots
 *   - progressMetrics: SessionProgressMetrics (message counts, response time, etc.)
 *   - addMessage: (role, message) => void (add chat message and update metrics)
 *   - setSessionState: (state) => void (update session state and metrics)
 *   - setProgress, addProgressSnapshot, updateSkillScore, updateConversationFlow, addMilestone, resetSession, setMemory: utility functions
 *
 * Usage:
 *   const {
 *     memory, progress, progressSnapshots, progressMetrics,
 *     addMessage, setSessionState, setProgress, addProgressSnapshot,
 *     updateSkillScore, updateConversationFlow, addMilestone, resetSession, setMemory
 *   } = useConversationMemory();
 */
const DEFAULT_MEMORY = {
  history: [],
  context: {},
  sessionState: 'idle' as const,
  progress: 0,
  progressSnapshots: [] as Array<{ timestamp: string; value: number }>,
  progressMetrics: {
    totalMessages: 0,
    therapistMessages: 0,
    clientMessages: 0,
    responsesCount: 0,
    sessionDuration: 0,
    activeTime: 0,
    skillScores: {},
    responseTime: 0,
    conversationFlow: 0,
    milestonesReached: [],
    lastMilestoneTime: undefined,
  } as SessionProgressMetrics,
} as const

export function useConversationMemory(initialState?: Partial<MemoryState>) {
<<<<<<< HEAD
  const [memory, setMemory] = useState<MemoryState>({
    ...DEFAULT_MEMORY,
    ...initialState,
  } as MemoryState)
<<<<<<< HEAD
=======
=======
  // Base memory state for history, context, and basic session state
  const [baseMemory, setBaseMemory] = useState<ConversationMemory>({
    history: initialState?.history ?? DEFAULT_MEMORY.history,
    context: initialState?.context ?? DEFAULT_MEMORY.context,
    sessionState: initialState?.sessionState ?? DEFAULT_MEMORY.sessionState,
  })
>>>>>>> origin/master
>>>>>>> origin/master

  // Extracted session timing and metrics logic
  const sessionStartTimeRef = useRef<number>(Date.now())
  const lastActiveTimeRef = useRef<number>(Date.now())
  // Lazily track the timestamp of the last message. Start as null so the initial
  // mount -> first-message interval isn't treated as a response time.
  const lastMessageTimeRef = useRef<number | null>(null)

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
  useSessionTimingMetrics(
    memory.sessionState,
    setMemory,
    sessionStartTimeRef,
    lastActiveTimeRef,
  )

=======
>>>>>>> origin/master
  // Progress/milestone logic extracted to hook
  const {
    progress,
    progressSnapshots,
    progressMetrics,
    setProgress,
    addProgressSnapshot,
    updateSkillScore,
    updateConversationFlow,
    addMilestone,
    resetProgress,
    setProgressState,
  } = useSessionProgressMilestones({
    progress: initialState?.progress,
    progressSnapshots: initialState?.progressSnapshots,
    progressMetrics: initialState?.progressMetrics,
  })

<<<<<<< HEAD
  /**
   * Adds a new message to the conversation history and updates progress metrics.
   * - Increments message counts for therapist/client.
   * - Updates running average response time.
   * - Updates last message timestamp.
   */
  const addMessage = (role: 'therapist' | 'client', message: string) => {
    const currentTime = Date.now()
    // If there's no previous message recorded, skip response-time calculation so
    // the first message doesn't produce a skewed response time.
<<<<<<< HEAD
    const responseTime =
      lastMessageTimeRef.current === null
        ? null
        : (currentTime - lastMessageTimeRef.current) / 1000 // in seconds
=======
=======
  // Actually, useSessionTimingMetrics is very simple, we can just inline its logic or update it.
  // Given we can't easily change useSessionTimingMetrics without affecting other things,
  // let's just inline the active time update effect here for clarity and correct state management.
>>>>>>> origin/master

  useEffect(() => {
    if (baseMemory.sessionState !== 'active') {
      return
    }

    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - sessionStartTimeRef.current) / 1000)
      const additionalActive = Math.floor((Date.now() - lastActiveTimeRef.current) / 1000)

      setProgressState((prev: any) => ({
        progressMetrics: {
          ...prev.progressMetrics,
          sessionDuration: duration,
          activeTime: (prev.progressMetrics.activeTime ?? 0) + additionalActive
        }
      }))

      lastActiveTimeRef.current = Date.now()
    }, 1000)

    return () => clearInterval(interval)
  }, [baseMemory.sessionState, setProgressState])

  /**
   * Adds a new message to the conversation history and updates progress metrics.
   */
  const addMessage = useCallback((role: 'therapist' | 'client', message: string) => {
    const currentTime = Date.now()
>>>>>>> origin/master
    const responseTime =
      lastMessageTimeRef.current === null
        ? null
        : (currentTime - lastMessageTimeRef.current) / 1000 // in seconds

<<<<<<< HEAD
    setMemory((prev) => ({
=======
    setBaseMemory((prev) => ({
>>>>>>> origin/master
      ...prev,
      history: [...prev.history, { role, message }],
    }))

<<<<<<< HEAD
    // Use the latest progressMetrics snapshot from the hook state rather than
    // capturing a possibly-stale outer variable. This avoids race conditions
    // when multiple callers update metrics in quick succession.
    setProgressState((prevState: any) => {
      const prevMetrics =
        prevState?.progressMetrics ??
        (DEFAULT_MEMORY.progressMetrics as typeof prevState.progressMetrics)
<<<<<<< HEAD
=======
=======
    setProgressState((prevState: any) => {
      const prevMetrics =
        prevState?.progressMetrics ??
        (DEFAULT_MEMORY.progressMetrics as SessionProgressMetrics)
>>>>>>> origin/master
>>>>>>> origin/master
      const prevResponses = (prevMetrics.responsesCount ?? 0) as number
      const prevAvg = (prevMetrics.responseTime ?? 0) as number

      const updatedMetrics = {
        ...prevMetrics,
        totalMessages: (prevMetrics.totalMessages ?? 0) + 1,
        therapistMessages:
          role === 'therapist'
            ? (prevMetrics.therapistMessages ?? 0) + 1
            : (prevMetrics.therapistMessages ?? 0),
        clientMessages:
          role === 'client'
            ? (prevMetrics.clientMessages ?? 0) + 1
            : (prevMetrics.clientMessages ?? 0),
<<<<<<< HEAD
      } as typeof prevMetrics
=======
<<<<<<< HEAD
      } as typeof prevMetrics
=======
      } as SessionProgressMetrics
>>>>>>> origin/master
>>>>>>> origin/master

      if (responseTime !== null) {
        const newResponses = prevResponses + 1
        const newAvg = (prevAvg * prevResponses + responseTime) / newResponses
        updatedMetrics.responseTime = newAvg
        updatedMetrics.responsesCount = newResponses
      }

      return { progressMetrics: updatedMetrics }
    })

<<<<<<< HEAD
    // Record the timestamp for subsequent messages
    lastMessageTimeRef.current = currentTime
  }

  /**
   * Updates the session state and synchronizes timing/metrics.
   * - Handles transitions: idle→active, active→ended, active→paused.
   * - Flushes active time and session duration as needed.
   */
  const setSessionState = (state: ConversationMemory['sessionState']) => {
    const prevState = memory.sessionState ?? 'idle'

    // Transition: non-active → active (immediate start)
    if (state === 'active' && prevState !== 'active') {
      lastActiveTimeRef.current = Date.now()
      setMemory((prev) => ({ ...prev, sessionState: state }))
      setProgressState({ progressMetrics: { ...progressMetrics } })
      return
    }

    // Transition: active → paused (flush active time)
    if (prevState === 'active' && state === 'paused') {
      const now = Date.now()
      const elapsed = Math.floor((now - lastActiveTimeRef.current) / 1000)
      setMemory((prev) => ({ ...prev, sessionState: state }))
      setProgressState({
        progressMetrics: {
          ...progressMetrics,
          activeTime: (progressMetrics.activeTime ?? 0) + elapsed,
        },
      })
      return
    }

    // Transition: active → ended (flush active time and set session duration)
    if (prevState === 'active' && state === 'ended') {
      const now = Date.now()
      const elapsed = Math.floor((now - lastActiveTimeRef.current) / 1000)
      setMemory((prev) => ({ ...prev, sessionState: state }))
      setProgressState({
        progressMetrics: {
          ...progressMetrics,
          activeTime: (progressMetrics.activeTime ?? 0) + elapsed,
          sessionDuration: Math.floor(
            (now - sessionStartTimeRef.current) / 1000,
          ),
        },
      })
      return
    }

    // Default: other transitions simply update state and keep metrics as-is
    setMemory((prev) => ({ ...prev, sessionState: state }))
    setProgressState({ progressMetrics: { ...progressMetrics } })
  }

  const resetSession = () => {
    sessionStartTimeRef.current = Date.now()
    lastActiveTimeRef.current = Date.now()
    // Clear lastMessageTime so the next message is treated as the first.
    // This ensures first-sample behavior is preserved after reset.
    lastMessageTimeRef.current = null
    setMemory((prev) => ({
      ...prev,
      history: [],
      context: {},
      sessionState: 'idle',
    }))

    resetProgress()
  }

  // Update session duration / active time every second only while active
  useEffect(() => {
    if (memory.sessionState !== 'active') {
      return
    }

    const interval = setInterval(() => {
      setMemory((prev) => ({
        ...prev,
        progressMetrics: {
          ...prev.progressMetrics,
          sessionDuration: Math.floor(
            (Date.now() - sessionStartTimeRef.current) / 1000,
          ),
          activeTime:
            (prev.progressMetrics.activeTime ?? 0) +
            Math.floor((Date.now() - lastActiveTimeRef.current) / 1000),
        },
      }))
      lastActiveTimeRef.current = Date.now()
    }, 1000)

    return () => clearInterval(interval)
  }, [memory.sessionState])

  return {
    memory,
=======
    lastMessageTimeRef.current = currentTime
  }, [setProgressState])

  /**
   * Updates the session state and synchronizes timing/metrics.
   */
  const setSessionState = useCallback((state: ConversationMemory['sessionState']) => {
    const prevState = baseMemory.sessionState

    setBaseMemory((prev) => ({ ...prev, sessionState: state }))

    if (state === 'active' && prevState !== 'active') {
      lastActiveTimeRef.current = Date.now()
    } else if (prevState === 'active' && (state === 'paused' || state === 'ended')) {
      const now = Date.now()
      const elapsed = Math.floor((now - lastActiveTimeRef.current) / 1000)

      const metricsUpdate: Partial<SessionProgressMetrics> = {
        activeTime: (progressMetrics.activeTime ?? 0) + elapsed,
      }

      if (state === 'ended') {
        metricsUpdate.sessionDuration = Math.floor((now - sessionStartTimeRef.current) / 1000)
      }

      setProgressState({
        progressMetrics: {
          ...progressMetrics,
          ...metricsUpdate
        }
      })
    }
  }, [baseMemory.sessionState, progressMetrics, setProgressState])

  const resetSession = useCallback(() => {
    sessionStartTimeRef.current = Date.now()
    lastActiveTimeRef.current = Date.now()
    lastMessageTimeRef.current = null
    setBaseMemory({
      history: [],
      context: {},
      sessionState: 'idle',
    })
    resetProgress()
  }, [resetProgress])

  // Combined memory object that satisfies the MemoryState interface
  const consolidatedMemory = {
    ...baseMemory,
    progress,
    progressSnapshots,
    progressMetrics,
  }

  return {
    memory: consolidatedMemory,
>>>>>>> origin/master
    progress,
    progressSnapshots,
    progressMetrics,
    addMessage,
    setSessionState,
    setProgress,
    addProgressSnapshot,
    updateSkillScore,
    updateConversationFlow,
    addMilestone,
    resetSession,
<<<<<<< HEAD
    setMemory,
<<<<<<< HEAD
=======
=======
    setMemory: setBaseMemory,
>>>>>>> origin/master
>>>>>>> origin/master
  }
}
