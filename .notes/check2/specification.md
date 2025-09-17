```markdown
# Check2 - Complete Technical Specification

## Project Overview

**Check2** is a standalone CLI tool that transforms overwhelming TypeScript and ESLint error output into organized, AI-friendly markdown chunks. It automatically detects error thresholds, groups similar issues, and creates actionable task lists optimized for AI-assisted codebase cleanup.

### Core Problem Solved
- VSCode Problems panel can't display all errors (scrolling limitations)
- Errors are scattered and unorganized (duplicate issues spread throughout)
- No way to prioritize or group similar errors for efficient fixing
- Large error counts overwhelm developers and AI assistants alike

### Key Value Proposition
Transform chaos into organized, actionable intelligence with proper grouping, impact scoring, and AI-optimized formatting.

## Technical Architecture

### Technology Stack
- **Runtime**: Node.js (for CLI and TypeScript integration)
- **Language**: TypeScript (dogfooding our own tool!)
- **CLI Framework**: Commander.js or Yargs
- **Package Manager**: npm (for universal compatibility)
- **Testing**: Vitest + sample TypeScript projects

### Core Modules

#### 1. Error Capture Engine
```typescript
interface ErrorCapture {
  captureTypeScriptErrors(configPath: string): Promise<TypeScriptError[]>
  captureESLintErrors(configPath: string): Promise<ESLintError[]>
  detectProjectConfigs(): Promise<ProjectConfig[]>
}
```

#### 2. Error Analysis & Grouping
```typescript
interface ErrorAnalyzer {
  groupSimilarErrors(errors: Error[]): ErrorGroup[]
  calculateImpactScore(group: ErrorGroup): number
  estimateFixTime(group: ErrorGroup): string
  prioritizeGroups(groups: ErrorGroup[]): ErrorGroup[]
}
```

#### 3. Markdown Generator
```typescript
interface MarkdownGenerator {
  generateChunks(groups: ErrorGroup[], maxLines: number): MarkdownChunk[]
  formatErrorGroup(group: ErrorGroup): string
  generateSummary(errors: Error[]): string
}
```

#### 4. Configuration Manager
```typescript
interface ConfigManager {
  loadUserConfig(): Check2Config
  detectProjectType(): ProjectType
  getDefaultThresholds(): ThresholdConfig
}
```

## Error Classification Algorithm

### Pattern Matching Rules
1. **Missing Type Definitions**: `Property 'X' does not exist on type 'Y'`
2. **Import Issues**: `Cannot find module`, `Module not found`
3. **Type Mismatches**: `Type 'X' is not assignable to type 'Y'`
4. **Unused Variables**: `'X' is declared but never used`
5. **Any Type Usage**: `Unsafe assignment`, `Implicit any`

### Impact Scoring Formula
```
Impact Score = (Error Count × 10) + (Files Affected × 5) - (Complexity Weight × 2)

Where Complexity Weight:
- Missing imports: 1 (easiest)
- Unused variables: 2 
- Type definitions: 3
- Type mismatches: 4
- Complex refactors: 5 (hardest)
```

## Feature Specifications

### Smart Threshold System
- **200-499 errors**: Manual trigger only (`check2 --analyze`)
- **500+ errors**: Auto-trigger option with confirmation
- **Configurable**: Users can customize thresholds via config file

### Error Processing Pipeline
1. **Capture**: Run TypeScript compiler and ESLint programmatically
2. **Parse**: Extract error messages, file paths, line numbers, and error types
3. **Group**: Cluster similar errors using pattern matching and ML techniques
4. **Prioritize**: Rank groups by impact score (error count × fix difficulty)
5. **Split**: Divide into ~2000-line markdown chunks for AI processing
6. **Export**: Generate structured markdown with metadata

### Supported Error Sources
- **TypeScript Compiler** (`tsc --noEmit`)
- **ESLint** (all configured rules)
- **Future**: Astro, Vue, Svelte (post-MVP)

### Output Format
Structured markdown with embedded metadata optimized for AI consumption:

```markdown
# TypeScript Error Analysis - Chunk X of Y
**Generated:** YYYY-MM-DD HH:MM | **Total Errors:** N | **This Chunk:** N errors
**Project:** project-name | **Config:** tsconfig.json, .eslintrc.js

## Error Summary
- Missing Type Definitions: N errors (X.X%)
- Import Issues: N errors (X.X%)
- Property Access: N errors (X.X%)

## Group A: [Error Type] (N errors - [IMPACT LEVEL])
### Pattern: [Common Pattern Description]
**Files affected:** N | **Estimated fix time:** X hours | **Impact Score:** XX

#### Actionable Tasks:
- [ ] Task description (affects N files)
- [ ] Task description (affects N files)

#### Specific Errors:
1. `file/path:line` - Error message
2. `file/path:line` - Error message
```
```