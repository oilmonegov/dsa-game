import { useMemo, useState } from 'react';
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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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

  // Get node colors based on state
  const getNodeColors = (nodeId: string) => {
    const state = nodeStates[nodeId];
    const isHovered = hoveredNode === nodeId;

    // Result colors
    if (showResult && state) {
      if (state.isCorrect === true) {
        return { fill: '#10b981', stroke: '#059669', glow: 'rgba(16, 185, 129, 0.4)' };
      }
      if (state.isCorrect === false) {
        return { fill: '#ef4444', stroke: '#dc2626', glow: 'rgba(239, 68, 68, 0.4)' };
      }
    }

    // Selected colors
    if (state?.selected) {
      return { fill: '#8b5cf6', stroke: '#7c3aed', glow: 'rgba(139, 92, 246, 0.5)' };
    }

    // Hover/default colors
    if (isHovered && !disabled) {
      return { fill: '#60a5fa', stroke: '#3b82f6', glow: 'rgba(96, 165, 250, 0.4)' };
    }

    return { fill: '#3b82f6', stroke: '#2563eb', glow: 'transparent' };
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
    <div className="relative w-full bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-inner">
      <svg viewBox={viewBox} className="w-full h-[350px]" preserveAspectRatio="xMidYMid meet">
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Glow filter for selected nodes */}
          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for edges */}
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
        </defs>

        {/* Edges */}
        {edges.map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const sourceState = nodeStates[edge.source];
          const targetState = nodeStates[edge.target];
          const isActive = sourceState?.selected || targetState?.selected;

          return (
            <g key={edge.id}>
              {/* Edge line */}
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={isActive ? '#8b5cf6' : '#9ca3af'}
                strokeWidth={isActive ? 4 : 3}
                strokeLinecap="round"
                className="transition-all duration-300"
                opacity={isActive ? 1 : 0.7}
              />
              {/* Edge type indicator */}
              <text
                x={(sourceNode.x + targetNode.x) / 2 + (edge.type === 'left' ? -14 : 14)}
                y={(sourceNode.y + targetNode.y) / 2}
                className="text-xs font-semibold pointer-events-none select-none"
                textAnchor="middle"
                fill={isActive ? '#7c3aed' : '#9ca3af'}
              >
                {edge.type === 'left' ? 'L' : 'R'}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const state = nodeStates[node.id];
          const isClickable = !disabled && !showResult;
          const colors = getNodeColors(node.id);
          const isAnimated = state?.selected && !showResult;

          return (
            <g
              key={node.id}
              onClick={() => isClickable && onNodeClick(node.id)}
              onMouseEnter={() => isClickable && setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`${isClickable ? 'cursor-pointer' : ''} transition-transform duration-150`}
              style={{
                transform: hoveredNode === node.id && isClickable ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${node.x}px ${node.y}px`,
              }}
            >
              {/* Glow effect */}
              {(state?.selected || showResult) && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="30"
                  fill={colors.glow}
                  className={isAnimated ? 'animate-pulse-soft' : ''}
                />
              )}

              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r="26"
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={3}
                className="transition-all duration-200"
              />

              {/* Inner highlight */}
              <circle cx={node.x} cy={node.y - 6} r="16" fill="white" opacity={0.15} />

              {/* Node label */}
              <text
                x={node.x}
                y={node.y}
                dy="0.35em"
                textAnchor="middle"
                className="text-white font-bold text-base pointer-events-none select-none"
                style={{ fill: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
              >
                {node.label}
              </text>

              {/* Selection order badge */}
              {showOrder && state?.selected && (
                <g className="animate-scale-in">
                  <circle
                    cx={node.x + 20}
                    cy={node.y - 20}
                    r="14"
                    fill={showResult ? (state.isCorrect ? '#10b981' : '#ef4444') : '#f59e0b'}
                    stroke="white"
                    strokeWidth="2"
                    className="drop-shadow-md"
                  />
                  <text
                    x={node.x + 20}
                    y={node.y - 20}
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
