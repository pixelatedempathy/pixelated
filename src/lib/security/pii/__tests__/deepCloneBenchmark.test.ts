import { describe, it, expect } from 'vitest';
import { deepClone } from '../../../utils';

describe('Deep Clone Performance Benchmark', () => {
  const largeObject = {
    id: 'session_123',
    timestamp: new Date().toISOString(),
    metadata: {
      userId: 'user_456',
      role: 'therapist',
      permissions: ['read', 'write', 'analyze'],
      settings: {
        theme: 'dark',
        notifications: true,
        language: 'en-US'
      }
    },
    data: Array.from({ length: 1000 }, (_, i) => ({
      id: `item_${i}`,
      value: Math.random(),
      tags: ['tag1', 'tag2', 'tag3'],
      timestamp: new Date().toISOString()
    }))
  };

  const iterations = 1000;

  it('benchmarks JSON.parse(JSON.stringify())', () => {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      JSON.parse(JSON.stringify(largeObject));
    }
    const end = performance.now();
    console.log(`JSON.parse(JSON.stringify()): ${(end - start).toFixed(4)}ms for ${iterations} iterations`);
  });

  it('benchmarks deepClone', () => {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      deepClone(largeObject);
    }
    const end = performance.now();
    console.log(`deepClone: ${(end - start).toFixed(4)}ms for ${iterations} iterations`);
  });

  it('verifies deepClone correctness', () => {
    const cloned = deepClone(largeObject);
    expect(cloned).toEqual(largeObject);
    expect(cloned).not.toBe(largeObject);
    expect(cloned.metadata).not.toBe(largeObject.metadata);
    expect(cloned.data).not.toBe(largeObject.data);
    expect(cloned.data[0]).not.toBe(largeObject.data[0]);
  });
});
