import { create } from 'zustand';
import type { TraversalState, TraversalType } from '@/types/traversal';
import { traversalChallenges } from '@/data/traversals';
import { calculatePoints } from '@/utils/scoring';

interface TraversalStore extends TraversalState {
  // Actions
  initializeChallenges: (traversalType?: TraversalType) => void;
  setCurrentChallenge: (index: number) => void;
  nextChallenge: () => void;

  // Node selection
  selectNode: (nodeId: string) => void;
  undoSelection: () => void;
  resetSelection: () => void;

  // Animation
  startAnimation: () => void;
  stopAnimation: () => void;
  nextAnimationStep: () => void;

  // Validation
  validateTraversal: () => boolean;
  submitTraversal: () => void;

  // UI
  toggleAlgorithm: () => void;

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

const initialState: Omit<TraversalState, 'challenges'> = {
  currentIndex: 0,
  currentChallenge: null,
  selectedNodes: [],
  isAnimating: false,
  animationStep: 0,
  isComplete: false,
  isCorrect: false,
  showResult: false,
  score: { correct: 0, total: 0, points: 0 },
  timeSpent: 0,
  streak: 0,
  showAlgorithm: false,
};

export const useTraversalStore = create<TraversalStore>((set, get) => ({
  challenges: [],
  ...initialState,

  initializeChallenges: (traversalType?: TraversalType) => {
    let filtered = [...traversalChallenges];
    if (traversalType) {
      filtered = filtered.filter((c) => c.traversalType === traversalType);
    }
    // Mix of difficulties, prioritize variety
    const shuffled = shuffleArray(filtered).slice(0, 10);

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
        selectedNodes: [],
        isAnimating: false,
        animationStep: 0,
        showResult: false,
        isCorrect: false,
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

  selectNode: (nodeId: string) => {
    const state = get();
    if (state.showResult || state.isAnimating) return;

    // Don't allow selecting the same node twice
    if (state.selectedNodes.includes(nodeId)) return;

    // Check if all nodes have been selected
    const challenge = state.currentChallenge;
    if (!challenge) return;

    if (state.selectedNodes.length >= challenge.correctOrder.length) return;

    set({
      selectedNodes: [...state.selectedNodes, nodeId],
    });
  },

  undoSelection: () => {
    set((state) => ({
      selectedNodes: state.selectedNodes.slice(0, -1),
    }));
  },

  resetSelection: () => {
    set({ selectedNodes: [], isAnimating: false, animationStep: 0 });
  },

  startAnimation: () => {
    const challenge = get().currentChallenge;
    if (!challenge) return;

    set({
      isAnimating: true,
      animationStep: 0,
      selectedNodes: [],
    });
  },

  stopAnimation: () => {
    set({
      isAnimating: false,
      animationStep: 0,
    });
  },

  nextAnimationStep: () => {
    const state = get();
    const challenge = state.currentChallenge;
    if (!challenge || !state.isAnimating) return;

    const nextStep = state.animationStep + 1;
    if (nextStep >= challenge.correctOrder.length) {
      set({
        isAnimating: false,
        animationStep: 0,
        selectedNodes: [...challenge.correctOrder],
      });
    } else {
      set({
        animationStep: nextStep,
        selectedNodes: challenge.correctOrder.slice(0, nextStep + 1),
      });
    }
  },

  validateTraversal: () => {
    const state = get();
    const challenge = state.currentChallenge;
    if (!challenge) return false;

    if (state.selectedNodes.length !== challenge.correctOrder.length) {
      return false;
    }

    for (let i = 0; i < state.selectedNodes.length; i++) {
      if (state.selectedNodes[i] !== challenge.correctOrder[i]) {
        return false;
      }
    }

    return true;
  },

  submitTraversal: () => {
    const state = get();
    const isCorrect = get().validateTraversal();
    const challenge = state.currentChallenge;

    if (!challenge) return;

    const newStreak = isCorrect ? state.streak + 1 : 0;
    const questionTime = Math.min(state.timeSpent, 120);
    const points = calculatePoints(challenge.difficulty, questionTime, newStreak, isCorrect);

    set({
      showResult: true,
      isCorrect,
      streak: newStreak,
      score: {
        correct: state.score.correct + (isCorrect ? 1 : 0),
        total: state.score.total + 1,
        points: state.score.points + points,
      },
    });
  },

  toggleAlgorithm: () => {
    set((state) => ({ showAlgorithm: !state.showAlgorithm }));
  },

  incrementTime: () => {
    set((state) => ({ timeSpent: state.timeSpent + 1 }));
  },

  resetChallenge: () => {
    set({
      selectedNodes: [],
      isAnimating: false,
      animationStep: 0,
      showResult: false,
      isCorrect: false,
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
