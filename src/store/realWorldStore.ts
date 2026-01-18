import { create } from 'zustand';
import type { RealWorldState } from '@/types/realworld';
import { realWorldChallenges } from '@/data/realworld';
import { calculatePoints } from '@/utils/scoring';

interface RealWorldStore extends RealWorldState {
  // Actions
  initializeChallenges: () => void;
  setCurrentChallenge: (index: number) => void;
  nextChallenge: () => void;

  // Matching actions
  selectStructure: (structureId: string) => void;
  selectApplication: (applicationId: string) => void;
  createMatch: (structureId: string, applicationId: string) => void;
  clearSelection: () => void;
  removeMatch: (applicationId: string) => void;
  resetMatches: () => void;

  // Validation
  validateMatches: () => boolean;
  submitMatches: () => void;

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

const initialState: Omit<RealWorldState, 'challenges'> = {
  currentIndex: 0,
  currentChallenge: null,
  matches: [],
  selectedStructure: null,
  selectedApplication: null,
  validatedMatches: {},
  isComplete: false,
  showResult: false,
  score: { correct: 0, total: 0, points: 0 },
  timeSpent: 0,
  streak: 0,
};

export const useRealWorldStore = create<RealWorldStore>((set, get) => ({
  challenges: [],
  ...initialState,

  initializeChallenges: () => {
    const shuffled = shuffleArray([...realWorldChallenges]).slice(0, 8);

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
        matches: [],
        selectedStructure: null,
        selectedApplication: null,
        validatedMatches: {},
        showResult: false,
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

  selectStructure: (structureId: string) => {
    const state = get();
    if (state.showResult) return;

    // If same structure is clicked, deselect
    if (state.selectedStructure === structureId) {
      set({ selectedStructure: null });
      return;
    }

    // Check if this structure is already matched
    const alreadyMatched = state.matches.some((m) => m.structureId === structureId);
    if (alreadyMatched) return;

    set({ selectedStructure: structureId });

    // If an application is also selected, create a match
    const { selectedApplication } = get();
    if (selectedApplication) {
      get().createMatch(structureId, selectedApplication);
    }
  },

  selectApplication: (applicationId: string) => {
    const state = get();
    if (state.showResult) return;

    // If same application is clicked, deselect
    if (state.selectedApplication === applicationId) {
      set({ selectedApplication: null });
      return;
    }

    // Check if this application is already matched
    const alreadyMatched = state.matches.some((m) => m.applicationId === applicationId);
    if (alreadyMatched) return;

    set({ selectedApplication: applicationId });

    // If a structure is also selected, create a match
    const { selectedStructure } = get();
    if (selectedStructure) {
      get().createMatch(selectedStructure, applicationId);
    }
  },

  createMatch: (structureId: string, applicationId: string) => {
    set((state) => ({
      matches: [...state.matches, { structureId, applicationId }],
      selectedStructure: null,
      selectedApplication: null,
    }));
  },

  clearSelection: () => {
    set({ selectedStructure: null, selectedApplication: null });
  },

  removeMatch: (applicationId: string) => {
    const state = get();
    if (state.showResult) return;

    set((state) => ({
      matches: state.matches.filter((m) => m.applicationId !== applicationId),
    }));
  },

  resetMatches: () => {
    set({
      matches: [],
      selectedStructure: null,
      selectedApplication: null,
      validatedMatches: {},
    });
  },

  validateMatches: () => {
    const state = get();
    const challenge = state.currentChallenge;
    if (!challenge) return false;

    // Check if all applications are matched
    if (state.matches.length !== challenge.applications.length) {
      return false;
    }

    // Check if all matches are correct
    for (const match of state.matches) {
      const application = challenge.applications.find((a) => a.id === match.applicationId);
      if (!application || application.matchesStructure !== match.structureId) {
        return false;
      }
    }

    return true;
  },

  submitMatches: () => {
    const state = get();
    const challenge = state.currentChallenge;
    if (!challenge) return;

    // Validate each match individually
    const validated: Record<string, boolean> = {};
    let correctCount = 0;

    for (const match of state.matches) {
      const application = challenge.applications.find((a) => a.id === match.applicationId);
      const isCorrect = application?.matchesStructure === match.structureId;
      validated[match.applicationId] = isCorrect;
      if (isCorrect) correctCount++;
    }

    const allCorrect = correctCount === challenge.applications.length;
    const newStreak = allCorrect ? state.streak + 1 : 0;
    const questionTime = Math.min(state.timeSpent, 120);
    const points = calculatePoints(challenge.difficulty, questionTime, newStreak, allCorrect);

    set({
      showResult: true,
      validatedMatches: validated,
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
      matches: [],
      selectedStructure: null,
      selectedApplication: null,
      validatedMatches: {},
      showResult: false,
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

