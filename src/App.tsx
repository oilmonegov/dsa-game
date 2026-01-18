import { useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import type { ModuleId } from '@/types';
import { useGameStore } from '@/store';
import { initDatabase } from '@/db';
import { GameMenu } from '@/components/GameMenu';
import { TheoryQuiz } from '@/components/quiz';
import { DiagramChallenge } from '@/components/diagram';
import { TraversalGame } from '@/components/traversal';
import { RealWorldMatch } from '@/components/realworld';
import { CodeCompletion } from '@/components/codecompletion';
import { ToastProvider, ErrorBoundary, ErrorState, LoadingSpinner } from '@/components/common';
import { WelcomeModal } from '@/components/onboarding/WelcomeModal';

type AppView = 'menu' | 'theory' | 'diagrams' | 'traversals' | 'realWorld' | 'codeCompletion';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('menu');
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setDbInitialized, loadScores, refreshOverallProgress } = useGameStore();

  // Initialize database on mount
  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        setDbInitialized(true);
        await loadScores();
        await refreshOverallProgress();
      } catch (err) {
        console.error('Failed to initialize database:', err);
        setError('Failed to initialize database. Please refresh the page.');
      } finally {
        setIsInitializing(false);
      }
    };

    void init();
  }, [setDbInitialized, loadScores, refreshOverallProgress]);

  const handleSelectModule = useCallback((moduleId: ModuleId) => {
    setCurrentView(moduleId);
  }, []);

  const handleBackToMenu = useCallback(() => {
    setCurrentView('menu');
  }, []);

  // Loading state
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative mb-6">
            <LoadingSpinner size="xl" color="gradient" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
              🎮
            </span>
          </div>
          <h2 className="text-xl font-semibold gradient-text mb-2">Loading DSA Game</h2>
          <p className="text-gray-500">Initializing your learning experience...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <ErrorState
          title="Connection Error"
          message={error}
          variant="playful"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'theory':
        return <TheoryQuiz onBack={handleBackToMenu} />;
      case 'diagrams':
        return <DiagramChallenge onBack={handleBackToMenu} />;
      case 'traversals':
        return <TraversalGame onBack={handleBackToMenu} />;
      case 'realWorld':
        return <RealWorldMatch onBack={handleBackToMenu} />;
      case 'codeCompletion':
        return <CodeCompletion onBack={handleBackToMenu} />;
      default:
        return <GameMenu onSelectModule={handleSelectModule} />;
    }
  };

  return (
    <ToastProvider position="bottom-right">
      <ErrorBoundary
        fallback={
          <div className="min-h-screen flex items-center justify-center p-4">
            <ErrorState
              title="Something went wrong"
              message="The application encountered an unexpected error."
              onRetry={() => window.location.reload()}
              onGoHome={handleBackToMenu}
            />
          </div>
        }
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          {/* Welcome Modal for first-time users */}
          <WelcomeModal />

          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToMenu}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors group"
                >
                  <span className="text-2xl group-hover:animate-wiggle">🎓</span>
                  <span className="font-semibold hidden sm:inline">
                    <span className="gradient-text">DSA</span> Learning Game
                  </span>
                </button>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500">
                    <Sparkles size={14} className="text-accent-400" />
                    <span>CSC 731</span>
                  </div>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-6xl mx-auto px-4 py-8">
            <div className={currentView !== 'menu' ? 'animate-fade-in' : ''}>
              {renderView()}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-100 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="text-center text-sm text-gray-500">
                <p>
                  Built for{' '}
                  <span className="font-medium text-gray-600">CSC 731</span>{' '}
                  - Data Structures & Algorithms •{' '}
                  <a
                    href="/docs/CSC731_Complete_Study_Guide.html"
                    className="text-primary-500 hover:text-primary-600 hover:underline transition-colors"
                  >
                    View Study Guide
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </ErrorBoundary>
    </ToastProvider>
  );
}

export default App;
