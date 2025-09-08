```markdown
# Check2 - User Experience Design

## CLI Interface

### Basic Usage
```bash
# Install globally
npm install -g check2

# Run in project directory
check2

# Force analysis regardless of error count
check2 --analyze

# Specify config files
check2 --tsconfig ./custom-tsconfig.json --eslint ./.eslintrc.custom.js

# Configure output directory
check2 --output ./error-analysis

# Set custom thresholds
check2 --manual-threshold 150 --auto-threshold 400
```

### Sample Output Flow
```bash
$ check2
🔍 Analyzing TypeScript configuration...
📊 Found 847 TypeScript errors and 234 ESLint errors
⚠️  Error count (1081) exceeds auto-trigger threshold (500)

🤖 Generating organized error analysis...
✅ Created error-analysis-001.md (267 errors, 1,847 lines)
✅ Created error-analysis-002.md (289 errors, 1,923 lines)
✅ Created error-analysis-003.md (256 errors, 1,756 lines)
✅ Created error-analysis-004.md (269 errors, 1,891 lines)

🎯 Summary:
   • Missing Type Definitions: 423 errors (39.1%) - HIGH IMPACT
   • Import Issues: 298 errors (27.5%) - HIGH IMPACT  
   • Type Mismatches: 201 errors (18.6%) - MEDIUM IMPACT
   • Unused Variables: 159 errors (14.7%) - LOW IMPACT

💡 Tip: Start with error-analysis-001.md (highest impact errors)
🤖 Ready for AI processing! Each file is optimized for context windows.
```

## File Organization
```
project-root/
├── check2-output/
│   ├── error-analysis-001.md    # Highest impact errors
│   ├── error-analysis-002.md    # Medium-high impact  
│   ├── error-analysis-003.md    # Medium impact
│   ├── error-analysis-004.md    # Lower impact
│   ├── summary.md               # Overall project analysis
│   └── metadata.json            # Machine-readable summary
```

## User Workflow

### Typical Usage Scenario
1. Developer runs `pnpm typecheck` and sees overwhelming errors
2. Runs `check2` in project directory
3. Tool analyzes errors and creates organized chunks
4. Developer feeds chunks to AI assistant for cleanup
5. AI provides prioritized task lists for systematic fixing
6. Developer tackles highest-impact groups first

### Configuration Options
- Custom error thresholds
- Output directory preferences
- TypeScript/ESLint config paths
- Chunk size preferences
- Error type priorities

### Integration Points
- Works with any TypeScript project structure
- Compatible with monorepos and multi-config setups
- Integrates with existing CI/CD workflows
- Supports custom ESLint configurations
```