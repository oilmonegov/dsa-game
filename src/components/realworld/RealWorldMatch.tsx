import { useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useRealWorldStore, useGameStore } from '@/store';
import { Button, Card, ProgressBar, Badge } from '@/components/common';
import { formatTime, calculatePercentage, isPassed, getGrade } from '@/utils';
import { StructureCard, ApplicationCardComponent } from './MatchCard';

interface RealWorldMatchProps {
  onBack: () => void;
}

export function RealWorldMatch({ onBack }: RealWorldMatchProps) {
  const {
    challenges,
    currentIndex,
    currentChallenge,
    matches,
    selectedStructure,
    selectedApplication,
    validatedMatches,
    score,
    timeSpent,
    streak,
    isComplete,
    showResult,
    initializeChallenges,
    selectStructure,
    selectApplication,
    removeMatch,
    resetMatches,
    submitMatches,
    nextChallenge,
    incrementTime,
    resetChallenge,
  } = useRealWorldStore();

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
      void updateModuleScore('realWorld', score.correct, score.total, score.points, timeSpent);
    }
  }, [isComplete, practiceMode, score, timeSpent, updateModuleScore]);

  const handleSubmit = useCallback(() => {
    submitMatches();
  }, [submitMatches]);

  const handleNext = useCallback(() => {
    nextChallenge();
  }, [nextChallenge]);

  const handleRestart = useCallback(() => {
    initializeChallenges();
  }, [initializeChallenges]);

  // Get matched structure IDs
  const matchedStructureIds = useMemo(() => new Set(matches.map((m) => m.structureId)), [matches]);

  // Get matched application IDs
  const matchedApplicationIds = useMemo(
    () => new Set(matches.map((m) => m.applicationId)),
    [matches]
  );

  // Check if all matches are complete
  const allMatched = currentChallenge
    ? matches.length === currentChallenge.applications.length
    : false;

  // Check if all matches are correct
  const allCorrect = useMemo(() => {
    if (!showResult) return false;
    return Object.values(validatedMatches).every((v) => v);
  }, [showResult, validatedMatches]);

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
                ? 'bg-gradient-to-r from-orange-500 to-amber-600'
                : 'bg-gradient-to-r from-orange-500 to-red-500'
            }`}
          >
            <div className="text-6xl mb-3">{passed ? '🔗' : '📊'}</div>
            <h2 className="text-2xl font-bold mb-1">{gradeInfo.label}</h2>
            <p className="opacity-90">
              {practiceMode ? 'Practice Complete' : 'Real-World Match Complete'}
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

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
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
        <ProgressBar value={currentIndex + 1} max={challenges.length} color="orange" animated />
      </div>

      {/* Challenge Card */}
      <Card padding="none" className="mb-4">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">{currentChallenge.title}</h2>
              <p className="text-orange-200 text-sm">{currentChallenge.category}</p>
            </div>
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

        {/* Content */}
        <div className="p-6">
          {/* Instructions */}
          <div className="mb-6">
            <p className="text-gray-700 mb-2">{currentChallenge.description}</p>
            <p className="text-sm text-orange-600 font-medium">
              🔗 Click a data structure, then click its matching application
            </p>
          </div>

          {/* Matching Area */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Data Structures */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">📊</span> Data Structures
              </h3>
              <div className="space-y-3">
                {currentChallenge.structures.map((structure) => {
                  const isMatched = matchedStructureIds.has(structure.id);
                  const match = matches.find((m) => m.structureId === structure.id);
                  const isCorrect = match ? validatedMatches[match.applicationId] : undefined;

                  return (
                    <StructureCard
                      key={structure.id}
                      structure={structure}
                      isSelected={selectedStructure === structure.id}
                      isMatched={isMatched}
                      isCorrect={isCorrect}
                      showResult={showResult}
                      onClick={() => selectStructure(structure.id)}
                      disabled={showResult}
                    />
                  );
                })}
              </div>
            </div>

            {/* Applications */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🌍</span> Real-World Applications
              </h3>
              <div className="space-y-3">
                {currentChallenge.applications.map((app) => {
                  const isMatched = matchedApplicationIds.has(app.id);
                  const match = matches.find((m) => m.applicationId === app.id);
                  const matchedStructure = match
                    ? currentChallenge.structures.find((s) => s.id === match.structureId)
                    : undefined;
                  const isCorrect = validatedMatches[app.id];

                  return (
                    <ApplicationCardComponent
                      key={app.id}
                      application={app}
                      isSelected={selectedApplication === app.id}
                      isMatched={isMatched}
                      matchedStructureName={matchedStructure?.name}
                      isCorrect={isCorrect}
                      showResult={showResult}
                      onClick={() => selectApplication(app.id)}
                      onRemoveMatch={() => removeMatch(app.id)}
                      disabled={showResult}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Match Progress */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Matches: {matches.length} / {currentChallenge.applications.length}
              </span>
              {!showResult && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetMatches}
                  disabled={matches.length === 0}
                  leftIcon={<RotateCcw size={14} />}
                >
                  Reset All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Explanations (after submit) */}
        {showResult && (
          <div className={`p-6 border-t ${allCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">{allCorrect ? '✅' : '💡'}</span>
              <div>
                <h3 className="font-semibold mb-1">
                  {allCorrect ? 'Perfect Match!' : "Here's why each match works:"}
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {currentChallenge.structures.map((structure) => (
                <div key={structure.id} className="p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{structure.icon}</span>
                    <span className="font-medium">{structure.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {currentChallenge.explanations[structure.id]}
                  </p>
                </div>
              ))}
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
            <Button variant="primary" onClick={handleSubmit} fullWidth disabled={!allMatched}>
              {allMatched
                ? 'Check Matches'
                : `Match ${currentChallenge.applications.length - matches.length} more`}
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

export default RealWorldMatch;
