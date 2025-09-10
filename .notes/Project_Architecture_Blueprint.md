# Project Architecture Blueprint

*Generated: September 10, 2025*

---

## 1. Architecture Detection and Analysis

### Technology Stacks
- **Frontend**: Astro (Node.js), React (TypeScript/JSX), UnoCSS, Vite
- **Backend**: Node.js (TypeScript), Python (Flask, FastAPI, AI/ML libraries)
- **AI/ML**: PyTorch, Transformers, Fairlearn, SHAP, LIME, HuggingFace, custom bias detection
- **Data**: PostgreSQL, MongoDB, Redis, Faiss, Pandas, Numpy
- **DevOps**: Docker, Azure Pipelines, Helm, Kubernetes, Vercel
- **Testing**: Vitest, Playwright, Pytest
- **Monitoring/Security**: Sentry, NewRelic, HIPAA compliance

### Architectural Patterns
- **Primary**: Microservices + Layered (auto-detected)
- **Patterns Evident**: Modular service boundaries, dependency injection, event-driven components, plugin/adapters, hybrid monolith for core web app

---

## 2. Architectural Overview
- **Guiding Principles**: Separation of concerns, extensibility, testability, security-first, performance optimization
- **Boundaries**: Clear split between frontend, backend, AI/ML, and data layers; service boundaries enforced via API contracts and adapters
- **Hybrid Patterns**: Microservices for AI/ML, monolithic core for web app, plugin-based extension for AI services

---

## 3. Architecture Visualization (C4 Diagrams)
- **Level 1: System Context**
  - Users interact via web UI (Astro/React)
  - Web UI communicates with Node.js backend
  - Backend orchestrates AI/ML services (Python)
  - Data layer: PostgreSQL, MongoDB, Redis
  - Monitoring: Sentry, NewRelic
- **Level 2: Container Diagram**
  - Containers: Web UI, API server, AI/ML service, Database, Redis, Monitoring
- **Level 3: Component Diagram**
  - Components: Auth, Bias Detection, Analytics, Patient Model, Recommendation Engine, Data Access, Notification, Logging
- **Level 4: Code/Module Diagram**
  - Modules: src/components, src/services, src/lib/ai, src/pages, src/layouts, src/hooks, src/utils

---

## 4. Core Architectural Components
### Example: Bias Detection Service
- **Purpose**: AI-powered bias detection for mental health
- **Internal Structure**: Python microservice, modular adapters, circuit breaker, job queue, metrics collector
- **Interaction**: REST API, event queue, Redis job queue, Python bridge
- **Evolution**: Extensible via plugin adapters, config-driven extension, Python/TS bridge

### Example: Patient Model Service
- **Purpose**: Patient profile and recommendation engine
- **Internal Structure**: TypeScript service, dependency injection, analytics pipeline
- **Interaction**: Service factory, emotion synthesizer, profile service, KVStore
- **Evolution**: Factory pattern, singleton for shared state, testable via DI

---

## 5. Architectural Layers and Dependencies
- **Layers**: Presentation (Astro/React), Application (Node.js/TS), AI/ML (Python), Data (DB/Redis)
- **Dependency Rules**: No direct data access from UI; all data via API; AI/ML isolated via adapters
- **Abstraction**: Interfaces, service factories, plugin adapters
- **Violations**: No circular dependencies detected; dependency injection used to maintain separation

---

## 6. Data Architecture
- **Domain Model**: Patient, Session, BiasReport, Analytics
- **Entity Relationships**: Patient ↔ Session ↔ BiasReport
- **Data Access**: Repositories (TS), DAOs (Python), ORM (TypeORM, SQLAlchemy)
- **Transformation**: DTOs, mappers, validation pipelines
- **Caching**: Redis for job queues, session cache
- **Validation**: Zod (TS), Pydantic (Python)

---

## 7. Cross-Cutting Concerns Implementation
- **AuthN/AuthZ**: JWT, Clerk, custom RBAC, permission checks
- **Error Handling**: Exception wrappers, circuit breakers, fallback strategies, Sentry integration
- **Logging/Monitoring**: Sentry, custom logger, metrics collector, performance profiler
- **Validation**: Zod/Pydantic, business rule validators, error reporting
- **Config Management**: .env, Azure KeyVault, feature flags (LaunchDarkly)

---

## 8. Service Communication Patterns
- **Boundaries**: REST APIs, event queues, Python bridges
- **Protocols**: HTTP/REST, WebSocket, Redis pub/sub
- **Sync/Async**: Synchronous for UI/API, async for job queues and ML tasks
- **API Versioning**: Path-based, semantic versioning
- **Service Discovery**: Kubernetes, Docker Compose
- **Resilience**: Circuit breaker, retries, health checks

---

## 9. Technology-Specific Architectural Patterns
### React
- Component composition, hooks, context, state management (Jotai/Zustand)
- Routing: react-router-dom
- Data fetching: SWR, custom hooks
- Rendering optimization: memoization, suspense

### Python
- Modular services, dependency injection, async tasks (Celery), adapters, bridge patterns
- OOP for core services, functional for pipelines
- Framework integration: Flask, FastAPI

### Node.js/TypeScript
- Service factories, DI, plugin adapters, event-driven modules
- ORM: TypeORM, custom DAOs

---

## 10. Implementation Patterns
- **Interface Design**: Segregation via TS interfaces, Python ABCs
- **Service Implementation**: Factory pattern, DI, singleton for shared state
- **Repository**: Query builders, transaction management, concurrency via async/await
- **Controller/API**: Request/response wrappers, validation, versioning
- **Domain Model**: Entity/value object patterns, domain events

---

## 11. Testing Architecture
- **Strategies**: Unit (Vitest, Pytest), Integration (Playwright, Pytest), System (E2E)
- **Boundaries**: Test doubles, mocks, isolated services
- **Test Data**: Fixtures, in-memory stores
- **Tools**: Vitest, Playwright, Pytest, coverage reports

---

## 12. Deployment Architecture
- **Topology**: Multi-container (Docker Compose, Kubernetes), cloud-native (Azure, Vercel)
- **Env Adaptation**: .env, Azure KeyVault, config files
- **Runtime Dependency**: Health checks, readiness probes
- **Config Management**: Environment variables, secrets
- **Containerization**: Multi-stage Dockerfile, non-root user, healthcheck
- **Orchestration**: Azure Pipelines, Helm, Kubernetes

---

## 13. Extension and Evolution Patterns
- **Feature Addition**: Add new service/component in src/services or src/lib/ai; register via DI or factory
- **Modification**: Use interface/adapter for backward compatibility; deprecate via config
- **Integration**: Adapter pattern for external systems; anti-corruption layer for legacy

---

## 14. Architectural Pattern Examples
### Dependency Injection (TypeScript)
```typescript
export function createProductionService(): PatientResponseService {
  const kvStore = new KVStore('patient_profiles_', true)
  const profileService = new PatientProfileService(kvStore)
  return createPatientResponseService({ profileService })
}
```
### Singleton Pattern (TypeScript)
```typescript
export function getSharedEmotionSynthesizer(): EmotionSynthesizer {
  return EmotionSynthesizer.getInstance()
}
```
### Python Service Adapter (Python)
```python
class BiasDetectionService:
    def __init__(self, model, cache):
        self.model = model
        self.cache = cache
    def analyze(self, data):
        # ...
```

---

## 15. Architectural Decision Records
- **Microservices for AI/ML**: Chosen for scalability and isolation; considered monolith but rejected for flexibility
- **Astro + React**: Selected for modern SSR and component model; alternatives: Next.js, Svelte
- **Python for ML**: Chosen for ecosystem and library support; alternatives: Node.js ML, Java
- **DI/Factory Pattern**: Adopted for testability and extensibility; alternatives: direct instantiation
- **Containerization**: Multi-stage Docker for security and performance; alternatives: single-stage, VM

---

## 16. Architecture Governance
- **Consistency**: Enforced via linting, type checks, CI pipelines
- **Automated Checks**: ESLint, Prettier, Vitest, Pytest, Sentry
- **Review Process**: PR reviews, architectural documentation
- **Documentation**: AGENTS.md, README.md, this blueprint

---

## 17. Blueprint for New Development
- **Workflow**: Start with feature type (UI, service, AI/ML); create in appropriate module; register via DI/factory; test with Vitest/Pytest; document in AGENTS.md
- **Templates**: Use base classes/interfaces in src/services, src/lib/ai; follow file organization
- **Dependencies**: Declare in package.json/pyproject.toml; use DI for new services
- **Documentation**: Update AGENTS.md, README.md, blueprint
- **Pitfalls**: Avoid direct data access from UI; maintain separation; test all layers; monitor performance

---

*Keep this blueprint updated as the architecture evolves. Review after major feature additions or refactors.*
