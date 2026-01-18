import { useCallback, useMemo, useState } from 'react';
import type { DiagramChallenge, CytoscapeNode, CytoscapeEdge } from '@/types';
import { useDiagramStore } from '@/store';
import { CytoscapeGraph } from './CytoscapeGraph';
import { Button } from '@/components/common';
import { RotateCcw, Link2 } from 'lucide-react';

interface EdgeConnectionChallengeProps {
  challenge: DiagramChallenge;
}

export function EdgeConnectionChallenge({ challenge }: EdgeConnectionChallengeProps) {
  const { connectedEdges, showResult, isCorrect, addEdge, resetEdges } = useDiagramStore();
  const [edgeMode, setEdgeMode] = useState(false);

  const handleEdgeCreate = useCallback(
    (source: string, target: string) => {
      if (showResult) return;
      addEdge(source, target);
    },
    [showResult, addEdge]
  );

  // Display nodes
  const displayNodes: CytoscapeNode[] = useMemo(() => {
    return challenge.initialNodes.map((node) => {
      let classes = node.classes || '';
      if (edgeMode && !showResult) {
        classes += ' selectable';
      }
      return { ...node, classes };
    });
  }, [challenge.initialNodes, edgeMode, showResult]);

  // Combine initial edges with user-created edges
  const displayEdges: CytoscapeEdge[] = useMemo(() => {
    const edges: CytoscapeEdge[] = [...challenge.initialEdges];

    // Add user-created edges
    connectedEdges.forEach((edge, index) => {
      let classes = 'user-created';

      if (showResult && challenge.requiredEdges) {
        const isRequired = challenge.requiredEdges.some(
          (req) =>
            (req.source === edge.source && req.target === edge.target) ||
            (req.source === edge.target && req.target === edge.source)
        );
        classes += isRequired ? ' correct' : ' incorrect';
      }

      edges.push({
        data: {
          id: `user-edge-${index}`,
          source: edge.source,
          target: edge.target,
        },
        classes,
      });
    });

    return edges;
  }, [challenge.initialEdges, challenge.requiredEdges, connectedEdges, showResult]);

  const edgeCount = connectedEdges.length;
  const requiredCount = challenge.requiredEdges?.length || 0;

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
        <strong>Mode:</strong>{' '}
        {edgeMode
          ? 'Click on a source node, then click on a target node to create an edge.'
          : 'Click "Create Edge" to start connecting nodes.'}
      </div>

      {/* Controls */}
      {!showResult && (
        <div className="flex gap-2">
          <Button
            variant={edgeMode ? 'primary' : 'secondary'}
            onClick={() => setEdgeMode(!edgeMode)}
            leftIcon={<Link2 size={16} />}
          >
            {edgeMode ? 'Creating Edges...' : 'Create Edge'}
          </Button>
          <Button
            variant="ghost"
            onClick={resetEdges}
            disabled={edgeCount === 0}
            leftIcon={<RotateCcw size={14} />}
          >
            Reset Edges
          </Button>
        </div>
      )}

      {/* Graph */}
      <CytoscapeGraph
        nodes={displayNodes}
        edges={displayEdges}
        onEdgeCreate={handleEdgeCreate}
        edgeCreationMode={edgeMode && !showResult}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 bg-gray-500"></div>
          <span className="text-gray-600">Existing edges</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 bg-purple-500"></div>
          <span className="text-gray-600">Your edges</span>
        </div>
        {showResult && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-green-500"></div>
              <span className="text-gray-600">Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-red-500"></div>
              <span className="text-gray-600">Incorrect</span>
            </div>
          </>
        )}
      </div>

      {/* Progress */}
      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Edges created: {edgeCount} / {requiredCount} required
          </span>
        </div>

        {/* Show connected edges */}
        {edgeCount > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {connectedEdges.map((edge, index) => {
              let bgClass = 'bg-purple-100 text-purple-800';
              if (showResult && challenge.requiredEdges) {
                const isRequired = challenge.requiredEdges.some(
                  (req) =>
                    (req.source === edge.source && req.target === edge.target) ||
                    (req.source === edge.target && req.target === edge.source)
                );
                bgClass = isRequired ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
              }
              return (
                <span
                  key={index}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${bgClass}`}
                >
                  {edge.source} → {edge.target}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Status */}
      {!showResult && edgeCount === requiredCount && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          All edges created! Click &quot;Check Answer&quot; to verify.
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
          <h4 className="font-medium mb-2">
            {isCorrect ? '✅ All edges correct!' : '❌ Some edges are incorrect'}
          </h4>
          {!isCorrect && challenge.requiredEdges && (
            <div className="text-sm">
              <p className="mb-2">Required edges:</p>
              <div className="flex flex-wrap gap-2">
                {challenge.requiredEdges.map((edge, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm"
                  >
                    {edge.source} → {edge.target}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EdgeConnectionChallenge;
