import { describe, it, expect } from 'vitest';
import {
  format,
  addDays,
  addMonths,
  addYears,
  addHours,
  addMinutes,
  isBefore,
  isAfter,
  isSameDay,
  diffInDays,
  diffInHours,
  diffInMinutes,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  isValid,
  isWeekend,
  formatRelative,
  getWeekdayName,
  getMonthName,
} from './date.js';

describe('format', () => {
  it('should format date with YYYY-MM-DD', () => {
    const date = new Date('2026-01-09T10:30:45');
    expect(format(date, 'YYYY-MM-DD')).toBe('2026-01-09');
  });

  it('should format date with DD/MM/YYYY', () => {
    const date = new Date('2026-01-09T10:30:45');
    expect(format(date, 'DD/MM/YYYY')).toBe('09/01/2026');
  });

  it('should format date with time', () => {
    const date = new Date('2026-01-09T10:30:45');
    const result = format(date, 'YYYY-MM-DD HH:mm:ss');
    expect(result).toMatch(/2026-01-09.*10:30:45/);
  });

  it('should format with Intl options', () => {
    const date = new Date('2026-01-09T10:30:45');
    const result = format(date, { dateStyle: 'short' });
    expect(result).toContain('1');
    expect(result).toContain('9');
    expect(result).toContain('26');
  });

  it('should format with long date style', () => {
    const date = new Date('2026-01-09T10:30:45');
    const result = format(date, { dateStyle: 'long' });
    expect(result).toContain('January');
    expect(result).toContain('2026');
  });

  it('should support different locales', () => {
    const date = new Date('2026-01-09T10:30:45');
    const result = format(date, { dateStyle: 'long' }, 'en-US');
    expect(result).toContain('January');
  });

  it('should throw error for invalid date', () => {
    expect(() => format(new Date('invalid'), 'YYYY-MM-DD')).toThrow('format: date must be a valid Date');
  });

  it('should throw error for invalid pattern type', () => {
    expect(() => format(new Date(), 123 as any)).toThrow('format: pattern must be a string or DateTimeFormatOptions object');
  });
});

describe('addDays', () => {
  it('should add days to date', () => {
    const date = new Date('2026-01-09');
    const result = addDays(date, 7);
    expect(result.getUTCDate()).toBe(16);
  });

  it('should subtract days from date', () => {
    const date = new Date('2026-01-09');
    const result = addDays(date, -7);
    expect(result.getUTCDate()).toBe(2);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-09');
    const original = new Date(date);
    addDays(date, 7);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => addDays(new Date('invalid'), 1)).toThrow('addDays: date must be a valid Date');
  });

  it('should throw error for non-finite days', () => {
    expect(() => addDays(new Date(), NaN)).toThrow('addDays: days must be a finite number');
  });
});

describe('addMonths', () => {
  it('should add months to date', () => {
    const date = new Date('2026-01-09');
    const result = addMonths(date, 3);
    expect(result.getMonth()).toBe(3); // April (0-indexed)
  });

  it('should subtract months from date', () => {
    const date = new Date('2026-04-09');
    const result = addMonths(date, -3);
    expect(result.getMonth()).toBe(0); // January
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-09');
    const original = new Date(date);
    addMonths(date, 3);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => addMonths(new Date('invalid'), 1)).toThrow('addMonths: date must be a valid Date');
  });
});

describe('addYears', () => {
  it('should add years to date', () => {
    const date = new Date('2026-01-09');
    const result = addYears(date, 1);
    expect(result.getFullYear()).toBe(2027);
  });

  it('should subtract years from date', () => {
    const date = new Date('2026-01-09');
    const result = addYears(date, -1);
    expect(result.getFullYear()).toBe(2025);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-09');
    const original = new Date(date);
    addYears(date, 1);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => addYears(new Date('invalid'), 1)).toThrow('addYears: date must be a valid Date');
  });
});

describe('addHours', () => {
  it('should add hours to date', () => {
    const date = new Date('2026-01-09T10:00:00');
    const result = addHours(date, 2);
    expect(result.getHours()).toBe(12);
  });

  it('should subtract hours from date', () => {
    const date = new Date('2026-01-09T10:00:00');
    const result = addHours(date, -2);
    expect(result.getHours()).toBe(8);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-09T10:00:00');
    const original = new Date(date);
    addHours(date, 2);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => addHours(new Date('invalid'), 1)).toThrow('addHours: date must be a valid Date');
  });
});

describe('addMinutes', () => {
  it('should add minutes to date', () => {
    const date = new Date('2026-01-09T10:00:00');
    const result = addMinutes(date, 30);
    expect(result.getMinutes()).toBe(30);
  });

  it('should subtract minutes from date', () => {
    const date = new Date('2026-01-09T10:30:00');
    const result = addMinutes(date, -30);
    expect(result.getMinutes()).toBe(0);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-09T10:00:00');
    const original = new Date(date);
    addMinutes(date, 30);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => addMinutes(new Date('invalid'), 1)).toThrow('addMinutes: date must be a valid Date');
  });
});

describe('isBefore', () => {
  it('should return true if date1 is before date2', () => {
    const date1 = new Date('2026-01-01');
    const date2 = new Date('2026-12-31');
    expect(isBefore(date1, date2)).toBe(true);
  });

  it('should return false if date1 is after date2', () => {
    const date1 = new Date('2026-12-31');
    const date2 = new Date('2026-01-01');
    expect(isBefore(date1, date2)).toBe(false);
  });

  it('should return false if dates are equal', () => {
    const date = new Date('2026-01-09');
    expect(isBefore(date, new Date(date))).toBe(false);
  });

  it('should throw error for invalid date1', () => {
    expect(() => isBefore(new Date('invalid'), new Date())).toThrow('isBefore: date1 must be a valid Date');
  });

  it('should throw error for invalid date2', () => {
    expect(() => isBefore(new Date(), new Date('invalid'))).toThrow('isBefore: date2 must be a valid Date');
  });
});

describe('isAfter', () => {
  it('should return true if date1 is after date2', () => {
    const date1 = new Date('2026-12-31');
    const date2 = new Date('2026-01-01');
    expect(isAfter(date1, date2)).toBe(true);
  });

  it('should return false if date1 is before date2', () => {
    const date1 = new Date('2026-01-01');
    const date2 = new Date('2026-12-31');
    expect(isAfter(date1, date2)).toBe(false);
  });

  it('should return false if dates are equal', () => {
    const date = new Date('2026-01-09');
    expect(isAfter(date, new Date(date))).toBe(false);
  });

  it('should throw error for invalid date1', () => {
    expect(() => isAfter(new Date('invalid'), new Date())).toThrow('isAfter: date1 must be a valid Date');
  });
});

describe('isSameDay', () => {
  it('should return true for same day different times', () => {
    const date1 = new Date('2026-01-09T10:00:00');
    const date2 = new Date('2026-01-09T20:00:00');
    expect(isSameDay(date1, date2)).toBe(true);
  });

  it('should return false for different days', () => {
    const date1 = new Date('2026-01-09');
    const date2 = new Date('2026-01-10');
    expect(isSameDay(date1, date2)).toBe(false);
  });

  it('should throw error for invalid date1', () => {
    expect(() => isSameDay(new Date('invalid'), new Date())).toThrow('isSameDay: date1 must be a valid Date');
  });
});

describe('diffInDays', () => {
  it('should calculate positive difference', () => {
    const date1 = new Date('2026-01-10');
    const date2 = new Date('2026-01-01');
    expect(diffInDays(date1, date2)).toBe(9);
  });

  it('should calculate negative difference', () => {
    const date1 = new Date('2026-01-01');
    const date2 = new Date('2026-01-10');
    expect(diffInDays(date1, date2)).toBe(-9);
  });

  it('should return 0 for same day', () => {
    const date = new Date('2026-01-09');
    expect(diffInDays(date, new Date(date))).toBe(0);
  });

  it('should throw error for invalid date1', () => {
    expect(() => diffInDays(new Date('invalid'), new Date())).toThrow('diffInDays: date1 must be a valid Date');
  });
});

describe('diffInHours', () => {
  it('should calculate positive difference', () => {
    const date1 = new Date('2026-01-09T20:00:00');
    const date2 = new Date('2026-01-09T10:00:00');
    expect(diffInHours(date1, date2)).toBe(10);
  });

  it('should calculate negative difference', () => {
    const date1 = new Date('2026-01-09T10:00:00');
    const date2 = new Date('2026-01-09T20:00:00');
    expect(diffInHours(date1, date2)).toBe(-10);
  });

  it('should throw error for invalid date1', () => {
    expect(() => diffInHours(new Date('invalid'), new Date())).toThrow('diffInHours: date1 must be a valid Date');
  });
});

describe('diffInMinutes', () => {
  it('should calculate positive difference', () => {
    const date1 = new Date('2026-01-09T10:30:00');
    const date2 = new Date('2026-01-09T10:00:00');
    expect(diffInMinutes(date1, date2)).toBe(30);
  });

  it('should calculate negative difference', () => {
    const date1 = new Date('2026-01-09T10:00:00');
    const date2 = new Date('2026-01-09T10:30:00');
    expect(diffInMinutes(date1, date2)).toBe(-30);
  });

  it('should throw error for invalid date1', () => {
    expect(() => diffInMinutes(new Date('invalid'), new Date())).toThrow('diffInMinutes: date1 must be a valid Date');
  });
});

describe('startOfDay', () => {
  it('should return start of day', () => {
    const date = new Date('2026-01-09T15:30:45');
    const result = startOfDay(date);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-09T15:30:45');
    const original = new Date(date);
    startOfDay(date);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => startOfDay(new Date('invalid'))).toThrow('startOfDay: date must be a valid Date');
  });
});

describe('endOfDay', () => {
  it('should return end of day', () => {
    const date = new Date('2026-01-09T10:30:45');
    const result = endOfDay(date);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-09T10:30:45');
    const original = new Date(date);
    endOfDay(date);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => endOfDay(new Date('invalid'))).toThrow('endOfDay: date must be a valid Date');
  });
});

describe('startOfMonth', () => {
  it('should return start of month', () => {
    const date = new Date('2026-01-15T15:30:45');
    const result = startOfMonth(date);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-15');
    const original = new Date(date);
    startOfMonth(date);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => startOfMonth(new Date('invalid'))).toThrow('startOfMonth: date must be a valid Date');
  });
});

describe('endOfMonth', () => {
  it('should return end of January', () => {
    const date = new Date('2026-01-15');
    const result = endOfMonth(date);
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
  });

  it('should return end of February (non-leap year)', () => {
    const date = new Date('2026-02-15');
    const result = endOfMonth(date);
    expect(result.getDate()).toBe(28);
  });

  it('should not modify original date', () => {
    const date = new Date('2026-01-15');
    const original = new Date(date);
    endOfMonth(date);
    expect(date).toEqual(original);
  });

  it('should throw error for invalid date', () => {
    expect(() => endOfMonth(new Date('invalid'))).toThrow('endOfMonth: date must be a valid Date');
  });
});

describe('isValid', () => {
  it('should return true for valid date', () => {
    expect(isValid(new Date('2026-01-09'))).toBe(true);
  });

  it('should return false for invalid date', () => {
    expect(isValid(new Date('invalid'))).toBe(false);
  });

  it('should return false for non-date', () => {
    expect(isValid('2026-01-09' as any)).toBe(false);
  });
});

describe('isWeekend', () => {
  it('should return true for Saturday', () => {
    const saturday = new Date('2026-01-10'); // Saturday
    expect(isWeekend(saturday)).toBe(true);
  });

  it('should return true for Sunday', () => {
    const sunday = new Date('2026-01-11'); // Sunday
    expect(isWeekend(sunday)).toBe(true);
  });

  it('should return false for weekday', () => {
    const friday = new Date('2026-01-09'); // Friday
    expect(isWeekend(friday)).toBe(false);
  });

  it('should throw error for invalid date', () => {
    expect(() => isWeekend(new Date('invalid'))).toThrow('isWeekend: date must be a valid Date');
  });
});

describe('formatRelative', () => {
  it('should format recent past', () => {
    const date = new Date(Date.now() - 5 * 1000);
    expect(formatRelative(date)).toMatch(/\d+ seconds ago|in \d+ second/);
  });

  it('should format seconds ago', () => {
    const date = new Date(Date.now() - 30 * 1000);
    const result = formatRelative(date);
    expect(result).toMatch(/\d+ second/);
  });

  it('should format minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toMatch(/\d+ minute/);
  });

  it('should format hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toMatch(/\d+ hour/);
  });

  it('should format yesterday', () => {
    const date = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toBe('yesterday');
  });

  it('should format day before yesterday', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toMatch(/2 days ago/);
  });

  it('should format days ago beyond 2 days', () => {
    const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toMatch(/\d+ days ago/);
  });

  it('should format tomorrow', () => {
    const date = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toBe('tomorrow');
  });

  it('should format day after tomorrow', () => {
    const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toMatch(/in 2 days/);
  });

  it('should format future dates beyond 2 days', () => {
    const date = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const result = formatRelative(date);
    expect(result).toMatch(/in \d+ days/);
  });

  it('should support different locales', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const result = formatRelative(date, 'pt-BR');
    expect(result).toMatch(/há \d+ dia|anteontem/);
  });

  it('should throw error for invalid date', () => {
    expect(() => formatRelative(new Date('invalid'))).toThrow('formatRelative: date must be a valid Date');
  });
});

describe('getWeekdayName', () => {
  it('should return long weekday name in English', () => {
    const friday = new Date('2026-01-09'); // Friday
    expect(getWeekdayName(friday)).toBe('Friday');
  });

  it('should return short weekday name', () => {
    const friday = new Date('2026-01-09');
    const result = getWeekdayName(friday, 'short');
    expect(result).toContain('Fri');
  });

  it('should return narrow weekday name', () => {
    const friday = new Date('2026-01-09');
    const result = getWeekdayName(friday, 'narrow');
    expect(result).toBe('F');
  });

  it('should support different locales', () => {
    const friday = new Date('2026-01-09');
    expect(getWeekdayName(friday, 'long', 'en-US')).toBe('Friday');
  });

  it('should work with different days', () => {
    const saturday = new Date('2026-01-10');
    expect(getWeekdayName(saturday)).toBe('Saturday');
    
    const sunday = new Date('2026-01-11');
    expect(getWeekdayName(sunday)).toBe('Sunday');
  });

  it('should throw error for invalid date', () => {
    expect(() => getWeekdayName(new Date('invalid'))).toThrow('getWeekdayName: date must be a valid Date');
  });

  it('should throw error for invalid format', () => {
    expect(() => getWeekdayName(new Date(), 'invalid' as any)).toThrow('getWeekdayName: format must be "long", "short", or "narrow"');
  });

  it('should work with specific timezones', () => {
    const date = new Date('2026-01-09T00:00:00Z'); // Midnight UTC
    // In NY (UTC-5), it's still day 8 (Thursday)
    expect(getWeekdayName(date, 'long', 'en-US', 'America/New_York')).toBe('Thursday');
    // In UTC, it's day 9 (Friday)
    expect(getWeekdayName(date, 'long', 'en-US', 'UTC')).toBe('Friday');
  });
});

describe('getMonthName', () => {
  it('should return long month name in English', () => {
    const date = new Date('2026-01-09');
    expect(getMonthName(date)).toBe('January');
  });

  it('should return short month name', () => {
    const date = new Date('2026-01-09');
    const result = getMonthName(date, 'short');
    expect(result).toContain('Jan');
  });

  it('should return narrow month name', () => {
    const date = new Date('2026-01-09');
    const result = getMonthName(date, 'narrow');
    expect(result).toBe('J');
  });

  it('should support different locales', () => {
    const date = new Date('2026-01-09');
    expect(getMonthName(date, 'long', 'en-US')).toBe('January');
  });

  it('should work with different months', () => {
    const feb = new Date('2026-02-15');
    expect(getMonthName(feb)).toBe('February');
    
    const dec = new Date('2026-12-25');
    expect(getMonthName(dec)).toBe('December');
  });

  it('should throw error for invalid date', () => {
    expect(() => getMonthName(new Date('invalid'))).toThrow('getMonthName: date must be a valid Date');
  });

  it('should throw error for invalid format', () => {
    expect(() => getMonthName(new Date(), 'invalid' as any)).toThrow('getMonthName: format must be "long", "short", or "narrow"');
  });

  it('should work with specific timezones', () => {
    const date = new Date('2026-02-01T00:00:00Z'); // Midnight UTC, February 1st
    // In Tokyo (UTC+9), it's already February 1st
    expect(getMonthName(date, 'long', 'en-US', 'Asia/Tokyo')).toBe('February');
    // In LA (UTC-8), it's still January 31st
    expect(getMonthName(date, 'long', 'en-US', 'America/Los_Angeles')).toBe('January');
  });
});
