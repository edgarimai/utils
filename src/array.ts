/**
 * Removes duplicate values from an array
 * @param arr - The array to process
 * @returns A new array with unique values
 * @example unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 */
export function unique<T>(arr: T[]): T[] {
  if (!Array.isArray(arr))
    throw new TypeError('unique: arr must be an array');

  return [...new Set(arr)];
}

/**
 * Flattens an array to a specified depth
 * @param arr - The array to flatten
 * @param depth - The maximum recursion depth (default: 1)
 * @returns The flattened array
 * @example flatten([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 */
export function flatten<T>(arr: any[], depth = 1): T[] {
  if (!Array.isArray(arr))
    throw new TypeError('flatten: arr must be an array');

  if (!Number.isInteger(depth) || depth < 0)
    throw new TypeError('flatten: depth must be a non-negative integer');

  return arr.flat(depth);
}

/**
 * Chunks an array into smaller arrays of a specified size
 * @param arr - The array to chunk
 * @param size - The size of each chunk
 * @returns An array of chunks
 * @example chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (!Array.isArray(arr))
    throw new TypeError('chunk: arr must be an array');

  if (!Number.isInteger(size) || size < 1)
    throw new TypeError('chunk: size must be a positive integer');

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Returns the first n elements of an array
 * @param arr - The array to process
 * @param n - The number of elements to take (default: 1)
 * @returns A new array with the first n elements
 * @example take([1, 2, 3, 4], 2) // [1, 2]
 */
export function take<T>(arr: T[], n = 1): T[] {
  if (!Array.isArray(arr))
    throw new TypeError('take: arr must be an array');

  if (!Number.isInteger(n) || n < 0)
    throw new TypeError('take: n must be a non-negative integer');

  return arr.slice(0, n);
}

/**
 * Returns all elements except the first n
 * @param arr - The array to process
 * @param n - The number of elements to drop (default: 1)
 * @returns A new array with elements after the first n
 * @example drop([1, 2, 3, 4], 2) // [3, 4]
 */
export function drop<T>(arr: T[], n = 1): T[] {
  if (!Array.isArray(arr))
    throw new TypeError('drop: arr must be an array');

  if (!Number.isInteger(n) || n < 0)
    throw new TypeError('drop: n must be a non-negative integer');

  return arr.slice(n);
}

/**
 * Shuffles an array randomly
 * @param arr - The array to shuffle
 * @returns A new shuffled array
 * @example shuffle([1, 2, 3, 4]) // [3, 1, 4, 2]
 */
export function shuffle<T>(arr: T[]): T[] {
  if (!Array.isArray(arr))
    throw new TypeError('shuffle: arr must be an array');

  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i]!;
    result[i] = result[j]!;
    result[j] = temp;
  }
  return result;
}

/**
 * Returns a random element from an array
 * @param arr - The array to pick from
 * @returns A random element
 * @example sample([1, 2, 3, 4]) // 3
 */
export function sample<T>(arr: T[]): T | undefined {
  if (!Array.isArray(arr))
    throw new TypeError('sample: arr must be an array');

  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns the intersection of two arrays
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns A new array with common elements
 * @example intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2))
    throw new TypeError('intersection: both arguments must be arrays');

  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

/**
 * Returns the difference between two arrays
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns A new array with elements in arr1 but not in arr2
 * @example difference([1, 2, 3], [2, 3, 4]) // [1]
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2))
    throw new TypeError('difference: both arguments must be arrays');

  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * Groups array elements by a key function
 * @param arr - The array to group
 * @param fn - The function to determine the group key
 * @returns An object with grouped elements
 * @example groupBy([{age: 20}, {age: 30}, {age: 20}], item => item.age) // {20: [{age: 20}, {age: 20}], 30: [{age: 30}]}
 */
export function groupBy<T>(arr: T[], fn: (item: T) => string | number): Record<string | number, T[]> {
  if (!Array.isArray(arr))
    throw new TypeError('groupBy: arr must be an array');

  if (typeof fn !== 'function')
    throw new TypeError('groupBy: fn must be a function');

  return arr.reduce((acc, item) => {
    const key = fn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string | number, T[]>);
}

/**
 * Counts occurrences of each element in an array
 * @param arr - The array to count
 * @returns An object with element counts
 * @example countBy([1, 2, 2, 3, 3, 3]) // {1: 1, 2: 2, 3: 3}
 */
export function countBy<T extends string | number>(arr: T[]): Record<T, number> {
  if (!Array.isArray(arr))
    throw new TypeError('countBy: arr must be an array');

  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

/**
 * Sorts an array by a key function
 * @param arr - The array to sort
 * @param fn - The function to extract the sort key
 * @param order - The sort order ('asc' or 'desc', default: 'asc')
 * @returns A new sorted array
 * @example sortBy([{age: 30}, {age: 20}], item => item.age) // [{age: 20}, {age: 30}]
 */
export function sortBy<T>(arr: T[], fn: (item: T) => number | string, order: 'asc' | 'desc' = 'asc'): T[] {
  if (!Array.isArray(arr))
    throw new TypeError('sortBy: arr must be an array');

  if (typeof fn !== 'function')
    throw new TypeError('sortBy: fn must be a function');

  if (order !== 'asc' && order !== 'desc')
    throw new TypeError('sortBy: order must be "asc" or "desc"');

  return [...arr].sort((a, b) => {
    const aVal = fn(a);
    const bVal = fn(b);
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * Partitions an array into two arrays based on a predicate
 * @param arr - The array to partition
 * @param predicate - The function to test each element
 * @returns A tuple with [truthy, falsy] arrays
 * @example partition([1, 2, 3, 4], n => n % 2 === 0) // [[2, 4], [1, 3]]
 */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  if (!Array.isArray(arr))
    throw new TypeError('partition: arr must be an array');

  if (typeof predicate !== 'function')
    throw new TypeError('partition: predicate must be a function');

  const truthy: T[] = [];
  const falsy: T[] = [];

  for (const item of arr) {
    if (predicate(item)) truthy.push(item);
    else falsy.push(item);
  }

  return [truthy, falsy];
}

/**
 * Zips multiple arrays together
 * @param arrays - The arrays to zip
 * @returns An array of tuples
 * @example zip([1, 2], ['a', 'b']) // [[1, 'a'], [2, 'b']]
 */
export function zip<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) return [];

  if (arrays.some(arr => !Array.isArray(arr)))
    throw new TypeError('zip: all arguments must be arrays');

  const minLength = Math.min(...arrays.map(arr => arr.length));
  const result: T[][] = [];

  for (let i = 0; i < minLength; i++) {
    const tuple: T[] = [];
    for (const arr of arrays) {
      tuple.push(arr[i]!);
    }
    result.push(tuple);
  }

  return result;
}

/**
 * Compacts an array by removing falsy values
 * @param arr - The array to compact
 * @returns A new array without falsy values
 * @example compact([0, 1, false, 2, '', 3, null, undefined]) // [1, 2, 3]
 */
export function compact<T>(arr: T[]): NonNullable<T>[] {
  if (!Array.isArray(arr))
    throw new TypeError('compact: arr must be an array');

  return arr.filter(Boolean) as NonNullable<T>[];
}

/**
 * Returns the last n elements of an array
 * @param arr - The array to process
 * @param n - The number of elements to take (default: 1)
 * @returns A new array with the last n elements
 * @example takeLast([1, 2, 3, 4], 2) // [3, 4]
 */
export function takeLast<T>(arr: T[], n = 1): T[] {
  if (!Array.isArray(arr))
    throw new TypeError('takeLast: arr must be an array');

  if (!Number.isInteger(n) || n < 0)
    throw new TypeError('takeLast: n must be a non-negative integer');

  return arr.slice(-n);
}

/**
 * Finds the minimum value in an array
 * @param arr - The array of numbers
 * @returns The minimum value or undefined if array is empty
 * @example min([3, 1, 4, 1, 5]) // 1
 */
export function min(arr: number[]): number | undefined {
  if (!Array.isArray(arr))
    throw new TypeError('min: arr must be an array');

  if (arr.some(num => !Number.isFinite(num)))
    throw new TypeError('min: all elements must be finite numbers');

  if (arr.length === 0) return undefined;
  return Math.min(...arr);
}

/**
 * Finds the maximum value in an array
 * @param arr - The array of numbers
 * @returns The maximum value or undefined if array is empty
 * @example max([3, 1, 4, 1, 5]) // 5
 */
export function max(arr: number[]): number | undefined {
  if (!Array.isArray(arr))
    throw new TypeError('max: arr must be an array');

  if (arr.some(num => !Number.isFinite(num)))
    throw new TypeError('max: all elements must be finite numbers');

  if (arr.length === 0) return undefined;
  return Math.max(...arr);
}
