import { useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useDiagramStore, useGameStore } from '@/store';
import { Button, Card, ProgressBar, Badge } from '@/components/common';
import { formatTime, calculatePercentage, isPassed, getGrade } from '@/utils';
import { NodePlacementChallenge } from './NodePlacementChallenge';
import { ValueFillChallenge } from './ValueFillChallenge';
import { TraversalChallenge } from './TraversalChallenge';
import { EdgeConnectionChallenge } from './EdgeConnectionChallenge';

interface DiagramChallengeProps {
  onBack: () => void;
}

export function DiagramChallenge({ onBack }: DiagramChallengeProps) {
  const {
    challenges,
    currentIndex,
    currentChallenge,
    score,
    timeSpent,
    streak,
    isComplete,
    showResult,
    isCorrect,
    initializeChallenges,
    nextChallenge,
    submitChallenge,
    resetChallenge,
    incrementTime,
  } = useDiagramStore();

  const { practiceMode, updateModuleScore } = useGameStore();

  // Initialize challenges on mount
  useEffect(() => {
    initializeChallenges();
  }, [initializeChallenges]);

  // Timer
  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      incrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete, incrementTime]);

  // Save score when complete
  useEffect(() => {
    if (isComplete && !practiceMode) {
      void updateModuleScore('diagrams', score.correct, score.total, score.points, timeSpent);
    }
  }, [isComplete, practiceMode, score, timeSpent, updateModuleScore]);

  const handleSubmit = useCallback(() => {
    submitChallenge();
  }, [submitChallenge]);

  const handleNext = useCallback(() => {
    nextChallenge();
  }, [nextChallenge]);

  const handleRetry = useCallback(() => {
    resetChallenge();
  }, [resetChallenge]);

  const handleRestartAll = useCallback(() => {
    initializeChallenges();
  }, [initializeChallenges]);

  // Results screen
  if (isComplete) {
    const percentage = calculatePercentage(score.correct, score.total);
    const passed = isPassed(score.correct, score.total);
    const gradeInfo = getGrade(percentage);

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
            <div className="text-6xl mb-3">{passed ? '🎉' : '📊'}</div>
            <h2 className="text-2xl font-bold mb-1">{gradeInfo.label}</h2>
            <p className="opacity-90">
              {practiceMode ? 'Practice Complete' : 'Diagram Challenge Complete'}
            </p>
          </div>

          {/* Stats */}
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
                <div className="text-3xl font-bold text-purple-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-gray-500">Time</div>
              </div>
            </div>

            {/* Grade */}
            <div className="text-center mb-6">
              <span className={`inline-block text-6xl font-bold ${gradeInfo.colorClass}`}>
                {gradeInfo.grade}
              </span>
            </div>

            {/* Points */}
            {!practiceMode && (
              <div className="text-center mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{score.points} pts</div>
                <div className="text-sm text-yellow-700">Total Points Earned</div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" onClick={onBack} fullWidth>
                Back to Menu
              </Button>
              <Button variant="primary" onClick={handleRestartAll} fullWidth>
                Try Again
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Loading
  if (!currentChallenge) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading challenges...</p>
        </div>
      </div>
    );
  }

  // Render challenge type
  const renderChallengeContent = () => {
    switch (currentChallenge.type) {
      case 'node-placement':
        return <NodePlacementChallenge challenge={currentChallenge} />;
      case 'value-fill':
        return <ValueFillChallenge challenge={currentChallenge} />;
      case 'traversal-order':
        return <TraversalChallenge challenge={currentChallenge} />;
      case 'edge-connection':
        return <EdgeConnectionChallenge challenge={currentChallenge} />;
      default:
        return <p>Unknown challenge type</p>;
    }
  };

  const getDifficultyBadge = () => {
    switch (currentChallenge.difficulty) {
      case 'easy':
        return <Badge variant="success">{currentChallenge.difficulty}</Badge>;
      case 'medium':
        return <Badge variant="warning">{currentChallenge.difficulty}</Badge>;
      case 'hard':
        return <Badge variant="error">{currentChallenge.difficulty}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} leftIcon={<ArrowLeft size={20} />}>
          Back
        </Button>
        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <Badge variant="warning" className="animate-pulse">
              🔥 {streak} streak!
            </Badge>
          )}
          <span className="text-gray-600 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
            {formatTime(timeSpent)}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 font-medium">
            Challenge {currentIndex + 1} of {challenges.length}
          </span>
          <span className="text-sm font-medium text-green-600">{score.correct} correct</span>
        </div>
        <ProgressBar value={currentIndex + 1} max={challenges.length} color="green" animated />
      </div>

      {/* Challenge Card */}
      <Card padding="none" className="mb-4">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">{currentChallenge.title}</h2>
            <p className="text-sm text-gray-500">{currentChallenge.category}</p>
          </div>
          {getDifficultyBadge()}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description & Instructions */}
          <div className="mb-4">
            <p className="text-gray-700 mb-2">{currentChallenge.description}</p>
            <p className="text-sm text-blue-600 font-medium">{currentChallenge.instruction}</p>
          </div>

          {/* Challenge Content */}
          {renderChallengeContent()}
        </div>

        {/* Explanation (after submit) */}
        {showResult && (
          <div className={`p-6 border-t ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{isCorrect ? '✅' : '💡'}</span>
              <div>
                <h3 className="font-semibold mb-1">{isCorrect ? 'Excellent!' : 'Explanation'}</h3>
                <p className="text-sm opacity-90">{currentChallenge.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        {!showResult ? (
          <>
            <Button variant="secondary" onClick={handleRetry}>
              Reset
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              fullWidth
              leftIcon={<CheckCircle size={18} />}
            >
              Check Answer
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={handleNext}
            fullWidth
            rightIcon={<ArrowRight size={18} />}
          >
            {currentIndex < challenges.length - 1 ? 'Next Challenge' : 'See Results'}
          </Button>
        )}
      </div>

      {/* Hint */}
      {!showResult && (
        <details className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <summary className="cursor-pointer text-yellow-800 font-medium">💡 Need a hint?</summary>
          <p className="mt-2 text-sm text-yellow-700">{currentChallenge.hint}</p>
        </details>
      )}

      {/* Practice Mode Indicator */}
      {practiceMode && (
        <div className="mt-4 text-center text-sm text-gray-500">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            Practice Mode - scores not saved
          </span>
        </div>
      )}
    </div>
  );
}

export default DiagramChallenge;
