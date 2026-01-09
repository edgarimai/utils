/**
 * Constrains a number between a minimum and maximum value
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped number
 * @example clamp(10, 0, 5) // 5
 */
export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    throw new TypeError('clamp: value must be a finite number');
  }

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError('clamp: min and max must be finite numbers');
  }

  if (min > max) {
    throw new RangeError('clamp: min cannot be greater than max');
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to a specified number of decimal places
 * @param value - The number to round
 * @param decimals - The number of decimal places (default: 0)
 * @returns The rounded number
 * @example round(3.14159, 2) // 3.14
 */
export function round(value: number, decimals = 0): number {
  if (!Number.isFinite(value)) {
    throw new Error('round: value must be a finite number');
  }

  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error('round: decimals must be a non-negative integer');
  }

  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive)
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random integer
 * @example randomInt(1, 10) // 7
 */
export function randomInt(min: number, max: number): number {
  if (!Number.isFinite(min) || !Number.isFinite(max))
    throw new TypeError('randomInt: min and max must be finite numbers');

  if (min > max)
    throw new RangeError('randomInt: min cannot be greater than max');

  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

/**
 * Generates a random float between min (inclusive) and max (exclusive)
 * @param min - The minimum value
 * @param max - The maximum value
 * @param decimals - The number of decimal places (default: 2)
 * @returns A random float
 * @example randomFloat(1, 10, 2) // 7.42
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  if (!Number.isFinite(min) || !Number.isFinite(max))
    throw new TypeError('randomFloat: min and max must be finite numbers');

  if (min > max)
    throw new RangeError('randomFloat: min cannot be greater than max');

  if (!Number.isInteger(decimals) || decimals < 0)
    throw new Error('randomFloat: decimals must be a non-negative integer');

  const random = Math.random() * (max - min) + min;
  return round(random, decimals);
}

/**
 * Calculates the percentage of a value relative to a total
 * @param value - The value
 * @param total - The total
 * @param decimals - The number of decimal places (default: 2)
 * @returns The percentage
 * @example percentage(25, 100) // 25
 */
export function percentage(value: number, total: number, decimals = 2): number {
  if (!Number.isFinite(value) || !Number.isFinite(total))
    throw new TypeError('percentage: value and total must be finite numbers');

  if (!Number.isInteger(decimals) || decimals < 0)
    throw new Error('percentage: decimals must be a non-negative integer');

  if (total === 0) return 0;
  return round((value / total) * 100, decimals);
}

/**
 * Formats a number as currency
 * @param value - The number to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale (default: 'en-US')
 * @returns The formatted currency string
 * @example formatCurrency(1234.56) // '$1,234.56'
 */
export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  if (!Number.isFinite(value))
    throw new TypeError('formatCurrency: value must be a finite number');

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Checks if a number is even
 * @param value - The number to check
 * @returns True if the number is even
 * @example isEven(4) // true
 */
export function isEven(value: number): boolean {
  if (!Number.isFinite(value))
    throw new TypeError('isEven: value must be a finite number');

  if (!Number.isInteger(value))
    throw new TypeError('isEven: value must be an integer');

  return value % 2 === 0;
}

/**
 * Checks if a number is odd
 * @param value - The number to check
 * @returns True if the number is odd
 * @example isOdd(3) // true
 */
export function isOdd(value: number): boolean {
  if (!Number.isFinite(value))
    throw new TypeError('isOdd: value must be a finite number');

  if (!Number.isInteger(value))
    throw new TypeError('isOdd: value must be an integer');

  return value % 2 !== 0;
}

/**
 * Calculates the sum of an array of numbers
 * @param numbers - The array of numbers
 * @returns The sum
 * @example sum([1, 2, 3, 4]) // 10
 */
export function sum(numbers: number[]): number {
  if (!Array.isArray(numbers))
    throw new TypeError('sum: numbers must be an array');

  if (numbers.some(num => !Number.isFinite(num)))
    throw new TypeError('sum: all elements must be finite numbers');

  return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * Calculates the average of an array of numbers
 * @param numbers - The array of numbers
 * @returns The average
 * @example average([1, 2, 3, 4]) // 2.5
 */
export function average(numbers: number[]): number {
  if (!Array.isArray(numbers))
    throw new TypeError('average: numbers must be an array');

  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

