import { describe, it, expect } from 'vitest';
import {
  unique,
  flatten,
  chunk,
  take,
  drop,
  shuffle,
  sample,
  intersection,
  difference,
  groupBy,
  countBy,
  sortBy,
  partition,
  zip,
  compact,
  takeLast,
  min,
  max,
} from './array.js';

describe('unique', () => {
  it('should remove duplicate values', () => {
    expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should handle empty array', () => {
    expect(unique([])).toEqual([]);
  });

  it('should work with strings', () => {
    expect(unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
  });

  it('should throw error for non-array', () => {
    expect(() => unique('not an array' as any)).toThrow('unique: arr must be an array');
  });
});

describe('flatten', () => {
  it('should flatten array by default depth', () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it('should flatten to specified depth', () => {
    expect(flatten([[[1, 2]], [[3, 4]]], 2)).toEqual([1, 2, 3, 4]);
  });

  it('should handle empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  it('should throw error for non-array', () => {
    expect(() => flatten('not an array' as any)).toThrow('flatten: arr must be an array');
  });

  it('should throw error for negative depth', () => {
    expect(() => flatten([[1, 2]], -1)).toThrow('flatten: depth must be a non-negative integer');
  });
});

describe('chunk', () => {
  it('should chunk array into specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should handle exact division', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it('should handle empty array', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it('should throw error for non-array', () => {
    expect(() => chunk('not an array' as any, 2)).toThrow('chunk: arr must be an array');
  });

  it('should throw error for invalid size', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow('chunk: size must be a positive integer');
  });
});

describe('take', () => {
  it('should take first n elements', () => {
    expect(take([1, 2, 3, 4], 2)).toEqual([1, 2]);
  });

  it('should take first element by default', () => {
    expect(take([1, 2, 3])).toEqual([1]);
  });

  it('should handle n greater than length', () => {
    expect(take([1, 2], 5)).toEqual([1, 2]);
  });

  it('should handle empty array', () => {
    expect(take([])).toEqual([]);
  });

  it('should throw error for non-array', () => {
    expect(() => take('not an array' as any)).toThrow('take: arr must be an array');
  });
});

describe('drop', () => {
  it('should drop first n elements', () => {
    expect(drop([1, 2, 3, 4], 2)).toEqual([3, 4]);
  });

  it('should drop first element by default', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
  });

  it('should handle n greater than length', () => {
    expect(drop([1, 2], 5)).toEqual([]);
  });

  it('should handle empty array', () => {
    expect(drop([])).toEqual([]);
  });

  it('should throw error for non-array', () => {
    expect(() => drop('not an array' as any)).toThrow('drop: arr must be an array');
  });
});

describe('shuffle', () => {
  it('should return array with same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled).toHaveLength(arr.length);
  });

  it('should contain same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  it('should not modify original array', () => {
    const arr = [1, 2, 3];
    const original = [...arr];
    shuffle(arr);
    expect(arr).toEqual(original);
  });

  it('should handle empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('should throw error for non-array', () => {
    expect(() => shuffle('not an array' as any)).toThrow('shuffle: arr must be an array');
  });
});

describe('sample', () => {
  it('should return element from array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sample(arr);
    expect(arr).toContain(result);
  });

  it('should return undefined for empty array', () => {
    expect(sample([])).toBeUndefined();
  });

  it('should throw error for non-array', () => {
    expect(() => sample('not an array' as any)).toThrow('sample: arr must be an array');
  });
});

describe('intersection', () => {
  it('should return common elements', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it('should handle no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  it('should handle empty arrays', () => {
    expect(intersection([], [1, 2])).toEqual([]);
  });

  it('should throw error for non-arrays', () => {
    expect(() => intersection('not an array' as any, [])).toThrow('intersection: both arguments must be arrays');
  });
});

describe('difference', () => {
  it('should return elements in first array but not in second', () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
  });

  it('should handle no difference', () => {
    expect(difference([1, 2], [1, 2, 3])).toEqual([]);
  });

  it('should handle empty arrays', () => {
    expect(difference([], [1, 2])).toEqual([]);
  });

  it('should throw error for non-arrays', () => {
    expect(() => difference('not an array' as any, [])).toThrow('difference: both arguments must be arrays');
  });
});

describe('groupBy', () => {
  it('should group by key function', () => {
    const arr = [{ age: 20 }, { age: 30 }, { age: 20 }];
    expect(groupBy(arr, item => item.age)).toEqual({
      20: [{ age: 20 }, { age: 20 }],
      30: [{ age: 30 }],
    });
  });

  it('should handle empty array', () => {
    expect(groupBy([], item => item)).toEqual({});
  });

  it('should throw error for non-array', () => {
    expect(() => groupBy('not an array' as any, (x: any) => x)).toThrow('groupBy: arr must be an array');
  });

  it('should throw error for non-function', () => {
    expect(() => groupBy([], 'not a function' as any)).toThrow('groupBy: fn must be a function');
  });
});

describe('countBy', () => {
  it('should count occurrences', () => {
    expect(countBy([1, 2, 2, 3, 3, 3])).toEqual({ 1: 1, 2: 2, 3: 3 });
  });

  it('should work with strings', () => {
    expect(countBy(['a', 'b', 'b', 'c', 'c', 'c'])).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle empty array', () => {
    expect(countBy([])).toEqual({});
  });

  it('should throw error for non-array', () => {
    expect(() => countBy('not an array' as any)).toThrow('countBy: arr must be an array');
  });
});

describe('sortBy', () => {
  it('should sort by key function ascending', () => {
    const arr = [{ age: 30 }, { age: 20 }, { age: 25 }];
    expect(sortBy(arr, item => item.age)).toEqual([{ age: 20 }, { age: 25 }, { age: 30 }]);
  });

  it('should sort descending', () => {
    const arr = [{ age: 20 }, { age: 30 }, { age: 25 }];
    expect(sortBy(arr, item => item.age, 'desc')).toEqual([{ age: 30 }, { age: 25 }, { age: 20 }]);
  });

  it('should not modify original array', () => {
    const arr = [{ age: 30 }, { age: 20 }];
    const original = [...arr];
    sortBy(arr, item => item.age);
    expect(arr).toEqual(original);
  });

  it('should throw error for non-array', () => {
    expect(() => sortBy('not an array' as any, (x: any) => x)).toThrow('sortBy: arr must be an array');
  });

  it('should throw error for non-function', () => {
    expect(() => sortBy([], 'not a function' as any)).toThrow('sortBy: fn must be a function');
  });

  it('should throw error for invalid order', () => {
    expect(() => sortBy([], x => x, 'invalid' as any)).toThrow('sortBy: order must be "asc" or "desc"');
  });
});

describe('partition', () => {
  it('should partition by predicate', () => {
    expect(partition([1, 2, 3, 4], n => n % 2 === 0)).toEqual([[2, 4], [1, 3]]);
  });

  it('should handle all truthy', () => {
    expect(partition([2, 4, 6], n => n % 2 === 0)).toEqual([[2, 4, 6], []]);
  });

  it('should handle all falsy', () => {
    expect(partition([1, 3, 5], n => n % 2 === 0)).toEqual([[], [1, 3, 5]]);
  });

  it('should handle empty array', () => {
    expect(partition([], () => true)).toEqual([[], []]);
  });

  it('should throw error for non-array', () => {
    expect(() => partition('not an array' as any, () => true)).toThrow('partition: arr must be an array');
  });

  it('should throw error for non-function', () => {
    expect(() => partition([], 'not a function' as any)).toThrow('partition: predicate must be a function');
  });
});

describe('zip', () => {
  it('should zip arrays together', () => {
    expect(zip<number | string>([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
  });

  it('should handle different lengths', () => {
    expect(zip<number | string>([1, 2, 3], ['a', 'b'])).toEqual([[1, 'a'], [2, 'b']]);
  });

  it('should handle empty arrays', () => {
    expect(zip([], [])).toEqual([]);
  });

  it('should handle no arguments', () => {
    expect(zip()).toEqual([]);
  });

  it('should throw error for non-arrays', () => {
    expect(() => zip([1, 2], 'not an array' as any)).toThrow('zip: all arguments must be arrays');
  });
});

describe('compact', () => {
  it('should remove falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3]);
  });

  it('should handle array with no falsy values', () => {
    expect(compact([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    expect(compact([])).toEqual([]);
  });

  it('should throw error for non-array', () => {
    expect(() => compact('not an array' as any)).toThrow('compact: arr must be an array');
  });
});

describe('takeLast', () => {
  it('should take last n elements', () => {
    expect(takeLast([1, 2, 3, 4], 2)).toEqual([3, 4]);
  });

  it('should take last element by default', () => {
    expect(takeLast([1, 2, 3])).toEqual([3]);
  });

  it('should handle n greater than length', () => {
    expect(takeLast([1, 2], 5)).toEqual([1, 2]);
  });

  it('should handle empty array', () => {
    expect(takeLast([])).toEqual([]);
  });

  it('should throw error for non-array', () => {
    expect(() => takeLast('not an array' as any)).toThrow('takeLast: arr must be an array');
  });
});

describe('min', () => {
  it('should find minimum value', () => {
    expect(min([3, 1, 4, 1, 5])).toBe(1);
  });

  it('should handle negative numbers', () => {
    expect(min([3, -1, 4])).toBe(-1);
  });

  it('should return undefined for empty array', () => {
    expect(min([])).toBeUndefined();
  });

  it('should throw error for non-array', () => {
    expect(() => min('not an array' as any)).toThrow('min: arr must be an array');
  });

  it('should throw error for non-finite numbers', () => {
    expect(() => min([1, NaN, 3])).toThrow('min: all elements must be finite numbers');
  });
});

describe('max', () => {
  it('should find maximum value', () => {
    expect(max([3, 1, 4, 1, 5])).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(max([-3, -1, -4])).toBe(-1);
  });

  it('should return undefined for empty array', () => {
    expect(max([])).toBeUndefined();
  });

  it('should throw error for non-array', () => {
    expect(() => max('not an array' as any)).toThrow('max: arr must be an array');
  });

  it('should throw error for non-finite numbers', () => {
    expect(() => max([1, NaN, 3])).toThrow('max: all elements must be finite numbers');
  });
});
