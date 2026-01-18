import { useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Undo2, Play, Square } from 'lucide-react';
import { useTraversalStore, useGameStore } from '@/store';
import { Button, Card, ProgressBar, Badge } from '@/components/common';
import { formatTime, calculatePercentage, isPassed, getGrade } from '@/utils';
import { TreeVisualization } from './TreeVisualization';
import { AlgorithmPanel } from './AlgorithmPanel';
import { TRAVERSAL_ALGORITHMS } from '@/types/traversal';

interface TraversalGameProps {
  onBack: () => void;
}

export function TraversalGame({ onBack }: TraversalGameProps) {
  const {
    challenges,
    currentIndex,
    currentChallenge,
    selectedNodes,
    isAnimating,
    score,
    timeSpent,
    streak,
    isComplete,
    showResult,
    isCorrect,
    showAlgorithm,
    initializeChallenges,
    selectNode,
    undoSelection,
    resetSelection,
    startAnimation,
    stopAnimation,
    nextAnimationStep,
    submitTraversal,
    nextChallenge,
    toggleAlgorithm,
    incrementTime,
    resetChallenge,
  } = useTraversalStore();

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

  // Animation interval
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      nextAnimationStep();
    }, 800);

    return () => clearInterval(interval);
  }, [isAnimating, nextAnimationStep]);

  // Save score when complete
  useEffect(() => {
    if (isComplete && !practiceMode) {
      void updateModuleScore('traversals', score.correct, score.total, score.points, timeSpent);
    }
  }, [isComplete, practiceMode, score, timeSpent, updateModuleScore]);

  const handleSubmit = useCallback(() => {
    submitTraversal();
  }, [submitTraversal]);

  const handleNext = useCallback(() => {
    nextChallenge();
  }, [nextChallenge]);

  const handleRestart = useCallback(() => {
    initializeChallenges();
  }, [initializeChallenges]);

  // Check if all nodes are selected
  const allNodesSelected = currentChallenge
    ? selectedNodes.length === currentChallenge.correctOrder.length
    : false;

  // Results screen
  if (isComplete) {
    const percentage = calculatePercentage(score.correct, score.total);
    const passed = isPassed(score.correct, score.total);
    const gradeInfo = getGrade(percentage);

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card padding="none">
          <div
            className={`p-8 text-white text-center ${
              passed
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
                : 'bg-gradient-to-r from-orange-500 to-red-500'
            }`}
          >
            <div className="text-6xl mb-3">{passed ? '🎯' : '📊'}</div>
            <h2 className="text-2xl font-bold mb-1">{gradeInfo.label}</h2>
            <p className="opacity-90">
              {practiceMode ? 'Practice Complete' : 'Traversal Game Complete'}
            </p>
          </div>

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

            <div className="text-center mb-6">
              <span className={`inline-block text-6xl font-bold ${gradeInfo.colorClass}`}>
                {gradeInfo.grade}
              </span>
            </div>

            {!practiceMode && (
              <div className="text-center mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{score.points} pts</div>
                <div className="text-sm text-yellow-700">Total Points Earned</div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" onClick={onBack} fullWidth>
                Back to Menu
              </Button>
              <Button variant="primary" onClick={handleRestart} fullWidth>
                Play Again
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

  const algorithm = TRAVERSAL_ALGORITHMS[currentChallenge.traversalType];

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
        <ProgressBar value={currentIndex + 1} max={challenges.length} color="purple" animated />
      </div>

      {/* Challenge Card */}
      <Card padding="none" className="mb-4">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">{currentChallenge.title}</h2>
              <p className="text-purple-200 text-sm">{algorithm.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  currentChallenge.difficulty === 'easy'
                    ? 'success'
                    : currentChallenge.difficulty === 'medium'
                      ? 'warning'
                      : 'error'
                }
              >
                {currentChallenge.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Instructions */}
          <div className="mb-4">
            <p className="text-gray-700 mb-2">{currentChallenge.description}</p>
            <div className="flex items-center gap-2 text-purple-600 font-medium">
              <span className="text-lg">🎯</span>
              <span>Click nodes in {algorithm.visitOrder} order</span>
            </div>
          </div>

          {/* Tree Visualization */}
          <TreeVisualization
            nodes={currentChallenge.nodes}
            edges={currentChallenge.edges}
            selectedNodes={selectedNodes}
            onNodeClick={selectNode}
            disabled={showResult || isAnimating}
            showOrder={true}
            correctOrder={currentChallenge.correctOrder}
            showResult={showResult}
          />

          {/* Selection Display */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Traversal:</span>
              <span className="text-sm text-gray-500">
                {selectedNodes.length} / {currentChallenge.correctOrder.length} nodes
              </span>
            </div>

            {selectedNodes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedNodes.map((nodeId, index) => {
                  let bgClass = 'bg-purple-100 text-purple-800';
                  if (showResult) {
                    const isNodeCorrect = currentChallenge.correctOrder[index] === nodeId;
                    bgClass = isNodeCorrect
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800';
                  }
                  return (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${bgClass}`}
                    >
                      <span className="text-xs opacity-60">{index + 1}.</span>
                      {nodeId}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">Click on nodes to build your traversal</p>
            )}
          </div>

          {/* Controls */}
          {!showResult && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={undoSelection}
                disabled={selectedNodes.length === 0 || isAnimating}
                leftIcon={<Undo2 size={16} />}
              >
                Undo
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSelection}
                disabled={selectedNodes.length === 0 || isAnimating}
                leftIcon={<RotateCcw size={16} />}
              >
                Reset
              </Button>
              <div className="flex-1" />
              {!isAnimating ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={startAnimation}
                  leftIcon={<Play size={16} />}
                >
                  Show Solution
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={stopAnimation}
                  leftIcon={<Square size={16} />}
                >
                  Stop
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Result Explanation */}
        {showResult && (
          <div className={`p-6 border-t ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{isCorrect ? '✅' : '💡'}</span>
              <div>
                <h3 className="font-semibold mb-1">{isCorrect ? 'Excellent!' : 'Explanation'}</h3>
                <p className="text-sm opacity-90 mb-3">{currentChallenge.explanation}</p>

                {!isCorrect && (
                  <div className="bg-white/50 rounded-lg p-3">
                    <span className="text-sm font-medium">Correct order: </span>
                    <span className="font-mono text-sm">
                      {currentChallenge.correctOrder.join(' → ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Actions */}
      <div className="flex gap-3 mb-4">
        {!showResult ? (
          <>
            <Button variant="secondary" onClick={resetChallenge}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleSubmit} fullWidth disabled={!allNodesSelected}>
              {allNodesSelected
                ? 'Check Answer'
                : `Select ${currentChallenge.correctOrder.length - selectedNodes.length} more`}
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

      {/* Algorithm Panel */}
      <AlgorithmPanel
        traversalType={currentChallenge.traversalType}
        isOpen={showAlgorithm}
        onToggle={toggleAlgorithm}
      />

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

export default TraversalGame;
