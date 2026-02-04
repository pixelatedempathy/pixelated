<<<<<<< HEAD
import path from 'node:path';
import process from 'node:process';

import react from '@astrojs/react';
import UnoCSS from '@unocss/astro';
import { defineConfig, passthroughImageService } from 'astro/config';

import icon from 'astro-icon';
import sentry from '@sentry/astro';

import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import { visualizer } from 'rollup-plugin-visualizer';

// Detect Docker build environment
const isDockerBuild = process.env.DOCKER_BUILD === 'true' || process.env.CI === 'true';

const isCloudflareDeploy = process.env.DEPLOY_TARGET === 'cloudflare' || process.env.CF_PAGES === '1';
let cloudflareAdapter;
if (isCloudflareDeploy) {
  try {
    const cloudflareModule = await import('@astrojs/cloudflare');
    cloudflareAdapter = cloudflareModule.default;
  } catch (e) {
    console.warn('⚠️  Cloudflare adapter not available, will use Node adapter:', e.message);
=======
import path from "node:path";
import process from "node:process";

import react from "@astrojs/react";
import UnoCSS from "@unocss/astro";
import { defineConfig, passthroughImageService } from "astro/config";

import icon from "astro-icon";
import sentry from "@sentry/astro";

import node from "@astrojs/node";
import { visualizer } from "rollup-plugin-visualizer";

// Detect Docker build environment
const isDockerBuild =
  process.env.DOCKER_BUILD === "true" || process.env.CI === "true";

const isCloudflareDeploy =
  process.env.DEPLOY_TARGET === "cloudflare" || process.env.CF_PAGES === "1";
const isVercelDeploy =
  process.env.DEPLOY_TARGET === "vercel" || !!process.env.VERCEL;
const isNetlifyDeploy =
  process.env.DEPLOY_TARGET === "netlify" || !!process.env.NETLIFY;
let cloudflareAdapter;
if (isCloudflareDeploy) {
  try {
    const cloudflareModule = await import("@astrojs/cloudflare");
    cloudflareAdapter = cloudflareModule.default;
  } catch (e) {
    console.warn(
      "⚠️  Cloudflare adapter not available, will use Node adapter:",
      e.message,
    );
>>>>>>> origin/master
    cloudflareAdapter = undefined;
  }
}

if (isCloudflareDeploy && !cloudflareAdapter) {
<<<<<<< HEAD
  console.log('🟡 Cloudflare deployment requested but adapter unavailable, using Node adapter');
}

const isVercelDeploy = !!process.env.VERCEL;
const isRailwayDeploy = process.env.DEPLOY_TARGET === 'railway' || !!process.env.RAILWAY_ENVIRONMENT;
const isHerokuDeploy = process.env.DEPLOY_TARGET === 'heroku' || !!process.env.DYNO;
const isFlyioDeploy = process.env.DEPLOY_TARGET === 'flyio' || !!process.env.FLY_APP_NAME;

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
// Detect if we're running a build command (not dev server)
const isBuildCommand = process.argv.includes('build') || process.env.CI === 'true' || !!process.env.CF_PAGES || !!process.env.VERCEL;
const shouldAnalyzeBundle = process.env.ANALYZE_BUNDLE === '1';
const hasSentryDSN = !!process.env.SENTRY_DSN || !!process.env.PUBLIC_SENTRY_DSN; // Only enable if DSN is actually present
=======
  console.log(
    "🟡 Cloudflare deployment requested but adapter unavailable, using Node adapter",
  );
}

let vercelAdapter;
if (isVercelDeploy) {
  try {
    const vercelModule = await import("@astrojs/vercel");
    vercelAdapter = vercelModule.default;
  } catch (e) {
    console.warn("⚠️  Vercel adapter not available:", e.message);
  }
}

let netlifyAdapter;
if (isNetlifyDeploy) {
  try {
    const netlifyModule = await import("@astrojs/netlify");
    netlifyAdapter = netlifyModule.default;
  } catch (e) {
    console.warn("⚠️  Netlify adapter not available:", e.message);
  }
}

// No longer using individual cloud platform flags as we've shifted to Docker-first.

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";
// Detect if we're running a build command (not dev server)
const isBuildCommand =
  process.argv.includes("build") ||
  process.env.CI === "true" ||
  !!process.env.CF_PAGES ||
  process.env.CI === "true" ||
  !!process.env.CF_PAGES ||
  !!process.env.VERCEL ||
  !!process.env.NETLIFY;
const shouldAnalyzeBundle = process.env.ANALYZE_BUNDLE === "1";
const hasSentryDSN =
  !!process.env.SENTRY_DSN || !!process.env.PUBLIC_SENTRY_DSN; // Only enable if DSN is actually present
>>>>>>> origin/master
// const _shouldUseSpotlight = isDevelopment && process.env.SENTRY_SPOTLIGHT === '1';
const preferredPort = (() => {
  const candidates = [
    process.env.PORT,
    process.env.HTTP_PORT,
    process.env.WEBSITES_PORT,
    process.env.ASTRO_PORT,
  ];
  for (const value of candidates) {
    if (!value) continue;
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed > 0 && parsed < 65536) {
      return parsed;
    }
  }
  return 4321;
})();

function getChunkName(id) {
  // Memory optimization: consolidate chunks during Docker builds
  if (isDockerBuild) {
<<<<<<< HEAD
    if (id.includes('node_modules')) {
      return 'vendor';
=======
    if (id.includes("node_modules")) {
      return "vendor";
>>>>>>> origin/master
    }
    // Return null for all other modules to reduce chunk count
    return null;
  }

<<<<<<< HEAD
  if (id.includes('react') || id.includes('react-dom')) {
    return 'react-vendor';
  }
  if (id.includes('framer-motion') || id.includes('lucide-react')) {
    return 'ui-vendor';
  }
  if (id.includes('clsx') || id.includes('date-fns') || id.includes('axios')) {
    return 'utils-vendor';
  }
  if (id.includes('recharts') || id.includes('chart.js')) {
    return 'charts-vendor';
  }
  if (id.includes('three') || id.includes('@react-three')) {
    return 'three-vendor';
  }
  if (id.includes('node_modules')) {
    return 'vendor';
=======
  if (id.includes("react") || id.includes("react-dom")) {
    return "react-vendor";
  }
  if (id.includes("framer-motion") || id.includes("lucide-react")) {
    return "ui-vendor";
  }
  if (id.includes("clsx") || id.includes("date-fns") || id.includes("axios")) {
    return "utils-vendor";
  }
  if (id.includes("recharts") || id.includes("chart.js")) {
    return "charts-vendor";
  }
  if (id.includes("three") || id.includes("@react-three")) {
    return "three-vendor";
  }
  if (id.includes("node_modules")) {
    return "vendor";
>>>>>>> origin/master
  }
  return null;
}

const adapter = (() => {
  if (isCloudflareDeploy && cloudflareAdapter) {
<<<<<<< HEAD
    console.log('🔵 Using Cloudflare adapter for Pages deployment');
    // Only enable platformProxy for local dev (not during builds)
    // During Cloudflare Pages builds, platformProxy requires Wrangler auth which isn't available
    const adapterConfig = {
      mode: 'directory',
=======
    console.log("🔵 Using Cloudflare adapter for Pages deployment");
    // Only enable platformProxy for local dev (not during builds)
    // During Cloudflare Pages builds, platformProxy requires Wrangler auth which isn't available
    const adapterConfig = {
      mode: "directory",
>>>>>>> origin/master
      functionPerRoute: false,
    };
    // Only include platformProxy when running dev server locally (not during builds)
    if (isDevelopment && !isBuildCommand) {
<<<<<<< HEAD
      adapterConfig.platformProxy = {
        enabled: true,
      };
=======
      adapterConfig.platformProxy = { enabled: true };
>>>>>>> origin/master
    }
    return cloudflareAdapter(adapterConfig);
  }

<<<<<<< HEAD
  if (isVercelDeploy) {
    console.log('⚡ Using Vercel adapter for deployment');
    return vercel();
  }

  if (isRailwayDeploy) {
    console.log('🚂 Using Node adapter for Railway deployment');
    return node({
      mode: 'standalone',
    });
  }

  if (isHerokuDeploy) {
    console.log('🟣 Using Node adapter for Heroku deployment');
    return node({
      mode: 'standalone',
    });
  }

  // Fly.io deployment
  if (isFlyioDeploy) {
    console.log('✈️ Using Node adapter for Fly.io deployment');
    return node({
      mode: 'standalone',
    });
  }

  // Default: Node adapter for Kubernetes/standard deployments
  console.log('🟢 Using Node adapter for standard deployment');
  return node({
    mode: 'standalone',
=======
  if (isCloudflareDeploy) {
    console.log("🟡 Cloudflare adapter unavailable, using Node adapter");
    return node({
      mode: "standalone",
    });
  }

  if (isVercelDeploy && vercelAdapter) {
    console.log("▲ Using Vercel adapter for deployment");
    return vercelAdapter({
      webAnalytics: { enabled: true },
      speedInsights: { enabled: true },
      imagesConfig: {
        domains: ["pixelatedempathy.com", "cdn.pixelatedempathy.com"],
        sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      },
    });
  }

  if (isNetlifyDeploy && netlifyAdapter) {
    console.log("◈ Using Netlify adapter for deployment");
    return netlifyAdapter({
      // Disable edge middleware to avoid crypto resolution issues
      edgeMiddleware: false,
    });
  }

  // Default to Node adapter for standard deployments (Docker, Kubernetes, VPS)
  console.log("📦 Using Node adapter for deployment");
  return node({
    mode: "standalone",
>>>>>>> origin/master
  });
})();

// https://astro.build/config
export default defineConfig({
<<<<<<< HEAD
  site: process.env.PUBLIC_SITE_URL || 'https://pixelatedempathy.com',
  output: 'server',
  adapter,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
=======
  site: process.env.PUBLIC_SITE_URL || "https://pixelatedempathy.com",
  output: "server",
  adapter,
  trailingSlash: "ignore",
  build: {
    format: "directory",
>>>>>>> origin/master
    // Enable source maps in production for Sentry (hidden, not served to users)
    sourcemap: hasSentryDSN || !isProduction,
    copy: [
      {
<<<<<<< HEAD
        from: 'templates/email',
        to: 'templates/email'
      }
    ],
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: getChunkName,
        // Optimized chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  vite: {
    // Memory optimization: disable internal cache during builds
    cacheDir: isDockerBuild ? false : '.vite',
    // Reduce logging overhead
    logLevel: 'error',
=======
        from: "templates/email",
        to: "templates/email",
      },
    ],
    rollupOptions: {
      output:
        isVercelDeploy || isNetlifyDeploy
          ? {}
          : {
            // Manual chunk splitting for better caching
            manualChunks: getChunkName,
            // Optimized chunk naming for better caching
            chunkFileNames: "assets/[name]-[hash].js",
            entryFileNames: "assets/[name]-[hash].js",
            assetFileNames: "assets/[name]-[hash].[ext]",
          },
    },
  },
  vite: {
    // Memory optimization: disable internal cache during builds
    cacheDir: isDockerBuild ? false : ".vite",
    // Reduce logging overhead
    logLevel: "error",
>>>>>>> origin/master
    server: {
      watch: {
        ignored: [
          // Aggressive node_modules exclusion at Vite level
<<<<<<< HEAD
          (p) => (
            p.includes('/node_modules/') ||
            p.includes('\\node_modules\\') ||
            p.includes('/.venv/') ||
            p.includes('\\.venv\\') ||
            p.includes('/ai/') ||
            p.includes('\\ai\\')
          ),
          '**/node_modules/**',
          '/node_modules/**',
          'node_modules/**',
          './node_modules/**',
=======
          (p) =>
            p.includes("/node_modules/") ||
            p.includes("\\node_modules\\") ||
            p.includes("/.venv/") ||
            p.includes("\\.venv\\") ||
            p.includes("/ai/") ||
            p.includes("\\ai\\"),
          "**/node_modules/**",
          "/node_modules/**",
          "node_modules/**",
          "./node_modules/**",
>>>>>>> origin/master
        ],
      },
    },
    build: {
      // Enable hidden source maps in production for Sentry upload (not served to users)
<<<<<<< HEAD
      sourcemap: (!isProduction || hasSentryDSN) ? 'hidden' : false,
      target: 'node24',
      chunkSizeWarningLimit: isProduction ? 500 : 1500,
      // Memory optimization: Use esbuild for minification (faster, lower memory than terser)
      minify: 'esbuild',
=======
      sourcemap: !isProduction || hasSentryDSN ? "hidden" : false,
      target: "node24",
      chunkSizeWarningLimit: isProduction ? 500 : 1500,
      // Memory optimization: Use esbuild for minification (faster, lower memory than terser)
      minify: "esbuild",
>>>>>>> origin/master
      // Limit parallel file operations to prevent resource exhaustion
      maxParallelFileOps: 1,
      // Reduce Vite internal cache during build to save memory
      reportCompressedSize: false,
      rollupOptions: {
        external: [
<<<<<<< HEAD
          '@google-cloud/storage',
          '@aws-sdk/client-s3',
          '@aws-sdk/client-dynamodb',
          '@aws-sdk/client-kms',
          'redis',
          'ioredis',
          'pg',
          'mysql2',
          'sqlite3',
          'better-sqlite3',
          'better-auth',
          'better-auth/adapters/mongodb',
          'better-auth/adapters/drizzle',
          'better-auth/react',
          'axios',
          'bcryptjs',
          'jsonwebtoken',
          'pdfkit',
          '@tensorflow/tfjs',
          '@tensorflow/tfjs-layers',
          'three',
          '@react-three/fiber',
          '@react-three/drei',
          'mongodb',
          'recharts',
          'chart.js',
          '@opentelemetry/api',
          '@opentelemetry/auto-instrumentations-node',
          '@opentelemetry/exporter-metrics-otlp-http',
          '@opentelemetry/exporter-trace-otlp-http',
          '@opentelemetry/resources',
          '@opentelemetry/sdk-metrics',
          '@opentelemetry/sdk-node',
          '@opentelemetry/sdk-trace-base',
          '@opentelemetry/semantic-conventions',
          'src/config/env.config.ts',
=======
          "@google-cloud/storage",
          "@aws-sdk/client-s3",
          "@aws-sdk/client-dynamodb",
          "@aws-sdk/client-kms",
          "redis",
          "ioredis",
          "pg",
          "mysql2",
          "sqlite3",
          "better-sqlite3",
          "better-auth",
          "better-auth/adapters/mongodb",
          "better-auth/adapters/drizzle",
          "better-auth/react",
          "axios",
          "bcryptjs",
          "jsonwebtoken",
          "pdfkit",
          "@tensorflow/tfjs",
          "@tensorflow/tfjs-layers",
          "three",
          "@react-three/fiber",
          "@react-three/drei",
          "mongodb",
          "recharts",
          "chart.js",
          "@opentelemetry/api",
          "@opentelemetry/auto-instrumentations-node",
          "@opentelemetry/exporter-metrics-otlp-http",
          "@opentelemetry/exporter-trace-otlp-http",
          "@opentelemetry/resources",
          "@opentelemetry/sdk-metrics",
          "@opentelemetry/sdk-node",
          "@opentelemetry/sdk-trace-base",
          "@opentelemetry/semantic-conventions",
          "src/config/env.config.ts",
>>>>>>> origin/master
        ],
        onwarn(warning, warn) {
          if (
            warning.code === "SOURCEMAP_ERROR" ||
<<<<<<< HEAD
            (warning.message && warning.message.includes("didn't generate a sourcemap"))
          ) {
            return
          }
          if (warning.message && (
            warning.message.includes('externalized for browser compatibility') ||
            warning.message.includes('icon "-"') ||
            warning.message.includes('failed to load icon \'-\'') ||
            warning.message.includes('src/config/env.config.ts') ||
            warning.message.includes('Rollup failed to resolve import')
          )) {
            return
          }
          warn(warning)
        }
      }
    },
    plugins: [
      // Bundle analyzer for production builds
      shouldAnalyzeBundle && visualizer({
        filename: 'dist/bundle-analysis.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        '~': path.resolve('./src'),
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@utils': path.resolve('./src/utils'),
        '@lib': path.resolve('./src/lib'),
        'src/': path.resolve('./src'),
      },
      extensions: ['.astro', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'],
      preserveSymlinks: false,
      mainFields: ['module', 'main'],
      conditions: ['import', 'module', 'browser', 'default'],
    },
    ssr: {
      external: [
        '@google-cloud/storage',
        '@aws-sdk/client-s3',
        '@aws-sdk/client-dynamodb',
        '@aws-sdk/client-kms',
        'redis',
        'ioredis',
        'pg',
        'mysql2',
        'sqlite3',
        'better-sqlite3',
        'better-auth',
        'better-auth/adapters/mongodb',
        'better-auth/adapters/drizzle',
        'better-auth/react',
        'axios',
        'bcryptjs',
        'jsonwebtoken',
        'pdfkit',
        'sharp',
        'canvas',
        'puppeteer',
        'playwright',
        '@sentry/profiling-node',
        '@tensorflow/tfjs',
        '@tensorflow/tfjs-layers',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'mongodb',
        'recharts',
        'chart.js',
=======
            (warning.message &&
              warning.message.includes("didn't generate a sourcemap"))
          ) {
            return;
          }
          if (
            warning.message &&
            (warning.message.includes(
              "externalized for browser compatibility",
            ) ||
              warning.message.includes('icon "-"') ||
              warning.message.includes("failed to load icon '-'") ||
              warning.message.includes("src/config/env.config.ts") ||
              warning.message.includes("Rollup failed to resolve import"))
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
    plugins: [
      // Bundle analyzer for production builds
      shouldAnalyzeBundle &&
      visualizer({
        filename: "dist/bundle-analysis.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "~": path.resolve("./src"),
        "@": path.resolve("./src"),
        "@components": path.resolve("./src/components"),
        "@layouts": path.resolve("./src/layouts"),
        "@utils": path.resolve("./src/utils"),
        "@lib": path.resolve("./src/lib"),
        "src/": path.resolve("./src"),
      },
      extensions: [".astro", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
      preserveSymlinks: false,
      mainFields: ["module", "main"],
      conditions: ["import", "module", "browser", "default"],
    },
    ssr: {
      external: [
        "@google-cloud/storage",
        "@aws-sdk/client-s3",
        "@aws-sdk/client-dynamodb",
        "@aws-sdk/client-kms",
        "redis",
        "ioredis",
        "pg",
        "mysql2",
        "sqlite3",
        "better-sqlite3",
        "better-auth",
        "better-auth/adapters/mongodb",
        "better-auth/adapters/drizzle",
        "better-auth/react",
        "axios",
        "bcryptjs",
        "jsonwebtoken",
        "pdfkit",
        "sharp",
        "canvas",
        "puppeteer",
        "playwright",
        "@sentry/profiling-node",
        "@tensorflow/tfjs",
        "@tensorflow/tfjs-layers",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
        "mongodb",
        "recharts",
        "chart.js",
>>>>>>> origin/master
      ],
    },
    optimizeDeps: {
      // Disable dependency pre-bundling in Docker builds to save memory
      disabled: isDockerBuild,
      entries: [
<<<<<<< HEAD
        'src/pages/**/*.{ts,tsx,js,jsx,astro}',
        'src/layouts/**/*.{ts,tsx,js,jsx,astro}',
        'src/components/**/*.{ts,tsx,js,jsx,astro}',
        'src/middleware.ts',
      ],
      exclude: [
        '@aws-sdk/client-s3',
        '@aws-sdk/client-kms',
        'sharp',
        'canvas',
        'puppeteer',
        'playwright',
        '@sentry/profiling-node',
        'pdfkit',
        'better-auth',
        'better-auth/adapters/mongodb',
        'better-auth/adapters/drizzle',
        'better-auth/react',
        'axios',
        'bcryptjs',
        'jsonwebtoken',
        'recharts',
        'lucide-react',
        '@tensorflow/tfjs',
        '@tensorflow/tfjs-layers',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'mongodb',
        'recharts',
        'chart.js',
        '@spotlightjs/astro',
        'framer-motion',
        'zustand',
        'jotai',
        '@tanstack/react-query',
        '@opentelemetry/api',
        '@opentelemetry/auto-instrumentations-node',
        '@opentelemetry/exporter-metrics-otlp-http',
        '@opentelemetry/exporter-trace-otlp-http',
        '@opentelemetry/resources',
        '@opentelemetry/sdk-metrics',
        '@opentelemetry/sdk-node',
        '@opentelemetry/sdk-trace-base',
        '@opentelemetry/semantic-conventions',
=======
        "src/pages/**/*.{ts,tsx,js,jsx,astro}",
        "src/layouts/**/*.{ts,tsx,js,jsx,astro}",
        "src/components/**/*.{ts,tsx,js,jsx,astro}",
        "src/middleware.ts",
      ],
      exclude: [
        "@aws-sdk/client-s3",
        "@aws-sdk/client-kms",
        "sharp",
        "canvas",
        "puppeteer",
        "playwright",
        "@sentry/profiling-node",
        "pdfkit",
        "better-auth",
        "better-auth/adapters/mongodb",
        "better-auth/adapters/drizzle",
        "better-auth/react",
        "axios",
        "bcryptjs",
        "jsonwebtoken",
        "recharts",
        "lucide-react",
        "@tensorflow/tfjs",
        "@tensorflow/tfjs-layers",
        "three",
        "@react-three/fiber",
        "@react-three/drei",
        "mongodb",
        "recharts",
        "chart.js",
        "@spotlightjs/astro",
        "framer-motion",
        "zustand",
        "jotai",
        "@tanstack/react-query",
        "@opentelemetry/api",
        "@opentelemetry/auto-instrumentations-node",
        "@opentelemetry/exporter-metrics-otlp-http",
        "@opentelemetry/exporter-trace-otlp-http",
        "@opentelemetry/resources",
        "@opentelemetry/sdk-metrics",
        "@opentelemetry/sdk-node",
        "@opentelemetry/sdk-trace-base",
        "@opentelemetry/semantic-conventions",
>>>>>>> origin/master
      ],
    },
  },
  integrations: (() => {
<<<<<<< HEAD
    const MIN_DEV = process.env.MIN_DEV === '1'
    const base = [
      react({
        include: ['**/react/*', '**/components/**/*'],
        experimentalReactChildren: true,
      })
    ]
    if (MIN_DEV) return base
=======
    const MIN_DEV = process.env.MIN_DEV === "1";
    const base = [
      react({
        include: ["**/react/*", "**/components/**/*"],
        experimentalReactChildren: true,
      }),
    ];
    if (MIN_DEV) return base;
>>>>>>> origin/master
    return [
      ...base,
      UnoCSS({ injectReset: true }),
      icon({
        include: {
          lucide: [
<<<<<<< HEAD
            'calendar', 'user', 'settings', 'heart', 'brain', 'shield-check', 'info', 'arrow-left', 'shield', 'user-plus'
          ]
        },
        svgdir: './src/icons',
      }),
      ...(hasSentryDSN ? [
        sentry({
          sourceMapsUploadOptions: {
            org: process.env.SENTRY_ORG || 'pixelated-empathy-dq',
            project: process.env.SENTRY_PROJECT || 'pixel-astro',
            authToken: process.env.SENTRY_AUTH_TOKEN,
            // Include release for proper stack trace linking and code mapping
            release:
              process.env.SENTRY_RELEASE ||
              process.env.npm_package_version ||
              undefined,
            telemetry: false,
            sourcemaps: {
              assets: ['./.astro/dist/**/*.js', './.astro/dist/**/*.mjs', './dist/**/*.js', './dist/**/*.mjs'],
              ignore: ['**/node_modules/**'],
              filesToDeleteAfterUpload: ['**/*.map', '**/*.js.map'],
            },
          },
        }),
        // Temporarily disable SpotlightJS due to build issues
        // ...(shouldUseSpotlight ? [spotlightjs()] : [])
      ] : []),
    ]
  })(),
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
=======
            "calendar",
            "user",
            "settings",
            "heart",
            "brain",
            "shield-check",
            "info",
            "arrow-left",
            "shield",
            "user-plus",
          ],
        },
        svgdir: "./src/icons",
      }),
      ...(hasSentryDSN
        ? [
          sentry({
            sourceMapsUploadOptions: {
              org: process.env.SENTRY_ORG || "pixelated-empathy-dq",
              project: process.env.SENTRY_PROJECT || "pixel-astro",
              authToken: process.env.SENTRY_AUTH_TOKEN,
              // Include release for proper stack trace linking and code mapping
              release:
                process.env.SENTRY_RELEASE ||
                process.env.npm_package_version ||
                undefined,
              telemetry: false,
              sourcemaps: {
                assets: [
                  "./.astro/dist/**/*.js",
                  "./.astro/dist/**/*.mjs",
                  "./dist/**/*.js",
                  "./dist/**/*.mjs",
                ],
                ignore: ["**/node_modules/**"],
                filesToDeleteAfterUpload: ["**/*.map", "**/*.js.map"],
              },
            },
          }),
          // Temporarily disable SpotlightJS due to build issues
          // ...(shouldUseSpotlight ? [spotlightjs()] : [])
        ]
        : []),
    ];
  })(),
  markdown: {
    shikiConfig: {
      theme: "github-dark",
>>>>>>> origin/master
      wrap: true,
    },
  },
  security: {
    checkOrigin: true,
  },
  server: {
    port: preferredPort,
<<<<<<< HEAD
    host: '0.0.0.0',
    strictPort: true,
    watch: {
      followSymlinks: false,
      ignored: [
        // Hard guard first: function ignore for node_modules and .venv anywhere
        (p) => (
          p.includes('/node_modules/') ||
          p.includes('\\node_modules\\') ||
          p.includes('/.venv/') ||
          p.includes('\\.venv\\') ||
          p.includes('/ai/') ||
          p.includes('\\ai\\')
        ),
        // Python virtual environments and cache
        '**/.venv/**',
        '.venv/**',
        '**/.uv/**',
        '.uv/**',
        '**/.python/**',
        '.python/**',
        '**/site-packages/**',
        '**/venv/**',
        'venv/**',
        '**/__pycache__/**',
        '__pycache__/**',
        '**/*.py',
        '**/*.pyc',
        '**/*.pyo',
        '**/*.pyd',
        '**/.ruff_cache/**',
        '.ruff_cache/**',
        '**/.pytest_cache/**',
        '.pytest_cache/**',
        // AI and data directories
        '/ai/**',
        '**/ai/**',
        '**/dataset/**',
        '**/MER2025/**',
        '**/VideoChat2/**',
        // Build and cache directories
        '/logs/**',
        'logs/**',
        '/tmp/**',
        'tmp/**',
        '/temp/**',
        'temp/**',
        '/coverage/**',
        'coverage/**',
        // Node modules (should already be ignored but being explicit)
        '**/node_modules/**',
        '/node_modules/**',
        'node_modules/**',
        // pnpm and Vite caches inside node_modules
        '**/node_modules/.pnpm/**',
        'node_modules/.pnpm/**',
        '**/node_modules/.vite/**',
        'node_modules/.vite/**',
        '**/node_modules/.cache/**',
        'node_modules/.cache/**',
        // miscellaneous caches
        '**/.pnpm/**',
        '.pnpm/**',
        '**/.vite/**',
        '.vite/**',
        '**/.cache/**',
        '.cache/**',
        // MCP server
        '/mcp_server/**',
        'mcp_server/**',
        '**/mcp_server/**',
        // Other ignored paths
        '/env/**',
        'env/**',
        '**/.git/**',
        '**/.DS_Store',
        '**/dist/**',
        '**/.astro/**',
        // Final guard: regex-based ignore for ai/.venv on any platform
        /\/ai\/\.venv\//,
        // Guard for any .venv path (root or nested)
        /\/.venv\//,
        /\.venv\//,
      ],
      usePolling: false,
    },
    fs: {
      strict: true,
      allow: [
        path.resolve('./src'),
        path.resolve('./public'),
        path.resolve('./.astro'),
      ],
      deny: [
        'node_modules',
        '/node_modules',
        '**/node_modules/**',
        './node_modules',
        './node_modules/**',
        'ai',
        '/ai',
        '**/ai/**',
        '.venv',
        '/.venv',
        '**/.venv/**',
      ],
    },
=======
    host: "0.0.0.0",
    strictPort: true,
>>>>>>> origin/master
  },

  preview: {
    port: 4322,
<<<<<<< HEAD
    host: '0.0.0.0',
  },
  image: {
    service: passthroughImageService(),
    domains: ['pixelatedempathy.com', 'cdn.pixelatedempathy.com'],
=======
    host: "0.0.0.0",
  },
  image: {
    service: passthroughImageService(),
    domains: ["pixelatedempathy.com", "cdn.pixelatedempathy.com"],
>>>>>>> origin/master
  },
  /* redirects: {
    '/admin': '/admin/dashboard',
    '/docs': '/docs/getting-started',
  }, */
  devToolbar: {
    enabled: isDevelopment,
  },
});
