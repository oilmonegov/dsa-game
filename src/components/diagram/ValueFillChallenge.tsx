import { useCallback, useMemo, useState } from 'react';
import type { DiagramChallenge, CytoscapeNode, CytoscapeEdge } from '@/types';
import { useDiagramStore } from '@/store';
import { CytoscapeGraph } from './CytoscapeGraph';
import { Button } from '@/components/common';
import { RotateCcw } from 'lucide-react';

interface ValueFillChallengeProps {
  challenge: DiagramChallenge;
}

export function ValueFillChallenge({ challenge }: ValueFillChallengeProps) {
  const { filledValues, showResult, fillValue, resetFilledValues } = useDiagramStore();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  // Get nodes that need values filled
  const missingValueNodes = useMemo(() => {
    return challenge.missingValues?.map((m) => m.nodeId) || [];
  }, [challenge.missingValues]);

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (showResult) return;
      if (missingValueNodes.includes(nodeId)) {
        setSelectedNode(nodeId);
        setInputValue(String(filledValues[nodeId] ?? ''));
      }
    },
    [showResult, missingValueNodes, filledValues]
  );

  const handleSubmitValue = () => {
    if (selectedNode && inputValue.trim()) {
      const numValue = Number(inputValue.trim());
      fillValue(selectedNode, isNaN(numValue) ? inputValue.trim() : numValue);
      setSelectedNode(null);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitValue();
    } else if (e.key === 'Escape') {
      setSelectedNode(null);
      setInputValue('');
    }
  };

  // Build nodes with current values
  const displayNodes: CytoscapeNode[] = useMemo(() => {
    return challenge.initialNodes.map((node) => {
      const nodeId = node.data.id;
      const isMissing = missingValueNodes.includes(nodeId);
      const filledValue = filledValues[nodeId];
      let classes = node.classes || '';

      if (isMissing) {
        classes += ' missing-value';

        if (showResult) {
          const correctValue = challenge.missingValues?.find(
            (m) => m.nodeId === nodeId
          )?.correctValue;
          const isNodeCorrect = String(filledValue) === String(correctValue);
          classes += isNodeCorrect ? ' correct' : ' incorrect';

          return {
            ...node,
            data: {
              ...node.data,
              label: isNodeCorrect
                ? String(correctValue)
                : `${filledValue ?? '?'} → ${correctValue}`,
            },
            classes,
          };
        }

        return {
          ...node,
          data: {
            ...node.data,
            label: filledValue !== undefined ? String(filledValue) : '?',
          },
          classes,
        };
      }

      return node;
    });
  }, [
    challenge.initialNodes,
    challenge.missingValues,
    missingValueNodes,
    filledValues,
    showResult,
  ]);

  const displayEdges: CytoscapeEdge[] = useMemo(() => {
    return challenge.initialEdges;
  }, [challenge.initialEdges]);

  const filledCount = Object.keys(filledValues).length;
  const totalMissing = missingValueNodes.length;
  const allFilled = filledCount === totalMissing;

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
        <strong>Tip:</strong> Click on a node with &quot;?&quot; to enter its value. Yellow nodes
        need values.
      </div>

      {/* Graph */}
      <CytoscapeGraph
        nodes={displayNodes}
        edges={displayEdges}
        onNodeClick={handleNodeClick}
        selectedNodes={selectedNode ? [selectedNode] : []}
      />

      {/* Value Input Modal */}
      {selectedNode && !showResult && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <label className="block text-sm font-medium text-blue-800 mb-2">
            Enter value for node {selectedNode}:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter value..."
              autoFocus
            />
            <Button variant="primary" onClick={handleSubmitValue} disabled={!inputValue.trim()}>
              Set
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedNode(null);
                setInputValue('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-sm text-gray-600">
          Values filled: {filledCount} / {totalMissing}
        </span>
        {!showResult && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilledValues}
            disabled={filledCount === 0}
            leftIcon={<RotateCcw size={14} />}
          >
            Reset
          </Button>
        )}
      </div>

      {/* Filled Values Display */}
      {filledCount > 0 && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700 block mb-2">Your values:</span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filledValues).map(([nodeId, value]) => {
              let bgClass = 'bg-blue-100 text-blue-800';
              if (showResult) {
                const correctValue = challenge.missingValues?.find(
                  (m) => m.nodeId === nodeId
                )?.correctValue;
                bgClass =
                  String(value) === String(correctValue)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800';
              }
              return (
                <span
                  key={nodeId}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${bgClass}`}
                >
                  {nodeId} = {String(value)}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Status */}
      {!showResult && allFilled && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          All values filled! Click &quot;Check Answer&quot; to verify.
        </div>
      )}
    </div>
  );
}

export default ValueFillChallenge;
