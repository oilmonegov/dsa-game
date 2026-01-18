import { useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useQuizStore } from '@/store';
import { useGameStore } from '@/store';
import { Button } from '@/components/common';
import { QuestionCard } from './QuestionCard';
import { QuizProgress } from './QuizProgress';
import { QuizResults } from './QuizResults';
import { CategoryFilter } from './CategoryFilter';

interface TheoryQuizProps {
  onBack: () => void;
}

export function TheoryQuiz({ onBack }: TheoryQuizProps) {
  const {
    questions,
    currentIndex,
    selectedAnswer,
    showResult,
    score,
    streak,
    timeSpent,
    quizComplete,
    incorrectQuestions,
    selectedCategory,
    initializeQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    setCategory,
    incrementTime,
  } = useQuizStore();

  const { practiceMode, updateModuleScore } = useGameStore();

  // Initialize quiz on mount
  useEffect(() => {
    initializeQuiz();
  }, [initializeQuiz]);

  // Timer effect
  useEffect(() => {
    if (quizComplete) return;

    const timer = setInterval(() => {
      incrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [quizComplete, incrementTime]);

  // Save score when quiz completes
  useEffect(() => {
    if (quizComplete && !practiceMode) {
      void updateModuleScore('theory', score.correct, score.total, score.points, timeSpent);
    }
  }, [quizComplete, practiceMode, score, timeSpent, updateModuleScore]);

  const handleNextQuestion = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  const handleRetry = useCallback(() => {
    resetQuiz();
  }, [resetQuiz]);

  const currentQuestion = questions[currentIndex];

  // Quiz Complete Screen
  if (quizComplete) {
    return (
      <QuizResults
        score={score}
        timeSpent={timeSpent}
        incorrectQuestions={incorrectQuestions}
        practiceMode={practiceMode}
        onRetry={handleRetry}
        onBack={onBack}
      />
    );
  }

  // Loading state
  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} leftIcon={<ArrowLeft size={20} />}>
          Back
        </Button>
        {practiceMode && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            Practice Mode
          </span>
        )}
      </div>

      {/* Category Filter (only show at start before answering) */}
      {currentIndex === 0 && !showResult && (
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setCategory} />
      )}

      {/* Progress */}
      <QuizProgress
        current={currentIndex}
        total={questions.length}
        correct={score.correct}
        streak={streak}
        timeSpent={timeSpent}
      />

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        onSelectAnswer={selectAnswer}
      />

      {/* Next Button (shown after answering) */}
      {showResult && (
        <div className="mt-4">
          <Button onClick={handleNextQuestion} fullWidth size="lg">
            {currentIndex < questions.length - 1 ? (
              <>
                Next Question
                <ArrowLeft className="rotate-180 ml-2" size={20} />
              </>
            ) : (
              <>
                See Results
                <span className="ml-2">🎯</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default TheoryQuiz;
