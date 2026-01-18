import { Undo2, RotateCcw, Play, Square, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common';

interface TraversalControlsProps {
  selectedCount: number;
  isAnimating: boolean;
  onUndo: () => void;
  onReset: () => void;
  onStartAnimation: () => void;
  onStopAnimation: () => void;
}

export function TraversalControls({
  selectedCount,
  isAnimating,
  onUndo,
  onReset,
  onStartAnimation,
  onStopAnimation,
}: TraversalControlsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onUndo}
        disabled={selectedCount === 0 || isAnimating}
        leftIcon={<Undo2 size={16} />}
      >
        Undo
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        disabled={selectedCount === 0 || isAnimating}
        leftIcon={<RotateCcw size={16} />}
      >
        Reset
      </Button>
      <div className="flex-1" />
      {!isAnimating ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={onStartAnimation}
          leftIcon={<Play size={16} />}
        >
          Show Solution
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={onStopAnimation}
          leftIcon={<Square size={16} />}
        >
          Stop
        </Button>
      )}
    </div>
  );
}

interface GameActionsProps {
  showResult: boolean;
  allNodesSelected: boolean;
  remainingCount: number;
  isLastChallenge: boolean;
  onReset: () => void;
  onSubmit: () => void;
  onNext: () => void;
}

export function GameActions({
  showResult,
  allNodesSelected,
  remainingCount,
  isLastChallenge,
  onReset,
  onSubmit,
  onNext,
}: GameActionsProps) {
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
        disabled={!allNodesSelected}
        bounce
      >
        {allNodesSelected
          ? 'Check Answer'
          : `Select ${remainingCount} more`}
      </Button>
    </div>
  );
}

export default TraversalControls;
