import { create } from 'zustand';
import type { CodeCompletionState, ComplexityClass } from '@/types/codecompletion';
import { codeCompletionChallenges } from '@/data/codecompletion';
import { calculatePoints } from '@/utils/scoring';

interface CodeCompletionStore extends CodeCompletionState {
  // Actions
  initializeChallenges: () => void;
  setCurrentChallenge: (index: number) => void;
  nextChallenge: () => void;

  // Answer actions
  setBlankAnswer: (blankId: string, answer: string) => void;
  setComplexityAnswer: (questionId: string, answer: ComplexityClass) => void;
  setActiveBlank: (blankId: string | null) => void;
  resetAnswers: () => void;

  // Validation
  validateAnswers: () => { blanksCorrect: number; complexityCorrect: number; total: number };
  submitAnswers: () => void;

  // Timer
  incrementTime: () => void;

  // Reset
  resetChallenge: () => void;
  resetAll: () => void;
}

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const initialState: Omit<CodeCompletionState, 'challenges'> = {
  currentIndex: 0,
  currentChallenge: null,
  blankAnswers: {},
  complexityAnswers: {},
  validatedBlanks: {},
  validatedComplexity: {},
  isComplete: false,
  showResult: false,
  score: { correct: 0, total: 0, points: 0 },
  timeSpent: 0,
  streak: 0,
  activeBlank: null,
};

export const useCodeCompletionStore = create<CodeCompletionStore>((set, get) => ({
  challenges: [],
  ...initialState,

  initializeChallenges: () => {
    const shuffled = shuffleArray([...codeCompletionChallenges]).slice(0, 8);

    set({
      ...initialState,
      challenges: shuffled,
      currentChallenge: shuffled[0] || null,
    });
  },

  setCurrentChallenge: (index: number) => {
    const { challenges } = get();
    if (index >= 0 && index < challenges.length) {
      set({
        currentIndex: index,
        currentChallenge: challenges[index],
        blankAnswers: {},
        complexityAnswers: {},
        validatedBlanks: {},
        validatedComplexity: {},
        showResult: false,
        activeBlank: null,
      });
    }
  },

  nextChallenge: () => {
    const { currentIndex, challenges } = get();
    if (currentIndex < challenges.length - 1) {
      get().setCurrentChallenge(currentIndex + 1);
    } else {
      set({ isComplete: true });
    }
  },

  setBlankAnswer: (blankId: string, answer: string) => {
    set((state) => ({
      blankAnswers: {
        ...state.blankAnswers,
        [blankId]: answer,
      },
    }));
  },

  setComplexityAnswer: (questionId: string, answer: ComplexityClass) => {
    set((state) => ({
      complexityAnswers: {
        ...state.complexityAnswers,
        [questionId]: answer,
      },
    }));
  },

  setActiveBlank: (blankId: string | null) => {
    set({ activeBlank: blankId });
  },

  resetAnswers: () => {
    set({
      blankAnswers: {},
      complexityAnswers: {},
      validatedBlanks: {},
      validatedComplexity: {},
      activeBlank: null,
    });
  },

  validateAnswers: () => {
    const state = get();
    const challenge = state.currentChallenge;
    if (!challenge) return { blanksCorrect: 0, complexityCorrect: 0, total: 0 };

    let blanksCorrect = 0;
    let complexityCorrect = 0;

    // Validate blanks
    for (const blank of challenge.blanks) {
      const userAnswer = state.blankAnswers[blank.id]?.trim().toLowerCase() || '';
      const correctAnswer = blank.correctAnswer.trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        blanksCorrect++;
      }
    }

    // Validate complexity questions
    if (challenge.complexityQuestions) {
      for (const question of challenge.complexityQuestions) {
        const userAnswer = state.complexityAnswers[question.id];
        if (userAnswer === question.correctAnswer) {
          complexityCorrect++;
        }
      }
    }

    const totalBlanks = challenge.blanks.length;
    const totalComplexity = challenge.complexityQuestions?.length || 0;
    const total = totalBlanks + totalComplexity;

    return { blanksCorrect, complexityCorrect, total };
  },

  submitAnswers: () => {
    const state = get();
    const challenge = state.currentChallenge;
    if (!challenge) return;

    const validatedBlanks: Record<string, boolean> = {};
    const validatedComplexity: Record<string, boolean> = {};

    // Validate blanks
    for (const blank of challenge.blanks) {
      const userAnswer = state.blankAnswers[blank.id]?.trim().toLowerCase() || '';
      const correctAnswer = blank.correctAnswer.trim().toLowerCase();
      validatedBlanks[blank.id] = userAnswer === correctAnswer;
    }

    // Validate complexity questions
    if (challenge.complexityQuestions) {
      for (const question of challenge.complexityQuestions) {
        const userAnswer = state.complexityAnswers[question.id];
        validatedComplexity[question.id] = userAnswer === question.correctAnswer;
      }
    }

    const blanksCorrect = Object.values(validatedBlanks).filter(Boolean).length;
    const complexityCorrect = Object.values(validatedComplexity).filter(Boolean).length;
    const totalCorrect = blanksCorrect + complexityCorrect;
    const totalQuestions = challenge.blanks.length + (challenge.complexityQuestions?.length || 0);

    const allCorrect = totalCorrect === totalQuestions;
    const newStreak = allCorrect ? state.streak + 1 : 0;
    const questionTime = Math.min(state.timeSpent, 120);
    const points = calculatePoints(challenge.difficulty, questionTime, newStreak, allCorrect);

    set({
      showResult: true,
      validatedBlanks,
      validatedComplexity,
      streak: newStreak,
      score: {
        correct: state.score.correct + (allCorrect ? 1 : 0),
        total: state.score.total + 1,
        points: state.score.points + points,
      },
    });
  },

  incrementTime: () => {
    set((state) => ({ timeSpent: state.timeSpent + 1 }));
  },

  resetChallenge: () => {
    set({
      blankAnswers: {},
      complexityAnswers: {},
      validatedBlanks: {},
      validatedComplexity: {},
      showResult: false,
      activeBlank: null,
    });
  },

  resetAll: () => {
    set({
      ...initialState,
      challenges: [],
      currentChallenge: null,
    });
  },
}));
