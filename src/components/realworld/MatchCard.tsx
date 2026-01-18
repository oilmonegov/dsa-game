import type { DataStructureCard, ApplicationCard } from '@/types/realworld';

interface StructureCardProps {
  structure: DataStructureCard;
  isSelected: boolean;
  isMatched: boolean;
  isCorrect?: boolean;
  showResult: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function StructureCard({
  structure,
  isSelected,
  isMatched,
  isCorrect,
  showResult,
  onClick,
  disabled,
}: StructureCardProps) {
  const getCardStyle = () => {
    if (showResult && isMatched) {
      return isCorrect
        ? 'bg-green-100 border-green-500 ring-2 ring-green-300'
        : 'bg-red-100 border-red-500 ring-2 ring-red-300';
    }
    if (isMatched) {
      return 'bg-purple-100 border-purple-500 opacity-60';
    }
    if (isSelected) {
      return 'bg-orange-100 border-orange-500 ring-2 ring-orange-300';
    }
    return 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md';
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isMatched}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-200
        ${getCardStyle()}
        ${disabled || isMatched ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{structure.icon}</span>
        <div className="text-left">
          <h3 className="font-semibold text-gray-800">{structure.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{structure.description}</p>
        </div>
      </div>
      {isMatched && <div className="mt-2 text-xs font-medium text-purple-600">✓ Matched</div>}
    </button>
  );
}

interface ApplicationCardProps {
  application: ApplicationCard;
  isSelected: boolean;
  isMatched: boolean;
  matchedStructureName?: string;
  isCorrect?: boolean;
  showResult: boolean;
  onClick: () => void;
  onRemoveMatch?: () => void;
  disabled?: boolean;
}

export function ApplicationCardComponent({
  application,
  isSelected,
  isMatched,
  matchedStructureName,
  isCorrect,
  showResult,
  onClick,
  onRemoveMatch,
  disabled,
}: ApplicationCardProps) {
  const getCardStyle = () => {
    if (showResult && isMatched) {
      return isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
    }
    if (isMatched) {
      return 'bg-purple-100 border-purple-500';
    }
    if (isSelected) {
      return 'bg-orange-100 border-orange-500 ring-2 ring-orange-300';
    }
    return 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md';
  };

  return (
    <div
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-200
        ${getCardStyle()}
        ${disabled || isMatched ? '' : 'cursor-pointer'}
      `}
    >
      <button onClick={onClick} disabled={disabled || isMatched} className="w-full text-left">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{application.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-800">{application.title}</h3>
            <p className="text-sm text-gray-600">{application.description}</p>
          </div>
        </div>
      </button>

      {isMatched && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${
                showResult ? (isCorrect ? 'text-green-700' : 'text-red-700') : 'text-purple-700'
              }`}
            >
              {showResult && (isCorrect ? '✓ ' : '✗ ')}
              Matched with: {matchedStructureName}
            </span>
            {!showResult && onRemoveMatch && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveMatch();
                }}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
