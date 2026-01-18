import type { Question } from '@/types';
import { Badge } from '@/components/common';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
  onSelectAnswer: (index: number) => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  showResult,
  onSelectAnswer,
}: QuestionCardProps) {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="success">{difficulty}</Badge>;
      case 'medium':
        return <Badge variant="warning">{difficulty}</Badge>;
      case 'hard':
        return <Badge variant="error">{difficulty}</Badge>;
      default:
        return <Badge>{difficulty}</Badge>;
    }
  };

  const getOptionStyles = (index: number) => {
    const baseStyles =
      'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center gap-3';

    if (showResult) {
      if (index === question.correctAnswer) {
        return `${baseStyles} border-green-500 bg-green-50 text-green-800`;
      }
      if (index === selectedAnswer && index !== question.correctAnswer) {
        return `${baseStyles} border-red-500 bg-red-50 text-red-800 animate-shake`;
      }
      return `${baseStyles} border-gray-200 bg-gray-50 text-gray-500`;
    }

    if (selectedAnswer === index) {
      return `${baseStyles} border-blue-500 bg-blue-50 text-blue-800`;
    }

    return `${baseStyles} border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer`;
  };

  const getOptionBadgeStyles = (index: number) => {
    const baseStyles =
      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0';

    if (showResult) {
      if (index === question.correctAnswer) {
        return `${baseStyles} bg-green-500 text-white`;
      }
      if (index === selectedAnswer && index !== question.correctAnswer) {
        return `${baseStyles} bg-red-500 text-white`;
      }
      return `${baseStyles} bg-gray-200 text-gray-600`;
    }

    if (selectedAnswer === index) {
      return `${baseStyles} bg-blue-500 text-white`;
    }

    return `${baseStyles} bg-gray-200 text-gray-600`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in">
      {/* Header with category and difficulty */}
      <div className="px-6 py-3 bg-gray-50 border-b flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">{question.category}</span>
        {getDifficultyBadge(question.difficulty)}
      </div>

      {/* Question */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && onSelectAnswer(index)}
              disabled={showResult}
              className={getOptionStyles(index)}
            >
              <span className={getOptionBadgeStyles(index)}>{String.fromCharCode(65 + index)}</span>
              <span className="flex-1">{option}</span>
              {showResult && index === question.correctAnswer && (
                <span className="text-green-500 text-lg">✓</span>
              )}
              {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                <span className="text-red-500 text-lg">✗</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Explanation (shown after answer) */}
      {showResult && (
        <div
          className={`p-6 border-t ${
            selectedAnswer === question.correctAnswer ? 'bg-green-50' : 'bg-orange-50'
          }`}
        >
          <div
            className={`flex items-start gap-3 mb-4 ${
              selectedAnswer === question.correctAnswer ? 'text-green-800' : 'text-orange-800'
            }`}
          >
            <span className="text-2xl">
              {selectedAnswer === question.correctAnswer ? '✅' : '💡'}
            </span>
            <div>
              <h3 className="font-semibold mb-1">
                {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not quite right'}
              </h3>
              <p className="text-sm opacity-90">{question.explanation}</p>
            </div>
          </div>

          {/* Real-world application */}
          <div className="mt-4 p-4 bg-white bg-opacity-60 rounded-xl">
            <h4 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
              <span>🌍</span> Real-World Application
            </h4>
            <p className="text-sm text-gray-600">{question.realWorld}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
