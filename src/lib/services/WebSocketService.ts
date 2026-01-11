import { createBuildSafeLogger } from '../logging/build-safe-logger'

const logger = createBuildSafeLogger('WebSocketService')

type MessageHandler = (payload: any) => void

export class WebSocketService {
  private static instance: WebSocketService
  private ws: WebSocket | null = null
  private handlers: Map<string, Set<MessageHandler>> = new Map()
  private messageQueue: string[] = []
  private isConnected = false
  private reconnectTimer: NodeJS.Timeout | null = null
  private url: string | null = null

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  /**
   * Connect to the WebSocket server
   * @param url The WebSocket server URL
   */
  public connect(url: string): Promise<void> {
    // If already connected to the same URL, do nothing
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      if (this.url === url) {
        return Promise.resolve()
      }
      this.ws.close()
    }

    this.url = url
    this.isConnected = false

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(url)
        let isPromiseSettled = false

        this.ws.onopen = () => {
          logger.info('WebSocket connected', { url })
          this.isConnected = true
          this.flushQueue()
          if (!isPromiseSettled) {
            isPromiseSettled = true
            resolve()
          }
        }

        this.ws.onclose = (event) => {
          logger.warn('WebSocket disconnected', { code: event.code, reason: event.reason })
          this.isConnected = false
          this.handleReconnect()
          // If connection closed before open (failed to connect), reject.
          if (!isPromiseSettled) {
             isPromiseSettled = true
             // We reject here to let the caller know initial connection failed.
             // Reconnect logic will still run in background.
             reject(new Error(`WebSocket connection failed: ${event.reason || 'Unknown reason'}`))
          }
        }

        this.ws.onerror = (error) => {
          logger.error('WebSocket error', { error })
          // onerror usually precedes onclose. We let onclose handle the rejection/reconnect trigger
          // unless onclose isn't called for some reason (rare in standard WS).
        }

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data)
            const { type, payload } = message

            if (type && this.handlers.has(type)) {
              this.handlers.get(type)?.forEach(handler => {
                try {
                  handler(payload)
                } catch (err) {
                  logger.error('Error in message handler', { error: err, type })
                }
              })
            }
          } catch (error) {
            logger.error('Failed to parse WebSocket message', { error, data: event.data })
          }
        }
      } catch (error) {
        logger.error('Failed to create WebSocket connection', { error })
        reject(error)
      }
    })
  }

  /**
   * Send a message to the WebSocket server
   * @param type The message type/channel
   * @param payload The message data
   */
  public async send(type: string, payload: any): Promise<void> {
    const message = JSON.stringify({ type, payload })

    if (this.isConnected && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(message)
    } else {
      logger.warn('WebSocket not connected, queuing message', { type })
      this.messageQueue.push(message)

      if (!this.url) {
        logger.error('Cannot send message: WebSocket not configured')
        throw new Error('WebSocket not configured')
      }
    }
  }

  /**
   * Register a message handler
   * @param type The message type to listen for
   * @param handler The callback function
   */
  public on(type: string, handler: MessageHandler): void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set())
    }
    this.handlers.get(type)?.add(handler)
  }

  /**
   * Remove a message handler
   * @param type The message type
   * @param handler The callback function to remove
   */
  public off(type: string, handler: MessageHandler): void {
    const handlers = this.handlers.get(type)
    if (handlers) {
      handlers.delete(handler)
    }
  }

  private handleReconnect() {
    if (this.reconnectTimer) return

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      if (this.url) {
        logger.info('Attempting to reconnect...')
        // We don't await this recursion to avoid unhandled promise rejections if this fails again.
        // The connect() method handles its own errors.
        this.connect(this.url).catch(err => {
          logger.debug('Reconnect attempt failed', { err })
          // The onclose of the new connection will trigger handleReconnect again.
        })
      }
    }, 5000)
  }

  private flushQueue() {
    while (this.messageQueue.length > 0 && this.isConnected) {
      const message = this.messageQueue.shift()
      if (message && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(message)
      } else {
        if (message) this.messageQueue.unshift(message)
        break
      }
    }
  }
}
