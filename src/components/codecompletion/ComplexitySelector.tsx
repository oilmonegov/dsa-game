import type { ComplexityClass } from '@/types/codecompletion';

interface ComplexitySelectorProps {
  questions: {
    id: string;
    question: string;
    correctAnswer: ComplexityClass;
    options: ComplexityClass[];
  }[];
  answers: Record<string, ComplexityClass>;
  validatedAnswers: Record<string, boolean>;
  showResult: boolean;
  onSelect: (questionId: string, answer: ComplexityClass) => void;
}

export function ComplexitySelector({
  questions,
  answers,
  validatedAnswers,
  showResult,
  onSelect,
}: ComplexitySelectorProps) {
  const getOptionStyle = (questionId: string, option: ComplexityClass) => {
    const isSelected = answers[questionId] === option;
    const isCorrect = validatedAnswers[questionId];
    const question = questions.find((q) => q.id === questionId);
    const isCorrectAnswer = question?.correctAnswer === option;

    if (showResult) {
      if (isCorrectAnswer) {
        return 'bg-green-100 border-green-500 text-green-800';
      }
      if (isSelected && !isCorrect) {
        return 'bg-red-100 border-red-500 text-red-800';
      }
      return 'bg-gray-50 border-gray-200 text-gray-400';
    }

    if (isSelected) {
      return 'bg-pink-100 border-pink-500 text-pink-800';
    }

    return 'bg-white border-gray-200 hover:border-pink-400 hover:bg-pink-50';
  };

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-700 flex items-center gap-2">
        <span className="text-lg">📊</span>
        Complexity Analysis
      </h3>

      {questions.map((question) => (
        <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-700 mb-3">{question.question}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => !showResult && onSelect(question.id, option)}
                disabled={showResult}
                className={`
                  px-3 py-2 rounded-lg border-2 font-mono text-sm font-medium
                  transition-all duration-150
                  ${getOptionStyle(question.id, option)}
                  ${showResult ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                {option}
                {showResult && question.correctAnswer === option && <span className="ml-1">✓</span>}
              </button>
            ))}
          </div>

          {showResult && validatedAnswers[question.id] === false && (
            <p className="mt-2 text-sm text-red-600">
              Correct answer: <span className="font-mono font-bold">{question.correctAnswer}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ComplexitySelector;
