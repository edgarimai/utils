# @edgarimai/utils

A lightweight, tree-shakeable utility library for TypeScript and JavaScript. Simple, well-tested utilities for common tasks like string manipulation, number operations, and more.

## Features

- 🌳 **Tree-shakeable** - Import only what you need
- 📦 **Tiny bundle size** - Each utility is optimized
- 🔒 **Type-safe** - Full TypeScript support
- ✅ **Well-tested** - Comprehensive test coverage with Vitest
- 📚 **Simple API** - Easy to use, intuitive functions
- 🔄 **Dual format** - ESM and CJS support

## Installation

```bash
npm install @edgarimai/utils
```

```bash
yarn add @edgarimai/utils
```

```bash
pnpm add @edgarimai/utils
```

## Usage

You can import utilities in two ways:

### Option 1: Category Imports (Best for Tree-shaking)

```typescript
// Import only string utilities
import { capitalize, slugify } from '@edgarimai/utils/string';

// Import only number utilities
import { clamp, round } from '@edgarimai/utils/number';
```

### Option 2: Main Entry (Convenience)

```typescript
// Import from main entry
import { capitalize, clamp } from '@edgarimai/utils';
```

## API Reference

### String Utilities

#### `capitalize(str: string): string`

Capitalizes the first letter of a string.

```typescript
import { capitalize } from '@edgarimai/utils/string';

capitalize('hello'); // 'Hello'
capitalize('HELLO'); // 'HELLO'
```

#### `capitalizeWords(str: string): string`

Capitalizes the first letter of each word in a string.

```typescript
import { capitalizeWords } from '@edgarimai/utils/string';

capitalizeWords('hello world'); // 'Hello World'
capitalizeWords('the quick brown fox'); // 'The Quick Brown Fox'
```

#### `camelCase(str: string): string`

Converts a string to camelCase.

```typescript
import { camelCase } from '@edgarimai/utils/string';

camelCase('hello-world'); // 'helloWorld'
camelCase('hello_world'); // 'helloWorld'
camelCase('hello world'); // 'helloWorld'
```

#### `kebabCase(str: string): string`

Converts a string to kebab-case.

```typescript
import { kebabCase } from '@edgarimai/utils/string';

kebabCase('helloWorld'); // 'hello-world'
kebabCase('HelloWorld'); // 'hello-world'
kebabCase('hello_world'); // 'hello-world'
```

#### `snakeCase(str: string): string`

Converts a string to snake_case.

```typescript
import { snakeCase } from '@edgarimai/utils/string';

snakeCase('helloWorld'); // 'hello_world'
snakeCase('HelloWorld'); // 'hello_world'
snakeCase('hello-world'); // 'hello_world'
```

#### `truncate(str: string, length: number, suffix?: string): string`

Truncates a string to a specified length and adds a suffix (default: '...').

```typescript
import { truncate } from '@edgarimai/utils/string';

truncate('hello world', 8); // 'hello...'
truncate('hello world', 8, '…'); // 'hello w…'
truncate('hello', 10); // 'hello'
```

#### `slugify(str: string): string`

Creates a URL-friendly slug from a string.

```typescript
import { slugify } from '@edgarimai/utils/string';

slugify('Hello World!'); // 'hello-world'
slugify('Hello @World #123'); // 'hello-world-123'
slugify('  hello   world  '); // 'hello-world'
```

#### `reverse(str: string): string`

Reverses a string.

```typescript
import { reverse } from '@edgarimai/utils/string';

reverse('hello'); // 'olleh'
reverse('racecar'); // 'racecar'
```

#### `removeWhitespace(str: string): string`

Removes all whitespace from a string.

```typescript
import { removeWhitespace } from '@edgarimai/utils/string';

removeWhitespace('hello world'); // 'helloworld'
removeWhitespace('hello   world'); // 'helloworld'
removeWhitespace('hello\t\nworld'); // 'helloworld'
```

#### `countWords(str: string): number`

Counts the number of words in a string.

```typescript
import { countWords } from '@edgarimai/utils/string';

countWords('hello world'); // 2
countWords('the quick brown fox jumps'); // 5
countWords('  hello   world  '); // 2
```

#### `removeMask(str: string, mask?: string): string`

Removes mask characters from a string. By default, removes common mask characters like spaces, dashes, parentheses, dots, and slashes. You can optionally specify custom characters to remove.

```typescript
import { removeMask } from '@edgarimai/utils/string';

// Remove common mask characters (default behavior)
removeMask('(123) 456-7890'); // '1234567890'
removeMask('123-45-6789'); // '123456789'
removeMask('12/31/2024'); // '12312024'
removeMask('1234-5678-9012-3456'); // '1234567890123456'

// Remove custom mask characters
removeMask('ABC-123', '-'); // 'ABC123'
removeMask('A*B*C-1-2-3', '*-'); // 'ABC123'
removeMask('test.file.name', '.'); // 'testfilename'

// Preserves letters and alphanumeric content
removeMask('ABC-123'); // 'ABC123'
removeMask('Apt. 5B'); // 'Apt5B'
```

### Number Utilities

#### `clamp(value: number, min: number, max: number): number`

Constrains a number between a minimum and maximum value.

```typescript
import { clamp } from '@edgarimai/utils/number';

clamp(10, 0, 5); // 5
clamp(-5, 0, 10); // 0
clamp(5, 0, 10); // 5
```

#### `round(value: number, decimals?: number): number`

Rounds a number to a specified number of decimal places (default: 0).

```typescript
import { round } from '@edgarimai/utils/number';

round(3.14159, 2); // 3.14
round(3.7); // 4
round(3.14159, 4); // 3.1416
```

#### `randomInt(min: number, max: number): number`

Generates a random integer between min (inclusive) and max (inclusive).

```typescript
import { randomInt } from '@edgarimai/utils/number';

randomInt(1, 10); // Random integer between 1 and 10
randomInt(5, 5); // Always 5
```

#### `randomFloat(min: number, max: number, decimals?: number): number`

Generates a random float between min (inclusive) and max (exclusive) with specified decimal places (default: 2).

```typescript
import { randomFloat } from '@edgarimai/utils/number';

randomFloat(1, 10); // Random float like 7.42
randomFloat(1, 10, 3); // Random float like 7.423
```

#### `percentage(value: number, total: number, decimals?: number): number`

Calculates the percentage of a value relative to a total.

```typescript
import { percentage } from '@edgarimai/utils/number';

percentage(25, 100); // 25
percentage(1, 3, 2); // 33.33
percentage(150, 100); // 150
```

#### `formatCurrency(value: number, currency?: string, locale?: string): string`

Formats a number as currency (default: USD, en-US).

```typescript
import { formatCurrency } from '@edgarimai/utils/number';

formatCurrency(1234.56); // '$1,234.56'
formatCurrency(1234.56, 'EUR', 'de-DE'); // '1.234,56 €'
formatCurrency(1234567.89); // '$1,234,567.89'
```

#### `isEven(value: number): boolean`

Checks if a number is even.

```typescript
import { isEven } from '@edgarimai/utils/number';

isEven(4); // true
isEven(3); // false
isEven(0); // true
```

#### `isOdd(value: number): boolean`

Checks if a number is odd.

```typescript
import { isOdd } from '@edgarimai/utils/number';

isOdd(3); // true
isOdd(4); // false
isOdd(1); // true
```

#### `sum(numbers: number[]): number`

Calculates the sum of an array of numbers.

```typescript
import { sum } from '@edgarimai/utils/number';

sum([1, 2, 3, 4]); // 10
sum([1.5, 2.5, 3.5]); // 7.5
sum([]); // 0
```

#### `average(numbers: number[]): number`

Calculates the average of an array of numbers.

```typescript
import { average } from '@edgarimai/utils/number';

average([1, 2, 3, 4]); // 2.5
average([1, -1, 2, -2]); // 0
average([]); // 0
```

## TypeScript Support

This package is written in TypeScript and includes type definitions out of the box. No need to install separate `@types` packages.

```typescript
import { capitalize, clamp } from '@edgarimai/utils';

const name: string = capitalize('john'); // Type-safe
const value: number = clamp(10, 0, 5); // Type-safe
```

## Tree-shaking Benefits

When using category imports, bundlers like Vite, webpack, and Rollup will only include the utilities you actually use:

```typescript
// ✅ Only includes capitalize and slugify
import { capitalize, slugify } from '@edgarimai/utils/string';

// ✅ Only includes clamp and round
import { clamp, round } from '@edgarimai/utils/number';
```

This results in smaller bundle sizes for your application.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build
```

## License

MIT © edgarimai

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

