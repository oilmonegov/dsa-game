import { create } from 'zustand';
import type { Question, QuestionCategory, QuizState } from '@/types';
import { theoryQuestions } from '@/data/questions';
import { calculatePoints } from '@/utils/scoring';

interface QuizStore extends QuizState {
  // Actions
  initializeQuiz: (category?: QuestionCategory | 'all', questionCount?: number) => void;
  selectAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  setCategory: (category: QuestionCategory | 'all') => void;

  // Timer
  incrementTime: () => void;
  startQuestionTimer: () => void;
}

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const initialState: QuizState = {
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  showResult: false,
  isCorrect: false,
  score: {
    correct: 0,
    total: 0,
    points: 0,
  },
  streak: 0,
  timeSpent: 0,
  questionStartTime: Date.now(),
  quizComplete: false,
  incorrectQuestions: [],
  selectedCategory: 'all',
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initialState,

  initializeQuiz: (category = 'all', questionCount = 15) => {
    let filteredQuestions = [...theoryQuestions];

    if (category !== 'all') {
      filteredQuestions = filteredQuestions.filter((q) => q.category === category);
    }

    // Shuffle and take requested number of questions
    const shuffled = shuffleArray(filteredQuestions);
    const questions = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    set({
      ...initialState,
      questions,
      selectedCategory: category,
      questionStartTime: Date.now(),
    });
  },

  selectAnswer: (answerIndex) => {
    const state = get();
    if (state.showResult || state.quizComplete) return;

    const currentQuestion = state.questions[state.currentIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const questionTime = Math.round((Date.now() - state.questionStartTime) / 1000);
    const newStreak = isCorrect ? state.streak + 1 : 0;

    const points = calculatePoints(currentQuestion.difficulty, questionTime, newStreak, isCorrect);

    set({
      selectedAnswer: answerIndex,
      showResult: true,
      isCorrect,
      streak: newStreak,
      score: {
        correct: state.score.correct + (isCorrect ? 1 : 0),
        total: state.score.total + 1,
        points: state.score.points + points,
      },
      incorrectQuestions: isCorrect
        ? state.incorrectQuestions
        : [...state.incorrectQuestions, currentQuestion],
    });
  },

  nextQuestion: () => {
    const state = get();

    if (state.currentIndex >= state.questions.length - 1) {
      set({ quizComplete: true });
      return;
    }

    set({
      currentIndex: state.currentIndex + 1,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false,
      questionStartTime: Date.now(),
    });
  },

  resetQuiz: () => {
    const state = get();
    get().initializeQuiz(state.selectedCategory);
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().initializeQuiz(category);
  },

  incrementTime: () => {
    set((state) => ({ timeSpent: state.timeSpent + 1 }));
  },

  startQuestionTimer: () => {
    set({ questionStartTime: Date.now() });
  },
}));
