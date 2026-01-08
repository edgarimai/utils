/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 * @example capitalize('hello') // 'Hello'
 */
export function capitalize(str: string): string {
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
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

