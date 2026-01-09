# @edgarimai/utils

A lightweight, tree-shakeable utility library for TypeScript and JavaScript. Simple, well-tested utilities for common tasks like string manipulation, number operations, array transformations, object operations, date handling, and more.

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

// Import only array utilities
import { unique, chunk } from '@edgarimai/utils/array';

// Import only object utilities
import { pick, merge } from '@edgarimai/utils/object';

// Import only date utilities
import { format, addDays } from '@edgarimai/utils/date';
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

### Array Utilities

#### `unique<T>(arr: T[]): T[]`

Removes duplicate values from an array.

```typescript
import { unique } from '@edgarimai/utils/array';

unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
unique(['a', 'b', 'b', 'c']); // ['a', 'b', 'c']
```

#### `flatten<T>(arr: any[], depth?: number): T[]`

Flattens an array to a specified depth (default: 1).

```typescript
import { flatten } from '@edgarimai/utils/array';

flatten([[1, 2], [3, 4]]); // [1, 2, 3, 4]
flatten([[[1, 2]], [[3, 4]]], 2); // [1, 2, 3, 4]
```

#### `chunk<T>(arr: T[], size: number): T[][]`

Chunks an array into smaller arrays of a specified size.

```typescript
import { chunk } from '@edgarimai/utils/array';

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
```

#### `take<T>(arr: T[], n?: number): T[]`

Returns the first n elements of an array (default: 1).

```typescript
import { take } from '@edgarimai/utils/array';

take([1, 2, 3, 4], 2); // [1, 2]
take([1, 2, 3]); // [1]
```

#### `drop<T>(arr: T[], n?: number): T[]`

Returns all elements except the first n (default: 1).

```typescript
import { drop } from '@edgarimai/utils/array';

drop([1, 2, 3, 4], 2); // [3, 4]
drop([1, 2, 3]); // [2, 3]
```

#### `takeLast<T>(arr: T[], n?: number): T[]`

Returns the last n elements of an array (default: 1).

```typescript
import { takeLast } from '@edgarimai/utils/array';

takeLast([1, 2, 3, 4], 2); // [3, 4]
takeLast([1, 2, 3]); // [3]
```

#### `shuffle<T>(arr: T[]): T[]`

Shuffles an array randomly.

```typescript
import { shuffle } from '@edgarimai/utils/array';

shuffle([1, 2, 3, 4]); // [3, 1, 4, 2] (random order)
```

#### `sample<T>(arr: T[]): T | undefined`

Returns a random element from an array.

```typescript
import { sample } from '@edgarimai/utils/array';

sample([1, 2, 3, 4]); // 3 (random element)
sample([]); // undefined
```

#### `intersection<T>(arr1: T[], arr2: T[]): T[]`

Returns the intersection of two arrays (common elements).

```typescript
import { intersection } from '@edgarimai/utils/array';

intersection([1, 2, 3], [2, 3, 4]); // [2, 3]
intersection([1, 2], [3, 4]); // []
```

#### `difference<T>(arr1: T[], arr2: T[]): T[]`

Returns the difference between two arrays (elements in arr1 but not in arr2).

```typescript
import { difference } from '@edgarimai/utils/array';

difference([1, 2, 3], [2, 3, 4]); // [1]
difference([1, 2], [1, 2, 3]); // []
```

#### `groupBy<T>(arr: T[], fn: (item: T) => string | number): Record<string | number, T[]>`

Groups array elements by a key function.

```typescript
import { groupBy } from '@edgarimai/utils/array';

const users = [
  { name: 'John', age: 20 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 20 }
];

groupBy(users, user => user.age);
// { 20: [{ name: 'John', age: 20 }, { name: 'Bob', age: 20 }], 30: [{ name: 'Jane', age: 30 }] }
```

#### `countBy<T>(arr: T[]): Record<T, number>`

Counts occurrences of each element in an array.

```typescript
import { countBy } from '@edgarimai/utils/array';

countBy([1, 2, 2, 3, 3, 3]); // { 1: 1, 2: 2, 3: 3 }
countBy(['a', 'b', 'b', 'c', 'c', 'c']); // { a: 1, b: 2, c: 3 }
```

#### `sortBy<T>(arr: T[], fn: (item: T) => number | string, order?: 'asc' | 'desc'): T[]`

Sorts an array by a key function (default order: 'asc').

```typescript
import { sortBy } from '@edgarimai/utils/array';

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 20 },
  { name: 'Bob', age: 25 }
];

sortBy(users, user => user.age); // Sorted by age ascending
sortBy(users, user => user.age, 'desc'); // Sorted by age descending
```

#### `partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]]`

Partitions an array into two arrays based on a predicate.

```typescript
import { partition } from '@edgarimai/utils/array';

partition([1, 2, 3, 4], n => n % 2 === 0); // [[2, 4], [1, 3]]
partition([1, 2, 3, 4], n => n > 2); // [[3, 4], [1, 2]]
```

#### `zip<T>(...arrays: T[][]): T[][]`

Zips multiple arrays together.

```typescript
import { zip } from '@edgarimai/utils/array';

zip([1, 2], ['a', 'b']); // [[1, 'a'], [2, 'b']]
zip([1, 2, 3], ['a', 'b']); // [[1, 'a'], [2, 'b']]
```

#### `compact<T>(arr: T[]): NonNullable<T>[]`

Compacts an array by removing falsy values.

```typescript
import { compact } from '@edgarimai/utils/array';

compact([0, 1, false, 2, '', 3, null, undefined]); // [1, 2, 3]
compact([1, 2, 3]); // [1, 2, 3]
```

#### `min(arr: number[]): number | undefined`

Finds the minimum value in an array.

```typescript
import { min } from '@edgarimai/utils/array';

min([3, 1, 4, 1, 5]); // 1
min([3, -1, 4]); // -1
min([]); // undefined
```

#### `max(arr: number[]): number | undefined`

Finds the maximum value in an array.

```typescript
import { max } from '@edgarimai/utils/array';

max([3, 1, 4, 1, 5]); // 5
max([-3, -1, -4]); // -1
max([]); // undefined
```

### Object Utilities

#### `pick<T, K>(obj: T, keys: K[]): Pick<T, K>`

Selects only the specified keys from an object.

```typescript
import { pick } from '@edgarimai/utils/object';

pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
pick({ name: 'John', age: 30, email: 'john@example.com' }, ['name', 'email']); 
// { name: 'John', email: 'john@example.com' }
```

#### `omit<T, K>(obj: T, keys: K[]): Omit<T, K>`

Removes the specified keys from an object.

```typescript
import { omit } from '@edgarimai/utils/object';

omit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
omit({ name: 'John', password: 'secret', email: 'john@example.com' }, ['password']); 
// { name: 'John', email: 'john@example.com' }
```

#### `merge<T>(target: T, ...sources: Partial<T>[]): T`

Deep merges multiple objects into a target object.

```typescript
import { merge } from '@edgarimai/utils/object';

merge({ a: 1 }, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
merge({ a: { b: 1 } }, { a: { c: 2 } }); // { a: { b: 1, c: 2 } }
merge({ user: { name: 'John' } }, { user: { age: 30 } }); 
// { user: { name: 'John', age: 30 } }
```

#### `clone<T>(obj: T): T`

Deep clones an object.

```typescript
import { clone } from '@edgarimai/utils/object';

const original = { a: { b: 1 } };
const cloned = clone(original);
cloned.a.b = 2;
console.log(original.a.b); // 1 (unchanged)
```

#### `get<T>(obj: any, path: string | string[], defaultValue?: T): T`

Gets a value from an object by path with optional default value.

```typescript
import { get } from '@edgarimai/utils/object';

get({ a: { b: 1 } }, 'a.b'); // 1
get({ a: { b: 1 } }, ['a', 'b']); // 1
get({ a: {} }, 'a.b.c', 'default'); // 'default'
get({ user: { profile: { name: 'John' } } }, 'user.profile.name'); // 'John'
```

#### `set<T>(obj: T, path: string | string[], value: any): T`

Sets a value in an object by path (returns new object).

```typescript
import { set } from '@edgarimai/utils/object';

set({}, 'a.b.c', 1); // { a: { b: { c: 1 } } }
set({ a: { b: 1 } }, 'a.c', 2); // { a: { b: 1, c: 2 } }
set({}, ['user', 'profile', 'name'], 'John'); 
// { user: { profile: { name: 'John' } } }
```

#### `isEmpty(obj: object): boolean`

Checks if an object is empty.

```typescript
import { isEmpty } from '@edgarimai/utils/object';

isEmpty({}); // true
isEmpty({ a: 1 }); // false
isEmpty([]); // true
isEmpty([1, 2]); // false
```

#### `isEqual(obj1: any, obj2: any): boolean`

Deep compares two objects for equality.

```typescript
import { isEqual } from '@edgarimai/utils/object';

isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
isEqual({ a: 1 }, { a: 2 }); // false
isEqual({ a: { b: 1 } }, { a: { b: 1 } }); // true (deep comparison)
isEqual([1, 2, 3], [1, 2, 3]); // true
```

#### `mapValues<T, R>(obj: T, fn: (value, key) => R): Record<keyof T, R>`

Transforms the values of an object.

```typescript
import { mapValues } from '@edgarimai/utils/object';

mapValues({ a: 1, b: 2 }, val => val * 2); // { a: 2, b: 4 }
mapValues({ a: 1, b: 2 }, (val, key) => `${key}-${val}`); 
// { a: 'a-1', b: 'b-2' }
```

#### `keys<T>(obj: T): (keyof T)[]`

Returns the keys of an object (type-safe version of Object.keys).

```typescript
import { keys } from '@edgarimai/utils/object';

keys({ a: 1, b: 2 }); // ['a', 'b']
// Type-safe: returned keys are typed as 'a' | 'b'
```

#### `values<T>(obj: T): T[keyof T][]`

Returns the values of an object (type-safe version of Object.values).

```typescript
import { values } from '@edgarimai/utils/object';

values({ a: 1, b: 2 }); // [1, 2]
values({ name: 'John', age: 30 }); // ['John', 30]
```

#### `entries<T>(obj: T): [keyof T, T[keyof T]][]`

Returns the entries of an object (type-safe version of Object.entries).

```typescript
import { entries } from '@edgarimai/utils/object';

entries({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]
// Type-safe: keys and values are properly typed
```

### Date Utilities

#### `format(date: Date, pattern: string | Intl.DateTimeFormatOptions, locale?: string): string`

Formats a date using Intl.DateTimeFormat or common string patterns.

```typescript
import { format } from '@edgarimai/utils/date';

// String patterns (common formats)
format(new Date('2026-01-09'), 'DD/MM/YYYY'); // '09/01/2026'
format(new Date('2026-01-09'), 'YYYY-MM-DD'); // '2026-01-09'
format(new Date('2026-01-09 10:30:45'), 'YYYY-MM-DD HH:mm:ss'); 
// '2026-01-09 10:30:45'

// Intl options (more powerful)
format(new Date('2026-01-09'), { dateStyle: 'short' }); // '09/01/2026'
format(new Date('2026-01-09'), { dateStyle: 'long' }); // 'January 9, 2026'
format(new Date('2026-01-09'), { dateStyle: 'full' }); 
// 'Friday, January 9, 2026'

// Different locales
format(new Date('2026-01-09'), { dateStyle: 'long' }, 'en-US'); 
// 'January 9, 2026'
```

#### `addDays(date: Date, days: number): Date`

Adds or subtracts days from a date. Uses UTC to avoid timezone issues.

```typescript
import { addDays } from '@edgarimai/utils/date';

addDays(new Date('2026-01-09'), 7); // 2026-01-16
addDays(new Date('2026-01-09'), -7); // 2026-01-02
```

#### `addMonths(date: Date, months: number): Date`

Adds or subtracts months from a date.

```typescript
import { addMonths } from '@edgarimai/utils/date';

addMonths(new Date('2026-01-09'), 3); // 2026-04-09
addMonths(new Date('2026-04-09'), -3); // 2026-01-09
```

#### `addYears(date: Date, years: number): Date`

Adds or subtracts years from a date.

```typescript
import { addYears } from '@edgarimai/utils/date';

addYears(new Date('2026-01-09'), 1); // 2027-01-09
addYears(new Date('2026-01-09'), -1); // 2025-01-09
```

#### `addHours(date: Date, hours: number): Date`

Adds or subtracts hours from a date.

```typescript
import { addHours } from '@edgarimai/utils/date';

addHours(new Date('2026-01-09 10:00'), 2); // 2026-01-09 12:00
addHours(new Date('2026-01-09 10:00'), -2); // 2026-01-09 08:00
```

#### `addMinutes(date: Date, minutes: number): Date`

Adds or subtracts minutes from a date.

```typescript
import { addMinutes } from '@edgarimai/utils/date';

addMinutes(new Date('2026-01-09 10:00'), 30); // 2026-01-09 10:30
addMinutes(new Date('2026-01-09 10:30'), -30); // 2026-01-09 10:00
```

#### `isBefore(date1: Date, date2: Date): boolean`

Checks if date1 is before date2.

```typescript
import { isBefore } from '@edgarimai/utils/date';

isBefore(new Date('2026-01-01'), new Date('2026-12-31')); // true
isBefore(new Date('2026-12-31'), new Date('2026-01-01')); // false
```

#### `isAfter(date1: Date, date2: Date): boolean`

Checks if date1 is after date2.

```typescript
import { isAfter } from '@edgarimai/utils/date';

isAfter(new Date('2026-12-31'), new Date('2026-01-01')); // true
isAfter(new Date('2026-01-01'), new Date('2026-12-31')); // false
```

#### `isSameDay(date1: Date, date2: Date): boolean`

Checks if two dates are on the same day. Uses UTC to avoid timezone issues.

```typescript
import { isSameDay } from '@edgarimai/utils/date';

isSameDay(new Date('2026-01-09 10:00'), new Date('2026-01-09 20:00')); // true
isSameDay(new Date('2026-01-09'), new Date('2026-01-10')); // false
```

#### `diffInDays(date1: Date, date2: Date): number`

Calculates the difference in days between two dates. Uses UTC to avoid timezone issues.

```typescript
import { diffInDays } from '@edgarimai/utils/date';

diffInDays(new Date('2026-01-10'), new Date('2026-01-01')); // 9
diffInDays(new Date('2026-01-01'), new Date('2026-01-10')); // -9
```

#### `diffInHours(date1: Date, date2: Date): number`

Calculates the difference in hours between two dates.

```typescript
import { diffInHours } from '@edgarimai/utils/date';

diffInHours(new Date('2026-01-09 20:00'), new Date('2026-01-09 10:00')); // 10
diffInHours(new Date('2026-01-09 10:00'), new Date('2026-01-09 20:00')); // -10
```

#### `diffInMinutes(date1: Date, date2: Date): number`

Calculates the difference in minutes between two dates.

```typescript
import { diffInMinutes } from '@edgarimai/utils/date';

diffInMinutes(new Date('2026-01-09 10:30'), new Date('2026-01-09 10:00')); // 30
diffInMinutes(new Date('2026-01-09 10:00'), new Date('2026-01-09 10:30')); // -30
```

#### `startOfDay(date: Date): Date`

Returns the start of the day (00:00:00).

```typescript
import { startOfDay } from '@edgarimai/utils/date';

startOfDay(new Date('2026-01-09 15:30')); // 2026-01-09 00:00:00
```

#### `endOfDay(date: Date): Date`

Returns the end of the day (23:59:59.999).

```typescript
import { endOfDay } from '@edgarimai/utils/date';

endOfDay(new Date('2026-01-09 15:30')); // 2026-01-09 23:59:59.999
```

#### `startOfMonth(date: Date): Date`

Returns the first day of the month.

```typescript
import { startOfMonth } from '@edgarimai/utils/date';

startOfMonth(new Date('2026-01-15')); // 2026-01-01 00:00:00
```

#### `endOfMonth(date: Date): Date`

Returns the last day of the month.

```typescript
import { endOfMonth } from '@edgarimai/utils/date';

endOfMonth(new Date('2026-01-15')); // 2026-01-31 23:59:59.999
endOfMonth(new Date('2026-02-15')); // 2026-02-28 23:59:59.999
```

#### `isValid(date: Date): boolean`

Checks if a date is valid.

```typescript
import { isValid } from '@edgarimai/utils/date';

isValid(new Date('2026-01-09')); // true
isValid(new Date('invalid')); // false
```

#### `isWeekend(date: Date): boolean`

Checks if a date is on a weekend (Saturday or Sunday). Uses UTC to avoid timezone issues.

```typescript
import { isWeekend } from '@edgarimai/utils/date';

isWeekend(new Date('2026-01-10')); // true (Saturday in UTC)
isWeekend(new Date('2026-01-09')); // false (Friday in UTC)
```

#### `formatRelative(date: Date, locale?: string): string`

Formats a date relative to now using Intl.RelativeTimeFormat.

```typescript
import { formatRelative } from '@edgarimai/utils/date';

formatRelative(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)); // '2 days ago'
formatRelative(new Date(Date.now() + 3 * 60 * 60 * 1000)); // 'in 3 hours'
formatRelative(new Date(Date.now() - 5 * 1000)); // 'a few seconds ago'

// Different locales (portuguese examples)
formatRelative(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 'pt-BR');
// 'há 2 dias'
formatRelative(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 'pt-BR');
// 'amanhã'
```

#### `getWeekdayName(date: Date, format?: 'long' | 'short' | 'narrow', locale?: string, timeZone?: string): string`

Gets the weekday name from a date using Intl.DateTimeFormat.

```typescript
import { getWeekdayName } from '@edgarimai/utils/date';

getWeekdayName(new Date('2026-01-09T12:00:00')); // 'Friday'
getWeekdayName(new Date('2026-01-09'), 'short'); // 'Fri.'
getWeekdayName(new Date('2026-01-09'), 'narrow'); // 'F'

// Different locales
getWeekdayName(new Date('2026-01-09'), 'long', 'pt-BR'); // 'sexta-feira'
getWeekdayName(new Date('2026-01-10'), 'short', 'pt-BR'); // 'sáb.'

// With timezone (useful for dates at midnight)
getWeekdayName(new Date('2026-01-09'), 'long', 'en-US', 'UTC');
// 'Friday' (always uses day 9 in UTC)
```

#### `getMonthName(date: Date, format?: 'long' | 'short' | 'narrow', locale?: string, timeZone?: string): string`

Gets the month name from a date using Intl.DateTimeFormat.

```typescript
import { getMonthName } from '@edgarimai/utils/date';

getMonthName(new Date('2026-01-09T12:00:00')); // 'January'
getMonthName(new Date('2026-01-09'), 'short'); // 'Jan.'
getMonthName(new Date('2026-01-09'), 'narrow'); // 'J'

// Different locales
getMonthName(new Date('2026-01-09'), 'long', 'pt-BR'); // 'janeiro'
getMonthName(new Date('2026-12-25'), 'short', 'pt-BR'); // 'dez.'

// With timezone (useful for dates at midnight)
getMonthName(new Date('2026-01-01'), 'long', 'en-US', 'UTC');
// 'January' (always uses month in UTC)
```

## TypeScript Support

This package is written in TypeScript and includes type definitions out of the box. No need to install separate `@types` packages.

```typescript
import { capitalize, clamp, unique, pick, format } from '@edgarimai/utils';

const name: string = capitalize('john'); // Type-safe
const value: number = clamp(10, 0, 5); // Type-safe
const arr: number[] = unique([1, 2, 2, 3]); // Type-safe
const obj = pick({ a: 1, b: 2 }, ['a']); // Type-safe: { a: number }
const dateStr: string = format(new Date(), 'DD/MM/YYYY'); // Type-safe
```

## Tree-shaking Benefits

When using category imports, bundlers like Vite, webpack, and Rollup will only include the utilities you actually use:

```typescript
// ✅ Only includes capitalize and slugify
import { capitalize, slugify } from '@edgarimai/utils/string';

// ✅ Only includes clamp and round
import { clamp, round } from '@edgarimai/utils/number';

// ✅ Only includes unique and chunk
import { unique, chunk } from '@edgarimai/utils/array';

// ✅ Only includes pick and merge
import { pick, merge } from '@edgarimai/utils/object';

// ✅ Only includes format and addDays
import { format, addDays } from '@edgarimai/utils/date';
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

