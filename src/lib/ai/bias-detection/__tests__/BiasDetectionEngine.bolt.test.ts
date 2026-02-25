import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BiasDetectionEngine } from '../BiasDetectionEngine';

vi.mock('../python-bridge', () => {
  return {
    PythonBiasDetectionBridge: class {
      constructor() {}
      initialize = vi.fn();
      runPreprocessingAnalysis = vi.fn().mockResolvedValue({ biasScore: 0.1, recommendations: [] });
      runModelLevelAnalysis = vi.fn().mockResolvedValue({ biasScore: 0.2, recommendations: [] });
      runInteractiveAnalysis = vi.fn().mockResolvedValue({ biasScore: 0.3, recommendations: [] });
      runEvaluationAnalysis = vi.fn().mockResolvedValue({ biasScore: 0.4, recommendations: [] });
    }
  };
});

describe('BiasDetectionEngine Performance Optimization', () => {
  let engine: BiasDetectionEngine;

  beforeEach(async () => {
    engine = new BiasDetectionEngine({ auditLogging: false });
    await engine.initialize();
  });

  it('should return correct results from all layers', async () => {
    const session = {
      sessionId: 'test-session',
      timestamp: new Date(),
      transcript: 'test',
      participantDemographics: {
        age: '25',
        gender: 'female',
        ethnicity: 'none',
        primaryLanguage: 'English'
      }
    };

    const result = await engine.analyzeSession(session as any);

    expect(result.overallBiasScore).toBeGreaterThan(0);
    expect(result.layerResults.preprocessing.biasScore).toBe(0.1);
    expect(result.layerResults.modelLevel.biasScore).toBe(0.2);
    expect(result.layerResults.interactive.biasScore).toBe(0.3);
    expect(result.layerResults.evaluation.biasScore).toBe(0.4);
  });

  it('should handle failures gracefully and maintain recommendation order', async () => {
    const session = {
      sessionId: 'test-session',
      timestamp: new Date(),
      transcript: 'test',
      participantDemographics: {
        age: '25',
        gender: 'female',
        ethnicity: 'none',
        primaryLanguage: 'English'
      }
    };

    // Mock failures
    (engine.pythonService.runPreprocessingAnalysis as any).mockRejectedValueOnce(new Error('Preprocessing fail'));
    (engine.pythonService.runInteractiveAnalysis as any).mockRejectedValueOnce(new Error('Interactive fail'));

    const result = await engine.analyzeSession(session as any);

    expect(result.layerResults.preprocessing.biasScore).toBe(0.5); // Fallback
    expect(result.layerResults.interactive.biasScore).toBe(0.5); // Fallback
    expect(result.layerResults.modelLevel.biasScore).toBe(0.2); // Success

    // Check recommendation order
    expect(result.recommendations[0]).toContain('Preprocessing analysis unavailable');
    expect(result.recommendations[1]).toContain('Interactive analysis unavailable');
    expect(result.recommendations).toContain('Incomplete analysis due to service issues.');
  });
});
