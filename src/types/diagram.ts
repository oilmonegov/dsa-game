// Diagram Challenge Types

export type DiagramChallengeType =
  | 'node-placement' // Drag nodes to correct positions
  | 'value-fill' // Fill in missing node values
  | 'edge-connection' // Connect nodes with correct edges
  | 'traversal-order'; // Label nodes in traversal order

export type TraversalType = 'preorder' | 'inorder' | 'postorder' | 'levelorder';

export interface CytoscapeNode {
  data: {
    id: string;
    label: string;
    value?: string | number;
    isPlaceholder?: boolean;
    isDropZone?: boolean;
    correctPosition?: { x: number; y: number };
    correctValue?: string | number;
    traversalOrder?: number;
  };
  position?: { x: number; y: number };
  classes?: string;
}

export interface CytoscapeEdge {
  data: {
    id: string;
    source: string;
    target: string;
    label?: string;
    isHidden?: boolean;
  };
  classes?: string;
}

export interface DiagramChallenge {
  id: number;
  type: DiagramChallengeType;
  title: string;
  description: string;
  instruction: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  // Initial state of the diagram
  initialNodes: CytoscapeNode[];
  initialEdges: CytoscapeEdge[];
  // For node-placement: nodes that need to be placed
  draggableNodes?: CytoscapeNode[];
  // For value-fill: nodes with missing values
  missingValues?: { nodeId: string; correctValue: string | number }[];
  // For edge-connection: edges that need to be created
  requiredEdges?: { source: string; target: string }[];
  // For traversal-order: correct order of node IDs
  correctTraversalOrder?: string[];
  traversalType?: TraversalType;
  // Explanation shown after completion
  explanation: string;
  // Hint for the challenge
  hint: string;
}

export interface DiagramState {
  challenges: DiagramChallenge[];
  currentIndex: number;
  currentChallenge: DiagramChallenge | null;
  // User's current answers
  placedNodes: Record<string, { x: number; y: number }>;
  filledValues: Record<string, string | number>;
  connectedEdges: { source: string; target: string }[];
  traversalSelection: string[];
  // Progress
  isComplete: boolean;
  isCorrect: boolean;
  showResult: boolean;
  score: {
    correct: number;
    total: number;
    points: number;
  };
  timeSpent: number;
  streak: number;
}

export interface DiagramResultValidation {
  isCorrect: boolean;
  incorrectItems: string[];
  feedback: string;
}
