# Technical Architecture

## Frontend
- Astro + React for UI/UX
- Therapist dashboard, session interface, evaluation tools
- Modular components from `pixelated_components`

## Backend
- Node.js/TypeScript API (REST/SSE)
- Database via `pixelated_db` (PostgreSQL recommended)
- AI services via `pixelated_ai` (LLM, bias detection, recommendations)
- SSE server via `pixelated_serena`

## AI Agent Integration
- Start with mock/placeholder agent (5-10% dataset)
- Plan for full LLM upgrade (MentalLLaMA, etc.)
- Bias detection and evaluation modules

## Hosting & Deployment
- Dockerized multi-stage builds
- VPS or cloud (Azure, GCP, AWS)
- CI/CD via Azure Pipelines
- Security: Non-root containers, encrypted data, audit logging
