import { useEffect } from 'react';
import { Play, RotateCcw, BookOpen } from 'lucide-react';
import type { ModuleId } from '@/types';
import { useGameStore } from '@/store';
import { Button } from '@/components/common';
import { moduleConfigs } from '@/data/modules';
import { calculatePercentage, isPassed } from '@/utils';

interface GameMenuProps {
  onSelectModule: (moduleId: ModuleId) => void;
}

export function GameMenu({ onSelectModule }: GameMenuProps) {
  const { scores, overallProgress, loadScores, refreshOverallProgress, setPracticeMode } =
    useGameStore();

  useEffect(() => {
    void loadScores();
    void refreshOverallProgress();
  }, [loadScores, refreshOverallProgress]);

  const handleStartModule = (moduleId: ModuleId, practice: boolean = false) => {
    setPracticeMode(practice);
    onSelectModule(moduleId);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DSA Learning Game</h1>
        <p className="text-gray-500">CSC 731 — Data Structures & Algorithms</p>
      </div>

      {/* Overall Progress */}
      {overallProgress && overallProgress.total > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{overallProgress.percentage}%</p>
              <p className="text-sm text-gray-500">
                {overallProgress.correct} of {overallProgress.total} correct
              </p>
            </div>
            <div className="text-right">
              {overallProgress.passed ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Passed
                </span>
              ) : (
                <span className="text-sm text-gray-500">70% needed to pass</span>
              )}
            </div>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                overallProgress.passed ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
              style={{ width: `${overallProgress.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Module Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {moduleConfigs.map((module) => {
          const moduleScore = scores[module.id];
          const hasAttempted = moduleScore && moduleScore.total > 0;
          const modulePassed = hasAttempted && isPassed(moduleScore.correct, moduleScore.total);
          const modulePercentage = hasAttempted
            ? calculatePercentage(moduleScore.correct, moduleScore.total)
            : 0;

          return (
            <div
              key={module.id}
              className={`
                bg-white border rounded-lg overflow-hidden
                ${module.available ? 'border-gray-200 hover:border-gray-300' : 'border-gray-100 opacity-60'}
                transition-colors
              `}
            >
              {/* Module Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{module.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{module.title}</h3>
                    {!module.available && (
                      <span className="text-xs text-gray-400">Coming soon</span>
                    )}
                    {modulePassed && (
                      <span className="text-xs text-emerald-600 font-medium">Passed</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Module Body */}
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{module.description}</p>

                {/* Score */}
                {hasAttempted && module.available && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-500">Best score</span>
                      <span className={modulePassed ? 'text-emerald-600' : 'text-gray-700'}>
                        {modulePercentage}%
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          modulePassed ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${modulePercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                {module.available && (
                  <div className="flex gap-2">
                    <Button
                      variant={hasAttempted ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => handleStartModule(module.id)}
                      fullWidth
                      leftIcon={hasAttempted ? <RotateCcw size={14} /> : <Play size={14} />}
                    >
                      {hasAttempted ? 'Retry' : 'Start'}
                    </Button>
                    {hasAttempted && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartModule(module.id, true)}
                        title="Practice mode"
                      >
                        <BookOpen size={14} />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400 mt-8">Progress is saved automatically</p>
    </div>
  );
}

export default GameMenu;
