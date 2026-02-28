import { describe, it, expect, vi } from 'vitest';
import { memoize } from '../../utils';

describe('memoize', () => {
  it('should memoize a single argument function', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should memoize a multi-argument function', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(2, 1)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should distinguish between different types that stringify the same', () => {
    const fn = vi.fn((x: any) => x);
    const memoized = memoize(fn);

    expect(memoized(1)).toBe(1);
    expect(memoized('1')).toBe('1');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should use identity for object arguments', () => {
    const fn = vi.fn((obj: any) => ({ ...obj }));
    const memoized = memoize(fn);

    const obj1 = { a: 1 };
    const obj2 = { a: 1 }; // Same content, different identity

    const res1 = memoized(obj1);
    const res2 = memoized(obj1);
    expect(res1).toBe(res2);
    expect(fn).toHaveBeenCalledTimes(1);

    const res3 = memoized(obj2);
    expect(res3).not.toBe(res1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should handle zero arguments', () => {
    const fn = vi.fn(() => Math.random());
    const memoized = memoize(fn);

    const res1 = memoized();
    const res2 = memoized();
    expect(res1).toBe(res2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle more than 2 arguments', () => {
    const fn = vi.fn((a: any, b: any, c: any) => [a, b, c]);
    const memoized = memoize(fn);

    expect(memoized(1, 2, 3)).toEqual([1, 2, 3]);
    expect(memoized(1, 2, 3)).toEqual([1, 2, 3]);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(1, 2, 4)).toEqual([1, 2, 4]);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
