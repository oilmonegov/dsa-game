import { RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common';
import { ChallengeCard } from '@/components/game';
import { CodeEditor } from './CodeEditor';
import { ComplexitySelector } from './ComplexitySelector';
import type { CodeCompletionChallenge, ComplexityClass } from '@/types/codecompletion';

interface CodeChallengeContentProps {
  challenge: CodeCompletionChallenge;
  blankAnswers: Record<string, string>;
  complexityAnswers: Record<string, ComplexityClass>;
  validatedBlanks: Record<string, boolean>;
  validatedComplexity: Record<string, boolean>;
  activeBlank: string | null;
  showResult: boolean;
  allCorrect: boolean;
  onBlankClick: (blankId: string | null) => void;
  onBlankChange: (blankId: string, value: string) => void;
  onComplexitySelect: (questionId: string, value: ComplexityClass) => void;
}

export function CodeChallengeContent({
  challenge,
  blankAnswers,
  complexityAnswers,
  validatedBlanks,
  validatedComplexity,
  activeBlank,
  showResult,
  allCorrect,
  onBlankClick,
  onBlankChange,
  onComplexitySelect,
}: CodeChallengeContentProps) {
  const hasComplexityQuestions =
    challenge.complexityQuestions && challenge.complexityQuestions.length > 0;

  return (
    <ChallengeCard
      title={challenge.title}
      subtitle={challenge.category}
      description={challenge.description}
      difficulty={challenge.difficulty}
      badges={[{ label: challenge.type, variant: 'default' }]}
      gradient="pink"
      instruction="Fill in the blanks to complete the algorithm"
      footer={
        showResult && (
          <CodeResultSection
            isCorrect={allCorrect}
            explanation={challenge.explanation}
          />
        )
      }
    >
      {/* Code Editor */}
      <CodeEditor
        challenge={challenge}
        blankAnswers={blankAnswers}
        validatedBlanks={validatedBlanks}
        activeBlank={activeBlank}
        showResult={showResult}
        onBlankClick={onBlankClick}
        onBlankChange={onBlankChange}
      />

      {/* Complexity Questions */}
      {hasComplexityQuestions && (
        <div className="mt-6">
          <ComplexitySelector
            questions={challenge.complexityQuestions!}
            answers={complexityAnswers}
            validatedAnswers={validatedComplexity}
            showResult={showResult}
            onSelect={onComplexitySelect}
          />
        </div>
      )}
    </ChallengeCard>
  );
}

interface CodeProgressPanelProps {
  answeredCount: number;
  totalCount: number;
  showResult: boolean;
  onReset: () => void;
}

export function CodeProgressPanel({
  answeredCount,
  totalCount,
  showResult,
  onReset,
}: CodeProgressPanelProps) {
  return (
    <div className="mt-4 p-3 bg-gray-50/80 rounded-xl flex items-center justify-between">
      <span className="text-sm text-gray-600">
        Answered:{' '}
        <span className="font-semibold">
          {answeredCount} / {totalCount}
        </span>
      </span>
      {!showResult && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={answeredCount === 0}
          leftIcon={<RotateCcw size={14} />}
        >
          Reset All
        </Button>
      )}
    </div>
  );
}

interface CodeActionsProps {
  showResult: boolean;
  allAnswered: boolean;
  remainingCount: number;
  isLastChallenge: boolean;
  onReset: () => void;
  onSubmit: () => void;
  onNext: () => void;
}

export function CodeActions({
  showResult,
  allAnswered,
  remainingCount,
  isLastChallenge,
  onReset,
  onSubmit,
  onNext,
}: CodeActionsProps) {
  if (showResult) {
    return (
      <div className="flex gap-3 mb-4">
        <Button
          variant="gradient"
          onClick={onNext}
          fullWidth
          rightIcon={<ArrowRight size={18} />}
          bounce
        >
          {isLastChallenge ? 'See Results' : 'Next Challenge'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-4">
      <Button variant="secondary" onClick={onReset}>
        Reset
      </Button>
      <Button
        variant="primary"
        onClick={onSubmit}
        fullWidth
        disabled={!allAnswered}
        bounce
      >
        {allAnswered
          ? 'Check Answers'
          : `Answer ${remainingCount} more`}
      </Button>
    </div>
  );
}

interface CodeResultSectionProps {
  isCorrect: boolean;
  explanation: string;
}

function CodeResultSection({ isCorrect, explanation }: CodeResultSectionProps) {
  return (
    <div
      className={`
        p-6 border-t
        ${isCorrect
          ? 'bg-gradient-to-br from-mint-50 to-success-50'
          : 'bg-gradient-to-br from-candy-50 to-rose-50'}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{isCorrect ? '✅' : '💡'}</span>
        <div>
          <h3 className="font-semibold mb-1">
            {isCorrect ? 'Perfect!' : 'Explanation'}
          </h3>
          <p className="text-sm opacity-90">{explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default CodeChallengeContent;
