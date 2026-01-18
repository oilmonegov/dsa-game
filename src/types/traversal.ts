// Traversal Game Types

export type TraversalType = 'preorder' | 'inorder' | 'postorder' | 'levelorder';

export interface TreeNode {
  id: string;
  label: string;
  value?: number;
  x: number;
  y: number;
}

export interface TreeEdge {
  id: string;
  source: string;
  target: string;
  type: 'left' | 'right';
}

export interface TraversalChallenge {
  id: number;
  title: string;
  description: string;
  traversalType: TraversalType;
  difficulty: 'easy' | 'medium' | 'hard';
  // Tree structure
  nodes: TreeNode[];
  edges: TreeEdge[];
  // Correct traversal order (node IDs)
  correctOrder: string[];
  // Explanation of the traversal
  explanation: string;
  hint: string;
  // Time limit in seconds (optional)
  timeLimit?: number;
}

export interface TraversalState {
  challenges: TraversalChallenge[];
  currentIndex: number;
  currentChallenge: TraversalChallenge | null;
  // User's selected traversal order
  selectedNodes: string[];
  // Animation state
  isAnimating: boolean;
  animationStep: number;
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
  // Game mode
  showAlgorithm: boolean;
}

export interface TraversalAlgorithm {
  type: TraversalType;
  name: string;
  description: string;
  pseudocode: string[];
  visitOrder: string;
}

export const TRAVERSAL_ALGORITHMS: Record<TraversalType, TraversalAlgorithm> = {
  preorder: {
    type: 'preorder',
    name: 'Pre-order Traversal',
    description: 'Visit the root first, then left subtree, then right subtree.',
    pseudocode: [
      'function preorder(node):',
      '  if node is null: return',
      '  visit(node)        // Process current node',
      '  preorder(node.left)  // Traverse left subtree',
      '  preorder(node.right) // Traverse right subtree',
    ],
    visitOrder: 'Root → Left → Right',
  },
  inorder: {
    type: 'inorder',
    name: 'In-order Traversal',
    description: 'Visit the left subtree first, then root, then right subtree.',
    pseudocode: [
      'function inorder(node):',
      '  if node is null: return',
      '  inorder(node.left)   // Traverse left subtree',
      '  visit(node)          // Process current node',
      '  inorder(node.right)  // Traverse right subtree',
    ],
    visitOrder: 'Left → Root → Right',
  },
  postorder: {
    type: 'postorder',
    name: 'Post-order Traversal',
    description: 'Visit the left subtree first, then right subtree, then root.',
    pseudocode: [
      'function postorder(node):',
      '  if node is null: return',
      '  postorder(node.left)  // Traverse left subtree',
      '  postorder(node.right) // Traverse right subtree',
      '  visit(node)           // Process current node',
    ],
    visitOrder: 'Left → Right → Root',
  },
  levelorder: {
    type: 'levelorder',
    name: 'Level-order Traversal',
    description: 'Visit nodes level by level, from left to right.',
    pseudocode: [
      'function levelorder(root):',
      '  queue = [root]',
      '  while queue is not empty:',
      '    node = queue.dequeue()',
      '    visit(node)',
      '    if node.left: queue.enqueue(node.left)',
      '    if node.right: queue.enqueue(node.right)',
    ],
    visitOrder: 'Level by level, left to right',
  },
};
