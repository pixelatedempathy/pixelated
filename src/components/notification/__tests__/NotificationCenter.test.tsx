import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fireEvent, render, screen, act } from '@testing-library/react'
import { NotificationCenter } from '../NotificationCenter'
import { useWebSocket } from '@/hooks/useWebSocket'
import { NotificationStatus } from '@/lib/services/notification/NotificationService'

// Mock useWebSocket hook
vi.mock('@/hooks/useWebSocket', () => ({
  useWebSocket: vi.fn(),
}))

describe('notificationCenter', () => {
  const mockSendMessage = vi.fn()
  let mockOnMessage: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockOnMessage = null

    vi.mocked(useWebSocket).mockImplementation(({ onMessage }) => {
      mockOnMessage = onMessage
      return {
        isConnected: true,
        sendMessage: mockSendMessage,
        error: null,
        sendStatus: vi.fn(),
      }
    })
  })

  it('renders notification button with no unread count initially', () => {
    render(<NotificationCenter />)

    expect(screen.getByRole('button', { name: /toggle notifications/i })).toBeInTheDocument()
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument()
  })

  it('displays unread count badge when there are unread notifications', () => {
    render(<NotificationCenter />)

    // Simulate receiving unread count
    // The component expects a ChatMessage where content is JSON string
    act(() => {
      if (mockOnMessage) {
        mockOnMessage({
          role: 'system',
          content: JSON.stringify({ type: 'unreadCount', count: 5 }),
        })
      }
    })

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('opens notification panel on button click', () => {
    render(<NotificationCenter />)

    const triggerButton = screen.getByRole('button', { name: /toggle notifications/i })
    fireEvent.click(triggerButton)
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('displays notifications when they are received', () => {
    render(<NotificationCenter />)

    // Simulate receiving notifications
    act(() => {
      if (mockOnMessage) {
        mockOnMessage({
          role: 'system',
          content: JSON.stringify({
            type: 'notifications',
            data: [
              {
                id: '1',
                title: 'Test Notification',
                body: 'This is a test notification',
                createdAt: Date.now(),
                status: NotificationStatus.PENDING,
              }
            ]
          }),
        })
      }
    })

    const triggerButton = screen.getByRole('button', { name: /toggle notifications/i })
    fireEvent.click(triggerButton)

    expect(screen.getByText('Test Notification')).toBeInTheDocument()
  })

  it('marks notification as read when clicking check button', () => {
    render(<NotificationCenter />)

    act(() => {
      if (mockOnMessage) {
        mockOnMessage({
          role: 'system',
          content: JSON.stringify({
            type: 'notifications',
            data: [
              {
                id: '1',
                title: 'Test',
                body: 'Body',
                createdAt: Date.now(),
                status: NotificationStatus.PENDING,
              }
            ]
          }),
        })
      }
    })

    fireEvent.click(screen.getByRole('button', { name: /toggle notifications/i }))

    const checkButton = screen.getByLabelText('Mark as read')
    fireEvent.click(checkButton)

    expect(mockSendMessage).toHaveBeenCalledWith(expect.objectContaining({
      content: JSON.stringify({ type: 'mark_read', notificationId: '1' }),
    }))
  })

  it('dismisses notification when clicking dismiss button', () => {
    render(<NotificationCenter />)

    act(() => {
      if (mockOnMessage) {
        mockOnMessage({
          role: 'system',
          content: JSON.stringify({
            type: 'notifications',
            data: [
              {
                id: '1',
                title: 'Test',
                body: 'Body',
                createdAt: Date.now(),
                status: NotificationStatus.PENDING,
              }
            ]
          }),
        })
      }
    })

    fireEvent.click(screen.getByRole('button', { name: /toggle notifications/i }))

    const dismissButton = screen.getByLabelText('Dismiss notification')
    fireEvent.click(dismissButton)

    expect(mockSendMessage).toHaveBeenCalledWith(expect.objectContaining({
      content: JSON.stringify({ type: 'dismiss', notificationId: '1' }),
    }))
  })

  it('closes notification panel when clicking close button', () => {
    render(<NotificationCenter />)

    fireEvent.click(screen.getByRole('button', { name: /toggle notifications/i }))

    const closeButton = screen.getByLabelText('Close notifications')
    fireEvent.click(closeButton)

    expect(screen.queryByText('Notifications')).not.toBeInTheDocument()
  })
})
