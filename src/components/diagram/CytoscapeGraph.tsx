import { useEffect, useRef, useCallback } from 'react';
import cytoscape, { Core, NodeSingular, EventObject, StylesheetStyle } from 'cytoscape';
import type { CytoscapeNode, CytoscapeEdge } from '@/types';

interface CytoscapeGraphProps {
  nodes: CytoscapeNode[];
  edges: CytoscapeEdge[];
  onNodeClick?: (nodeId: string) => void;
  onNodeDrop?: (nodeId: string, position: { x: number; y: number }) => void;
  onEdgeCreate?: (source: string, target: string) => void;
  selectedNodes?: string[];
  highlightedPath?: string[];
  edgeCreationMode?: boolean;
  draggableNodeIds?: string[];
  className?: string;
}

const defaultStyle: StylesheetStyle[] = [
  {
    selector: 'node',
    style: {
      'background-color': '#3b82f6',
      label: 'data(label)',
      color: '#fff',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '14px',
      'font-weight': 'bold',
      width: 50,
      height: 50,
      'border-width': 3,
      'border-color': '#2563eb',
      'text-wrap': 'wrap',
      'text-max-width': '80px',
    },
  },
  {
    selector: 'node.drop-zone',
    style: {
      'background-color': '#e5e7eb',
      'border-color': '#9ca3af',
      'border-style': 'dashed',
      color: '#6b7280',
    },
  },
  {
    selector: 'node.draggable',
    style: {
      'background-color': '#8b5cf6',
      'border-color': '#7c3aed',
    },
  },
  {
    selector: 'node.selected',
    style: {
      'background-color': '#f59e0b',
      'border-color': '#d97706',
      'border-width': 4,
    },
  },
  {
    selector: 'node.correct',
    style: {
      'background-color': '#10b981',
      'border-color': '#059669',
    },
  },
  {
    selector: 'node.incorrect',
    style: {
      'background-color': '#ef4444',
      'border-color': '#dc2626',
    },
  },
  {
    selector: 'node.highlighted',
    style: {
      'background-color': '#f59e0b',
      'border-color': '#d97706',
    },
  },
  {
    selector: 'node.visited',
    style: {
      'background-color': '#10b981',
      'border-color': '#059669',
    },
  },
  {
    selector: 'node.missing-value',
    style: {
      'background-color': '#fbbf24',
      'border-color': '#f59e0b',
      'border-style': 'dashed',
    },
  },
  {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': '#6b7280',
      'target-arrow-color': '#6b7280',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'arrow-scale': 1.2,
    },
  },
  {
    selector: 'edge.dashed',
    style: {
      'line-style': 'dashed',
      'line-color': '#9ca3af',
      'target-arrow-color': '#9ca3af',
    },
  },
  {
    selector: 'edge.highlighted',
    style: {
      'line-color': '#f59e0b',
      'target-arrow-color': '#f59e0b',
      width: 4,
    },
  },
  {
    selector: 'edge.correct',
    style: {
      'line-color': '#10b981',
      'target-arrow-color': '#10b981',
    },
  },
  {
    selector: 'edge.user-created',
    style: {
      'line-color': '#8b5cf6',
      'target-arrow-color': '#8b5cf6',
    },
  },
];

export function CytoscapeGraph({
  nodes,
  edges,
  onNodeClick,
  onNodeDrop,
  onEdgeCreate,
  selectedNodes = [],
  highlightedPath = [],
  edgeCreationMode = false,
  draggableNodeIds = [],
  className = '',
}: CytoscapeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const edgeSourceRef = useRef<string | null>(null);

  // Initialize Cytoscape
  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...nodes.map((n) => ({ group: 'nodes' as const, ...n })),
        ...edges.map((e) => ({ group: 'edges' as const, ...e })),
      ],
      style: defaultStyle,
      layout: { name: 'preset' },
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false,
      autoungrabify: false,
    });

    cyRef.current = cy;

    // Set up node dragging for draggable nodes
    cy.nodes().forEach((node: NodeSingular) => {
      const nodeId = node.id();
      if (draggableNodeIds.includes(nodeId)) {
        node.grabify();
      } else {
        node.ungrabify();
      }
    });

    return () => {
      cy.destroy();
    };
  }, [nodes, edges, draggableNodeIds]);

  // Handle node click
  const handleNodeClick = useCallback(
    (event: EventObject) => {
      const node = event.target as NodeSingular;
      const nodeId = node.id();

      if (edgeCreationMode && onEdgeCreate) {
        if (edgeSourceRef.current === null) {
          // First click - set source
          edgeSourceRef.current = nodeId;
          node.addClass('selected');
        } else {
          // Second click - create edge
          if (edgeSourceRef.current !== nodeId) {
            onEdgeCreate(edgeSourceRef.current, nodeId);
          }
          // Reset
          cyRef.current?.nodes().removeClass('selected');
          edgeSourceRef.current = null;
        }
      } else if (onNodeClick) {
        onNodeClick(nodeId);
      }
    },
    [edgeCreationMode, onEdgeCreate, onNodeClick]
  );

  // Handle node drag end
  const handleNodeDragEnd = useCallback(
    (event: EventObject) => {
      const node = event.target as NodeSingular;
      const nodeId = node.id();
      const position = node.position();

      if (onNodeDrop && draggableNodeIds.includes(nodeId)) {
        onNodeDrop(nodeId, { x: position.x, y: position.y });
      }
    },
    [onNodeDrop, draggableNodeIds]
  );

  // Set up event listeners
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.on('tap', 'node', handleNodeClick);
    cy.on('dragfree', 'node', handleNodeDragEnd);

    return () => {
      cy.off('tap', 'node', handleNodeClick);
      cy.off('dragfree', 'node', handleNodeDragEnd);
    };
  }, [handleNodeClick, handleNodeDragEnd]);

  // Update selected nodes styling
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.nodes().removeClass('selected');
    selectedNodes.forEach((nodeId) => {
      cy.getElementById(nodeId).addClass('selected');
    });
  }, [selectedNodes]);

  // Update highlighted path styling
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.nodes().removeClass('visited');
    cy.edges().removeClass('highlighted');

    highlightedPath.forEach((nodeId, index) => {
      cy.getElementById(nodeId).addClass('visited');

      // Highlight edge to next node
      if (index < highlightedPath.length - 1) {
        const nextNodeId = highlightedPath[index + 1];
        cy.edges().forEach((edge) => {
          if (
            (edge.source().id() === nodeId && edge.target().id() === nextNodeId) ||
            (edge.source().id() === nextNodeId && edge.target().id() === nodeId)
          ) {
            edge.addClass('highlighted');
          }
        });
      }
    });
  }, [highlightedPath]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-[400px] bg-gray-50 border-2 border-gray-200 rounded-xl ${className}`}
    />
  );
}

export default CytoscapeGraph;
