/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 * @example capitalize('hello') // 'Hello'
 */
export function capitalize(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('capitalize: str must be a string');

  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The string with each word capitalized
 * @example capitalizeWords('hello world') // 'Hello World'
 */
export function capitalizeWords(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('capitalizeWords: str must be a string');

  if (!str) return str;
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns The camelCase string
 * @example camelCase('hello-world') // 'helloWorld'
 */
export function camelCase(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('camelCase: str must be a string');

  if (!str) return str;
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns The kebab-case string
 * @example kebabCase('helloWorld') // 'hello-world'
 */
export function kebabCase(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('kebabCase: str must be a string');

  if (!str) return str;
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to snake_case
 * @param str - The string to convert
 * @returns The snake_case string
 * @example snakeCase('helloWorld') // 'hello_world'
 */
export function snakeCase(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('snakeCase: str must be a string');

  if (!str) return str;
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Truncates a string to a specified length and adds a suffix
 * @param str - The string to truncate
 * @param length - The maximum length
 * @param suffix - The suffix to add (default: '...')
 * @returns The truncated string
 * @example truncate('hello world', 8) // 'hello...'
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (typeof str !== 'string')
    throw new TypeError('truncate: str must be a string');

  if (!Number.isInteger(length) || length < 0)
    throw new TypeError('truncate: length must be a non-negative integer');

  if (typeof suffix !== 'string')
    throw new TypeError('truncate: suffix must be a string');

  if (!str || str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Creates a URL-friendly slug from a string
 * @param str - The string to slugify
 * @returns The slugified string
 * @example slugify('Hello World!') // 'hello-world'
 */
export function slugify(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('slugify: str must be a string');

  if (!str) return str;
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Reverses a string
 * @param str - The string to reverse
 * @returns The reversed string
 * @example reverse('hello') // 'olleh'
 */
export function reverse(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('reverse: str must be a string');

  if (!str) return str;
  return str.split('').reverse().join('');
}

/**
 * Removes all whitespace from a string
 * @param str - The string to process
 * @returns The string without whitespace
 * @example removeWhitespace('hello world') // 'helloworld'
 */
export function removeWhitespace(str: string): string {
  if (typeof str !== 'string')
    throw new TypeError('removeWhitespace: str must be a string');

  if (!str) return str;
  return str.replace(/\s+/g, '');
}

/**
 * Counts the number of words in a string
 * @param str - The string to count words in
 * @returns The number of words
 * @example countWords('hello world') // 2
 */
export function countWords(str: string): number {
  if (typeof str !== 'string')
    throw new TypeError('countWords: str must be a string');

  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Removes mask characters from a string
 * @param str - The masked string to process
 * @param mask - Optional custom mask characters to remove (default: removes common mask characters like spaces, dashes, parentheses, dots, slashes)
 * @returns The string without mask characters
 * @example removeMask('(123) 456-7890') // '1234567890'
 * @example removeMask('123-45-6789') // '123456789'
 * @example removeMask('12/31/2024') // '12312024'
 * @example removeMask('1234-5678-9012-3456') // '1234567890123456'
 * @example removeMask('ABC-123', '-') // 'ABC123'
 */
export function removeMask(str: string, mask?: string): string {
  if (typeof str !== 'string')
    throw new TypeError('removeMask: str must be a string');

  if (mask !== undefined && typeof mask !== 'string')
    throw new TypeError('removeMask: mask must be a string');

  if (!str) return str;

  if (mask) {
    const escapedMask = mask.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`[${escapedMask}]`, 'g');
    return str.replace(pattern, '');
  }

  return str.replace(/[\s\-().\/\\]/g, '');
}

