Run pnpm test --pool=forks --isolate --no-coverage
pnpm test --pool=forks --isolate --no-coverage
shell: /usr/bin/bash -e {0}
env:
PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
REDIS_URL: redis://localhost:6379
REDIS_KEY_PREFIX: test:
VITEST_TIMEOUT: 30000
SKIP_REDIS_TESTS: true
SKIP_FHE_TESTS: true
SKIP_BROWSER_COMPAT_TESTS: true
AZURE_STORAGE_CONTAINER_NAME: test-container
NODE_ENV: test
SKIP_PERFORMANCE_TESTS: true
SKIP_CRYPTO_ROTATION_TEST: true

> pixelated@0.0.1 test /home/runner/work/pixelated/pixelated
> vitest --pool=forks --isolate --no-coverage


RUN v3.2.4 /home/runner/work/pixelated/pixelated

✓ src/lib/ai/bias-detection/__tests__/api-analyze.test.ts (22 tests) 559ms
✓ Session Analysis API Endpoint > POST /api/bias-detection/analyze > should successfully analyze a session with valid
input 514ms
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts (50 tests | 8 failed) 1031ms
✓ BiasDetectionEngine > Initialization > should initialize with default configuration 7ms
✓ BiasDetectionEngine > Initialization > should initialize with custom configuration 2ms
✓ BiasDetectionEngine > Initialization > should validate configuration parameters 3ms
✓ BiasDetectionEngine > Session Analysis > should analyze session and return bias results 10ms
✓ BiasDetectionEngine > Session Analysis > should handle missing required fields 2ms
✓ BiasDetectionEngine > Session Analysis > should apply HIPAA compliance when enabled 2ms
× BiasDetectionEngine > Session Analysis > should calculate correct alert levels 18ms
→ expected 'medium' to be 'low' // Object.is equality
✓ BiasDetectionEngine > Multi-Layer Analysis > should perform preprocessing layer analysis 2ms
✓ BiasDetectionEngine > Multi-Layer Analysis > should perform model-level analysis 2ms
✓ BiasDetectionEngine > Multi-Layer Analysis > should perform interactive analysis 2ms
✓ BiasDetectionEngine > Multi-Layer Analysis > should perform evaluation layer analysis 2ms
✓ BiasDetectionEngine > Dashboard Data > should generate dashboard data 1ms
✓ BiasDetectionEngine > Dashboard Data > should filter dashboard data by time range 1ms
✓ BiasDetectionEngine > Dashboard Data > should filter dashboard data by demographics 1ms
✓ BiasDetectionEngine > Real-time Monitoring > should start monitoring 1ms
✓ BiasDetectionEngine > Real-time Monitoring > should stop monitoring 1ms
✓ BiasDetectionEngine > Real-time Monitoring > should trigger alerts for high bias scores 4ms
✓ BiasDetectionEngine > Performance Requirements > should complete analysis within 10 seconds for simple sessions 3ms
✓ BiasDetectionEngine > Performance Requirements > should handle concurrent sessions 11ms
× BiasDetectionEngine > Error Handling > should handle Python service errors gracefully 4ms
→ expected false to be true // Object.is equality
× BiasDetectionEngine > Error Handling > should provide fallback analysis when toolkits are unavailable 2ms
→ expected 0.8 to be 0.1 // Object.is equality
✓ BiasDetectionEngine > Input Validation and Edge Cases > should handle null session data 1ms
✓ BiasDetectionEngine > Input Validation and Edge Cases > should handle undefined session data 1ms
✓ BiasDetectionEngine > Input Validation and Edge Cases > should handle empty session data object 1ms
✓ BiasDetectionEngine > Input Validation and Edge Cases > should handle missing sessionId 1ms
✓ BiasDetectionEngine > Input Validation and Edge Cases > should handle empty sessionId 1ms
✓ BiasDetectionEngine > Input Validation and Edge Cases > should handle missing demographics 1ms
✓ BiasDetectionEngine > Input Validation and Edge Cases > should handle extremely large session data 1ms
× BiasDetectionEngine > Input Validation and Edge Cases > should handle boundary threshold values 2ms
→ expected 0.5 to be close to 0.3, received difference is 0.2, but expected 0.0000049999999999999996
× BiasDetectionEngine > Service Communication Errors > should handle network timeout errors 2ms
→ expected 0.8 to be less than 0.8
× BiasDetectionEngine > Service Communication Errors > should handle partial layer failures 2ms
→ expected 0.8 to be less than 0.8
× BiasDetectionEngine > Service Communication Errors > should handle malformed Python service responses 2ms
→ expected false to be true // Object.is equality
✓ BiasDetectionEngine > Service Communication Errors > should handle service overload scenarios 1ms
✓ BiasDetectionEngine > Service Communication Errors > should handle authentication failures 1ms
✓ BiasDetectionEngine > Resource Management and Cleanup > should handle cleanup failures gracefully 787ms
✓ BiasDetectionEngine > Resource Management and Cleanup > should handle concurrent resource access 9ms
✓ BiasDetectionEngine > Resource Management and Cleanup > should handle memory pressure scenarios 6ms
✓ BiasDetectionEngine > Configuration Edge Cases > should handle zero layer weights 1ms
✓ BiasDetectionEngine > Configuration Edge Cases > should handle invalid threshold configurations 1ms
✓ BiasDetectionEngine > Configuration Edge Cases > should handle layer weights that don't sum to 1 1ms
✓ BiasDetectionEngine > Configuration Edge Cases > should handle missing configuration sections 1ms
✓ BiasDetectionEngine > Data Privacy and Security > should mask sensitive demographic data 1ms
× BiasDetectionEngine > Data Privacy and Security > should create audit logs when enabled 3ms
→ expected "spy" to be called at least once
· BiasDetectionEngine > Data Privacy and Security > should not create audit logs when disabled
· BiasDetectionEngine > Integration with Existing Systems > should integrate with session management system
· BiasDetectionEngine > Integration with Existing Systems > should provide metrics for analytics dashboard
· BiasDetectionEngine > Realistic Bias Detection Scenarios (Using Test Fixtures) > should analyze baseline scenario
without detecting bias
· BiasDetectionEngine > Realistic Bias Detection Scenarios (Using Test Fixtures) > should detect higher bias in
age-discriminatory scenario
· BiasDetectionEngine > Realistic Bias Detection Scenarios (Using Test Fixtures) > should provide comparative bias
analysis for paired scenarios
· BiasDetectionEngine > Realistic Bias Detection Scenarios (Using Test Fixtures) > should include demographic
information in bias analysis
↓ src/lib/ai/bias-detection/__tests__/cache.test.ts (41 tests)
❯ src/components/admin/bias-detection/BiasDashboard.test.tsx (60 tests | 1 failed) 2077ms
✓ BiasDashboard > renders loading state initially 53ms
✓ BiasDashboard > renders dashboard data after loading 91ms
✓ BiasDashboard > handles WebSocket connection 367ms
✓ BiasDashboard > handles WebSocket errors gracefully 87ms
× BiasDashboard > updates data when receiving WebSocket messages 1103ms
→ Unable to find an element with the text: (content, element) => { return content.includes("New high bias alert"); } (
normalized from '(content, element) => {
return content.includes("New high bias alert");
}'). This could be because the text is broken up by multiple elements. In this case, you can provide a function for your
text matcher to make your matcher more flexible.

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="p-6 space-y-6  "
    >
      <div
        class="sr-only"
      >
        <button
          class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          type="button"
        >
          Skip to main content
        </button>
        <button
          class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          type="button"
        >
          Skip to alerts
        </button>
      </div>
      <div
        aria-atomic="true"
        aria-live="polite"
        class="sr-only"
      />
      <header
        class="flex flex-row items-center justify-between"
      >
        <div>
          <h1
            class="text-3xl font-bold"
          >
            Bias Detection Dashboard
          </h1>
          <p
            class="text-muted-foreground "
          >
            Real-time monitoring of therapeutic training bias
            <span
              class="ml-2"
            >
              • Last updated: 
              5:17:18 PM
            </span>
            <span
              class="ml-2 text-yellow-500 animate-pulse"
            >
              • 
              <svg
                aria-hidden="true"
                class="lucide lucide-refresh-cw h-3 w-3 mr-1 animate-spin"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
                />
                <path
                  d="M21 3v5h-5"
                />
                <path
                  d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
                />
                <path
                  d="M8 16H3v5"
                />
              </svg>
              Connecting to live updates...
            </span>
          </p>
        </div>
        <div
          class="flex items-center space-x-2 "
        >
          <button
            aria-busy="false"
            aria-disabled="false"
            aria-label="Auto-refresh is currently on. Click to disable."
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="lucide lucide-activity h-4 w-4 mr-2 text-green-500"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
              />
            </svg>
            Auto-refresh 
            On
          </button>
          <button
            aria-busy="false"
            aria-disabled="false"
            aria-label="Refresh dashboard data"
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="lucide lucide-refresh-cw h-4 w-4 mr-2"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
       ...

Ignored nodes: comments, script, style
<html>
  <head />
  <body>
    <div>
      <div
        class="p-6 space-y-6  "
      >
        <div
          class="sr-only"
        >
          <button
            class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
            type="button"
          >
            Skip to main content
          </button>
          <button
            class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
            type="button"
          >
            Skip to alerts
          </button>
        </div>
        <div
          aria-atomic="true"
          aria-live="polite"
          class="sr-only"
        />
        <header
          class="flex flex-row items-center justify-between"
        >
          <div>
            <h1
              class="text-3xl font-bold"
            >
              Bias Detection Dashboard
            </h1>
            <p
              class="text-muted-foreground "
            >
              Real-time monitoring of therapeutic training bias
              <span
                class="ml-2"
              >
                • Last updated: 
                5:17:18 PM
              </span>
              <span
                class="ml-2 text-yellow-500 animate-pulse"
              >
                • 
                <svg
                  aria-hidden="true"
                  class="lucide lucide-refresh-cw h-3 w-3 mr-1 animate-spin"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
                  />
                  <path
                    d="M21 3v5h-5"
                  />
                  <path
                    d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
                  />
                  <path
                    d="M8 16H3v5"
                  />
                </svg>
                Connecting to live updates...
              </span>
            </p>
          </div>
          <div
            class="flex items-center space-x-2 "
          >
            <button
              aria-busy="false"
              aria-disabled="false"
              aria-label="Auto-refresh is currently on. Click to disable."
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
              type="button"
            >
              <svg
                aria-hidden="true"
                class="lucide lucide-activity h-4 w-4 mr-2 text-green-500"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                />
              </svg>
              Auto-refresh 
              On
            </button>
            <button
              aria-busy="false"
              aria-disabled="false"
              aria-label="Refresh dashboard data"
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
              type="button"
            >
              <svg
                aria-hidden="true"
                class="lucide lucide-refresh-cw h-4 w-4 mr-2"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                str...
   · BiasDashboard > handles chart interactions correctly
   · BiasDashboard > handles data updates with animations
   · BiasDashboard > cleans up WebSocket connection on unmount
   · BiasDashboard > renders filtering controls
   · BiasDashboard > handles time range filter changes
   · BiasDashboard > shows custom date inputs when custom time range is selected
   · BiasDashboard > handles bias score filter changes
   · BiasDashboard > handles alert level filter changes
   · BiasDashboard > clears all filters when clear button is clicked
   · BiasDashboard > displays filter summary correctly
   · BiasDashboard > updates chart data when filters are applied
   · BiasDashboard > shows no data message when filters exclude all data
   · BiasDashboard > handles custom date range input
   · BiasDashboard > renders notification settings panel
   · BiasDashboard > handles notification settings changes
   · BiasDashboard > handles test notification sending
   · BiasDashboard > renders alert management controls
   · BiasDashboard > handles individual alert actions
   · BiasDashboard > handles bulk alert actions
   · BiasDashboard > handles alert selection and deselection
   · BiasDashboard > handles alert notes addition
   · BiasDashboard > handles alert escalation with notes
   · BiasDashboard > displays action history for alerts
   · BiasDashboard > closes notification settings panel
   · BiasDashboard > Data Export Functionality > opens export dialog when export button is clicked
   · BiasDashboard > Data Export Functionality > allows format selection in export dialog
   · BiasDashboard > Data Export Functionality > handles export data functionality
   · BiasDashboard > Data Export Functionality > closes export dialog when cancel is clicked
   · BiasDashboard > Data Export Functionality > validates date range in export dialog
   · BiasDashboard > Responsive Design > adapts layout for mobile screens
   · BiasDashboard > Responsive Design > adapts layout for tablet screens
   · BiasDashboard > Responsive Design > handles window resize events
   · BiasDashboard > Accessibility Features > provides skip links for keyboard navigation
   · BiasDashboard > Accessibility Features > handles keyboard navigation shortcuts
   · BiasDashboard > Accessibility Features > provides proper ARIA labels and descriptions
   · BiasDashboard > Accessibility Features > supports high contrast mode
   · BiasDashboard > Accessibility Features > respects reduced motion preferences
   · BiasDashboard > Accessibility Features > provides screen reader announcements
   · BiasDashboard > Accessibility Features > manages focus properly in dialogs
   · BiasDashboard > Enhanced WebSocket Functionality > shows connection status indicators
   · BiasDashboard > Enhanced WebSocket Functionality > handles connection errors with proper status
   · BiasDashboard > Enhanced WebSocket Functionality > handles reconnection attempts with exponential backoff
   · BiasDashboard > Enhanced WebSocket Functionality > sends subscription message on connection
   · BiasDashboard > Enhanced WebSocket Functionality > updates subscription when filters change
   · BiasDashboard > Enhanced WebSocket Functionality > handles heartbeat messages
   · BiasDashboard > Enhanced WebSocket Functionality > handles real-time bias alert updates
   · BiasDashboard > Enhanced WebSocket Functionality > handles real-time session updates
   · BiasDashboard > Enhanced WebSocket Functionality > handles real-time metrics updates
   · BiasDashboard > Enhanced WebSocket Functionality > handles manual reconnection
   · BiasDashboard > Enhanced WebSocket Functionality > cleans up WebSocket connection properly
   · BiasDashboard > Enhanced WebSocket Functionality > handles unknown message types gracefully
   · BiasDashboard > Enhanced WebSocket Functionality > handles malformed WebSocket messages
   · BiasDashboard > Enhanced WebSocket Functionality > shows correct status during reconnection attempts
   · BiasDashboard > Enhanced WebSocket Functionality > disables live updates when enableRealTimeUpdates is false
   · BiasDashboard > shows error alert if dashboard fetch fails

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 9 ⎯⎯⎯⎯⎯⎯⎯

FAIL src/components/admin/bias-detection/BiasDashboard.test.tsx > BiasDashboard > updates data when receiving WebSocket
messages
TestingLibraryElementError: Unable to find an element with the text: (content, element) => { return content.includes("
New high bias alert"); } (normalized from '(content, element) => {
return content.includes("New high bias alert");
}'). This could be because the text is broken up by multiple elements. In this case, you can provide a function for your
text matcher to make your matcher more flexible.

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="p-6 space-y-6  "
    >
      <div
        class="sr-only"
      >
        <button
          class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          type="button"
        >
          Skip to main content
        </button>
        <button
          class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          type="button"
        >
          Skip to alerts
        </button>
      </div>
      <div
        aria-atomic="true"
        aria-live="polite"
        class="sr-only"
      />
      <header
        class="flex flex-row items-center justify-between"
      >
        <div>
          <h1
            class="text-3xl font-bold"
          >
            Bias Detection Dashboard
          </h1>
          <p
            class="text-muted-foreground "
          >
            Real-time monitoring of therapeutic training bias
            <span
              class="ml-2"
            >
              • Last updated: 
              5:17:18 PM
            </span>
            <span
              class="ml-2 text-yellow-500 animate-pulse"
            >
              • 
              <svg
                aria-hidden="true"
                class="lucide lucide-refresh-cw h-3 w-3 mr-1 animate-spin"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
                />
                <path
                  d="M21 3v5h-5"
                />
                <path
                  d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
                />
                <path
                  d="M8 16H3v5"
                />
              </svg>
              Connecting to live updates...
            </span>
          </p>
        </div>
        <div
          class="flex items-center space-x-2 "
        >
          <button
            aria-busy="false"
            aria-disabled="false"
            aria-label="Auto-refresh is currently on. Click to disable."
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="lucide lucide-activity h-4 w-4 mr-2 text-green-500"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
              />
            </svg>
            Auto-refresh 
            On
          </button>
          <button
            aria-busy="false"
            aria-disabled="false"
            aria-label="Refresh dashboard data"
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="lucide lucide-refresh-cw h-4 w-4 mr-2"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
       ...

Ignored nodes: comments, script, style
<html>
  <head />
  <body>
    <div>
      <div
        class="p-6 space-y-6  "
      >
        <div
          class="sr-only"
        >
          <button
            class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
            type="button"
          >
            Skip to main content
          </button>
          <button
            class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
            type="button"
          >
            Skip to alerts
          </button>
        </div>
        <div
          aria-atomic="true"
          aria-live="polite"
          class="sr-only"
        />
        <header
          class="flex flex-row items-center justify-between"
        >
          <div>
            <h1
              class="text-3xl font-bold"
            >
              Bias Detection Dashboard
            </h1>
            <p
              class="text-muted-foreground "
            >
              Real-time monitoring of therapeutic training bias
              <span
                class="ml-2"
              >
                • Last updated: 
                5:17:18 PM
              </span>
              <span
                class="ml-2 text-yellow-500 animate-pulse"
              >
                • 
                <svg
                  aria-hidden="true"
                  class="lucide lucide-refresh-cw h-3 w-3 mr-1 animate-spin"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
                  />
                  <path
                    d="M21 3v5h-5"
                  />
                  <path
                    d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
                  />
                  <path
                    d="M8 16H3v5"
                  />
                </svg>
                Connecting to live updates...
              </span>
            </p>
          </div>
          <div
            class="flex items-center space-x-2 "
          >
            <button
              aria-busy="false"
              aria-disabled="false"
              aria-label="Auto-refresh is currently on. Click to disable."
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
              type="button"
            >
              <svg
                aria-hidden="true"
                class="lucide lucide-activity h-4 w-4 mr-2 text-green-500"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                />
              </svg>
              Auto-refresh 
              On
            </button>
            <button
              aria-busy="false"
              aria-disabled="false"
              aria-label="Refresh dashboard data"
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
              type="button"
            >
              <svg
                aria-hidden="true"
                class="lucide lucide-refresh-cw h-4 w-4 mr-2"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                str...
 ❯ Proxy.waitForWrapper node_modules/.pnpm/@testing-library+dom@10.4.0/node_modules/@testing-library/dom/dist/wait-for.js:163:27
 ❯ src/components/admin/bias-detection/BiasDashboard.test.tsx:330:11
    328|     fireEvent.click(screen.getByRole('tab', { name: /alerts/i }))
    329| 
    330|     await waitFor(() => {
       |           ^
    331|       // Use a more flexible matcher since the text might be split acr…
    332|       expect(screen.getByText((content, element) => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Session Analysis > should
calculate correct alert levels
AssertionError: expected 'medium' to be 'low' // Object.is equality

Expected: "low"
Received: "medium"

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:465:40
463| })
464| // With default mock scores (0.5, 0.5, 0.5, 0.5) and equal weigh…
465| expect(lowBiasResult.alertLevel).toBe('low')
| ^
466|
467| // Mock high bias scores for all layers to ensure 'high' alert l…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Error Handling > should
handle Python service errors gracefully
AssertionError: expected false to be true // Object.is equality

- Expected

+ Received

- true

+ false

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:716:9
714| expect(
715| result.recommendations.some((rec) => rec.includes('fallback') …
716|       ).toBe(true)
| ^
717|
718| // Restore original service

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Error Handling > should
provide fallback analysis when toolkits are unavailable
AssertionError: expected 0.8 to be 0.1 // Object.is equality

- Expected

+ Received

- 0.1

+ 0.8

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:742:33
740|
741| // When all services fail, confidence should be exactly 0.1 (bas…
742| expect(result.confidence).toBe(0.1)
| ^
743| expect(
744| result.recommendations.some((rec) => rec.includes('Limited ana…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Input Validation and Edge
Cases > should handle boundary threshold values
AssertionError: expected 0.5 to be close to 0.3, received difference is 0.2, but expected 0.0000049999999999999996
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:863:39
861| const result = await biasEngine.analyzeSession(mockSessionData)
862| // With all layers at 0.3 and equal weights (0.25 each), overall…
863| expect(result.overallBiasScore).toBeCloseTo(0.3, 5) // Allow for…
| ^
864| expect(result.alertLevel).toBe('medium')
865| // Confidence should reflect accurate threshold detection

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Service Communication
Errors > should handle network timeout errors
AssertionError: expected 0.8 to be less than 0.8
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:904:33
902| expect(result.overallBiasScore).toBe(0.5)
903| // Confidence should be reduced due to service failures
904| expect(result.confidence).toBeLessThan(0.8)
| ^
905| // Should include appropriate fallback recommendations
906| expect(

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Service Communication
Errors > should handle partial layer failures
AssertionError: expected 0.8 to be less than 0.8
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:928:33
926| expect(result.layerResults.preprocessing.biasScore).toBe(0.5) //…
927| expect(result.layerResults.modelLevel).toBeDefined()
928| expect(result.confidence).toBeLessThan(0.8) // Reduced due to fa…
| ^
929| })
930|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Service Communication
Errors > should handle malformed Python service responses
AssertionError: expected false to be true // Object.is equality

- Expected

+ Received

- true

+ false

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:949:9
947| rec.includes('Incomplete analysis due to service issues'),
948|         ),
949|       ).toBe(true)
| ^
950| })
951|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/9]⎯

FAIL src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts > BiasDetectionEngine > Data Privacy and Security >
should create audit logs when enabled
AssertionError: expected "spy" to be called at least once
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:1247:38
1245|
1246| // Verify analysis was recorded (which may include audit logs)
1247| expect(storeAnalysisResultSpy).toHaveBeenCalled()
| ^
1248| })
1249|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/9]⎯

Test Files 2 failed | 1 passed | 1 skipped (113)
Tests 9 failed | 61 passed (173)
Start at 17:17:16
Duration 3.53s (transform 1.01s, setup 670ms, collect 948ms, tests 3.67s, environment 2.15s, prepare 469ms)

Error: TestingLibraryElementError: Unable to find an element with the text: (content, element) => { return
content.includes("New high bias alert"); } (normalized from '(content, element) => {
return content.includes("New high bias alert");
}'). This could be because the text is broken up by multiple elements. In this case, you can provide a function for your
text matcher to make your matcher more flexible.

Ignored nodes: comments, script, style
<body>
  <div>
    <div
      class="p-6 space-y-6  "
    >
      <div
        class="sr-only"
      >
        <button
          class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          type="button"
        >
          Skip to main content
        </button>
        <button
          class="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
          type="button"
        >
          Skip to alerts
        </button>
      </div>
      <div
        aria-atomic="true"
        aria-live="polite"
        class="sr-only"
      />
      <header
        class="flex flex-row items-center justify-between"
      >
        <div>
          <h1
            class="text-3xl font-bold"
          >
            Bias Detection Dashboard
          </h1>
          <p
            class="text-muted-foreground "
          >
            Real-time monitoring of therapeutic training bias
            <span
              class="ml-2"
            >
              • Last updated: 
              5:17:18 PM
            </span>
            <span
              class="ml-2 text-yellow-500 animate-pulse"
            >
              • 
              <svg
                aria-hidden="true"
                class="lucide lucide-refresh-cw h-3 w-3 mr-1 animate-spin"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
                />
                <path
                  d="M21 3v5h-5"
                />
                <path
                  d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
                />
                <path
                  d="M8 16H3v5"
                />
              </svg>
              Connecting to live updates...
            </span>
          </p>
        </div>
        <div
          class="flex items-center space-x-2 "
        >
          <button
            aria-busy="false"
            aria-disabled="false"
            aria-label="Auto-refresh is currently on. Click to disable."
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="lucide lucide-activity h-4 w-4 mr-2 text-green-500"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path


Error: AssertionError: expected 'medium' to be 'low' // Object.is equality

Expected: "low"
Received: "medium"

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:465:40

Error: AssertionError: expected false to be true // Object.is equality

- Expected

+ Received

- true

+ false

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:716:9

Error: AssertionError: expected 0.8 to be 0.1 // Object.is equality

- Expected

+ Received

- 0.1

+ 0.8

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:742:33

Error: AssertionError: expected 0.5 to be close to 0.3, received difference is 0.2, but expected
0.0000049999999999999996
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:863:39

Error: AssertionError: expected 0.8 to be less than 0.8
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:904:33

Error: AssertionError: expected 0.8 to be less than 0.8
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:928:33

Error: AssertionError: expected false to be true // Object.is equality

- Expected

+ Received

- true

+ false

❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:949:9

Error: AssertionError: expected "spy" to be called at least once
❯ src/lib/ai/bias-detection/__tests__/BiasDetectionEngine.test.ts:1247:38

ELIFECYCLE Test failed. See above for more details.
Error: Process completed with exit code 1.