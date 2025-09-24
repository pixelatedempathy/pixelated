# Technical Debt Log

## Runlog Summary (short)
- Multiple dev services started: analytics, bias-detection, worker, AI services
- Dev server runs with increased Node heap (NODE_OPTIONS=--max-old-space-size=8192)
- Notable services: Analytics (port 8003), JobQueueService, PerformanceOptimizer (background workers), memory/cache services initialized

## Actionable Recommendations
- Add a lightweight health-check aggregator that queries all local dev services and surfaces readiness
- Document required env vars and external endpoints (Serena/SSE, Redis, Mongo, Vercel KV) in a single `ENV.sample` for onboarding
- Consider adding a small `pnpm` script to validate essential services before `dev:all-services`

## Notes
- This file created to replace lost "technical debt" file during merge. Keep concise, append future runlog snippets here.
