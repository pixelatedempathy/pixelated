/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['chokidar', 'fsevents'],
    include: ['msw/node'],
  },
  ssr: {
    noExternal: ['msw'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
      'react-dom/test-utils': path.resolve(
        __dirname,
        '../__mocks__/react-dom/test-utils.js',
      ),
      'react/jsx-dev-runtime': path.resolve(
        __dirname,
        '../node_modules/react/jsx-dev-runtime.js',
      ),
      'react/jsx-runtime': path.resolve(
        __dirname,
        '../node_modules/react/jsx-runtime.js',
      ),
      'react': path.resolve(__dirname, '../node_modules/react/index.js'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom/index.js'),
<<<<<<< HEAD
=======
=======
>>>>>>> origin/master
>>>>>>> origin/master
    },
    conditions: ['node', 'import', 'module', 'default'],
  },
  test: {
    env: {
      NODE_ENV: 'test',
      TZ: 'UTC',
      VITE_AUTH0_DOMAIN: 'test-domain.auth0.com',
    },
    server: {
      deps: {
        inline: ['@testing-library/react', 'react-dom'],
      },
    },
    globals: true,
    environment: 'jsdom',
<<<<<<< HEAD
    setupFiles: ['./src/test/setup.ts', './config/vitest.setup.ts'],
=======
<<<<<<< HEAD
    setupFiles: ['./src/test/setup.ts', './config/vitest.setup.ts'],
=======
    setupFiles: ['./src/test/setup-react19.ts', './src/test/setup.ts', './config/vitest.setup.ts'],
    env: {
      RTL_SKIP_AUTO_CLEANUP: 'true',
      NODE_ENV: 'development',
    },
>>>>>>> origin/master
>>>>>>> origin/master
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/integration/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/api/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'tests/hooks/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: [
      'src/tests/simple-browser-compatibility.test.ts',
      'src/tests/browser-compatibility.test.ts',
      'src/tests/mobile-compatibility.test.ts',
      'src/tests/cross-browser-compatibility.test.ts',
      'src/e2e/breach-notification.spec.ts',
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
      'tests/integration/complete-system.integration.test.ts',
      'src/lib/threat-detection/__tests__/phase8-integration.test.ts',
>>>>>>> origin/master
>>>>>>> origin/master
      'tests/e2e/**/*',
      'tests/integration/complete-system.integration.test.ts',
      'tests/browser/**/*',
      'tests/accessibility/**/*',
      'tests/performance/**/*',
      'tests/security/**/*',
      'tests/pending-implementation/**/*',
      'backups/**',
      'backups/**/*',
      ...(process.env['CI']
        ? [
          'src/lib/services/redis/__tests__/RedisService.integration.test.ts',
          'src/lib/services/redis/__tests__/Analytics.integration.test.ts',
          'src/lib/services/redis/__tests__/CacheInvalidation.integration.test.ts',
          'tests/integration/bias-detection-api.integration.test.ts',
        ]
        : []),
    ],
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
    testTimeout: process.env['CI'] ? 15_000 : 30_000,
    hookTimeout: process.env['CI'] ? 10_000 : 30_000,
    ...(process.env['CI']
      ? {
        poolOptions: {
          threads: {
            minThreads: 1,
            maxThreads: 2,
          },
        },
      }
      : {}),
<<<<<<< HEAD
=======
=======
    testTimeout: process.env['CI'] ? 30_000 : 15_000,
    hookTimeout: process.env['CI'] ? 15_000 : 10_000,
>>>>>>> origin/master
>>>>>>> origin/master
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        pretendToBeVisual: false,
        runScripts: 'dangerously',
      },
    },
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './coverage/junit.xml',
    },
    coverage: {
      provider: 'v8',
<<<<<<< HEAD
      enabled:
        !process.env['CI'] || process.env['VITEST_COVERAGE_ENABLED'] === 'true',
=======
<<<<<<< HEAD
      enabled:
        !process.env['CI'] || process.env['VITEST_COVERAGE_ENABLED'] === 'true',
=======
      enabled: !process.env['CI'],
>>>>>>> origin/master
>>>>>>> origin/master
      reporter: ['text', 'json', 'html', 'cobertura', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'dist/**',
        '.next/**',
        'coverage/**',
        '**/*.d.ts',
        'test/**',
        'tests/**',
        'vitest.config.ts',
        'backups/**',
        'backups/**/*',
      ],
    },
<<<<<<< HEAD
    isolate: !process.env['CI'],
    ...(process.env['CI'] ? { watch: false } : {}),
    ...(process.env['CI'] ? { bail: 10 } : {}),
=======
<<<<<<< HEAD
    isolate: !process.env['CI'],
    ...(process.env['CI'] ? { watch: false } : {}),
    ...(process.env['CI'] ? { bail: 10 } : {}),
=======
    isolate: true,
    ...(process.env['CI']
      ? {
        watch: false,
        bail: 3,
        pool: 'forks',
        poolOptions: {
          threads: {
            singleThread: true,
            maxThreads: 1,
            minThreads: 1,
            isolate: true, // Maintain isolation
          },
          forks: {
            isolate: true,
            singleFork: true,
          },
        },
        forceExit: true, // Ensure process exits even with open handles after tests finish
        hookTimeout: 60000, // Increase hook timeout for CI
      }
      : {}),
>>>>>>> origin/master
>>>>>>> origin/master
  },
  build: {
    sourcemap: true,
    cssCodeSplit: true,
  },
  css: {
    devSourcemap: true,
  },
})
