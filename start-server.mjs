#!/usr/bin/env node

import { Sentry, closeSentry } from './instrument.mjs'

import { createServer } from 'node:http'
import { handler as ssrHandler } from './dist/server/entry.mjs'

const initialPort = Number(process.env.PORT || process.env.WEBSITES_PORT || 4321)
const host = process.env.HOST || '0.0.0.0'

const server = createServer(ssrHandler)

function redactValue(val, keepLast = 8) {
  if (!val) {
    return '<missing>'
  }
  try {
    const s = String(val)
    if (s.length <= keepLast + 4) {
      return 'REDACTED'
    }
    return `${s.slice(0, 4)}...${s.slice(-keepLast)}`
  } catch {
    return '<invalid>'
  }
}

function logSentryStartupChecks() {
  const serverDsn = process.env.SENTRY_DSN
  const publicDsn = process.env.PUBLIC_SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
  const release = process.env.SENTRY_RELEASE
  const authToken = process.env.SENTRY_AUTH_TOKEN

  console.log('Sentry startup check:')
  console.log('  SENTRY_DSN:', serverDsn ? redactValue(serverDsn) : '<missing>')
  console.log('  PUBLIC_SENTRY_DSN:', publicDsn ? redactValue(publicDsn) : '<missing>')
  console.log('  SENTRY_RELEASE:', typeof release === 'string' && release.length ? release : '<missing>')
  console.log('  SENTRY_AUTH_TOKEN provided:', !!authToken)
  if (!serverDsn) {
    console.warn('Warning: SENTRY_DSN is not set — server-side events will not be sent to Sentry.')
  }
  if (!release) {
    console.warn('Warning: SENTRY_RELEASE is not set — sessions or releases may be rejected by Sentry.')
  }
}

server.on('error', (err) => {
  console.error('Server error:', err)

  if (err && err.code === 'EADDRINUSE') {
    const fallbackDisabled = !!process.env.WEBSITES_PORT || !!process.env.NO_PORT_FALLBACK || !!process.env.FORCE_EXIT_ON_EADDRINUSE
    if (!fallbackDisabled) {
      console.warn('EADDRINUSE received on server (global handler) but port fallback is enabled — deferring to retry handler.')
      return
    }
  }

  try {
    if (Sentry) {
      Sentry.captureException(err)
    }
  } catch (e) {
    console.error('Failed to capture exception to Sentry:', e)
  }

  closeSentry().finally(() => process.exit(1))
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
    process.exit(0)
  })
})

function tryListen(portToTry, retriesLeft) {
  const onListening = () => {
    console.log(`Server running at http://${host}:${portToTry}`)
    try {
      logSentryStartupChecks()
    } catch (e) {
      console.error('Failed to run Sentry startup checks:', e)
    }
  }

  const onError = (err) => {
    if (err && err.code === 'EADDRINUSE') {
      const fallbackDisabled = !!process.env.WEBSITES_PORT || !!process.env.NO_PORT_FALLBACK || !!process.env.FORCE_EXIT_ON_EADDRINUSE
      console.error(`Port ${portToTry} is already in use.`)
      try {
        if (Sentry) {
          Sentry.captureException(err)
        }
      } catch (e) {
        console.error('Failed to capture EADDRINUSE to Sentry:', e)
      }
      if (fallbackDisabled) {
        console.error('Port fallback disabled by environment (WEBSITES_PORT or NO_PORT_FALLBACK or FORCE_EXIT_ON_EADDRINUSE). Exiting.')
        closeSentry().finally(() => process.exit(1))
        return
      }

      if (retriesLeft <= 0) {
        console.error('No retries left for port fallback. Exiting.')
        closeSentry().finally(() => process.exit(1))
        return
      }

      const nextPort = portToTry + 1
      console.warn(`Attempting fallback to port ${nextPort} (${retriesLeft - 1} retries left)`)
      // Small delay before retrying to avoid tight loop
      setTimeout(() => tryListen(nextPort, retriesLeft - 1), 250)
      return
    }

    console.error('Listen error:', err)
  }

  server.once('error', onError)
  server.listen(portToTry, host, onListening)
}

const maxRetries = Number(process.env.PORT_FALLBACK_MAX_RETRIES || 10)
tryListen(initialPort, maxRetries)

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  try {
    if (Sentry) {
      Sentry.captureException(reason instanceof Error ? reason : new Error(String(reason)))
    }
  } catch (e) {
    console.error('Failed to capture unhandledRejection to Sentry:', e)
  }
  closeSentry().finally(() => process.exit(1))
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  try {
    if (Sentry) {
      Sentry.captureException(err)
    }
  } catch (e) {
    console.error('Failed to capture uncaughtException to Sentry:', e)
  }
  closeSentry().finally(() => process.exit(1))
})
