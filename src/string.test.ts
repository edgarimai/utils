import { describe, it, expect } from 'vitest';
import {
  capitalize,
  capitalizeWords,
  camelCase,
  kebabCase,
  snakeCase,
  truncate,
  slugify,
  reverse,
  removeWhitespace,
  countWords,
  removeMask,
} from './string.js';

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should handle already capitalized strings', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle single character', () => {
    expect(capitalize('h')).toBe('H');
  });

  it('should not affect rest of the string', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });
});

describe('capitalizeWords', () => {
  it('should capitalize each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('should handle single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  it('should handle empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  it('should handle multiple spaces', () => {
    expect(capitalizeWords('hello  world')).toBe('Hello  World');
  });

  it('should handle special characters', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
  });
});

describe('camelCase', () => {
  it('should convert kebab-case to camelCase', () => {
    expect(camelCase('hello-world')).toBe('helloWorld');
  });

  it('should convert snake_case to camelCase', () => {
    expect(camelCase('hello_world')).toBe('helloWorld');
  });

  it('should convert spaces to camelCase', () => {
    expect(camelCase('hello world')).toBe('helloWorld');
  });

  it('should handle already camelCase', () => {
    expect(camelCase('helloWorld')).toBe('helloworld');
  });

  it('should handle empty string', () => {
    expect(camelCase('')).toBe('');
  });

  it('should handle multiple separators', () => {
    expect(camelCase('hello--world__test')).toBe('helloWorldTest');
  });
});

describe('kebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(kebabCase('helloWorld')).toBe('hello-world');
  });

  it('should convert spaces to kebab-case', () => {
    expect(kebabCase('hello world')).toBe('hello-world');
  });

  it('should convert snake_case to kebab-case', () => {
    expect(kebabCase('hello_world')).toBe('hello-world');
  });

  it('should handle already kebab-case', () => {
    expect(kebabCase('hello-world')).toBe('hello-world');
  });

  it('should handle empty string', () => {
    expect(kebabCase('')).toBe('');
  });

  it('should handle PascalCase', () => {
    expect(kebabCase('HelloWorld')).toBe('hello-world');
  });
});

describe('snakeCase', () => {
  it('should convert camelCase to snake_case', () => {
    expect(snakeCase('helloWorld')).toBe('hello_world');
  });

  it('should convert spaces to snake_case', () => {
    expect(snakeCase('hello world')).toBe('hello_world');
  });

  it('should convert kebab-case to snake_case', () => {
    expect(snakeCase('hello-world')).toBe('hello_world');
  });

  it('should handle already snake_case', () => {
    expect(snakeCase('hello_world')).toBe('hello_world');
  });

  it('should handle empty string', () => {
    expect(snakeCase('')).toBe('');
  });

  it('should handle PascalCase', () => {
    expect(snakeCase('HelloWorld')).toBe('hello_world');
  });
});

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('should not truncate short strings', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('should handle custom suffix', () => {
    expect(truncate('hello world', 8, '…')).toBe('hello w…');
  });

  it('should handle empty string', () => {
    expect(truncate('', 5)).toBe('');
  });

  it('should handle exact length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });
});

describe('slugify', () => {
  it('should create URL-friendly slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
  });

  it('should handle special characters', () => {
    expect(slugify('Hello @World #123')).toBe('hello-world-123');
  });

  it('should handle multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('should trim leading/trailing spaces', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });

  it('should handle empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('should handle underscores', () => {
    expect(slugify('hello_world')).toBe('hello-world');
  });
});

describe('reverse', () => {
  it('should reverse a string', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  it('should handle single character', () => {
    expect(reverse('h')).toBe('h');
  });

  it('should handle empty string', () => {
    expect(reverse('')).toBe('');
  });

  it('should handle palindromes', () => {
    expect(reverse('racecar')).toBe('racecar');
  });

  it('should handle spaces', () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });
});

describe('removeWhitespace', () => {
  it('should remove all whitespace', () => {
    expect(removeWhitespace('hello world')).toBe('helloworld');
  });

  it('should handle multiple spaces', () => {
    expect(removeWhitespace('hello   world')).toBe('helloworld');
  });

  it('should handle tabs and newlines', () => {
    expect(removeWhitespace('hello\t\nworld')).toBe('helloworld');
  });

  it('should handle empty string', () => {
    expect(removeWhitespace('')).toBe('');
  });

  it('should handle string without whitespace', () => {
    expect(removeWhitespace('helloworld')).toBe('helloworld');
  });
});

describe('countWords', () => {
  it('should count words in a string', () => {
    expect(countWords('hello world')).toBe(2);
  });

  it('should handle single word', () => {
    expect(countWords('hello')).toBe(1);
  });

  it('should handle empty string', () => {
    expect(countWords('')).toBe(0);
  });

  it('should handle multiple spaces', () => {
    expect(countWords('hello   world')).toBe(2);
  });

  it('should handle leading/trailing spaces', () => {
    expect(countWords('  hello world  ')).toBe(2);
  });

  it('should handle many words', () => {
    expect(countWords('the quick brown fox jumps')).toBe(5);
  });
});

describe('removeMask', () => {
  it('should remove phone number mask', () => {
    expect(removeMask('(123) 456-7890')).toBe('1234567890');
  });

  it('should remove SSN mask', () => {
    expect(removeMask('123-45-6789')).toBe('123456789');
  });

  it('should remove date mask with slashes', () => {
    expect(removeMask('12/31/2024')).toBe('12312024');
  });

  it('should remove credit card mask', () => {
    expect(removeMask('1234-5678-9012-3456')).toBe('1234567890123456');
  });

  it('should remove backslashes', () => {
    expect(removeMask('123\\456\\789')).toBe('123456789');
  });

  it('should handle empty string', () => {
    expect(removeMask('')).toBe('');
  });

  it('should handle string without mask', () => {
    expect(removeMask('1234567890')).toBe('1234567890');
  });

  it('should remove custom mask characters', () => {
    expect(removeMask('ABC-123', '-')).toBe('ABC123');
  });

  it('should remove multiple custom mask characters', () => {
    expect(removeMask('A*B*C-1-2-3', '*-')).toBe('ABC123');
  });

  it('should handle custom mask with special regex characters', () => {
    expect(removeMask('test.file.name', '.')).toBe('testfilename');
  });

  it('should preserve letters with default mask', () => {
    expect(removeMask('ABC-123')).toBe('ABC123');
  });

  it('should handle mixed content', () => {
    expect(removeMask('Apt. 5B')).toBe('Apt5B');
  });

  it('should throw error for non-string input', () => {
    expect(() => removeMask(123 as any)).toThrow('removeMask: str must be a string');
  });

  it('should throw error for non-string mask', () => {
    expect(() => removeMask('test', 123 as any)).toThrow('removeMask: mask must be a string');
  });
});

