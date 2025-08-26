# Bias Detection Engine Test Fix Plan

## Current Status

- 10 failing tests out of 50 total tests
- Issues identified:
    1. Mock implementation mismatches (methods not properly overridden)
    2. Floating point precision issues in assertions
    3. Confidence calculation not working as expected
    4. Recommendation text matching issues
    5. Method override patterns incorrect

## Root Causes

1. Tests override `biasEngine.pythonService.method` directly, but engine creates new instances
2. Tests should override `mockPythonBridge.method.mockResolvedValue()` instead
3. Some assertions use exact equality instead of approximate equality for floating point
4. Mock state contamination between tests

## Action Plan

### Task List

- [ ] Fix mock implementation in "should provide fallback analysis when toolkits are unavailable" test
- [ ] Fix mock implementation in "should handle Python service errors gracefully" test
- [ ] Fix mock implementation in "should handle network timeout errors" test
- [ ] Fix mock implementation in "should handle partial layer failures" test
- [ ] Fix mock implementation in "should handle malformed Python service responses" test
- [ ] Fix floating point assertion in "should provide fallback analysis when toolkits are unavailable" test
- [ ] Fix floating point assertion in "should handle partial layer failures" test
- [ ] Fix recommendation text matching in "should handle Python service errors gracefully" test
- [ ] Fix recommendation text matching in "should handle malformed Python service responses" test
- [ ] Fix audit logging spy in "should not create audit logs when disabled" test
- [ ] Fix confidence calculation logic in BiasDetectionEngine
- [ ] Verify weighted average calculation handles edge cases correctly
- [ ] Ensure fallbackLayer() method returns correct values
- [ ] Verify alert level calculation uses correct thresholds
- [ ] Check that mock reset happens correctly between tests
- [ ] Ensure all mock methods properly return expected values when overridden
- [ ] Fix boundary threshold test to use proper mock setup
- [ ] Verify cache key generation doesn't interfere with test results
- [ ] Check that error handling propagates correctly to fallback mechanisms
- [ ] Run full test suite to verify all fixes work together

## Implementation Strategy

1. Replace all direct method overrides (`biasEngine.pythonService.method`) with proper mock overrides (
   `mockPythonBridge.method.mockResolvedValue()`)
2. Change exact floating point assertions to use `toBeCloseTo()` with appropriate precision
3. Fix recommendation text matching to use correct expected strings
4. Ensure mock reset happens properly in beforeEach
5. Verify confidence calculation logic matches test expectations