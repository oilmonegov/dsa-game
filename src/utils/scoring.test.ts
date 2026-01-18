import { describe, it, expect } from 'vitest';
import {
  calculatePoints,
  calculatePercentage,
  isPassed,
  getGrade,
  formatTime,
  getImprovementAreas,
} from './scoring';
import type { Question } from '@/types';

describe('calculatePoints', () => {
  it('returns 0 for incorrect answers', () => {
    expect(calculatePoints('easy', 5, 0, false)).toBe(0);
    expect(calculatePoints('hard', 5, 10, false)).toBe(0);
  });

  it('returns base points for correct answers', () => {
    expect(calculatePoints('easy', 30, 0, true)).toBe(10);
    expect(calculatePoints('medium', 30, 0, true)).toBe(20);
    expect(calculatePoints('hard', 30, 0, true)).toBe(30);
  });

  it('applies time bonus for fast answers', () => {
    // Fast answer (< 10s) gets 1.5x
    expect(calculatePoints('easy', 5, 0, true)).toBe(15);
    // Medium speed (< 20s) gets 1.2x
    expect(calculatePoints('easy', 15, 0, true)).toBe(12);
  });

  it('applies streak multiplier', () => {
    // 3+ streak gets 1.2x
    expect(calculatePoints('easy', 30, 3, true)).toBe(12);
    // 5+ streak gets 1.5x
    expect(calculatePoints('easy', 30, 5, true)).toBe(15);
    // 7+ streak gets 2.0x
    expect(calculatePoints('easy', 30, 7, true)).toBe(20);
    // 10+ streak gets 2.5x
    expect(calculatePoints('easy', 30, 10, true)).toBe(25);
  });

  it('combines time bonus and streak multiplier', () => {
    // Fast (1.5x) + 5 streak (1.5x) = 10 * 1.5 * 1.5 = 22.5 -> 23
    expect(calculatePoints('easy', 5, 5, true)).toBe(23);
  });
});

describe('calculatePercentage', () => {
  it('returns 0 for zero total', () => {
    expect(calculatePercentage(0, 0)).toBe(0);
  });

  it('calculates correct percentage', () => {
    expect(calculatePercentage(7, 10)).toBe(70);
    expect(calculatePercentage(9, 10)).toBe(90);
    expect(calculatePercentage(3, 10)).toBe(30);
  });

  it('rounds to nearest integer', () => {
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });
});

describe('isPassed', () => {
  it('returns true for 70% or higher', () => {
    expect(isPassed(7, 10)).toBe(true);
    expect(isPassed(8, 10)).toBe(true);
    expect(isPassed(10, 10)).toBe(true);
  });

  it('returns false for below 70%', () => {
    expect(isPassed(6, 10)).toBe(false);
    expect(isPassed(0, 10)).toBe(false);
  });

  it('handles edge case of zero total', () => {
    expect(isPassed(0, 0)).toBe(false);
  });
});

describe('getGrade', () => {
  it('returns correct grade for percentage', () => {
    expect(getGrade(95).grade).toBe('A');
    expect(getGrade(85).grade).toBe('B');
    expect(getGrade(75).grade).toBe('C');
    expect(getGrade(65).grade).toBe('D');
    expect(getGrade(50).grade).toBe('F');
  });

  it('includes label and color class', () => {
    const grade = getGrade(90);
    expect(grade.label).toBe('Excellent!');
    expect(grade.colorClass).toBe('text-green-600');
  });
});

describe('formatTime', () => {
  it('formats seconds correctly', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(30)).toBe('0:30');
    expect(formatTime(60)).toBe('1:00');
    expect(formatTime(90)).toBe('1:30');
    expect(formatTime(125)).toBe('2:05');
  });
});

describe('getImprovementAreas', () => {
  it('returns empty array for no incorrect questions', () => {
    expect(getImprovementAreas([])).toEqual([]);
  });

  it('groups and sorts by category count', () => {
    const incorrectQuestions: Question[] = [
      { id: 1, category: 'Trees', difficulty: 'easy', question: '', options: [], correctAnswer: 0, explanation: '', realWorld: '' },
      { id: 2, category: 'Trees', difficulty: 'easy', question: '', options: [], correctAnswer: 0, explanation: '', realWorld: '' },
      { id: 3, category: 'Traversals', difficulty: 'easy', question: '', options: [], correctAnswer: 0, explanation: '', realWorld: '' },
    ];

    const areas = getImprovementAreas(incorrectQuestions);
    expect(areas[0].category).toBe('Trees');
    expect(areas[0].count).toBe(2);
    expect(areas[1].category).toBe('Traversals');
    expect(areas[1].count).toBe(1);
  });

  it('limits to 3 areas', () => {
    const incorrectQuestions: Question[] = [
      { id: 1, category: 'Trees', difficulty: 'easy', question: '', options: [], correctAnswer: 0, explanation: '', realWorld: '' },
      { id: 2, category: 'Traversals', difficulty: 'easy', question: '', options: [], correctAnswer: 0, explanation: '', realWorld: '' },
      { id: 3, category: 'Binary Trees', difficulty: 'easy', question: '', options: [], correctAnswer: 0, explanation: '', realWorld: '' },
      { id: 4, category: 'Algorithm Analysis', difficulty: 'easy', question: '', options: [], correctAnswer: 0, explanation: '', realWorld: '' },
    ];

    const areas = getImprovementAreas(incorrectQuestions);
    expect(areas.length).toBe(3);
  });
});
