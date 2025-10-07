# Check2 - TypeScript Error Organizer

*"Check... check2... CHECK2!"* 🎭

A CLI tool that transforms overwhelming TypeScript and ESLint errors into organized, AI-friendly markdown chunks for efficient codebase cleanup.

## Quick Overview

- **Problem**: VSCode can't display all errors, scattered duplicate issues
- **Solution**: Smart error grouping, prioritization, and AI-optimized output
- **Trigger**: 200+ errors (manual) or 500+ errors (auto)
- **Output**: Organized markdown chunks (~2000 lines each)

## Key Features

- ✅ Smart threshold system (200+ manual, 500+ auto-trigger)
- ✅ Groups similar errors for maximum impact  
- ✅ Prioritizes by "quick wins" (quantity over complexity)
- ✅ AI-context-window-friendly chunks
- ✅ Works with multiple TypeScript configs
- ✅ Supports TypeScript + ESLint errors

## Example Output

```markdown
# TypeScript Error Analysis - Chunk 1 of 4
**Generated:** 2025-09-08 | **Total Errors:** 847 | **This Chunk:** 203 errors

## Group A: Missing Type Definitions (89 errors - HIGH IMPACT)
**Files affected:** 23 | **Estimated fix time:** 2-3 hours
- [ ] Add 'name' property to User interface (affects 67 files)
- [ ] Add 'email' property to User interface (affects 22 files)
