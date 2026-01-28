# Pixelated Empathy: Claude Code Instructions

## 🎭 Project Identity
**Pixelated Empathy** is an enterprise-grade platform for psychological AI and therapeutic dialogue practice.
- **Mission**: Build empathy-driven technology prioritizing human connection, psychological safety, and ethical AI.

## 📦 Package Managers (Critical)
- **Frontend/Node**: `pnpm` ONLY
- **AI/Python**: `uv` ONLY

## 🚀 Essential Commands
- `pnpm dev:all-services` — Start everything
- `pnpm check:all` — Lint + Typecheck + Format
- `pnpm test:all` — Run all tests
- `uv run <script>` — Run Python scripts

## 📝 Code Conventions
- **TypeScript**: 2 spaces, no semicolons, single quotes, trailing commas, type-first imports (@/ aliases).
- **Python**: Follow PEP 8, type hints required, managed via `uv`.

## 🔒 Security & Ethics
1. **Never expose sensitive data** (Redact API keys, PII).
2. **Validate all input** (Emotion scores, crisis signals).
3. **Privacy**: Respect HIPAA-level standards for mental health data.

---
*Building technology that helps humans connect more deeply.*