/**
 * Formats a date using Intl.DateTimeFormat or common string patterns
 * @param date - The date to format
 * @param pattern - Format options or string pattern (YYYY-MM-DD, DD/MM/YYYY, etc)
 * @param locale - The locale to use (default: 'pt-BR')
 * @returns The formatted date string
 * @example format(new Date('2026-01-09'), 'DD/MM/YYYY') // '09/01/2026'
 * @example format(new Date('2026-01-09'), { dateStyle: 'long' }) // 'January 9, 2026'
 */
export function format(
  date: Date,
  pattern: string | Intl.DateTimeFormatOptions,
  locale = 'en-US'
): string {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('format: date must be a valid Date');

  if (typeof pattern !== 'string' && typeof pattern !== 'object')
    throw new TypeError('format: pattern must be a string or DateTimeFormatOptions object');

  // If pattern is a string, use manual replacement for exact format control
  if (typeof pattern === 'string') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return pattern
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  // If pattern is an object, use it directly with Intl
  return new Intl.DateTimeFormat(locale, pattern).format(date);
}

/**
 * Adds days to a date
 * Uses UTC to avoid timezone issues with dates at midnight
 * @param date - The date to add to
 * @param days - The number of days to add (can be negative)
 * @returns A new date with days added
 * @example addDays(new Date('2026-01-09'), 7) // 2026-01-16
 */
export function addDays(date: Date, days: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('addDays: date must be a valid Date');

  if (!Number.isFinite(days))
    throw new TypeError('addDays: days must be a finite number');

  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/**
 * Adds months to a date
 * @param date - The date to add to
 * @param months - The number of months to add (can be negative)
 * @returns A new date with months added
 * @example addMonths(new Date('2026-01-09'), 3) // 2026-04-09
 */
export function addMonths(date: Date, months: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('addMonths: date must be a valid Date');

  if (!Number.isFinite(months))
    throw new TypeError('addMonths: months must be a finite number');

  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Adds years to a date
 * @param date - The date to add to
 * @param years - The number of years to add (can be negative)
 * @returns A new date with years added
 * @example addYears(new Date('2026-01-09'), 1) // 2027-01-09
 */
export function addYears(date: Date, years: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('addYears: date must be a valid Date');

  if (!Number.isFinite(years))
    throw new TypeError('addYears: years must be a finite number');

  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Adds hours to a date
 * @param date - The date to add to
 * @param hours - The number of hours to add (can be negative)
 * @returns A new date with hours added
 * @example addHours(new Date('2026-01-09 10:00'), 2) // 2026-01-09 12:00
 */
export function addHours(date: Date, hours: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('addHours: date must be a valid Date');

  if (!Number.isFinite(hours))
    throw new TypeError('addHours: hours must be a finite number');

  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

/**
 * Adds minutes to a date
 * @param date - The date to add to
 * @param minutes - The number of minutes to add (can be negative)
 * @returns A new date with minutes added
 * @example addMinutes(new Date('2026-01-09 10:00'), 30) // 2026-01-09 10:30
 */
export function addMinutes(date: Date, minutes: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('addMinutes: date must be a valid Date');

  if (!Number.isFinite(minutes))
    throw new TypeError('addMinutes: minutes must be a finite number');

  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

/**
 * Checks if date1 is before date2
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns True if date1 is before date2
 * @example isBefore(new Date('2026-01-01'), new Date('2026-12-31')) // true
 */
export function isBefore(date1: Date, date2: Date): boolean {
  if (!(date1 instanceof Date) || isNaN(date1.getTime()))
    throw new TypeError('isBefore: date1 must be a valid Date');

  if (!(date2 instanceof Date) || isNaN(date2.getTime()))
    throw new TypeError('isBefore: date2 must be a valid Date');

  return date1.getTime() < date2.getTime();
}

/**
 * Checks if date1 is after date2
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns True if date1 is after date2
 * @example isAfter(new Date('2026-12-31'), new Date('2026-01-01')) // true
 */
export function isAfter(date1: Date, date2: Date): boolean {
  if (!(date1 instanceof Date) || isNaN(date1.getTime()))
    throw new TypeError('isAfter: date1 must be a valid Date');

  if (!(date2 instanceof Date) || isNaN(date2.getTime()))
    throw new TypeError('isAfter: date2 must be a valid Date');

  return date1.getTime() > date2.getTime();
}

/**
 * Checks if two dates are on the same day
 * Uses UTC to avoid timezone issues with dates at midnight
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns True if dates are on the same day
 * @example isSameDay(new Date('2026-01-09 10:00'), new Date('2026-01-09 20:00')) // true
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  if (!(date1 instanceof Date) || isNaN(date1.getTime()))
    throw new TypeError('isSameDay: date1 must be a valid Date');

  if (!(date2 instanceof Date) || isNaN(date2.getTime()))
    throw new TypeError('isSameDay: date2 must be a valid Date');

  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}

/**
 * Calculates the difference in days between two dates
 * Uses UTC to avoid timezone issues with dates at midnight
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The number of days between dates
 * @example diffInDays(new Date('2026-01-10'), new Date('2026-01-01')) // 9
 */
export function diffInDays(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || isNaN(date1.getTime()))
    throw new TypeError('diffInDays: date1 must be a valid Date');

  if (!(date2 instanceof Date) || isNaN(date2.getTime()))
    throw new TypeError('diffInDays: date2 must be a valid Date');

  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());
  const utc2 = Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());

  return Math.floor((utc1 - utc2) / msPerDay);
}

/**
 * Calculates the difference in hours between two dates
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The number of hours between dates
 * @example diffInHours(new Date('2026-01-09 20:00'), new Date('2026-01-09 10:00')) // 10
 */
export function diffInHours(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || isNaN(date1.getTime()))
    throw new TypeError('diffInHours: date1 must be a valid Date');

  if (!(date2 instanceof Date) || isNaN(date2.getTime()))
    throw new TypeError('diffInHours: date2 must be a valid Date');

  const msPerHour = 1000 * 60 * 60;
  return Math.floor((date1.getTime() - date2.getTime()) / msPerHour);
}

/**
 * Calculates the difference in minutes between two dates
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The number of minutes between dates
 * @example diffInMinutes(new Date('2026-01-09 10:30'), new Date('2026-01-09 10:00')) // 30
 */
export function diffInMinutes(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || isNaN(date1.getTime()))
    throw new TypeError('diffInMinutes: date1 must be a valid Date');

  if (!(date2 instanceof Date) || isNaN(date2.getTime()))
    throw new TypeError('diffInMinutes: date2 must be a valid Date');

  const msPerMinute = 1000 * 60;
  return Math.floor((date1.getTime() - date2.getTime()) / msPerMinute);
}

/**
 * Returns the start of the day (00:00:00)
 * @param date - The date
 * @returns A new date at the start of the day
 * @example startOfDay(new Date('2026-01-09 15:30')) // 2026-01-09 00:00:00
 */
export function startOfDay(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('startOfDay: date must be a valid Date');

  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns the end of the day (23:59:59.999)
 * @param date - The date
 * @returns A new date at the end of the day
 * @example endOfDay(new Date('2026-01-09 15:30')) // 2026-01-09 23:59:59.999
 */
export function endOfDay(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('endOfDay: date must be a valid Date');

  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Returns the start of the month
 * @param date - The date
 * @returns A new date at the start of the month
 * @example startOfMonth(new Date('2026-01-15')) // 2026-01-01 00:00:00
 */
export function startOfMonth(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('startOfMonth: date must be a valid Date');

  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns the end of the month
 * @param date - The date
 * @returns A new date at the end of the month
 * @example endOfMonth(new Date('2026-01-15')) // 2026-01-31 23:59:59.999
 */
export function endOfMonth(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('endOfMonth: date must be a valid Date');

  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Checks if a date is valid
 * @param date - The date to check
 * @returns True if the date is valid
 * @example isValid(new Date('2026-01-09')) // true
 * @example isValid(new Date('invalid')) // false
 */
export function isValid(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Checks if a date is on a weekend (Saturday or Sunday)
 * Uses UTC to avoid timezone issues with dates at midnight
 * @param date - The date to check
 * @returns True if the date is on a weekend
 * @example isWeekend(new Date('2026-01-10')) // true (Saturday)
 */
export function isWeekend(date: Date): boolean {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('isWeekend: date must be a valid Date');

  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

/**
 * Formats a date relative to now using Intl.RelativeTimeFormat
 * @param date - The date to format
 * @param locale - The locale to use (default: 'pt-BR')
 * @returns A relative time string
 * @example formatRelative(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)) // '2 days ago'
 */
export function formatRelative(date: Date, locale = 'en-US'): string {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('formatRelative: date must be a valid Date');

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  // Special case for very recent times
  if (Math.abs(diffSec) < 10) {
    return locale === 'pt-BR'
      ? (diffSec < 0 ? 'há poucos segundos' : 'daqui a poucos segundos')
      : rtf.format(diffSec, 'second');
  }

  // Choose the appropriate unit
  if (Math.abs(diffSec) < 60) {
    return rtf.format(diffSec, 'second');
  } else if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, 'minute');
  } else if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, 'hour');
  } else if (Math.abs(diffDay) < 30) {
    return rtf.format(diffDay, 'day');
  } else if (Math.abs(diffMonth) < 12) {
    return rtf.format(diffMonth, 'month');
  } else {
    return rtf.format(diffYear, 'year');
  }
}

/**
 * Gets the weekday name from a date using Intl.DateTimeFormat
 * @param date - The date to get the weekday from
 * @param format - The format style: 'long', 'short', or 'narrow' (default: 'long')
 * @param locale - The locale to use (default: 'pt-BR')
 * @param timeZone - The timezone to use (e.g., 'UTC', 'America/Sao_Paulo')
 * @returns The weekday name
 * @example getWeekdayName(new Date('2026-01-09')) // 'Friday'
 * @example getWeekdayName(new Date('2026-01-09'), 'short') // 'Fri.'
 * @example getWeekdayName(new Date('2026-01-09'), 'long', 'pt-BR', 'America/Sao_Paulo') // 'sexta-feira'
 */
export function getWeekdayName(
  date: Date,
  format: 'long' | 'short' | 'narrow' = 'long',
  locale = 'en-US',
  timeZone: string = 'UTC'
): string {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('getWeekdayName: date must be a valid Date');

  if (!['long', 'short', 'narrow'].includes(format))
    throw new TypeError('getWeekdayName: format must be "long", "short", or "narrow"');

  const options: Intl.DateTimeFormatOptions = { weekday: format };
  if (timeZone) options.timeZone = timeZone;

  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Gets the month name from a date using Intl.DateTimeFormat
 * @param date - The date to get the month from
 * @param format - The format style: 'long', 'short', or 'narrow' (default: 'long')
 * @param locale - The locale to use (default: 'pt-BR')
 * @param timeZone - The timezone to use (e.g., 'UTC', 'America/Sao_Paulo')
 * @returns The month name
 * @example getMonthName(new Date('2026-01-09')) // 'January'
 * @example getMonthName(new Date('2026-01-09'), 'short') // 'Jan.'
 * @example getMonthName(new Date('2026-01-09'), 'long', 'pt-BR', 'UTC') // 'janeiro'
 */
export function getMonthName(
  date: Date,
  format: 'long' | 'short' | 'narrow' = 'long',
  locale = 'en-US',
  timeZone: string = 'UTC'
): string {
  if (!(date instanceof Date) || isNaN(date.getTime()))
    throw new TypeError('getMonthName: date must be a valid Date');

  if (!['long', 'short', 'narrow'].includes(format))
    throw new TypeError('getMonthName: format must be "long", "short", or "narrow"');

  const options: Intl.DateTimeFormatOptions = { month: format };
  if (timeZone) options.timeZone = timeZone;

  return new Intl.DateTimeFormat(locale, options).format(date);
}
