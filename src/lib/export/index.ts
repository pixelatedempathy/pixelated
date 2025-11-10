/**
 * Export Service for Therapy Chat System
 *
 * Provides secure conversation export capabilities with maintained encryption
 * for privacy and HIPAA compliance.
 *
 * This file exports the browser-compatible implementation for Cloudflare Workers.
 */

// Always use browser implementation for Cloudflare Workers
export { ExportFormat, ExportService } from './index.browser'
export type { ExportOptions, ExportResult } from './index.browser'

// Default export
import browserImpl from './index.browser'
export default browserImpl
