import { describe, it, expect } from 'vitest';
import {
  pick,
  omit,
  merge,
  clone,
  get,
  set,
  isEmpty,
  isEqual,
  mapValues,
  keys,
  values,
  entries,
} from './object.js';

describe('pick', () => {
  it('should pick specified keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('should handle empty keys array', () => {
    expect(pick({ a: 1, b: 2 }, [])).toEqual({});
  });

  it('should ignore non-existent keys', () => {
    expect(pick({ a: 1, b: 2 }, ['a', 'c' as any])).toEqual({ a: 1 });
  });

  it('should handle empty object', () => {
    expect(pick({} as Record<string, any>, ['a'])).toEqual({});
  });

  it('should throw error for non-object', () => {
    expect(() => pick(null as any, [])).toThrow('pick: obj must be an object');
  });

  it('should throw error for non-array keys', () => {
    expect(() => pick({}, 'a' as any)).toThrow('pick: keys must be an array');
  });
});

describe('omit', () => {
  it('should omit specified keys', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('should handle empty keys array', () => {
    expect(omit({ a: 1, b: 2 }, [])).toEqual({ a: 1, b: 2 });
  });

  it('should ignore non-existent keys', () => {
    expect(omit({ a: 1, b: 2 }, ['c' as any])).toEqual({ a: 1, b: 2 });
  });

  it('should handle empty object', () => {
    expect(omit({} as Record<string, any>, ['a'])).toEqual({});
  });

  it('should throw error for non-object', () => {
    expect(() => omit(null as any, [])).toThrow('omit: obj must be an object');
  });

  it('should throw error for non-array keys', () => {
    expect(() => omit({}, 'a' as any)).toThrow('omit: keys must be an array');
  });
});

describe('merge', () => {
  it('should merge multiple objects', () => {
    expect(merge({ a: 1 } as any, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should deep merge nested objects', () => {
    expect(merge({ a: { b: 1 } } as any, { a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } });
  });

  it('should override primitive values', () => {
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it('should handle empty sources', () => {
    expect(merge({ a: 1 })).toEqual({ a: 1 });
  });

  it('should not merge arrays', () => {
    expect(merge({ a: [1, 2] }, { a: [3, 4] })).toEqual({ a: [3, 4] });
  });

  it('should throw error for non-object target', () => {
    expect(() => merge(null as any, {})).toThrow('merge: target must be an object');
  });

  it('should throw error for non-object source', () => {
    expect(() => merge({}, null as any)).toThrow('merge: all sources must be objects');
  });
});

describe('clone', () => {
  it('should clone simple object', () => {
    const obj = { a: 1, b: 2 };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it('should deep clone nested object', () => {
    const obj = { a: { b: { c: 1 } } };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned.a).not.toBe(obj.a);
  });

  it('should clone arrays', () => {
    const arr = [1, 2, [3, 4]];
    const cloned = clone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[2]).not.toBe(arr[2]);
  });

  it('should clone dates', () => {
    const date = new Date('2024-01-01');
    const cloned = clone(date);
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });

  it('should handle null', () => {
    expect(clone(null)).toBe(null);
  });

  it('should handle primitives', () => {
    expect(clone(42)).toBe(42);
    expect(clone('hello')).toBe('hello');
    expect(clone(true)).toBe(true);
  });
});

describe('get', () => {
  it('should get value by string path', () => {
    expect(get({ a: { b: 1 } }, 'a.b')).toBe(1);
  });

  it('should get value by array path', () => {
    expect(get({ a: { b: 1 } }, ['a', 'b'])).toBe(1);
  });

  it('should return default value for non-existent path', () => {
    expect(get({ a: {} }, 'a.b.c', 'default')).toBe('default');
  });

  it('should handle undefined values', () => {
    expect(get({ a: undefined }, 'a', 'default')).toBe('default');
  });

  it('should handle null values in path', () => {
    expect(get({ a: null }, 'a.b', 'default')).toBe('default');
  });

  it('should return undefined for non-existent path without default', () => {
    expect(get({ a: {} }, 'a.b.c')).toBeUndefined();
  });

  it('should throw error for non-object', () => {
    expect(() => get(null as any, 'a')).toThrow('get: obj must be an object');
  });

  it('should throw error for invalid path', () => {
    expect(() => get({}, 123 as any)).toThrow('get: path must be a string or array');
  });
});

describe('set', () => {
  it('should set value by string path', () => {
    expect(set({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
  });

  it('should set value by array path', () => {
    expect(set({}, ['a', 'b', 'c'], 1)).toEqual({ a: { b: { c: 1 } } });
  });

  it('should not modify original object', () => {
    const obj = { a: 1 };
    const result = set(obj, 'b', 2);
    expect(obj).toEqual({ a: 1 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should override existing values', () => {
    expect(set({ a: { b: 1 } }, 'a.b', 2)).toEqual({ a: { b: 2 } });
  });

  it('should handle nested paths', () => {
    expect(set({ a: { b: 1 } }, 'a.c.d', 2)).toEqual({ a: { b: 1, c: { d: 2 } } });
  });

  it('should throw error for non-object', () => {
    expect(() => set(null as any, 'a', 1)).toThrow('set: obj must be an object');
  });

  it('should throw error for invalid path', () => {
    expect(() => set({}, 123 as any, 1)).toThrow('set: path must be a string or array');
  });
});

describe('isEmpty', () => {
  it('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return false for non-empty object', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return false for non-empty array', () => {
    expect(isEmpty([1, 2])).toBe(false);
  });

  it('should throw error for non-object', () => {
    expect(() => isEmpty(null as any)).toThrow('isEmpty: obj must be an object');
  });
});

describe('isEqual', () => {
  it('should return true for equal objects', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it('should return false for different objects', () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('should deep compare nested objects', () => {
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  it('should compare arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('should return true for same reference', () => {
    const obj = { a: 1 };
    expect(isEqual(obj, obj)).toBe(true);
  });

  it('should return false for different types', () => {
    expect(isEqual({}, [])).toBe(false);
  });

  it('should handle null values', () => {
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(null, {})).toBe(false);
  });

  it('should handle primitives', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual(1, 2)).toBe(false);
  });
});

describe('mapValues', () => {
  it('should transform values', () => {
    expect(mapValues({ a: 1, b: 2 }, val => val * 2)).toEqual({ a: 2, b: 4 });
  });

  it('should pass key to function', () => {
    const result = mapValues({ a: 1, b: 2 }, (val, key) => `${key}-${val}`);
    expect(result).toEqual({ a: 'a-1', b: 'b-2' });
  });

  it('should handle empty object', () => {
    expect(mapValues({}, val => val)).toEqual({});
  });

  it('should throw error for non-object', () => {
    expect(() => mapValues(null as any, x => x)).toThrow('mapValues: obj must be an object');
  });

  it('should throw error for non-function', () => {
    expect(() => mapValues({}, 'not a function' as any)).toThrow('mapValues: fn must be a function');
  });
});

describe('keys', () => {
  it('should return object keys', () => {
    expect(keys({ a: 1, b: 2 })).toEqual(['a', 'b']);
  });

  it('should handle empty object', () => {
    expect(keys({})).toEqual([]);
  });

  it('should throw error for non-object', () => {
    expect(() => keys(null as any)).toThrow('keys: obj must be an object');
  });
});

describe('values', () => {
  it('should return object values', () => {
    expect(values({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  it('should handle empty object', () => {
    expect(values({})).toEqual([]);
  });

  it('should throw error for non-object', () => {
    expect(() => values(null as any)).toThrow('values: obj must be an object');
  });
});

describe('entries', () => {
  it('should return object entries', () => {
    expect(entries({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]]);
  });

  it('should handle empty object', () => {
    expect(entries({})).toEqual([]);
  });

  it('should throw error for non-object', () => {
    expect(() => entries(null as any)).toThrow('entries: obj must be an object');
  });
});
