import { useMemo } from 'react';
import type { TreeNode, TreeEdge } from '@/types/traversal';

interface TreeVisualizationProps {
  nodes: TreeNode[];
  edges: TreeEdge[];
  selectedNodes: string[];
  onNodeClick: (nodeId: string) => void;
  disabled?: boolean;
  showOrder?: boolean;
  correctOrder?: string[];
  showResult?: boolean;
}

export function TreeVisualization({
  nodes,
  edges,
  selectedNodes,
  onNodeClick,
  disabled = false,
  showOrder = true,
  correctOrder = [],
  showResult = false,
}: TreeVisualizationProps) {
  // Calculate node states
  const nodeStates = useMemo(() => {
    const states: Record<string, { selected: boolean; order: number; isCorrect?: boolean }> = {};

    nodes.forEach((node) => {
      const selectedIndex = selectedNodes.indexOf(node.id);
      const isSelected = selectedIndex !== -1;

      let isCorrect: boolean | undefined;
      if (showResult && isSelected) {
        const correctIndex = correctOrder.indexOf(node.id);
        isCorrect = correctIndex === selectedIndex;
      }

      states[node.id] = {
        selected: isSelected,
        order: isSelected ? selectedIndex + 1 : 0,
        isCorrect,
      };
    });

    return states;
  }, [nodes, selectedNodes, correctOrder, showResult]);

  // Get node color based on state
  const getNodeColor = (nodeId: string) => {
    const state = nodeStates[nodeId];
    if (!state) return 'bg-blue-500 border-blue-600';

    if (showResult) {
      if (state.isCorrect === true) return 'bg-green-500 border-green-600';
      if (state.isCorrect === false) return 'bg-red-500 border-red-600';
    }

    if (state.selected) return 'bg-purple-500 border-purple-600';
    return 'bg-blue-500 border-blue-600 hover:bg-blue-400';
  };

  // Calculate SVG viewBox based on node positions
  const viewBox = useMemo(() => {
    if (nodes.length === 0) return '0 0 600 400';

    const padding = 60;
    const minX = Math.min(...nodes.map((n) => n.x)) - padding;
    const maxX = Math.max(...nodes.map((n) => n.x)) + padding;
    const minY = Math.min(...nodes.map((n) => n.y)) - padding;
    const maxY = Math.max(...nodes.map((n) => n.y)) + padding;

    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  }, [nodes]);

  return (
    <div className="relative w-full bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden">
      <svg viewBox={viewBox} className="w-full h-[350px]" preserveAspectRatio="xMidYMid meet">
        {/* Edges */}
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          return (
            <g key={edge.id}>
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="#9ca3af"
                strokeWidth="3"
                className="transition-all duration-200"
              />
              {/* Edge type indicator */}
              <text
                x={(sourceNode.x + targetNode.x) / 2 + (edge.type === 'left' ? -12 : 12)}
                y={(sourceNode.y + targetNode.y) / 2}
                className="text-xs fill-gray-400 font-medium"
                textAnchor="middle"
              >
                {edge.type === 'left' ? 'L' : 'R'}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const state = nodeStates[node.id];
          const isSelectable = !disabled && !state?.selected;

          return (
            <g
              key={node.id}
              onClick={() => isSelectable && onNodeClick(node.id)}
              className={`transition-all duration-200 ${isSelectable ? 'cursor-pointer' : ''}`}
            >
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r="24"
                className={`${getNodeColor(node.id)} transition-all duration-200 ${
                  isSelectable ? 'hover:scale-110' : ''
                }`}
                style={{
                  fill:
                    showResult && state?.isCorrect === true
                      ? '#10b981'
                      : showResult && state?.isCorrect === false
                        ? '#ef4444'
                        : state?.selected
                          ? '#8b5cf6'
                          : '#3b82f6',
                  stroke:
                    showResult && state?.isCorrect === true
                      ? '#059669'
                      : showResult && state?.isCorrect === false
                        ? '#dc2626'
                        : state?.selected
                          ? '#7c3aed'
                          : '#2563eb',
                  strokeWidth: 3,
                  transform: isSelectable ? undefined : undefined,
                }}
              />

              {/* Node label */}
              <text
                x={node.x}
                y={node.y}
                dy="0.35em"
                textAnchor="middle"
                className="text-white font-bold text-sm pointer-events-none select-none"
                style={{ fill: 'white' }}
              >
                {node.label}
              </text>

              {/* Selection order badge */}
              {showOrder && state?.selected && (
                <g>
                  <circle
                    cx={node.x + 18}
                    cy={node.y - 18}
                    r="12"
                    fill={showResult ? (state.isCorrect ? '#10b981' : '#ef4444') : '#f59e0b'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={node.x + 18}
                    y={node.y - 18}
                    dy="0.35em"
                    textAnchor="middle"
                    className="text-white font-bold text-xs pointer-events-none"
                    style={{ fill: 'white' }}
                  >
                    {state.order}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default TreeVisualization;
