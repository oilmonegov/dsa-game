import { useEffect, useState } from 'react';
import { Card, Button, Confetti } from '@/components/common';
import { formatTime } from '@/hooks';
import { calculatePercentage, isPassed, getGrade } from '@/utils';

interface GameResultsProps {
  title: string;
  subtitle?: string;
  score: {
    correct: number;
    total: number;
    points: number;
  };
  timeSpent: number;
  practiceMode?: boolean;
  icon?: string;
  onBack: () => void;
  onPlayAgain: () => void;
  gradient?: 'purple' | 'blue' | 'green' | 'pink' | 'orange';
  showConfetti?: boolean;
  additionalStats?: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
}

const gradientStyles = {
  purple: 'from-lavender-500 to-accent-600',
  blue: 'from-primary-500 to-blue-600',
  green: 'from-mint-500 to-success-600',
  pink: 'from-candy-500 to-rose-600',
  orange: 'from-coral-500 to-amber-600',
};

const failGradientStyles = {
  purple: 'from-lavender-400 to-red-500',
  blue: 'from-primary-400 to-red-500',
  green: 'from-mint-400 to-red-500',
  pink: 'from-candy-400 to-red-500',
  orange: 'from-coral-400 to-red-500',
};

export function GameResults({
  title,
  subtitle,
  score,
  timeSpent,
  practiceMode = false,
  icon,
  onBack,
  onPlayAgain,
  gradient = 'purple',
  showConfetti = true,
  additionalStats,
}: GameResultsProps) {
  const [showConfettiEffect, setShowConfettiEffect] = useState(false);

  const percentage = calculatePercentage(score.correct, score.total);
  const passed = isPassed(score.correct, score.total);
  const gradeInfo = getGrade(percentage);

  useEffect(() => {
    if (showConfetti && passed) {
      setShowConfettiEffect(true);
    }
  }, [showConfetti, passed]);

  const defaultIcon = passed ? '🎯' : '📊';
  const displayIcon = icon || defaultIcon;

  return (
    <>
      {showConfettiEffect && (
        <Confetti active={showConfettiEffect} onComplete={() => setShowConfettiEffect(false)} />
      )}

      <div className="max-w-2xl mx-auto animate-bounce-in">
        <Card padding="none" variant="elevated">
          {/* Header */}
          <div
            className={`
              p-8 text-white text-center
              bg-gradient-to-r ${passed ? gradientStyles[gradient] : failGradientStyles[gradient]}
            `}
          >
            <div className={`text-6xl mb-3 ${passed ? 'animate-bounce-in' : ''}`}>
              {displayIcon}
            </div>
            <h2 className="text-2xl font-bold mb-1 text-shadow">{gradeInfo.label}</h2>
            <p className="opacity-90">
              {practiceMode ? 'Practice Complete' : subtitle || `${title} Complete`}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard value={`${percentage}%`} label="Accuracy" color="text-primary-600" />
              <StatCard
                value={`${score.correct}/${score.total}`}
                label="Correct"
                color="text-success-600"
              />
              <StatCard value={formatTime(timeSpent)} label="Time" color="text-accent-600" />
            </div>

            {/* Additional Stats */}
            {additionalStats && additionalStats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {additionalStats.map((stat, index) => (
                  <StatCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    color={stat.color || 'text-gray-600'}
                  />
                ))}
              </div>
            )}

            {/* Grade Display */}
            <div className="text-center mb-6">
              <span
                className={`
                  inline-block text-7xl font-bold
                  ${gradeInfo.colorClass}
                  ${passed ? 'animate-pop' : ''}
                `}
              >
                {gradeInfo.grade}
              </span>
            </div>

            {/* Points (non-practice mode) */}
            {!practiceMode && (
              <div className="text-center mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <div className="text-3xl font-bold text-amber-600 animate-bounce-in">
                  {score.points} pts
                </div>
                <div className="text-sm text-amber-700">Total Points Earned</div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" onClick={onBack} fullWidth bounce>
                Back to Menu
              </Button>
              <Button variant="gradient" onClick={onPlayAgain} fullWidth bounce>
                Play Again
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
}

function StatCard({ value, label, color = 'text-gray-600' }: StatCardProps) {
  return (
    <div className="text-center p-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

export default GameResults;
