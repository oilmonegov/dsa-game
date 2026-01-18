import { ChallengeCard } from '@/components/game';
import { TreeVisualization } from './TreeVisualization';
import type { TraversalChallenge as TraversalChallengeType } from '@/types/traversal';
import { TRAVERSAL_ALGORITHMS } from '@/types/traversal';

interface TraversalChallengeProps {
  challenge: TraversalChallengeType;
  selectedNodes: string[];
  showResult: boolean;
  isCorrect: boolean;
  isAnimating: boolean;
  onNodeClick: (nodeId: string) => void;
}

export function TraversalChallenge({
  challenge,
  selectedNodes,
  showResult,
  isCorrect,
  isAnimating,
  onNodeClick,
}: TraversalChallengeProps) {
  const algorithm = TRAVERSAL_ALGORITHMS[challenge.traversalType];

  return (
    <ChallengeCard
      title={challenge.title}
      subtitle={algorithm.name}
      description={challenge.description}
      difficulty={challenge.difficulty}
      gradient="purple"
      instruction={`Click nodes in ${algorithm.visitOrder} order`}
      footer={
        showResult && (
          <ChallengeResultSection
            isCorrect={isCorrect}
            explanation={challenge.explanation}
            correctOrder={challenge.correctOrder}
          />
        )
      }
    >
      {/* Tree Visualization */}
      <TreeVisualization
        nodes={challenge.nodes}
        edges={challenge.edges}
        selectedNodes={selectedNodes}
        onNodeClick={onNodeClick}
        disabled={showResult || isAnimating}
        showOrder={true}
        correctOrder={challenge.correctOrder}
        showResult={showResult}
      />

      {/* Selection Display */}
      <TraversalSelectionDisplay
        selectedNodes={selectedNodes}
        totalNodes={challenge.correctOrder.length}
        correctOrder={challenge.correctOrder}
        showResult={showResult}
      />
    </ChallengeCard>
  );
}

interface TraversalSelectionDisplayProps {
  selectedNodes: string[];
  totalNodes: number;
  correctOrder: string[];
  showResult: boolean;
}

export function TraversalSelectionDisplay({
  selectedNodes,
  totalNodes,
  correctOrder,
  showResult,
}: TraversalSelectionDisplayProps) {
  return (
    <div className="mt-4 p-4 bg-gray-50/80 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Your Traversal:</span>
        <span className="text-sm text-gray-500">
          {selectedNodes.length} / {totalNodes} nodes
        </span>
      </div>

      {selectedNodes.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedNodes.map((nodeId, index) => {
            let bgClass = 'bg-lavender-100 text-lavender-800 border border-lavender-200';
            if (showResult) {
              const isNodeCorrect = correctOrder[index] === nodeId;
              bgClass = isNodeCorrect
                ? 'bg-mint-100 text-mint-800 border border-mint-200'
                : 'bg-red-100 text-red-800 border border-red-200';
            }
            return (
              <span
                key={index}
                className={`
                  inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${bgClass}
                `}
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
  );
}

interface ChallengeResultSectionProps {
  isCorrect: boolean;
  explanation: string;
  correctOrder: string[];
}

function ChallengeResultSection({
  isCorrect,
  explanation,
  correctOrder,
}: ChallengeResultSectionProps) {
  return (
    <div
      className={`
        p-6 border-t
        ${
          isCorrect
            ? 'bg-gradient-to-br from-mint-50 to-success-50'
            : 'bg-gradient-to-br from-amber-50 to-orange-50'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{isCorrect ? '✅' : '💡'}</span>
        <div>
          <h3 className="font-semibold mb-1">{isCorrect ? 'Excellent!' : 'Explanation'}</h3>
          <p className="text-sm opacity-90 mb-3">{explanation}</p>

          {!isCorrect && (
            <div className="bg-white/50 rounded-lg p-3">
              <span className="text-sm font-medium">Correct order: </span>
              <span className="font-mono text-sm">{correctOrder.join(' → ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TraversalChallenge;
