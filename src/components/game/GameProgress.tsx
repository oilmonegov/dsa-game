import { ProgressBar } from '@/components/common';

type ProgressColor = 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gradient';

interface GameProgressProps {
  current: number;
  total: number;
  correctCount?: number;
  color?: ProgressColor;
  label?: string;
  showCorrectCount?: boolean;
  animated?: boolean;
  celebrate?: boolean;
}

export function GameProgress({
  current,
  total,
  correctCount,
  color = 'purple',
  label = 'Challenge',
  showCorrectCount = true,
  animated = true,
  celebrate = false,
}: GameProgressProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium">
          {label} {current} of {total}
        </span>
        {showCorrectCount && correctCount !== undefined && (
          <span className="text-sm font-semibold text-success-600 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-success-500" />
            {correctCount} correct
          </span>
        )}
      </div>
      <ProgressBar
        value={current}
        max={total}
        color={color}
        animated={animated}
        celebrate={celebrate}
        size="md"
      />
    </div>
  );
}

interface GameScoreDisplayProps {
  correct: number;
  total: number;
  points?: number;
  showPoints?: boolean;
}

export function GameScoreDisplay({
  correct,
  total,
  points,
  showPoints = true,
}: GameScoreDisplayProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Score:</span>
        <span className="font-semibold text-gray-800">
          {correct}/{total}
          <span className="text-gray-400 ml-1">({percentage}%)</span>
        </span>
      </div>
      {showPoints && points !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Points:</span>
          <span className="font-semibold text-accent-600">{points}</span>
        </div>
      )}
    </div>
  );
}

export default GameProgress;
