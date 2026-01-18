import { create } from 'zustand';
import type { DiagramState } from '@/types';
import { diagramChallenges } from '@/data/diagrams';
import { calculatePoints } from '@/utils/scoring';

interface DiagramStore extends DiagramState {
  // Actions
  initializeChallenges: (category?: string) => void;
  setCurrentChallenge: (index: number) => void;
  nextChallenge: () => void;

  // Node placement actions
  placeNode: (nodeId: string, position: { x: number; y: number }) => void;
  resetPlacedNodes: () => void;

  // Value fill actions
  fillValue: (nodeId: string, value: string | number) => void;
  resetFilledValues: () => void;

  // Edge connection actions
  addEdge: (source: string, target: string) => void;
  removeEdge: (source: string, target: string) => void;
  resetEdges: () => void;

  // Traversal order actions
  selectTraversalNode: (nodeId: string) => void;
  undoTraversalSelection: () => void;
  resetTraversalSelection: () => void;

  // Validation
  validateChallenge: () => boolean;
  submitChallenge: () => void;

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

const initialState: Omit<DiagramState, 'challenges'> = {
  currentIndex: 0,
  currentChallenge: null,
  placedNodes: {},
  filledValues: {},
  connectedEdges: [],
  traversalSelection: [],
  isComplete: false,
  isCorrect: false,
  showResult: false,
  score: { correct: 0, total: 0, points: 0 },
  timeSpent: 0,
  streak: 0,
};

export const useDiagramStore = create<DiagramStore>((set, get) => ({
  challenges: [],
  ...initialState,

  initializeChallenges: (category?: string) => {
    let filtered = [...diagramChallenges];
    if (category && category !== 'all') {
      filtered = filtered.filter((c) => c.category === category);
    }
    const shuffled = shuffleArray(filtered).slice(0, 8); // Take 8 challenges

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
        placedNodes: {},
        filledValues: {},
        connectedEdges: [],
        traversalSelection: [],
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

  placeNode: (nodeId: string, position: { x: number; y: number }) => {
    set((state) => ({
      placedNodes: {
        ...state.placedNodes,
        [nodeId]: position,
      },
    }));
  },

  resetPlacedNodes: () => {
    set({ placedNodes: {} });
  },

  fillValue: (nodeId: string, value: string | number) => {
    set((state) => ({
      filledValues: {
        ...state.filledValues,
        [nodeId]: value,
      },
    }));
  },

  resetFilledValues: () => {
    set({ filledValues: {} });
  },

  addEdge: (source: string, target: string) => {
    set((state) => {
      // Check if edge already exists
      const exists = state.connectedEdges.some(
        (e) =>
          (e.source === source && e.target === target) ||
          (e.source === target && e.target === source)
      );
      if (exists) return state;

      return {
        connectedEdges: [...state.connectedEdges, { source, target }],
      };
    });
  },

  removeEdge: (source: string, target: string) => {
    set((state) => ({
      connectedEdges: state.connectedEdges.filter(
        (e) =>
          !(
            (e.source === source && e.target === target) ||
            (e.source === target && e.target === source)
          )
      ),
    }));
  },

  resetEdges: () => {
    set({ connectedEdges: [] });
  },

  selectTraversalNode: (nodeId: string) => {
    set((state) => {
      // Don't allow selecting the same node twice
      if (state.traversalSelection.includes(nodeId)) return state;

      return {
        traversalSelection: [...state.traversalSelection, nodeId],
      };
    });
  },

  undoTraversalSelection: () => {
    set((state) => ({
      traversalSelection: state.traversalSelection.slice(0, -1),
    }));
  },

  resetTraversalSelection: () => {
    set({ traversalSelection: [] });
  },

  validateChallenge: () => {
    const state = get();
    const challenge = state.currentChallenge;
    if (!challenge) return false;

    switch (challenge.type) {
      case 'node-placement': {
        if (!challenge.draggableNodes) return false;
        const tolerance = 50; // pixels

        for (const node of challenge.draggableNodes) {
          const placed = state.placedNodes[node.data.id];
          const correct = node.data.correctPosition;
          if (!placed || !correct) return false;

          const distance = Math.sqrt(
            Math.pow(placed.x - correct.x, 2) + Math.pow(placed.y - correct.y, 2)
          );
          if (distance > tolerance) return false;
        }
        return true;
      }

      case 'value-fill': {
        if (!challenge.missingValues) return false;

        for (const missing of challenge.missingValues) {
          const filled = state.filledValues[missing.nodeId];
          if (filled === undefined) return false;

          // Compare as strings for flexibility
          if (String(filled).trim() !== String(missing.correctValue).trim()) {
            return false;
          }
        }
        return true;
      }

      case 'edge-connection': {
        if (!challenge.requiredEdges) return false;

        // Check all required edges exist
        for (const required of challenge.requiredEdges) {
          const exists = state.connectedEdges.some(
            (e) =>
              (e.source === required.source && e.target === required.target) ||
              (e.source === required.target && e.target === required.source)
          );
          if (!exists) return false;
        }

        // Check no extra edges
        if (state.connectedEdges.length !== challenge.requiredEdges.length) {
          return false;
        }

        return true;
      }

      case 'traversal-order': {
        if (!challenge.correctTraversalOrder) return false;

        if (state.traversalSelection.length !== challenge.correctTraversalOrder.length) {
          return false;
        }

        for (let i = 0; i < state.traversalSelection.length; i++) {
          if (state.traversalSelection[i] !== challenge.correctTraversalOrder[i]) {
            return false;
          }
        }
        return true;
      }

      default:
        return false;
    }
  },

  submitChallenge: () => {
    const state = get();
    const isCorrect = get().validateChallenge();
    const challenge = state.currentChallenge;

    if (!challenge) return;

    const newStreak = isCorrect ? state.streak + 1 : 0;
    const questionTime = Math.min(state.timeSpent, 120); // Cap at 2 minutes for scoring
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

  incrementTime: () => {
    set((state) => ({ timeSpent: state.timeSpent + 1 }));
  },

  resetChallenge: () => {
    set({
      placedNodes: {},
      filledValues: {},
      connectedEdges: [],
      traversalSelection: [],
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
