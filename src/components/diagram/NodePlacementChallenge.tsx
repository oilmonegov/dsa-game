import { useCallback, useMemo } from 'react';
import type { DiagramChallenge, CytoscapeNode, CytoscapeEdge } from '@/types';
import { useDiagramStore } from '@/store';
import { CytoscapeGraph } from './CytoscapeGraph';
import { Button } from '@/components/common';
import { RotateCcw } from 'lucide-react';

interface NodePlacementChallengeProps {
  challenge: DiagramChallenge;
}

export function NodePlacementChallenge({ challenge }: NodePlacementChallengeProps) {
  const { placedNodes, showResult, isCorrect, placeNode, resetPlacedNodes } = useDiagramStore();

  const handleNodeDrop = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      if (showResult) return;
      placeNode(nodeId, position);
    },
    [showResult, placeNode]
  );

  // Get draggable node IDs
  const draggableNodeIds = useMemo(() => {
    return challenge.draggableNodes?.map((n) => n.data.id) || [];
  }, [challenge.draggableNodes]);

  // Combine initial nodes with draggable nodes
  const displayNodes: CytoscapeNode[] = useMemo(() => {
    const nodes: CytoscapeNode[] = [...challenge.initialNodes];

    // Add draggable nodes with their current positions
    if (challenge.draggableNodes) {
      for (const dragNode of challenge.draggableNodes) {
        const placedPosition = placedNodes[dragNode.data.id];
        let classes = dragNode.classes || '';

        if (showResult) {
          const correctPos = dragNode.data.correctPosition;
          if (correctPos && placedPosition) {
            const distance = Math.sqrt(
              Math.pow(placedPosition.x - correctPos.x, 2) +
                Math.pow(placedPosition.y - correctPos.y, 2)
            );
            classes += distance <= 50 ? ' correct' : ' incorrect';
          }
        }

        nodes.push({
          ...dragNode,
          position: placedPosition || dragNode.position,
          classes,
        });
      }
    }

    return nodes;
  }, [challenge.initialNodes, challenge.draggableNodes, placedNodes, showResult]);

  const displayEdges: CytoscapeEdge[] = useMemo(() => {
    return challenge.initialEdges;
  }, [challenge.initialEdges]);

  const placedCount = Object.keys(placedNodes).length;
  const totalDraggable = draggableNodeIds.length;

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800 text-sm">
        <strong>Tip:</strong> Drag the purple nodes to the correct drop zones (marked with ?).
      </div>

      {/* Graph */}
      <CytoscapeGraph
        nodes={displayNodes}
        edges={displayEdges}
        onNodeDrop={handleNodeDrop}
        draggableNodeIds={draggableNodeIds}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-purple-700"></div>
          <span className="text-gray-600">Draggable nodes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-dashed border-gray-400"></div>
          <span className="text-gray-600">Drop zones</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-700"></div>
          <span className="text-gray-600">Fixed nodes</span>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-sm text-gray-600">
          Nodes placed: {placedCount} / {totalDraggable}
        </span>
        {!showResult && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetPlacedNodes}
            disabled={placedCount === 0}
            leftIcon={<RotateCcw size={14} />}
          >
            Reset Positions
          </Button>
        )}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
          <h4 className="font-medium mb-2">
            {isCorrect ? '✅ All nodes placed correctly!' : '❌ Some nodes are misplaced'}
          </h4>
          {!isCorrect && (
            <p className="text-sm text-orange-700">
              Green nodes are correctly placed. Red nodes need to be moved to the dashed drop zones.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default NodePlacementChallenge;
