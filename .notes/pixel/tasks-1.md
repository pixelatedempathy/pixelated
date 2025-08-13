# TypeScript Error Resolution Tasks

## *Generated from type-1.md analysis - Categorized by error type for systematic resolution*

## 1. Module Resolution & Import Errors

### Missing Module/Type Declarations

- [ ] Fix `Cannot find module '@/components/ui/Checkbox'` in:
  - `src/components/analytics/AdvancedFilteringComponent.astro`
  - `src/components/analytics/AdvancedFilteringComponent.tsx`
- [ ] Fix `Cannot find module '@/components/ui/popover'` in:
  - `src/components/analytics/AdvancedFilteringComponent.tsx`
- [ ] Fix `Cannot find module '@/components/ui/scroll-area'` in:
  - `src/components/audit/UnusualPatterns.tsx`
- [ ] Fix `Cannot find module '../ui/ThemeToggle'` in:
  - `src/components/layout/HeaderReact.tsx`
- [ ] Fix `Cannot find module '@/components/ui/charts/'` errors in:
  - `src/components/monitoring/AuditDashboard.tsx` (LineChart, PieChart)
- [ ] Fix `Cannot find module './PatternVisualizationReact'` in:
  - `src/components/analytics/PatternVisualization.tsx`
  - Test files referencing PatternVisualizationReact
- [ ] Fix `Cannot find module '../../lib/ai/types/TherapyStyles'` in:
  - `src/components/chat/TherapyStyleSelector.tsx`
- [ ] Fix `Cannot find module '@/hooks/useChatWithMemory'` in:
  - `src/components/chat/MemoryAwareChatSystem.tsx`

### Astro Module Import Errors  

- [ ] Fix `Module '"astro"' has no exported member 'ImageMetadata'` in:
  - `src/components/media/BackgroundImage.astro`
  - `src/components/media/OptimizedImage.astro`
  - `src/components/media/ResponsiveImage.astro`
- [ ] Fix `Module '"astro"' has no exported member 'MarkdownHeading'` in:
  - `src/components/toc/Toc.astro`

### Third-Party Module Errors

- [ ] Fix `Cannot find module '@tailus/themer-*'` imports in:
  - `src/components/tailus/*.astro` files (button, card, progress themes)
- [ ] Fix Three.js related imports in:
  - `src/components/session/MultidimensionalEmotionChart.tsx`
- [ ] Fix `Cannot find module 'prop-types'` declaration in:
  - `src/components/three/custom/CustomSpotLight.jsx`
- [ ] Fix `@react-three/drei` missing exports in:
  - `src/components/ui/rubiks-cube.tsx` (PerspectiveCamera, SpotLight, RoundedBox)

## 2. Type Definition & Interface Errors

### Missing Properties on Components

- [ ] Fix `Property 'showAnalysisPanel' does not exist` in:
  - `src/components/MindMirrorDemo.tsx`
- [ ] Fix `Property 'recoveryTests' does not exist` in:
  - `src/components/admin/BackupSecurityManager.astro`
- [ ] Fix missing props in `AdvancedFilteringComponent.astro`:
  - [ ] `Property 'props' does not exist on type '{ url: URL; site: URL; }'`
  - [ ] Various UI component prop mismatches (class vs className, id props)

### Component Prop Mismatches

- [ ] Fix `Property 'class' does not exist` vs `className` in:
  - `src/components/analytics/AdvancedFilteringComponent.astro`
  - Multiple UI components using `class` instead of `className`
- [ ] Fix `Property 'id' does not exist` on UI components in:
  - `src/components/analytics/AdvancedFilteringComponent.astro`
- [ ] Fix dialog prop mismatches in:
  - `src/components/therapy/TreatmentPlanManager.tsx` (`isOpen` vs `open`)

### Database & API Type Issues

- [ ] Fix MongoDB access pattern in:
  - `src/components/admin/consent/ConsentDashboard.astro`
  - [ ] `Property 'db' is private and only accessible within class 'MongoDB'`
  - [ ] Null check issues with database connections
- [ ] Fix property name mismatches in:
  - `src/components/therapy/TreatmentPlanManager.tsx`
  - [ ] `startDate` vs `start_date`
  - [ ] `clientId` vs `client_id`
  - [ ] `updatedAt` vs `updated_at`

## 3. Array & Object Type Errors

### Array Push/Assignment Issues

- [ ] Fix `Argument of type '...' is not assignable to parameter of type 'never'` in:
  - `src/components/PixelatedEmpathyAgentChat.tsx` (specializations array)
  - `src/components/ai/chat/useCrisisDetection.ts` (recommendations, interventionSuggestions arrays)
  - `src/components/ai/chat/useSentimentAnalysis.ts` (emotionalTrends, riskFactors arrays)
  - `src/components/demos/bias-detection/ExportControls.tsx` (csvData array)
  - `src/components/therapy/TherapeuticGoalsTracker.tsx` (checkpoints, history arrays)
  - `src/components/toc/Toc.astro` (levelSelectors array)
  - `src/components/ui/skeleton.tsx` (items array)
  - `src/components/ui/table.tsx` (pages array)

### Object Property Access Issues

- [ ] Fix object property access in:
  - `src/components/analytics/AdvancedFilteringComponent.astro`
  - [ ] Various `Property '...' does not exist on type '{}'` errors
  - [ ] Options object property assignments
- [ ] Fix index signature access in:
  - `src/components/demos/bias-detection/SessionInputForm.tsx` (`errors.content`)
  - `src/components/media/BackgroundImage.astro` (`image.dataset.src`)
  - `src/components/ui/label.tsx` (`process.env.NODE_ENV`)

## 4. Function & Method Errors

### Missing Function Definitions

- [ ] Fix `Cannot find name 'useCallback'` in:
  - `src/components/feedback/SupervisorFeedback.tsx`
- [ ] Fix `Cannot find name 'useMemo'` in:
  - `src/components/ui/MindMirrorDashboard.tsx`
- [ ] Fix missing hook imports in test files:
  - `src/components/notification/__tests__/*.test.tsx` (useWebSocket, useNotificationPreferences)

### Function Call & Parameter Issues

- [ ] Fix function signature mismatches in:
  - `src/components/admin/bias-detection/BiasDashboard.test.tsx` (http.get/post expecting 0 arguments)
- [ ] Fix variable usage before declaration in:
  - `src/components/demo/KnowledgeParsingDemo.tsx` (analyze function)
  - `src/components/demo/PsychologyFrameworksDemo.tsx` (filterFrameworks function)
  - `src/components/feedback/SupervisorFeedback.tsx` (multiple useCallback functions)

### Method Call Errors

- [ ] Fix Three.js method calls in:
  - `src/components/session/MultidimensionalEmotionChart.tsx`
  - [ ] Missing Three.js object definitions and method calls
  - [ ] Object disposal and cleanup methods

## 5. Null/Undefined Safety Issues

### Possibly Undefined/Null Errors

- [ ] Fix `'...' is possibly 'undefined'` in:
  - `src/components/analytics/ComparativeProgressDisplay.tsx` (date string operations)
  - `src/components/analytics/ConversionDashboard.tsx` (conversionTypes access)
  - `src/components/analytics/PrivacyDashboard.tsx` (values array access)
  - `src/components/backgrounds/Plum.astro` (nx, ny coordinates)
  - `src/components/chat/CognitiveModelSelector.tsx` (modelList access)
  - `src/components/demo/PresentingProblemVisualization.tsx` (regex match results)
  - `src/components/therapy/TherapeuticGoalsTracker.tsx` (goal array access)

### DOM Element Access

- [ ] Fix possibly null DOM element access in:
  - `src/components/analytics/AdvancedFilteringComponent.astro` (customDateRange element)
  - `src/components/analytics/AdvancedFilteringComponent.astro` (input element valueAsDate)

## 6. Type Assignment & Compatibility Issues

### Return Type Issues

- [ ] Fix `Not all code paths return a value` in:
  - `src/components/analytics/MetricWidget.tsx`
  - `src/components/theme/ThemeProvider.tsx`
  - `src/components/ui/AccessibilityAnnouncer.tsx`
  - Integration test retry function

### Type Casting & Compatibility

- [ ] Fix test setup type compatibility in:
  - `src/components/demo/__tests__/setup.ts`
  - [ ] `window.getComputedStyle` mock type
  - [ ] `document.createRange` mock type
- [ ] Fix component type compatibility in test files:
  - Multiple `.test.ts` files with AstroComponent type mismatches

### String Type Issues

- [ ] Fix `Type 'string | undefined' is not assignable to type 'string'` in:
  - `src/components/analytics/ComparativeProgressDisplay.tsx`
  - `src/components/demos/bias-detection/SessionInputForm.tsx`
  - `src/components/therapy/TreatmentPlanManager.tsx`

## 7. Deprecated & Warning Issues

### Deprecated API Usage

- [ ] Replace deprecated `substr()` with `substring()` in:
  - `src/components/chat/AnalyticsDashboardReact.tsx`
- [ ] Replace deprecated `onKeyPress` with `onKeyDown` in:
  - `src/components/chat/BrutalistChatDemo.tsx`
  - `src/components/ui/EnhancedMentalHealthChat.tsx`
- [ ] Address deprecated navigator properties in:
  - `src/components/testing/BrowserCompatibilityTester.tsx` (vendor, platform)

### Implicit Any Type Warnings

- [ ] Add explicit types for parameters in:
  - `src/components/analytics/AdvancedFilteringComponent.astro` (multiple event handlers)
  - `src/components/admin/PatientRightsSystem.astro` (event parameter)
  - `src/components/admin/RetentionReports.astro` (event parameter)
  - `src/components/ai/chat/useResponseGeneration.ts` (response variable)
  - `src/components/chat/MemoryAwareChatSystem.tsx` (message mapping functions)
  - Multiple other files with implicit any warnings

## 8. Unused Variables & Imports

### Unused Import Declarations

- [ ] Remove unused imports in:
  - `src/components/analytics/AnalyticsDashboard.astro` (MetricWidget, ChartWidget, TableWidget)
  - `src/components/base/NavItem.astro` (ensureTrailingSlash, getUrl)
  - `src/components/chat/LazyAnalyticsDashboard.tsx` (React)
  - `src/components/demo/*.tsx` files (React imports)
  - `src/components/layout/SidebarReact.tsx` (React)
  - Multiple other files with unused React imports

### Unused Variable Declarations

- [ ] Remove or use unused variables in:
  - `src/components/base/ErrorBoundary.astro` (fallback)
  - `src/components/chat/MemoryAwareChatSystem.tsx` (_placeholder)
  - `src/components/monitoring/RealUserMonitoring.astro` (config, refreshInterval)
  - `src/components/security/FHEDemo.astro` (CardFooter, encrypted)
  - Multiple other files with unused variable declarations

## 9. Astro-Specific Issues

### Script Processing Warnings

- [ ] Add `is:inline` directive to scripts in:
  - `src/components/backgrounds/Dot.astro`
  - `src/components/backgrounds/Particle.astro`
  - `src/components/layout/ResponsiveGrid.astro`
  - `src/components/monitoring/AIPerformanceDashboard.astro`
  - `src/components/monitoring/WebPerformanceDashboard.astro`

### Component Interface Issues

- [ ] Fix Astro component interface mismatches in:
  - Multiple test files expecting AstroComponent type

## 10. Animation & UI Library Issues

### Animation Library Compatibility

- [ ] Fix Framer Motion types in:
  - `src/components/transitions/AnimationOrchestrator.tsx`
  - [ ] Variant type assignments
  - [ ] Animation definition compatibility
  - [ ] Property access from index signatures

### UI Component Library Issues

- [ ] Fix table component props in:
  - `src/components/therapy/TreatmentPlanManager.tsx`
- [ ] Fix chart component props in:
  - `src/components/ui/LazyChart.tsx`
- [ ] Fix toast configuration in:
  - `src/components/ui/ToastProvider.tsx`

## Completion Progress

**Total Categories:** 10  
**Total Tasks:** ~150+ individual fixes needed

### Priority Order for Resolution

1. **Module Resolution & Import Errors** (blocking compilation)
2. **Type Definition & Interface Errors** (core functionality)
3. **Array & Object Type Errors** (data handling)
4. **Function & Method Errors** (runtime issues)
5. **Null/Undefined Safety Issues** (reliability)
6. **Type Assignment & Compatibility** (type safety)
7. **Deprecated & Warning Issues** (maintenance)
8. **Unused Variables & Imports** (cleanup)
9. **Astro-Specific Issues** (framework compliance)
10. **Animation & UI Library Issues** (enhancement features)

---

*Last updated: Generated from TypeScript error analysis*
*This task list represents a comprehensive audit of TypeScript errors requiring systematic resolution.*
