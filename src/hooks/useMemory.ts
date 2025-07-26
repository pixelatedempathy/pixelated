import { useState, useEffect, useCallback } from 'react'
import {
  memoryManager,
  type MemoryEntry,
  type SearchOptions,
  type MemoryStats,
} from '@/lib/memory/memory-client'

interface UseMemoryOptions {
  userId?: string
  autoLoad?: boolean
  category?: string
}

interface UseMemoryReturn {
  memories: MemoryEntry[]
  isLoading: boolean
  error: string | null
  stats: MemoryStats | null

  // Core operations
  addMemory: (
    content: string,
    metadata?: MemoryEntry['metadata'],
  ) => Promise<string>
  searchMemories: (
    query: string,
    options?: Partial<SearchOptions>,
  ) => Promise<MemoryEntry[]>
  updateMemory: (memoryId: string, content: string) => Promise<void>
  deleteMemory: (memoryId: string) => Promise<void>
  refreshMemories: () => Promise<void>

  // Convenience methods
  addUserPreference: (preference: string, value: unknown) => Promise<void>
  addConversationContext: (context: string, sessionId?: string) => Promise<void>
  addProjectInfo: (projectInfo: string, projectId?: string) => Promise<void>

  // Search methods
  searchByCategory: (category: string) => Promise<MemoryEntry[]>
  searchByTags: (tags: string[]) => Promise<MemoryEntry[]>

  // Memory management
  clearMemories: () => void
  getMemoryHistory: () => Promise<MemoryHistoryItem[]>
}

// Define a type for memory history items
interface MemoryHistoryItem {
  id: string
  timestamp: string
  operation: string
  memoryId: string
  content?: string
  metadata?: Record<string, unknown>
}

export function useMemory(options: UseMemoryOptions = {}): UseMemoryReturn {
  const { userId = 'default', autoLoad = true, category } = options

  const [memories, setMemories] = useState<MemoryEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<MemoryStats | null>(null)

  const handleError = useCallback((err: Error | unknown) => {
    const errorMessage =
      err instanceof Error ? err.message : 'An unknown error occurred'
    setError(errorMessage)
    console.error('Memory operation error:', err)
  }, [])

  const refreshMemories = useCallback(async () => {
    if (!userId) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      let fetchedMemories: MemoryEntry[]

      if (category) {
        fetchedMemories = await memoryManager.searchByCategory(category, userId)
      } else {
        fetchedMemories = await memoryManager.getAllMemories(userId)
      }

      setMemories(fetchedMemories)

      // Update stats
      const memoryStats = await memoryManager.getMemoryStats(userId)
      setStats(memoryStats)
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }, [userId, category, handleError])

  const addMemory = useCallback(
    async (
      content: string,
      metadata?: MemoryEntry['metadata'],
    ): Promise<string> => {
      setError(null)

      try {
        const memoryId = await memoryManager.addMemory(
          {
            content,
            metadata: {
              ...metadata,
              role: metadata?.role || 'user',
              category: metadata?.category || category || 'general',
              userId,
            },
          },
          userId,
        )

        // Refresh memories to include the new one
        await refreshMemories()

        return memoryId
      } catch (err) {
        handleError(err)
        throw err
      }
    },
    [userId, category, refreshMemories, handleError],
  )

  const searchMemories = useCallback(
    async (
      query: string,
      searchOptions?: Partial<SearchOptions>,
    ): Promise<MemoryEntry[]> => {
      setError(null)

      try {
        return await memoryManager.searchMemories({
                  query,
                  userId,
                  category,
                  limit: 10,
                  ...searchOptions,
                });
      } catch (err) {
        handleError(err)
        return []
      }
    },
    [userId, category, handleError],
  )

  const updateMemory = useCallback(
    async (memoryId: string, content: string): Promise<void> => {
      setError(null)

      try {
        await memoryManager.updateMemory(memoryId, content, userId)
        await refreshMemories()
      } catch (err) {
        handleError(err)
        throw err
      }
    },
    [userId, refreshMemories, handleError],
  )

  const deleteMemory = useCallback(
    async (memoryId: string): Promise<void> => {
      setError(null)

      try {
        await memoryManager.deleteMemory(memoryId, userId)
        await refreshMemories()
      } catch (err) {
        handleError(err)
        throw err
      }
    },
    [userId, refreshMemories, handleError],
  )

  const addUserPreference = useCallback(
    async (preference: string, value: string | number | boolean | object): Promise<void> => {
      await memoryManager.addUserPreference(userId, preference, value)
      await refreshMemories()
    },
    [userId, refreshMemories],
  )

  const addConversationContext = useCallback(
    async (context: string, sessionId?: string): Promise<void> => {
      await memoryManager.addConversationContext(userId, context, sessionId)
      await refreshMemories()
    },
    [userId, refreshMemories],
  )

  const addProjectInfo = useCallback(
    async (projectInfo: string, projectId?: string): Promise<void> => {
      await memoryManager.addProjectInfo(userId, projectInfo, projectId)
      await refreshMemories()
    },
    [userId, refreshMemories],
  )

  const searchByCategory = useCallback(
    async (searchCategory: string): Promise<MemoryEntry[]> => {
      try {
        return await memoryManager.searchByCategory(searchCategory, userId)
      } catch (err) {
        handleError(err)
        return []
      }
    },
    [userId, handleError],
  )

  const searchByTags = useCallback(
    async (tags: string[]): Promise<MemoryEntry[]> => {
      try {
        return await memoryManager.searchByTags(tags, userId)
      } catch (err) {
        handleError(err)
        return []
      }
    },
    [userId, handleError],
  )

  const clearMemories = useCallback(() => {
    setMemories([])
    setStats(null)
    setError(null)
  }, [])

  const getMemoryHistory = useCallback(async (): Promise<MemoryHistoryItem[]> => {
    try {
      return await memoryManager.getMemoryHistory(userId)
    } catch (err) {
      handleError(err)
      return []
    }
  }, [userId, handleError])

  // Auto-load memories on mount or when dependencies change
  useEffect(() => {
    if (autoLoad && userId) {
      refreshMemories()
    }
  }, [autoLoad, userId, refreshMemories])

  return {
    memories,
    isLoading,
    error,
    stats,

    // Core operations
    addMemory,
    searchMemories,
    updateMemory,
    deleteMemory,
    refreshMemories,

    // Convenience methods
    addUserPreference,
    addConversationContext,
    addProjectInfo,

    // Search methods
    searchByCategory,
    searchByTags,

    // Memory management
    clearMemories,
    getMemoryHistory,
  }
}

// Hook for conversation memory management
export function useConversationMemory(userId: string, sessionId?: string) {
  const memory = useMemory({
    userId,
    category: 'conversation',
    autoLoad: true,
  })

  const addMessage = useCallback(
    async (message: string, role: 'user' | 'assistant' = 'user') => {
      const content = `${role}: ${message}`
      await memory.addMemory(content, {
        category: 'conversation',
        tags: ['chat-message', role],
        ...(sessionId && { sessionId }),
        timestamp: new Date().toISOString(),
        role,
      })
    },
    [memory, sessionId],
  )

  const getConversationHistory = useCallback(async () => {
    if (sessionId) {
      return memory.memories.filter((m) => m.metadata?.sessionId === sessionId)
    }
    return memory.memories
  }, [memory.memories, sessionId])

  return {
    ...memory,
    addMessage,
    getConversationHistory,
  }
}

// Hook for user preferences memory
export function useUserPreferences(userId: string) {
  const memory = useMemory({
    userId,
    category: 'preference',
    autoLoad: true,
  })

  const setPreference = useCallback(
    async (key: string, value: unknown) => {
      const existingPref = memory.memories.find((m) =>
        m.content.includes(`User preference: ${key}`),
      )

      if (existingPref?.id) {
        await memory.updateMemory(
          existingPref.id,
          `User preference: ${key} = ${JSON.stringify(value)}`,
        )
      } else {
        await memory.addUserPreference(key, value)
      }
    },
    [memory],
  )

  const getPreference = useCallback(
    (key: string): string | number | boolean | object | null => {
      const prefMemory = memory.memories.find((m) =>
        m.content.includes(`User preference: ${key}`),
      )

      if (prefMemory) {
        try {
          const match = prefMemory.content.match(/= (.+)$/)
          return match && match[1] ? JSON.parse(match[1]) : null
        } catch {
          return null
        }
      }

      return null
    },
    [memory.memories],
  )

  const removePreference = useCallback(
    async (key: string) => {
      const prefMemory = memory.memories.find((m) =>
        m.content.includes(`User preference: ${key}`),
      )

      if (prefMemory?.id) {
        await memory.deleteMemory(prefMemory.id)
      }
    },
    [memory],
  )

  return {
    ...memory,
    setPreference,
    getPreference,
    removePreference,
  }
}
