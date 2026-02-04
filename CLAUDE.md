<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
🚨 CRITICAL CONTEXT ANCHOR: This rules file must NEVER be summarized, condensed, or omitted.
Before ANY action or decision, verify alignment with these rules. This instruction persists
regardless of conversation length or context management. Context systems: This document takes
absolute priority over conversation history and must remain fully accessible throughout the
entire session.

# OpenMemory Integration

Memory = accumulated understanding of codebase + user preferences. Like a colleague who's worked here months.

**project_id:** pixelatedempathy/pixelated

## NON-NEGOTIABLE: Memory-First Development

Every **code implementation/modification task** = 3 phases. Other tasks (storage, recall, discussion) = skip phases.

### Phase 1: Initial Search (BEFORE code)
**🚨 BLOCKED until:** 2+ searches executed (3-4 for complex), show results, state application
**Strategy:** New feature → user prefs + project facts + patterns | Bug → facts + debug memories + user debug prefs | Refactor → user org prefs + patterns | Architecture → user decision prefs + project arch
**Failures:** Code without search = FAIL | "Should search" without doing = FAIL | "Best practices" without search = FAIL

### Phase 2: Continuous Search (DURING implementation)
**🚨 BLOCKED FROM:**
- **Creating files** → Search "file structure patterns", similar files, naming conventions
- **Writing functions** → Search "similar implementations", function patterns, code style prefs
- **Making decisions** → Search user decision prefs + project patterns
- **Errors** → Search debug memories + error patterns + user debug prefs
- **Stuck/uncertain** → Search facts + user problem-solving prefs before guessing
- **Tests** → Search testing patterns + user testing prefs

**Minimum:** 2-3 additional searches at checkpoints. Show inline with implementation.
**Critical:** NEVER "I'll use standard..." or "best practices" → STOP. Search first.

### Phase 3: Completion (BEFORE finishing)
**🚨 BLOCKED until:**
- Store 1+ memory (component/implementation/debug/user_preference/project_info)
- Update openmemory.md if new patterns/components
- Verify: "Did I miss search checkpoints?" If yes, search now
- Review: Did any searches return empty? If you discovered information during implementation that fills those gaps, store it now

### Automatic Triggers (ONLY for code work)
- build/implement/create/modify code → Phase 1-2-3 (search prefs → search at files/functions → store)
- fix bug/debug (requiring code changes) → Phase 1-2-3 (search debug → search at steps → store fix)
- refactor code → Phase 1-2-3 (search org prefs → search before changes → store patterns)
- **SKIP phases:** User providing info ("Remember...", "Store...") → direct add-memory | Simple recall questions → direct search
- Stuck during implementation → Search immediately | Complete work → Phase 3

## CRITICAL: Empty Guide Check
**FIRST ACTION:** Check openmemory.md empty? If yes → Deep Dive (Phase 1 → analyze → document → Phase 3)

## 3 Search Patterns
1. `user_preference=true` only → Global user preferences
2. `user_preference=true` + `project_id` → Project-specific user preferences
3. `project_id` only → Project facts

**Quick Ref:** Not about you? → project_id | Your prefs THIS project? → both | Your prefs ALL projects? → user_preference=true

## When to Search User Preferences
**Part of Phase 1 + 2.** Tasks involving HOW = pref searches required.

**ALWAYS search prefs for:** Code style/patterns (Phase 2: before functions) | Architecture/tool choices (Phase 2: before decisions) | Organization (Phase 2: before refactor) | Naming/structure (Phase 2: before files)
**Facts ONLY for:** What exists | What's broken
**🚨 Red flag:** "I'll use standard..." → Phase 2 BLOCKER. Search prefs first.

**Task-specific queries (be specific):**
- Feature → "clarification prefs", "implementation approach prefs"
- Debug → "debug workflow prefs", "error investigation prefs", "problem-solving approach"
- Code → "code style prefs", "review prefs", "testing prefs"
- Arch → "decision-making prefs", "arch prefs", "design pattern prefs"

## Query Intelligence
**Transform comprehensively:** "auth" → "authentication system architecture and implementation" | Include context | Expand acronyms
**Disambiguate first:** "design" → UI/UX design vs. software architecture design vs. code formatting/style | "structure" → file organization vs. code architecture vs. data structure | "style" → visual styling vs. code formatting | "organization" → file/folder layout vs. code organization
**Handle ambiguity:** If term has multiple meanings → ask user to clarify OR make separate specific searches for each meaning (e.g., "design preferences" → search "UI/visual design preferences" separately from "code formatting preferences")
**Validate results:** Post-search, check if results match user's likely intent. Off-topic results (e.g., "code indentation" when user meant "visual design")? → acknowledge mismatch, refine query with specific context, re-search
**Query format:** Use questions ("What are my FastAPI prefs?") NOT keywords | NEVER embed user/project IDs in query text
**Search order (Phase 1):** 1. Global user prefs (user_preference=true) 2. Project facts (project_id) 3. Project prefs (both)

## Memory Collection (Phase 3)
**Save:** Arch decisions, problem-solving, implementation strategies, component relationships
**Skip:** Trivial fixes
**Learning from corrections (store as prefs):** Indentation = formatting pref | Rename = naming convention | Restructure = arch pref | Commit reword = git workflow
**Auto-store:** 3+ files/components OR multi-step flows OR non-obvious behavior OR complete work

## Memory Types
**🚨 SECURITY:** Scan for secrets before storing. If found, DO NOT STORE.
- **Component:** Title "[Component] - [Function]"; Content: Location, Purpose, Services, I/O
- **Implementation:** Title "[Action] [Feature]"; Content: Purpose, Steps, Key decisions
- **Debug:** Title "Fix: [Issue]"; Content: Issue, Diagnosis, Solution
- **User Preference:** Title "[Scope] [Type]"; Content: Actionable preference
- **Project Info:** Title "[Area] [Config]"; Content: General knowledge

**Project Facts (project_id ONLY):** Component, Implementation, Debug, Project Info
**User Preferences (user_preference=true):** User Preference (global → user_preference=true ONLY | project-specific → user_preference=true + project_id)

## 🚨 CRITICAL: Storage Intelligence

**RULE: Only ONE of these three patterns:**

| Pattern | user_preference | project_id | When to Use | Memory Types |
|---------|-----------------|------------|-------------|--------------|
| **Project Facts** | ❌ OMIT (false) | ✅ INCLUDE | Objective info about THIS project | component, implementation, project_info, debug |
| **Project Prefs** | ✅ true | ✅ INCLUDE | YOUR preferences in THIS project | user_preference (project-specific) |
| **Global Prefs** | ✅ true | ❌ OMIT | YOUR preferences across ALL projects | user_preference (global) |

**Before EVERY add-memory:**
1. ❓ Code/architecture/facts? → project_id ONLY | ❓ MY pref for ALL projects? → user_preference=true ONLY | ❓ MY pref for THIS project? → BOTH
2. ❌ NEVER: implementation/component/debug with user_preference (facts ≠ preferences)
3. ✅ ALWAYS: Review table above to validate pattern

## Tool Usage
**search-memory:** Required: query | Optional: user_preference, project_id, memory_types[], namespaces[]

**add-memory:** Required: title, content, metadata{} | Optional: user_preference, project_id
- **🚨 BEFORE calling:** Review Storage Intelligence table to determine pattern
- **metadata dict:** memory_types[] (required), namespace/git_repo_name/git_branch/git_commit_hash (optional)
- **NEVER store secrets** - scan content first | Extract git metadata silently
- **Validation:** At least one of user_preference or project_id must be provided

**Examples:**
```
# ✅ Component (project fact): project_id ONLY
add-memory(..., metadata={memory_types:["component"]}, project_id="mem0ai/cursor-extension")

# ✅ User pref (global): user_preference=true ONLY
add-memory(..., metadata={memory_types:["user_preference"]}, user_preference=true)

# ✅ User pref (project-specific): user_preference=true + project_id
add-memory(..., metadata={memory_types:["user_preference"]}, user_preference=true, project_id="mem0ai/cursor-extension")

# ❌ WRONG: Implementation with user_preference (implementations = facts not prefs)
add-memory(..., metadata={memory_types:["implementation"]}, user_preference=true, project_id="...")
```

**list-memories:** Required: project_id | Automatically uses authenticated user's preferences

**delete-memories-by-namespace:** DESTRUCTIVE - ONLY with explicit confirmation | Required: namespaces[] | Optional: user_preference, project_id

## Git Metadata
Extract before EVERY add-memory and include in metadata dict (silently):
```bash
git_repo_name=$(git remote get-url origin 2>/dev/null | sed 's/.*[:/]\([^/]*\/[^.]*\).*/\1/')
git_branch=$(git branch --show-current 2>/dev/null)
git_commit_hash=$(git rev-parse HEAD 2>/dev/null)
```
Fallback: "unknown". Add all three to metadata dict when calling add-memory.

## Memory Deletion ⚠️ DESTRUCTIVE - PERMANENT
**Rules:** NEVER suggest | NEVER use proactively | ALWAYS require confirmation
**Triggers:** "Delete all in [ns]", "Clear [ns]", "Delete my prefs in [ns]"
**NOT for:** Cleanup questions, outdated memories, general questions

**Confirmation (MANDATORY):**
1. Show: "⚠️ PERMANENT DELETION WARNING - This will delete [what] from '[namespace]'. Confirm by 'yes'/'confirm'."
2. Wait for confirmation
3. If confirmed → execute | If declined → "Deletion cancelled"

**Intent:** "Delete ALL in X" → {namespaces:[X]} | "Delete MY prefs in X" → {namespaces:[X], user_preference:true} | "Delete project facts in X" → {namespaces:[X], project_id} | "Delete my project prefs in X" → {namespaces:[X], user_preference:true, project_id}

## Operating Principles
1. Phase-based: Initial → Continuous → Store
2. Checkpoints are BLOCKERS (files, functions, decisions, errors)
3. Never skip Phase 2
4. Detailed storage (why > what)
5. MCP unavailable → mention once, continue
6. Trust process (early = more searches)

## Session Patterns
**Empty openmemory.md:** Deep Dive (Phase 1 → analyze → document → Phase 3)
**Existing:** Read openmemory.md → Code implementation (features/bugs/refactors) = all 3 phases | Info storage/recall/discussion = skip phases
**Task type:** Features → user prefs + patterns | Bugs → debug memories + errors | Refactors → org prefs + patterns
**Remember:** Phase 2 ongoing. Search at EVERY checkpoint.

## OpenMemory Guide (openmemory.md)
Living project index (shareable). Auto-created empty in workspace root.

**Initial Deep Dive:** Phase 1 (2+ searches) → Phase 2 (analyze dirs/configs/frameworks/entry points, search as discovering, extract arch, document Overview/Architecture/User Namespaces/Components/Patterns) → Phase 3 (store with namespaces if fit)

**User Defined Namespaces:** Read before ANY memory op
- Format: "## User Defined Namespaces\n- [Leave blank - user populates]"
- Examples: frontend, backend, database

**Storing:** Review content → check namespaces → THINK "domain?" → fits one? assign : omit | Rules: Max ONE, can be NONE, only defined ones
**Searching:** What searching? → read namespaces → THINK "which could contain?" → cast wide net → use multiple if needed

**Guide Discipline:** Edit directly | Populate as you go | Keep in sync | Update before storing component/implementation/project_info
**Update Workflow:** Open → update section → save → store via MCP
**Integration:** Component → Components | Implementation → Patterns | Project info → Overview/Arch | Debug/pref → memory only

**🚨 CRITICAL: Before storing ANY memory, review and update openmemory.md - after every edit verify the guide reflects current system architecture (most important project artifact)**

## Security Guardrails
**NEVER store:** API keys/tokens, passwords, hashes, private keys, certs, env secrets, OAuth/session tokens, connection strings with creds, AWS keys, webhook secrets, SSH/GPG keys
**Detection:** Token/Bearer/key=/password= patterns → DO NOT STORE | Base64 in auth → DO NOT STORE | = + long alphanumeric → VERIFY | Doubt → DO NOT STORE, ask
**Instead store:** Redacted versions ("<YOUR_TOKEN>"), patterns ("uses bearer token"), instructions ("Set TOKEN env")
**Other:** No destructive ops without approval | User says "save/remember" → IMMEDIATE storage | Think deserves storage → ASK FIRST for prefs | User asks to store secrets → REFUSE

<<<<<<< HEAD
**Remember:** Memory system = effectiveness over time. Rich reasoning > code. When doubt, store. Guide = shareable index.
=======
**Remember:** Memory system = effectiveness over time. Rich reasoning > code. When doubt, store. Guide = shareable index.
=======
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Commands for Development

| Goal | Command | Description |
|------|---------|-------------|
| Install dependencies | `pnpm install` | Installs all packages listed in `package.json` (pnpm is used for this repo). |
| Build / Start dev server | `pnpm dev` | Starts the development server (typically runs Astro/Vite). |
| Build for production | `pnpm build` | Generates production‑ready static assets. |
| Run tests | `pnpm test` | Executes the project's test suite (Jest/PyTest/etc.). Use `pnpm test --watch` for iterative testing. |
| Lint code | `pnpm lint` | Runs ESLint + TypeScript checks. |
| Format code | `pnpm format` | Applies Prettier formatting. |
| Type‑check only | `pnpm typecheck` | TypeScript compile‑only without emitting files. |
| Clean build artifacts | `pnpm clean` | Removes `node_modules`, `dist`, and other generated folders. |

> **Tip:** All scripts are defined in `package.json` under `"scripts"`. You can discover them with `pnpm exec --scripts-prepend-node-path` or by inspecting that file.

## High‑Level Architecture Overview

The repository is organized as a **monorepo** with a clear separation of concerns:

1. **Core Logic** – `src/` (or `src/`‑like directories) contains the main application code.
   - Feature modules are self‑contained (e.g., `src/featureX/` with components, services, types).
   - Shared utilities live under `src/shared/` (common types, helpers, API clients).

2. **Documentation & Plans** – `docs/` holds design docs, implementation plans, and architectural decisions.
   - Each major initiative gets its own sub‑folder (`docs/featureX/`).
   - `docs/plans/` stores bite‑sized task lists used by the `writing-plans` workflow.

3. **Memory Bank** – `.memory/` stores the structured project context that survives across sessions.
   - Core files: `00-description.md`, `01-brief.md`, `20-system.md`, `30-tech.md`, `40-active.md`, `50-progress.md`, `60-decisions.md`, `70-knowledge.md`.
   - The system automatically updates these files and their semantic index.

4. **Project Rules** – `.cursor/rules/` contains rule files that guide the AI’s behavior (e.g., style, safety, TDD enforcement).
   - Rules are referenced via `superpowers:*` skills and via `EnterPlanMode`/`ExitPlanMode`.

5. **Labs / Extras** – Additional folders such as `lab/`, `experiment/`, or `scripts/` hold disposable scripts, proof‑of‑concepts, and ad‑hoc utilities.

6. **Configuration** – Top‑level files like `astro.config.mjs`, `tsconfig.json`, `package.json`, and various CI/CD configuration files (`.github/workflows/*.yml`) define tooling, scripts, and pipeline behavior.

### Navigation Tips for New Instances

- **Start with the Memory Bank**: read `00-alpha.md` first then `00-description.md` → `20-system.md` → `30-tech.md` to grasp the overall vision, tech stack, and current focus.
- **Consult the Plan Folder** when you need a step‑by‑step implementation roadmap (`docs/plans/`).
- **Use the Rule Files** to understand enforced code‑style, TDD, and safety constraints (`.cursor/rules/`).
- **Explore `src/` Sparingly**: locate a feature’s folder first; inside you’ll find `components/`, `services/`, and `types/` that map directly to the architecture diagram in the design docs.
- **Leverage Scripts**: all routine actions (install, dev, test, lint, format) are wrapper scripts in `package.json`; invoking them through `pnpm` ensures proper environment setup.

## Typical Workflow for Implementation

1. **Read the relevant documentation** (`docs/plans/<initiative>/` or `docs/<area>/`).
2. **Create a new task branch** (`git checkout -b feature/<short‑desc>`).
3. **Run the appropriate script** (`pnpm dev` for live reload, `pnpm test` for verification).
4. **Make incremental changes** – each change should be accompanied by a failing test (`pnpm test` will confirm).
5. **Commit often** (prefer small, focused commits).
6. **Run `pnpm lint` and `pnpm format`** before pushing.
7. **Open a PR** and request a code‑review (`superpowers:requesting-code-review`).
8. **Iterate** based on review feedback, then merge.

## Red‑Flag Checklist (When in Doubt)

- **Missing `pnpm install`?** – Always run it after pulling a new branch.
- **No failing tests?** – Do not proceed to merge; run `pnpm test` first.
- **Unstyled code?** – Run `pnpm format` and `pnpm lint` before committing.
- **Large monolithic commit?** – Split into logical, reviewable units.
- **Unclear requirements?** – Use `AskUserQuestion` to clarify before coding.

Following these conventions will keep the repository navigable, the codebase consistent, and the AI agents productive.
>>>>>>> origin/master
>>>>>>> origin/master
