import { describe, it, expect } from 'vitest';
import {
  clamp,
  round,
  randomInt,
  randomFloat,
  percentage,
  formatCurrency,
  isEven,
  isOdd,
  sum,
  average,
} from './number.js';

describe('clamp', () => {
  it('should clamp value above max', () => {
    expect(clamp(10, 0, 5)).toBe(5);
  });

  it('should clamp value below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('should not clamp value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('should handle negative ranges', () => {
    expect(clamp(-15, -10, -5)).toBe(-10);
  });

  it('should handle equal min and max', () => {
    expect(clamp(10, 5, 5)).toBe(5);
  });
});

describe('round', () => {
  it('should round to integer by default', () => {
    expect(round(3.7)).toBe(4);
  });

  it('should round to specified decimals', () => {
    expect(round(3.14159, 2)).toBe(3.14);
  });

  it('should handle negative numbers', () => {
    expect(round(-3.7, 0)).toBe(-4);
  });

  it('should handle zero decimals', () => {
    expect(round(3.5, 0)).toBe(4);
  });

  it('should handle large decimal places', () => {
    expect(round(3.14159265359, 5)).toBe(3.14159);
  });
});

describe('randomInt', () => {
  it('should generate number within range', () => {
    const result = randomInt(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should handle same min and max', () => {
    expect(randomInt(5, 5)).toBe(5);
  });

  it('should handle negative ranges', () => {
    const result = randomInt(-10, -1);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(-1);
  });

  it('should generate integers only', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 100);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});

describe('randomFloat', () => {
  it('should generate number within range', () => {
    const result = randomFloat(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThan(10);
  });

  it('should respect decimal places', () => {
    const result = randomFloat(1, 10, 2);
    const decimals = result.toString().split('.')[1]?.length || 0;
    expect(decimals).toBeLessThanOrEqual(2);
  });

  it('should handle negative ranges', () => {
    const result = randomFloat(-10, -1);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThan(-1);
  });

  it('should handle zero decimals', () => {
    const result = randomFloat(1, 10, 0);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe('percentage', () => {
  it('should calculate percentage', () => {
    expect(percentage(25, 100)).toBe(25);
  });

  it('should handle decimal percentages', () => {
    expect(percentage(1, 3, 2)).toBe(33.33);
  });

  it('should handle zero total', () => {
    expect(percentage(10, 0)).toBe(0);
  });

  it('should handle values greater than total', () => {
    expect(percentage(150, 100)).toBe(150);
  });

  it('should handle negative values', () => {
    expect(percentage(-25, 100)).toBe(-25);
  });

  it('should respect decimal places', () => {
    expect(percentage(1, 3, 4)).toBe(33.3333);
  });
});

describe('formatCurrency', () => {
  it('should format USD by default', () => {
    const result = formatCurrency(1234.56);
    expect(result).toContain('1,234.56');
  });

  it('should handle different currencies', () => {
    const result = formatCurrency(1234.56, 'EUR', 'de-DE');
    expect(result).toContain('1.234,56');
  });

  it('should handle zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0.00');
  });

  it('should handle negative amounts', () => {
    const result = formatCurrency(-1234.56);
    expect(result).toContain('1,234.56');
  });

  it('should handle large numbers', () => {
    const result = formatCurrency(1234567.89);
    expect(result).toContain('1,234,567.89');
  });
});

describe('isEven', () => {
  it('should return true for even numbers', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(4)).toBe(true);
    expect(isEven(0)).toBe(true);
  });

  it('should return false for odd numbers', () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
  });

  it('should handle negative numbers', () => {
    expect(isEven(-2)).toBe(true);
    expect(isEven(-3)).toBe(false);
  });
});

describe('isOdd', () => {
  it('should return true for odd numbers', () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(3)).toBe(true);
  });

  it('should return false for even numbers', () => {
    expect(isOdd(2)).toBe(false);
    expect(isOdd(4)).toBe(false);
    expect(isOdd(0)).toBe(false);
  });

  it('should handle negative numbers', () => {
    expect(isOdd(-1)).toBe(true);
    expect(isOdd(-2)).toBe(false);
  });
});

describe('sum', () => {
  it('should calculate sum of numbers', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });

  it('should handle empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('should handle single number', () => {
    expect(sum([5])).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(sum([-1, -2, -3])).toBe(-6);
  });

  it('should handle mixed positive and negative', () => {
    expect(sum([1, -2, 3, -4])).toBe(-2);
  });

  it('should handle decimals', () => {
    expect(sum([1.5, 2.5, 3.5])).toBe(7.5);
  });
});

describe('average', () => {
  it('should calculate average of numbers', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5);
  });

  it('should handle empty array', () => {
    expect(average([])).toBe(0);
  });

  it('should handle single number', () => {
    expect(average([5])).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(average([-1, -2, -3])).toBe(-2);
  });

  it('should handle decimals', () => {
    expect(average([1.5, 2.5, 3.5])).toBe(2.5);
  });

  it('should handle mixed positive and negative', () => {
    expect(average([1, -1, 2, -2])).toBe(0);
  });
});

