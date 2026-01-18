import { useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useCodeCompletionStore, useGameStore } from '@/store';
import { Button, Card, ProgressBar, Badge } from '@/components/common';
import { formatTime, calculatePercentage, isPassed, getGrade } from '@/utils';
import { CodeEditor } from './CodeEditor';
import { ComplexitySelector } from './ComplexitySelector';

interface CodeCompletionProps {
  onBack: () => void;
}

export function CodeCompletion({ onBack }: CodeCompletionProps) {
  const {
    challenges,
    currentIndex,
    currentChallenge,
    blankAnswers,
    complexityAnswers,
    validatedBlanks,
    validatedComplexity,
    activeBlank,
    score,
    timeSpent,
    streak,
    isComplete,
    showResult,
    initializeChallenges,
    setBlankAnswer,
    setComplexityAnswer,
    setActiveBlank,
    resetAnswers,
    submitAnswers,
    nextChallenge,
    incrementTime,
    resetChallenge,
  } = useCodeCompletionStore();

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
      void updateModuleScore('codeCompletion', score.correct, score.total, score.points, timeSpent);
    }
  }, [isComplete, practiceMode, score, timeSpent, updateModuleScore]);

  const handleSubmit = useCallback(() => {
    submitAnswers();
  }, [submitAnswers]);

  const handleNext = useCallback(() => {
    nextChallenge();
  }, [nextChallenge]);

  const handleRestart = useCallback(() => {
    initializeChallenges();
  }, [initializeChallenges]);

  // Check if all blanks and complexity questions are answered
  const allAnswered = useMemo(() => {
    if (!currentChallenge) return false;

    const blanksAnswered = currentChallenge.blanks.every(
      (blank) => blankAnswers[blank.id]?.trim()
    );

    const complexityAnswered = currentChallenge.complexityQuestions
      ? currentChallenge.complexityQuestions.every((q) => complexityAnswers[q.id])
      : true;

    return blanksAnswered && complexityAnswered;
  }, [currentChallenge, blankAnswers, complexityAnswers]);

  // Count answered items
  const answeredCount = useMemo(() => {
    if (!currentChallenge) return { answered: 0, total: 0 };

    const blanksAnswered = currentChallenge.blanks.filter(
      (blank) => blankAnswers[blank.id]?.trim()
    ).length;

    const complexityAnsweredCount = currentChallenge.complexityQuestions
      ? currentChallenge.complexityQuestions.filter((q) => complexityAnswers[q.id]).length
      : 0;

    const total =
      currentChallenge.blanks.length + (currentChallenge.complexityQuestions?.length || 0);

    return { answered: blanksAnswered + complexityAnsweredCount, total };
  }, [currentChallenge, blankAnswers, complexityAnswers]);

  // Check if all answers are correct
  const allCorrect = useMemo(() => {
    if (!showResult) return false;
    const blanksCorrect = Object.values(validatedBlanks).every(Boolean);
    const complexityCorrect = Object.values(validatedComplexity).every(Boolean);
    return blanksCorrect && complexityCorrect;
  }, [showResult, validatedBlanks, validatedComplexity]);

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
                ? 'bg-gradient-to-r from-pink-500 to-rose-600'
                : 'bg-gradient-to-r from-pink-500 to-red-500'
            }`}
          >
            <div className="text-6xl mb-3">{passed ? '💻' : '📊'}</div>
            <h2 className="text-2xl font-bold mb-1">{gradeInfo.label}</h2>
            <p className="opacity-90">
              {practiceMode ? 'Practice Complete' : 'Code Completion Complete'}
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

  const hasComplexityQuestions =
    currentChallenge.complexityQuestions && currentChallenge.complexityQuestions.length > 0;

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
        <ProgressBar value={currentIndex + 1} max={challenges.length} color="pink" animated />
      </div>

      {/* Challenge Card */}
      <Card padding="none" className="mb-4">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">{currentChallenge.title}</h2>
              <p className="text-pink-200 text-sm">{currentChallenge.category}</p>
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
              <Badge variant="default">{currentChallenge.type}</Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Instructions */}
          <div className="mb-6">
            <p className="text-gray-700 mb-2">{currentChallenge.description}</p>
            <p className="text-sm text-pink-600 font-medium">
              💻 Fill in the blanks to complete the algorithm
            </p>
          </div>

          {/* Code Editor */}
          <CodeEditor
            challenge={currentChallenge}
            blankAnswers={blankAnswers}
            validatedBlanks={validatedBlanks}
            activeBlank={activeBlank}
            showResult={showResult}
            onBlankClick={setActiveBlank}
            onBlankChange={setBlankAnswer}
          />

          {/* Complexity Questions */}
          {hasComplexityQuestions && (
            <div className="mt-6">
              <ComplexitySelector
                questions={currentChallenge.complexityQuestions!}
                answers={complexityAnswers}
                validatedAnswers={validatedComplexity}
                showResult={showResult}
                onSelect={setComplexityAnswer}
              />
            </div>
          )}

          {/* Progress indicator */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Answered: {answeredCount.answered} / {answeredCount.total}
            </span>
            {!showResult && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAnswers}
                disabled={answeredCount.answered === 0}
                leftIcon={<RotateCcw size={14} />}
              >
                Reset All
              </Button>
            )}
          </div>
        </div>

        {/* Explanation (after submit) */}
        {showResult && (
          <div className={`p-6 border-t ${allCorrect ? 'bg-green-50' : 'bg-pink-50'}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{allCorrect ? '✅' : '💡'}</span>
              <div>
                <h3 className="font-semibold mb-1">{allCorrect ? 'Perfect!' : 'Explanation'}</h3>
                <p className="text-sm opacity-90">{currentChallenge.explanation}</p>
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
            <Button variant="primary" onClick={handleSubmit} fullWidth disabled={!allAnswered}>
              {allAnswered
                ? 'Check Answers'
                : `Answer ${answeredCount.total - answeredCount.answered} more`}
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

export default CodeCompletion;
