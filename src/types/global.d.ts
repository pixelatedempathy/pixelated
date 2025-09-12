/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

/// <reference path="../../types/three-addons.d.ts" />
// Local three-addons.d.ts provides minimal ambient shims for three and its addons.

// Global DOM augmentations for project-wide window helpers
declare global {
  interface Window {
    /**
     * Global helper used by DLP components to show a transient alert in the admin UI.
     * @param type - one of 'success' | 'error' | 'warning'
     * @param message - message body displayed in the alert
     */
    showDLPAlert?: (
      type: 'success' | 'error' | 'warning',
      message: string,
    ) => void
  }
}

// No exports from this module file - keep as an ambient declaration file
export {}
