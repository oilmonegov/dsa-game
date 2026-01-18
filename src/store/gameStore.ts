import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ModuleId, ModuleScore, GameState } from '@/types';
import { getAllModuleScores, saveScore, getOverallProgress } from '@/db';

interface GameStore extends GameState {
  // State
  isLoading: boolean;
  isDbInitialized: boolean;
  overallProgress: {
    correct: number;
    total: number;
    percentage: number;
    totalTime: number;
    passed: boolean;
  } | null;

  // Actions
  setCurrentModule: (module: ModuleId | null) => void;
  setPracticeMode: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setLoading: (loading: boolean) => void;
  setDbInitialized: (initialized: boolean) => void;

  // Score actions
  updateModuleScore: (
    module: ModuleId,
    correct: number,
    total: number,
    points: number,
    timeSpent: number
  ) => Promise<void>;
  loadScores: () => Promise<void>;
  refreshOverallProgress: () => Promise<void>;

  // Reset
  resetModule: (module: ModuleId) => void;
  resetAll: () => void;
}

const initialScores: Record<ModuleId, ModuleScore> = {
  theory: { correct: 0, total: 0, points: 0, timeSpent: 0, attempts: 0, lastAttempt: null },
  diagrams: { correct: 0, total: 0, points: 0, timeSpent: 0, attempts: 0, lastAttempt: null },
  traversals: { correct: 0, total: 0, points: 0, timeSpent: 0, attempts: 0, lastAttempt: null },
  realWorld: { correct: 0, total: 0, points: 0, timeSpent: 0, attempts: 0, lastAttempt: null },
  codeCompletion: { correct: 0, total: 0, points: 0, timeSpent: 0, attempts: 0, lastAttempt: null },
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentModule: null,
      scores: { ...initialScores },
      practiceMode: false,
      soundEnabled: true,
      isLoading: false,
      isDbInitialized: false,
      overallProgress: null,

      // Actions
      setCurrentModule: (module) => set({ currentModule: module }),

      setPracticeMode: (enabled) => set({ practiceMode: enabled }),

      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      setLoading: (loading) => set({ isLoading: loading }),

      setDbInitialized: (initialized) => set({ isDbInitialized: initialized }),

      updateModuleScore: async (module, correct, total, points, timeSpent) => {
        const state = get();

        // Save to database if not in practice mode
        if (!state.practiceMode) {
          await saveScore(module, correct, total, points, timeSpent);
        }

        // Update local state
        set((state) => ({
          scores: {
            ...state.scores,
            [module]: {
              correct: state.scores[module].correct + correct,
              total: state.scores[module].total + total,
              points: state.scores[module].points + points,
              timeSpent: state.scores[module].timeSpent + timeSpent,
              attempts: state.scores[module].attempts + 1,
              lastAttempt: new Date().toISOString(),
            },
          },
        }));

        // Refresh overall progress
        await get().refreshOverallProgress();
      },

      loadScores: async () => {
        try {
          const scores = await getAllModuleScores();
          set({ scores });
        } catch (error) {
          console.error('Failed to load scores:', error);
        }
      },

      refreshOverallProgress: async () => {
        try {
          const progress = await getOverallProgress();
          set({ overallProgress: progress });
        } catch (error) {
          console.error('Failed to refresh overall progress:', error);
        }
      },

      resetModule: (module) => {
        set((state) => ({
          scores: {
            ...state.scores,
            [module]: { ...initialScores[module] },
          },
        }));
      },

      resetAll: () => {
        set({
          currentModule: null,
          scores: { ...initialScores },
          overallProgress: null,
        });
      },
    }),
    {
      name: 'dsa-game-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        practiceMode: state.practiceMode,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
