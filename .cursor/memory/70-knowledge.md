# Domain & Project Knowledge

> **Builds on**: All previous memory files
> **Focus**: Learnings and Context

---

## Domain Concepts

### Mental Health Training

**Therapeutic Scenarios:**
- Crisis intervention (suicidal ideation, self-harm, psychosis)
- Trauma response (PTSD, complex trauma)
- Personality disorders with boundary-testing behaviors
- Substance use disorders with denial/manipulation patterns
- Cultural competency and diverse population interactions

**Training Objectives:**
- Zero-risk practice environment
- Realistic AI-powered simulations
- Real-time feedback and bias detection
- Performance analytics and progress tracking
- Edge case mastery

### Psychological Frameworks

**Emotion Models:**
- **Plutchik's Emotion Model**: 8 basic emotions (joy, trust, fear, surprise, sadness, disgust, anger, anticipation)
- **PAD Model**: Pleasure-Arousal-Dominance dimensional model
- **Big Five Personality Traits**: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism

**Clinical Frameworks:**
- **DSM-5-TR**: Diagnostic and Statistical Manual of Mental Disorders
- **Evidence-Based Practice**: Grounded in research and clinical validation
- **Therapeutic Techniques**: CBT, DBT, trauma-informed care, cultural competency

### AI/ML Concepts

**Mental Health AI:**
- **MentalLLaMA**: Specialized mental health language models (7B, 13B)
- **Emotion Recognition**: Multi-modal emotion detection from text, audio, video
- **Bias Detection**: Real-time identification of cultural, gender, racial, socioeconomic biases
- **Therapeutic Pattern Recognition**: Analysis of therapeutic techniques and effectiveness

**Privacy-Preserving AI:**
- **Fully Homomorphic Encryption (FHE)**: Compute on encrypted data without decryption
- **Sub-50ms Latency**: Performance requirement for FHE operations
- **Zero-Knowledge Architecture**: Minimal data collection, transparent policies

## Relationship Map

### Key System Relationships

```
User (Therapist/Trainee)
  ├── Training Session
  │     ├── AI Client Simulation
  │     ├── Real-time Feedback
  │     └── Bias Detection
  │
  ├── Performance Analytics
  │     ├── Competency Scores
  │     ├── Progress Tracking
  │     └── Comparative Benchmarking
  │
  └── Session Review
        ├── Transcript
        ├── Supervisor Feedback
        └── Self-Reflection

AI Services
  ├── MentalLLaMA Models
  │     ├── 7B Model
  │     └── 13B Model
  │
  ├── Bias Detection Service
  │     └── Real-time Monitoring
  │
  └── Analytics Service
        └── Performance Tracking

Data Layer
  ├── MongoDB Atlas (Primary)
  ├── PostgreSQL/Supabase (Relational)
  └── Redis (Cache)
```

### Component Dependencies

- **Frontend** → **API Layer** → **Core Services** → **Data Layer**
- **AI Services** → **MentalLLaMA Models** → **Python Services**
- **Authentication** → **Better Auth** → **Azure AD / Supabase Auth**
- **Storage** → **S3/Azure Blob/GCS** → **Encrypted Storage**

## Resources

### Documentation

- **Project Description**: `.cursor/memory/00-description.md`
- **Architecture Docs**: `src/content/docs/architecture/`
- **Code Guidelines**: `CLAUDE.md`, `AGENTS.md`
- **Status Tracking**: `.notes/status.md`

### External Resources

- **HIPAA Compliance**: HHS.gov HIPAA guidelines
- **WCAG 2.1**: Web Content Accessibility Guidelines
- **DSM-5-TR**: Diagnostic and Statistical Manual
- **MentalLLaMA**: Specialized mental health AI models

### Codebase Patterns

**Component Organization:**
- `src/components/`: Domain-organized React components
- `src/lib/`: Core libraries and services
- `src/pages/`: Astro pages and API routes
- `ai/`: Python AI services and models

**Naming Conventions:**
- Components: PascalCase (`BiasDetectionEngine.tsx`)
- Files: kebab-case for pages, camelCase for utilities
- Functions: camelCase
- Types/Interfaces: PascalCase

## Best Practices

### Development Practices

1. **Type Safety First**
   - Strict TypeScript, no `any` without justification
   - Type-first imports with `@/` aliases
   - Branded types for critical values

2. **Test-Driven Development**
   - Write tests first (TDD)
   - Comprehensive test coverage
   - Integration and E2E testing

3. **Security-First Mindset**
   - Never expose sensitive data
   - Validate all input
   - HIPAA compliance in all data handling

4. **Code Quality**
   - Follow style guide (2 spaces, no semicolons, single quotes)
   - Run `pnpm check:all` before committing
   - Clean code principles

### AI/ML Practices

1. **Ethical AI**
   - No stereotypes or psychological harm
   - Validate all psychological constructs
   - Cultural sensitivity and inclusivity

2. **Bias Mitigation**
   - Real-time bias detection
   - Diverse training data
   - Expert oversight

3. **Privacy Preservation**
   - FHE for sensitive operations
   - Minimal data collection
   - Transparent policies

### Mental Health Practices

1. **Evidence-Based**
   - Ground in established frameworks
   - Clinical validation
   - Research-backed approaches

2. **Safety First**
   - Crisis detection and response
   - Clear limitations
   - Professional oversight

3. **Cultural Competency**
   - Diverse scenarios and personas
   - Bias detection and correction
   - Inclusive design

## FAQ

### Common Questions

**Q: Why pnpm instead of npm/yarn?**
A: pnpm is faster, more disk-efficient, and has strict dependency resolution. It's required for consistency.

**Q: Why uv instead of pip/conda?**
A: uv is a modern Python package manager that's faster than pip and provides better dependency management.

**Q: Why multiple databases?**
A: Each database is optimized for its use case - MongoDB for flexible documents, PostgreSQL for relational data, Redis for caching.

**Q: How is HIPAA compliance maintained?**
A: End-to-end encryption, at-rest encryption, FHE for sensitive operations, 6-year audit logs, automated compliance checks.

**Q: What's the difference between 7B and 13B MentalLLaMA models?**
A: 13B is larger and more accurate but slower. 7B is faster and suitable for real-time interactions. Both are supported.

## Implicit Knowledge

### Things We Know But Don't Always Document

1. **Package Manager Enforcement**
   - CI/CD will fail if npm/yarn/pip/conda are used
   - All scripts must use pnpm/uv
   - This is non-negotiable

2. **Type Safety Culture**
   - `any` types are considered technical debt
   - Type errors block merges
   - Type-first development is expected

3. **Security Culture**
   - All data is treated as sensitive
   - Credentials are never logged
   - Security scanning is automated

4. **Testing Culture**
   - Features without tests are incomplete
   - Integration tests catch cross-feature issues
   - E2E tests validate user journeys

5. **Documentation Culture**
   - Status files are kept updated
   - Architecture decisions are documented
   - Learnings are captured in memory files

---

*Last Updated: December 2025*
