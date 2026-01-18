import { useEffect } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import type { ModuleId } from '@/types';
import { useGameStore } from '@/store';
import { Card, ProgressBar, Button, Badge } from '@/components/common';
import { moduleConfigs } from '@/data/modules';
import { calculatePercentage, isPassed } from '@/utils';

interface GameMenuProps {
  onSelectModule: (moduleId: ModuleId) => void;
}

export function GameMenu({ onSelectModule }: GameMenuProps) {
  const { scores, overallProgress, loadScores, refreshOverallProgress, setPracticeMode } =
    useGameStore();

  // Load scores on mount
  useEffect(() => {
    void loadScores();
    void refreshOverallProgress();
  }, [loadScores, refreshOverallProgress]);

  const handleStartModule = (moduleId: ModuleId, practice: boolean = false) => {
    setPracticeMode(practice);
    onSelectModule(moduleId);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          DSA Learning Game
        </h1>
        <p className="text-gray-600">CSC 731 - Data Structures & Algorithms</p>
      </div>

      {/* Overall Progress Card */}
      {overallProgress && overallProgress.total > 0 && (
        <Card className="mb-8" padding="md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Progress</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[200px]">
              <ProgressBar
                value={overallProgress.percentage}
                max={100}
                color={overallProgress.passed ? 'green' : 'blue'}
              />
              <p className="text-sm text-gray-600 mt-2">
                {overallProgress.correct} / {overallProgress.total} correct (
                {overallProgress.percentage}%)
              </p>
            </div>
            <div className="text-center">
              <span
                className={`text-2xl font-bold ${
                  overallProgress.passed ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {overallProgress.passed ? '✓ Passed' : 'In Progress'}
              </span>
              <p className="text-xs text-gray-500">70% needed to pass</p>
            </div>
          </div>
        </Card>
      )}

      {/* Module Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moduleConfigs.map((module) => {
          const moduleScore = scores[module.id];
          const hasAttempted = moduleScore && moduleScore.total > 0;
          const modulePassed = hasAttempted && isPassed(moduleScore.correct, moduleScore.total);
          const modulePercentage = hasAttempted
            ? calculatePercentage(moduleScore.correct, moduleScore.total)
            : 0;

          return (
            <Card
              key={module.id}
              padding="none"
              className={`transition-all duration-200 ${
                module.available
                  ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                  : 'opacity-70'
              }`}
            >
              {/* Color Bar */}
              <div className={`h-2 ${module.color}`} />

              <div className="p-5">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{module.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{module.title}</h3>
                    {!module.available && <Badge variant="default">Coming Soon</Badge>}
                    {modulePassed && <Badge variant="success">Passed</Badge>}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{module.description}</p>

                {/* Score Display */}
                {hasAttempted && module.available && (
                  <div className="border-t pt-3 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Best Score:</span>
                      <span
                        className={`font-medium ${
                          modulePassed ? 'text-green-600' : 'text-orange-600'
                        }`}
                      >
                        {moduleScore.correct}/{moduleScore.total} ({modulePercentage}%)
                      </span>
                    </div>
                    <ProgressBar
                      value={modulePercentage}
                      max={100}
                      size="sm"
                      color={modulePassed ? 'green' : 'orange'}
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {moduleScore.attempts} attempt{moduleScore.attempts !== 1 ? 's' : ''} •{' '}
                      {moduleScore.points} pts total
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {module.available && (
                  <div className="flex gap-2">
                    <Button
                      variant={hasAttempted ? 'secondary' : 'primary'}
                      onClick={() => handleStartModule(module.id)}
                      fullWidth
                      leftIcon={hasAttempted ? <RefreshCw size={16} /> : <Play size={16} />}
                    >
                      {hasAttempted ? 'Play Again' : 'Start'}
                    </Button>
                    {hasAttempted && (
                      <Button
                        variant="ghost"
                        onClick={() => handleStartModule(module.id, true)}
                        title="Practice Mode"
                      >
                        📝
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Complete all modules with 70% or higher to pass.</p>
        <p className="mt-1">Your progress is saved automatically.</p>
      </div>
    </div>
  );
}

export default GameMenu;
