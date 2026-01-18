import type { Question } from '@/types';
import { Button, Card } from '@/components/common';
import {
  calculatePercentage,
  isPassed,
  getGrade,
  formatTime,
  getImprovementAreas,
} from '@/utils';

interface QuizResultsProps {
  score: {
    correct: number;
    total: number;
    points: number;
  };
  timeSpent: number;
  incorrectQuestions: Question[];
  practiceMode: boolean;
  onRetry: () => void;
  onBack: () => void;
}

export function QuizResults({
  score,
  timeSpent,
  incorrectQuestions,
  practiceMode,
  onRetry,
  onBack,
}: QuizResultsProps) {
  const percentage = calculatePercentage(score.correct, score.total);
  const passed = isPassed(score.correct, score.total);
  const gradeInfo = getGrade(percentage);
  const improvementAreas = getImprovementAreas(incorrectQuestions);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card padding="none">
        {/* Header */}
        <div
          className={`p-8 text-white text-center ${
            passed
              ? 'bg-gradient-to-r from-green-500 to-emerald-600'
              : 'bg-gradient-to-r from-orange-500 to-red-500'
          }`}
        >
          <div className="text-6xl mb-3">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-2xl font-bold mb-1">{gradeInfo.label}</h2>
          <p className="opacity-90">
            {practiceMode ? 'Practice Session Complete' : 'Quiz Complete'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-500">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600">
                {score.correct}/{score.total}
              </div>
              <div className="text-sm text-gray-500">Correct</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600">
                {formatTime(timeSpent)}
              </div>
              <div className="text-sm text-gray-500">Time</div>
            </div>
          </div>

          {/* Grade Display */}
          <div className="text-center mb-6">
            <span className={`inline-block text-6xl font-bold ${gradeInfo.colorClass}`}>
              {gradeInfo.grade}
            </span>
            <div className="text-sm text-gray-500 mt-2">
              {passed ? '70% threshold reached!' : 'Need 70% to pass'}
            </div>
          </div>

          {/* Points (non-practice mode) */}
          {!practiceMode && (
            <div className="text-center mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{score.points} pts</div>
              <div className="text-sm text-yellow-700">Total Points Earned</div>
            </div>
          )}

          {/* Improvement Areas */}
          {improvementAreas.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Areas to Review:</h3>
              <div className="space-y-2">
                {improvementAreas.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
                  >
                    <span className="text-red-500">⚠️</span>
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">{area.category}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({area.count} missed)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" onClick={onBack} fullWidth>
              Back to Menu
            </Button>
            <Button variant="primary" onClick={onRetry} fullWidth>
              Try Again
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default QuizResults;
