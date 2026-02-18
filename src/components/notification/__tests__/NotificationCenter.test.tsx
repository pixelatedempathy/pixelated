import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fireEvent, render, screen, cleanup, act } from '@testing-library/react'
import { NotificationCenter } from '../NotificationCenter'
import { useWebSocket } from '@/hooks/useWebSocket'
import { NotificationStatus } from '@/lib/services/notification/NotificationService'

// Mock useWebSocket hook
vi.mock('@/hooks/useWebSocket', () => ({
  useWebSocket: vi.fn(),
}))

describe('notificationCenter', () => {
  let capturedOnMessage: ((message: any) => void) | undefined

  beforeEach(() => {
    vi.clearAllMocks()
    capturedOnMessage = undefined

    vi.mocked(useWebSocket).mockImplementation(({ onMessage }) => {
      capturedOnMessage = onMessage
      return {
        isConnected: true,
        error: null,
        sendMessage: vi.fn(),
        sendStatus: vi.fn(),
      }
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('renders notification button with no unread count', () => {
    render(<NotificationCenter />)
    const bellButton = screen.getByRole('button')
    expect(bellButton).toBeInTheDocument()
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument()
  })

  it('displays unread count badge when there are unread notifications', () => {
    render(<NotificationCenter />)

    act(() => {
      if (capturedOnMessage) {
        capturedOnMessage({
          content: JSON.stringify({ type: 'unreadCount', count: 5 })
        })
      }
    })

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('opens notification panel on button click', () => {
    render(<NotificationCenter />)

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('displays empty state when there are no notifications', () => {
    render(<NotificationCenter />)

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('No notifications')).toBeInTheDocument()
  })

  it('displays notifications when they are received', () => {
    render(<NotificationCenter />)

    act(() => {
      if (capturedOnMessage) {
        capturedOnMessage({
          content: JSON.stringify({
            type: 'notifications',
            data: [
              {
                id: '1',
                title: 'Test Notification',
                body: 'This is a test notification',
                status: NotificationStatus.PENDING,
                createdAt: Date.now(),
              }
            ]
          })
        })
      }
    })

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByText('Test Notification')).toBeInTheDocument()
    expect(screen.getByText('This is a test notification')).toBeInTheDocument()
  })

  it('marks notification as read when clicking check button', async () => {
    const mockSendMessage = vi.fn()
    vi.mocked(useWebSocket).mockImplementation(({ onMessage }) => {
      capturedOnMessage = onMessage
      return {
        isConnected: true,
        error: null,
        sendMessage: mockSendMessage,
        sendStatus: vi.fn(),
      }
    })

    render(<NotificationCenter />)

    act(() => {
      if (capturedOnMessage) {
        capturedOnMessage({
          content: JSON.stringify({
            type: 'notifications',
            data: [
              {
                id: '1',
                title: 'Test Notification',
                body: 'This is a test notification',
                status: NotificationStatus.PENDING,
                createdAt: Date.now(),
              }
            ]
          })
        })
      }
    })

    fireEvent.click(screen.getByRole('button'))

    const checkButton = screen.getByRole('button', { name: /mark as read/i })
    fireEvent.click(checkButton)

    expect(mockSendMessage).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.stringContaining('"type":"mark_read"')
    }))
  })

  it('dismisses notification when clicking dismiss button', async () => {
    const mockSendMessage = vi.fn()
    vi.mocked(useWebSocket).mockImplementation(({ onMessage }) => {
      capturedOnMessage = onMessage
      return {
        isConnected: true,
        error: null,
        sendMessage: mockSendMessage,
        sendStatus: vi.fn(),
      }
    })

    render(<NotificationCenter />)

    act(() => {
      if (capturedOnMessage) {
        capturedOnMessage({
          content: JSON.stringify({
            type: 'notifications',
            data: [
              {
                id: '1',
                title: 'Test Notification',
                body: 'This is a test notification',
                status: NotificationStatus.PENDING,
                createdAt: Date.now(),
              }
            ]
          })
        })
      }
    })

    fireEvent.click(screen.getByRole('button'))

    const dismissButton = screen.getByRole('button', { name: /dismiss/i })
    fireEvent.click(dismissButton)

    expect(mockSendMessage).toHaveBeenCalledWith(expect.objectContaining({
      content: expect.stringContaining('"type":"dismiss"')
    }))
  })

  it('closes notification panel when clicking close button', () => {
    render(<NotificationCenter />)

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Notifications')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(screen.queryByText('Notifications')).not.toBeInTheDocument()
  })

  it('updates notification list when new notification is received', () => {
    render(<NotificationCenter />)
    fireEvent.click(screen.getByRole('button'))

    act(() => {
      if (capturedOnMessage) {
        capturedOnMessage({
          content: JSON.stringify({
            type: 'notification',
            data: {
              id: '2',
              title: 'New Notification',
              body: 'This is a new notification',
              status: NotificationStatus.PENDING,
              createdAt: Date.now(),
            }
          })
        })
      }
    })

    expect(screen.getByText('New Notification')).toBeInTheDocument()
    // Unread count should also be updated
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
