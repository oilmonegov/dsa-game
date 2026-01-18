import type { Difficulty, GradeInfo, ImprovementArea, Question, QuestionCategory } from '@/types';

// Base points by difficulty
const BASE_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

// Time bonus thresholds (in seconds)
const TIME_BONUSES = [
  { threshold: 10, multiplier: 1.5 },
  { threshold: 20, multiplier: 1.2 },
  { threshold: 30, multiplier: 1.0 },
];

// Streak multipliers
const STREAK_MULTIPLIERS: Record<number, number> = {
  3: 1.2,
  5: 1.5,
  7: 2.0,
  10: 2.5,
};

/**
 * Calculate points for a single answer
 */
export function calculatePoints(
  difficulty: Difficulty,
  timeSpent: number,
  currentStreak: number,
  isCorrect: boolean
): number {
  if (!isCorrect) return 0;

  let points = BASE_POINTS[difficulty];

  // Apply time bonus
  for (const bonus of TIME_BONUSES) {
    if (timeSpent <= bonus.threshold) {
      points *= bonus.multiplier;
      break;
    }
  }

  // Apply streak multiplier
  const streakThresholds = Object.keys(STREAK_MULTIPLIERS)
    .map(Number)
    .sort((a, b) => b - a);

  for (const threshold of streakThresholds) {
    if (currentStreak >= threshold) {
      points *= STREAK_MULTIPLIERS[threshold];
      break;
    }
  }

  return Math.round(points);
}

/**
 * Calculate percentage score
 */
export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Check if passed (70% threshold)
 */
export function isPassed(correct: number, total: number): boolean {
  return calculatePercentage(correct, total) >= 70;
}

/**
 * Get grade based on percentage
 */
export function getGrade(percentage: number): GradeInfo {
  if (percentage >= 90) {
    return { grade: 'A', label: 'Excellent!', colorClass: 'text-green-600' };
  }
  if (percentage >= 80) {
    return { grade: 'B', label: 'Great Job!', colorClass: 'text-blue-600' };
  }
  if (percentage >= 70) {
    return { grade: 'C', label: 'Good Work!', colorClass: 'text-yellow-600' };
  }
  if (percentage >= 60) {
    return { grade: 'D', label: 'Needs Improvement', colorClass: 'text-orange-600' };
  }
  return { grade: 'F', label: 'Keep Practicing!', colorClass: 'text-red-600' };
}

/**
 * Format time display (seconds to MM:SS)
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get performance messages based on results
 */
export function getPerformanceMessages(
  correct: number,
  total: number,
  timeSpent: number
): string[] {
  const percentage = calculatePercentage(correct, total);
  const avgTimePerQuestion = total > 0 ? Math.round(timeSpent / total) : 0;
  const messages: string[] = [];

  // Accuracy feedback
  if (percentage >= 90) {
    messages.push('Outstanding accuracy! You have a strong grasp of these concepts.');
  } else if (percentage >= 70) {
    messages.push('Good understanding! A bit more practice will help solidify these concepts.');
  } else if (percentage >= 50) {
    messages.push('Keep practicing! Review the explanations for the questions you missed.');
  } else {
    messages.push("Don't give up! Focus on understanding the core concepts and try again.");
  }

  // Speed feedback
  if (avgTimePerQuestion < 15 && percentage >= 70) {
    messages.push('Quick thinking! You answered questions efficiently.');
  } else if (avgTimePerQuestion > 30) {
    messages.push('Take your time to understand, but try to build speed with practice.');
  }

  return messages;
}

/**
 * Calculate areas needing improvement from incorrect questions
 */
export function getImprovementAreas(incorrectQuestions: Question[]): ImprovementArea[] {
  const categoryCount: Record<string, number> = {};

  incorrectQuestions.forEach((q) => {
    categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
  });

  return Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category, count]) => ({
      category: category as QuestionCategory,
      count,
      suggestion: `Review ${category} concepts and try related questions again.`,
    }));
}

/**
 * Calculate bonus description for display
 */
export function getBonusDescription(
  timeSpent: number,
  streak: number
): { timeBonus: string | null; streakBonus: string | null } {
  let timeBonus: string | null = null;
  let streakBonus: string | null = null;

  if (timeSpent <= 10) {
    timeBonus = '1.5x Speed Bonus!';
  } else if (timeSpent <= 20) {
    timeBonus = '1.2x Speed Bonus';
  }

  const streakThresholds = Object.keys(STREAK_MULTIPLIERS)
    .map(Number)
    .sort((a, b) => b - a);

  for (const threshold of streakThresholds) {
    if (streak >= threshold) {
      streakBonus = `${STREAK_MULTIPLIERS[threshold]}x Streak Bonus!`;
      break;
    }
  }

  return { timeBonus, streakBonus };
}
