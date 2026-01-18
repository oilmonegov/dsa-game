import { useCallback, useMemo } from 'react';
import type { DiagramChallenge, CytoscapeNode, CytoscapeEdge } from '@/types';
import { useDiagramStore } from '@/store';
import { CytoscapeGraph } from './CytoscapeGraph';
import { Button, Badge } from '@/components/common';
import { Undo2, RotateCcw } from 'lucide-react';

interface TraversalChallengeProps {
  challenge: DiagramChallenge;
}

export function TraversalChallenge({ challenge }: TraversalChallengeProps) {
  const {
    traversalSelection,
    showResult,
    isCorrect,
    selectTraversalNode,
    undoTraversalSelection,
    resetTraversalSelection,
  } = useDiagramStore();

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (showResult) return;
      selectTraversalNode(nodeId);
    },
    [showResult, selectTraversalNode]
  );

  // Build nodes with current selection state
  const displayNodes: CytoscapeNode[] = useMemo(() => {
    return challenge.initialNodes.map((node) => {
      const selectionIndex = traversalSelection.indexOf(node.data.id);
      let classes = node.classes || '';

      if (selectionIndex !== -1) {
        classes += ' visited';
        // Update label to show selection order
        return {
          ...node,
          data: {
            ...node.data,
            label: `${node.data.label}\n(${selectionIndex + 1})`,
          },
          classes,
        };
      }

      if (showResult && challenge.correctTraversalOrder) {
        const correctIndex = challenge.correctTraversalOrder.indexOf(node.data.id);
        if (correctIndex !== -1) {
          return {
            ...node,
            data: {
              ...node.data,
              label: `${node.data.label}\n[${correctIndex + 1}]`,
            },
            classes: classes + (isCorrect ? ' correct' : ''),
          };
        }
      }

      return node;
    });
  }, [
    challenge.initialNodes,
    challenge.correctTraversalOrder,
    traversalSelection,
    showResult,
    isCorrect,
  ]);

  const displayEdges: CytoscapeEdge[] = useMemo(() => {
    return challenge.initialEdges;
  }, [challenge.initialEdges]);

  const getTraversalDescription = () => {
    switch (challenge.traversalType) {
      case 'preorder':
        return 'Root → Left → Right';
      case 'inorder':
        return 'Left → Root → Right';
      case 'postorder':
        return 'Left → Right → Root';
      case 'levelorder':
        return 'Level by Level (BFS)';
      default:
        return '';
    }
  };

  const expectedLength = challenge.correctTraversalOrder?.length || 0;
  const isComplete = traversalSelection.length === expectedLength;

  return (
    <div className="space-y-4">
      {/* Traversal Type Info */}
      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
        <Badge variant="info" size="md">
          {challenge.traversalType?.toUpperCase()}
        </Badge>
        <span className="text-purple-800 font-medium">{getTraversalDescription()}</span>
      </div>

      {/* Graph */}
      <CytoscapeGraph
        nodes={displayNodes}
        edges={displayEdges}
        onNodeClick={handleNodeClick}
        highlightedPath={traversalSelection}
      />

      {/* Selection Display */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Your Selection:</span>
          <span className="text-sm text-gray-500">
            {traversalSelection.length} / {expectedLength} nodes
          </span>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {traversalSelection.length === 0 ? (
            <span className="text-gray-400 text-sm">Click nodes in the correct order...</span>
          ) : (
            traversalSelection.map((nodeId, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                <span className="text-purple-500 text-xs">{index + 1}.</span>
                {nodeId}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Controls */}
      {!showResult && (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={undoTraversalSelection}
            disabled={traversalSelection.length === 0}
            leftIcon={<Undo2 size={16} />}
          >
            Undo
          </Button>
          <Button
            variant="ghost"
            onClick={resetTraversalSelection}
            disabled={traversalSelection.length === 0}
            leftIcon={<RotateCcw size={16} />}
          >
            Reset
          </Button>
        </div>
      )}

      {/* Status */}
      {!showResult && isComplete && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          All nodes selected! Click &quot;Check Answer&quot; to verify.
        </div>
      )}

      {/* Correct Answer (shown after submit) */}
      {showResult && challenge.correctTraversalOrder && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
          <h4 className="font-medium mb-2">{isCorrect ? '✅ Correct!' : '❌ Correct order:'}</h4>
          <div className="flex flex-wrap gap-2">
            {challenge.correctTraversalOrder.map((nodeId, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm"
              >
                <span className="text-gray-400 text-xs">{index + 1}.</span>
                {nodeId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TraversalChallenge;
