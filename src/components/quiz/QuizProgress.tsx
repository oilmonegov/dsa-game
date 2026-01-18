import { ProgressBar, Badge } from '@/components/common';
import { formatTime } from '@/utils';

interface QuizProgressProps {
  current: number;
  total: number;
  correct: number;
  streak: number;
  timeSpent: number;
}

export function QuizProgress({
  current,
  total,
  correct,
  streak,
  timeSpent,
}: QuizProgressProps) {
  return (
    <div className="mb-6">
      {/* Stats Row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 font-medium">
          Question {current + 1} of {total}
        </span>
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <Badge variant="warning" className="animate-pulse">
              🔥 {streak} streak!
            </Badge>
          )}
          <span className="text-gray-600 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
            {formatTime(timeSpent)}
          </span>
          <span className="text-sm font-medium text-green-600">
            {correct} correct
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={current + 1} max={total} size="md" color="purple" animated />
    </div>
  );
}

export default QuizProgress;
