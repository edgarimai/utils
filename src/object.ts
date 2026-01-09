/**
 * Selects only the specified keys from an object
 * @param obj - The object to pick from
 * @param keys - The keys to pick
 * @returns A new object with only the specified keys
 * @example pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('pick: obj must be an object');

  if (!Array.isArray(keys))
    throw new TypeError('pick: keys must be an array');

  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }

  return result;
}

/**
 * Removes the specified keys from an object
 * @param obj - The object to omit from
 * @param keys - The keys to omit
 * @returns A new object without the specified keys
 * @example omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('omit: obj must be an object');

  if (!Array.isArray(keys))
    throw new TypeError('omit: keys must be an array');

  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}

/**
 * Deep merges multiple objects into a target object
 * @param target - The target object
 * @param sources - The source objects to merge
 * @returns The merged object
 * @example merge({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }
 */
export function merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (typeof target !== 'object' || target === null)
    throw new TypeError('merge: target must be an object');

  if (sources.some(source => typeof source !== 'object' || source === null))
    throw new TypeError('merge: all sources must be objects');

  const result = { ...target };

  for (const source of sources) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = result[key];

        if (
          sourceValue &&
          typeof sourceValue === 'object' &&
          !Array.isArray(sourceValue) &&
          targetValue &&
          typeof targetValue === 'object' &&
          !Array.isArray(targetValue)
        ) {
          result[key] = merge(targetValue, sourceValue) as T[Extract<keyof T, string>];
        } else {
          result[key] = sourceValue as T[Extract<keyof T, string>];
        }
      }
    }
  }

  return result;
}

/**
 * Deep clones an object
 * @param obj - The object to clone
 * @returns A deep clone of the object
 * @example clone({ a: { b: 1 } }) // New instance with same structure
 */
export function clone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj.getTime()) as T;

  if (obj instanceof Array) return obj.map(item => clone(item)) as T;

  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = clone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
}

/**
 * Gets a value from an object by path
 * @param obj - The object to get from
 * @param path - The path to the value (dot notation or array)
 * @param defaultValue - The default value if path doesn't exist
 * @returns The value at the path or default value
 * @example get({ a: { b: 1 } }, 'a.b') // 1
 * @example get({ a: {} }, 'a.b.c', 'default') // 'default'
 */
export function get<T = any>(
  obj: any,
  path: string | string[],
  defaultValue?: T
): T {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('get: obj must be an object');

  if (typeof path !== 'string' && !Array.isArray(path))
    throw new TypeError('get: path must be a string or array');

  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue as T;

    result = result[key];
  }

  return result === undefined ? (defaultValue as T) : result;
}

/**
 * Sets a value in an object by path
 * @param obj - The object to set in
 * @param path - The path to set (dot notation or array)
 * @param value - The value to set
 * @returns The modified object
 * @example set({}, 'a.b.c', 1) // { a: { b: { c: 1 } } }
 */
export function set<T extends object>(
  obj: T,
  path: string | string[],
  value: any
): T {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('set: obj must be an object');

  if (typeof path !== 'string' && !Array.isArray(path))
    throw new TypeError('set: path must be a string or array');

  const keys = Array.isArray(path) ? path : path.split('.');
  const result = clone(obj);
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]!] = value;
  return result;
}

/**
 * Checks if an object is empty
 * @param obj - The object to check
 * @returns True if the object is empty
 * @example isEmpty({}) // true
 * @example isEmpty({ a: 1 }) // false
 */
export function isEmpty(obj: object): boolean {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('isEmpty: obj must be an object');

  if (Array.isArray(obj)) return obj.length === 0;

  return Object.keys(obj).length === 0;
}

/**
 * Deep compares two objects for equality
 * @param obj1 - The first object
 * @param obj2 - The second object
 * @returns True if objects are deeply equal
 * @example isEqual({ a: 1 }, { a: 1 }) // true
 * @example isEqual({ a: 1 }, { a: 2 }) // false
 */
export function isEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * Transforms the values of an object
 * @param obj - The object to transform
 * @param fn - The function to transform each value
 * @returns A new object with transformed values
 * @example mapValues({ a: 1, b: 2 }, val => val * 2) // { a: 2, b: 4 }
 */
export function mapValues<T extends object, R>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('mapValues: obj must be an object');

  if (typeof fn !== 'function')
    throw new TypeError('mapValues: fn must be a function');

  const result = {} as Record<keyof T, R>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = fn(obj[key], key);
    }
  }

  return result;
}

/**
 * Returns the keys of an object (type-safe version of Object.keys)
 * @param obj - The object to get keys from
 * @returns An array of keys
 * @example keys({ a: 1, b: 2 }) // ['a', 'b']
 */
export function keys<T extends object>(obj: T): (keyof T)[] {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('keys: obj must be an object');

  return Object.keys(obj) as (keyof T)[];
}

/**
 * Returns the values of an object (type-safe version of Object.values)
 * @param obj - The object to get values from
 * @returns An array of values
 * @example values({ a: 1, b: 2 }) // [1, 2]
 */
export function values<T extends object>(obj: T): T[keyof T][] {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('values: obj must be an object');

  return Object.values(obj) as T[keyof T][];
}

/**
 * Returns the entries of an object (type-safe version of Object.entries)
 * @param obj - The object to get entries from
 * @returns An array of [key, value] pairs
 * @example entries({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
 */
export function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('entries: obj must be an object');

  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
