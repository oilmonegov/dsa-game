import { useState, useCallback, useMemo } from 'react';

interface Score {
  correct: number;
  total: number;
  points: number;
}

interface UseScoreOptions {
  initialScore?: Partial<Score>;
  pointsPerCorrect?: number;
  streakBonus?: boolean;
  streakBonusPoints?: number;
  onStreakMilestone?: (streak: number) => void;
}

interface UseScoreReturn {
  score: Score;
  streak: number;
  maxStreak: number;
  percentage: number;
  isPassing: boolean;
  addCorrect: (points?: number) => void;
  addIncorrect: () => void;
  addPoints: (points: number) => void;
  incrementTotal: () => void;
  reset: () => void;
  setScore: (score: Partial<Score>) => void;
}

const PASSING_PERCENTAGE = 70;
const STREAK_MILESTONES = [3, 5, 10];

export function useScore({
  initialScore = {},
  pointsPerCorrect = 10,
  streakBonus = true,
  streakBonusPoints = 5,
  onStreakMilestone,
}: UseScoreOptions = {}): UseScoreReturn {
  const [score, setScoreState] = useState<Score>({
    correct: initialScore.correct ?? 0,
    total: initialScore.total ?? 0,
    points: initialScore.points ?? 0,
  });

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const percentage = useMemo(() => {
    if (score.total === 0) return 0;
    return Math.round((score.correct / score.total) * 100);
  }, [score.correct, score.total]);

  const isPassing = useMemo(() => {
    return percentage >= PASSING_PERCENTAGE;
  }, [percentage]);

  const addCorrect = useCallback((customPoints?: number) => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    setMaxStreak((prev) => Math.max(prev, newStreak));

    // Check for streak milestones
    if (STREAK_MILESTONES.includes(newStreak)) {
      onStreakMilestone?.(newStreak);
    }

    // Calculate points with streak bonus
    let pointsToAdd = customPoints ?? pointsPerCorrect;
    if (streakBonus && newStreak > 1) {
      pointsToAdd += (newStreak - 1) * streakBonusPoints;
    }

    setScoreState((prev) => ({
      correct: prev.correct + 1,
      total: prev.total + 1,
      points: prev.points + pointsToAdd,
    }));
  }, [streak, pointsPerCorrect, streakBonus, streakBonusPoints, onStreakMilestone]);

  const addIncorrect = useCallback(() => {
    setStreak(0);
    setScoreState((prev) => ({
      ...prev,
      total: prev.total + 1,
    }));
  }, []);

  const addPoints = useCallback((points: number) => {
    setScoreState((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
  }, []);

  const incrementTotal = useCallback(() => {
    setScoreState((prev) => ({
      ...prev,
      total: prev.total + 1,
    }));
  }, []);

  const reset = useCallback(() => {
    setScoreState({
      correct: initialScore.correct ?? 0,
      total: initialScore.total ?? 0,
      points: initialScore.points ?? 0,
    });
    setStreak(0);
    setMaxStreak(0);
  }, [initialScore]);

  const setScore = useCallback((newScore: Partial<Score>) => {
    setScoreState((prev) => ({
      ...prev,
      ...newScore,
    }));
  }, []);

  return {
    score,
    streak,
    maxStreak,
    percentage,
    isPassing,
    addCorrect,
    addIncorrect,
    addPoints,
    incrementTotal,
    reset,
    setScore,
  };
}

export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function isPassed(correct: number, total: number): boolean {
  return calculatePercentage(correct, total) >= PASSING_PERCENTAGE;
}

export function getGrade(percentage: number): {
  grade: string;
  label: string;
  colorClass: string;
} {
  if (percentage >= 90) {
    return { grade: 'A', label: 'Excellent!', colorClass: 'text-success-500' };
  }
  if (percentage >= 80) {
    return { grade: 'B', label: 'Great Job!', colorClass: 'text-primary-500' };
  }
  if (percentage >= 70) {
    return { grade: 'C', label: 'Passed!', colorClass: 'text-accent-500' };
  }
  if (percentage >= 60) {
    return { grade: 'D', label: 'Keep Trying', colorClass: 'text-coral-500' };
  }
  return { grade: 'F', label: 'Needs Work', colorClass: 'text-red-500' };
}

export default useScore;
