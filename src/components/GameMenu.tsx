import { useEffect } from 'react';
import { Play, RefreshCw, Sparkles } from 'lucide-react';
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
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-accent-500 animate-pulse-soft" />
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            DSA Learning Game
          </h1>
          <Sparkles className="w-8 h-8 text-candy-500 animate-pulse-soft" />
        </div>
        <p className="text-gray-600 text-lg">CSC 731 - Data Structures & Algorithms</p>
      </div>

      {/* Overall Progress Card */}
      {overallProgress && overallProgress.total > 0 && (
        <Card
          className="mb-8"
          padding="md"
          variant="gradient"
          hover
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span className="text-xl">📈</span>
            Your Progress
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[200px]">
              <ProgressBar
                value={overallProgress.percentage}
                max={100}
                color={overallProgress.passed ? 'green' : 'gradient'}
                size="md"
                animated
                striped={!overallProgress.passed}
              />
              <p className="text-sm text-gray-600 mt-2">
                {overallProgress.correct} / {overallProgress.total} correct (
                <span className="font-semibold">{overallProgress.percentage}%</span>)
              </p>
            </div>
            <div className="text-center">
              <span
                className={`
                  text-2xl font-bold flex items-center gap-2
                  ${overallProgress.passed ? 'text-success-600' : 'text-coral-600'}
                `}
              >
                {overallProgress.passed ? (
                  <>
                    <span className="text-3xl animate-bounce-in">✓</span>
                    Passed
                  </>
                ) : (
                  <>
                    <span className="text-3xl">🎯</span>
                    In Progress
                  </>
                )}
              </span>
              <p className="text-xs text-gray-500 mt-1">70% needed to pass</p>
            </div>
          </div>
        </Card>
      )}

      {/* Module Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
        {moduleConfigs.map((module, index) => {
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
              variant={module.available ? 'interactive' : 'default'}
              className={`
                ${!module.available ? 'opacity-70' : ''}
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Color Bar with gradient */}
              <div className={`h-1.5 ${module.color} ${modulePassed ? 'shimmer' : ''}`} />

              <div className="p-5">
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl drop-shadow-sm">{module.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{module.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      {!module.available && (
                        <Badge variant="default" size="xs">Coming Soon</Badge>
                      )}
                      {modulePassed && (
                        <Badge variant="success" size="xs" glow>
                          Passed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {module.description}
                </p>

                {/* Score Display */}
                {hasAttempted && module.available && (
                  <div className="border-t pt-3 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Best Score:</span>
                      <span
                        className={`font-semibold ${
                          modulePassed ? 'text-success-600' : 'text-coral-600'
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
                      animated
                    />
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <span>{moduleScore.attempts} attempt{moduleScore.attempts !== 1 ? 's' : ''}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-accent-500 font-medium">{moduleScore.points} pts</span>
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {module.available && (
                  <div className="flex gap-2">
                    <Button
                      variant={hasAttempted ? 'secondary' : 'gradient'}
                      onClick={() => handleStartModule(module.id)}
                      fullWidth
                      leftIcon={hasAttempted ? <RefreshCw size={16} /> : <Play size={16} />}
                      bounce
                    >
                      {hasAttempted ? 'Play Again' : 'Start'}
                    </Button>
                    {hasAttempted && (
                      <Button
                        variant="ghost"
                        onClick={() => handleStartModule(module.id, true)}
                        title="Practice Mode"
                        className="px-3"
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
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
          <span className="text-sm text-gray-500">
            Complete all modules with 70% or higher to pass
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Your progress is saved automatically
        </p>
      </div>
    </div>
  );
}

export default GameMenu;
