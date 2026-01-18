import type { TraversalChallenge } from '@/types/traversal';

// Helper to create tree structure
const createBinaryTree = (
  values: (string | null)[],
  startX: number = 300,
  startY: number = 50,
  hSpacing: number = 150,
  vSpacing: number = 80
) => {
  const nodes: { id: string; label: string; x: number; y: number }[] = [];
  const edges: { id: string; source: string; target: string; type: 'left' | 'right' }[] = [];

  const queue: { index: number; x: number; y: number; level: number }[] = [
    { index: 0, x: startX, y: startY, level: 0 },
  ];

  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) continue;
    const { index, x, y, level } = item;

    const nodeValue = values[index];
    if (index >= values.length || nodeValue === null) continue;

    const nodeId = nodeValue;
    nodes.push({ id: nodeId, label: nodeId, x, y });

    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const childSpacing = hSpacing / Math.pow(2, level);

    const leftValue = values[leftIndex];
    if (leftIndex < values.length && leftValue !== null) {
      edges.push({ id: `${nodeId}-${leftValue}`, source: nodeId, target: leftValue, type: 'left' });
      queue.push({ index: leftIndex, x: x - childSpacing, y: y + vSpacing, level: level + 1 });
    }

    const rightValue = values[rightIndex];
    if (rightIndex < values.length && rightValue !== null) {
      edges.push({
        id: `${nodeId}-${rightValue}`,
        source: nodeId,
        target: rightValue,
        type: 'right',
      });
      queue.push({ index: rightIndex, x: x + childSpacing, y: y + vSpacing, level: level + 1 });
    }
  }

  return { nodes, edges };
};

// Simple 3-node tree: A -> B, C
const simpleTree = createBinaryTree(['A', 'B', 'C']);

// 7-node complete binary tree
const completeTree = createBinaryTree(['A', 'B', 'C', 'D', 'E', 'F', 'G']);

// Skewed left tree
const leftSkewedTree = {
  nodes: [
    { id: 'A', label: 'A', x: 300, y: 50 },
    { id: 'B', label: 'B', x: 225, y: 130 },
    { id: 'C', label: 'C', x: 150, y: 210 },
    { id: 'D', label: 'D', x: 75, y: 290 },
  ],
  edges: [
    { id: 'A-B', source: 'A', target: 'B', type: 'left' as const },
    { id: 'B-C', source: 'B', target: 'C', type: 'left' as const },
    { id: 'C-D', source: 'C', target: 'D', type: 'left' as const },
  ],
};

// Skewed right tree
const rightSkewedTree = {
  nodes: [
    { id: 'A', label: 'A', x: 300, y: 50 },
    { id: 'B', label: 'B', x: 375, y: 130 },
    { id: 'C', label: 'C', x: 450, y: 210 },
    { id: 'D', label: 'D', x: 525, y: 290 },
  ],
  edges: [
    { id: 'A-B', source: 'A', target: 'B', type: 'right' as const },
    { id: 'B-C', source: 'B', target: 'C', type: 'right' as const },
    { id: 'C-D', source: 'C', target: 'D', type: 'right' as const },
  ],
};

// BST with numbers
const bstTree = createBinaryTree(['50', '30', '70', '20', '40', '60', '80']);

// Unbalanced tree
const unbalancedTree = {
  nodes: [
    { id: 'A', label: 'A', x: 300, y: 50 },
    { id: 'B', label: 'B', x: 175, y: 130 },
    { id: 'C', label: 'C', x: 425, y: 130 },
    { id: 'D', label: 'D', x: 100, y: 210 },
    { id: 'E', label: 'E', x: 250, y: 210 },
    { id: 'F', label: 'F', x: 50, y: 290 },
    { id: 'G', label: 'G', x: 150, y: 290 },
  ],
  edges: [
    { id: 'A-B', source: 'A', target: 'B', type: 'left' as const },
    { id: 'A-C', source: 'A', target: 'C', type: 'right' as const },
    { id: 'B-D', source: 'B', target: 'D', type: 'left' as const },
    { id: 'B-E', source: 'B', target: 'E', type: 'right' as const },
    { id: 'D-F', source: 'D', target: 'F', type: 'left' as const },
    { id: 'D-G', source: 'D', target: 'G', type: 'right' as const },
  ],
};

// Expression tree: (a + b) * c
const expressionTree = {
  nodes: [
    { id: '*', label: '*', x: 300, y: 50 },
    { id: '+', label: '+', x: 175, y: 130 },
    { id: 'c', label: 'c', x: 425, y: 130 },
    { id: 'a', label: 'a', x: 100, y: 210 },
    { id: 'b', label: 'b', x: 250, y: 210 },
  ],
  edges: [
    { id: '*-+', source: '*', target: '+', type: 'left' as const },
    { id: '*-c', source: '*', target: 'c', type: 'right' as const },
    { id: '+-a', source: '+', target: 'a', type: 'left' as const },
    { id: '+-b', source: '+', target: 'b', type: 'right' as const },
  ],
};

// Large tree for advanced challenges
const largeTree = createBinaryTree(
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
  300,
  30,
  180,
  70
);

export const traversalChallenges: TraversalChallenge[] = [
  // PREORDER CHALLENGES
  {
    id: 1,
    title: 'Simple Pre-order',
    description: 'Perform a pre-order traversal on this simple binary tree.',
    traversalType: 'preorder',
    difficulty: 'easy',
    ...simpleTree,
    correctOrder: ['A', 'B', 'C'],
    explanation:
      'Pre-order visits Root → Left → Right. Starting at A (root), we visit A first, then go to left child B, then right child C.',
    hint: 'Remember: Visit the node first, then go left, then go right.',
  },
  {
    id: 2,
    title: 'Complete Tree Pre-order',
    description: 'Traverse this complete binary tree in pre-order.',
    traversalType: 'preorder',
    difficulty: 'medium',
    ...completeTree,
    correctOrder: ['A', 'B', 'D', 'E', 'C', 'F', 'G'],
    explanation:
      'Pre-order: A (root) → B (left subtree: B, D, E) → C (right subtree: C, F, G). Within each subtree, we follow the same Root → Left → Right pattern.',
    hint: 'Process the current node, then recursively do the same for left and right subtrees.',
  },
  {
    id: 3,
    title: 'Left-Skewed Pre-order',
    description: 'Traverse this left-skewed tree in pre-order.',
    traversalType: 'preorder',
    difficulty: 'easy',
    ...leftSkewedTree,
    correctOrder: ['A', 'B', 'C', 'D'],
    explanation:
      'In a left-skewed tree, pre-order visits each node as we go down the left path: A → B → C → D.',
    hint: 'With only left children, pre-order is simply top to bottom.',
  },
  {
    id: 4,
    title: 'BST Pre-order',
    description: 'Perform pre-order traversal on this Binary Search Tree.',
    traversalType: 'preorder',
    difficulty: 'medium',
    ...bstTree,
    correctOrder: ['50', '30', '20', '40', '70', '60', '80'],
    explanation:
      'Pre-order on BST: 50 (root) → 30, 20, 40 (left subtree) → 70, 60, 80 (right subtree). Pre-order is useful for creating a copy of the tree.',
    hint: 'Start at root 50, go completely through left subtree, then right subtree.',
  },

  // INORDER CHALLENGES
  {
    id: 5,
    title: 'Simple In-order',
    description: 'Perform an in-order traversal on this simple binary tree.',
    traversalType: 'inorder',
    difficulty: 'easy',
    ...simpleTree,
    correctOrder: ['B', 'A', 'C'],
    explanation:
      'In-order visits Left → Root → Right. Go to leftmost node B first, then root A, then right child C.',
    hint: 'Remember: Go left first, then visit the node, then go right.',
  },
  {
    id: 6,
    title: 'Complete Tree In-order',
    description: 'Traverse this complete binary tree in in-order.',
    traversalType: 'inorder',
    difficulty: 'medium',
    ...completeTree,
    correctOrder: ['D', 'B', 'E', 'A', 'F', 'C', 'G'],
    explanation:
      'In-order visits nodes in Left → Root → Right order. For BSTs, this gives sorted order! Here: D, B, E (left subtree) → A (root) → F, C, G (right subtree).',
    hint: 'Go as far left as possible first, then visit nodes on the way back up.',
  },
  {
    id: 7,
    title: 'BST In-order (Sorted Output)',
    description: 'Use in-order traversal to visit BST nodes in sorted order.',
    traversalType: 'inorder',
    difficulty: 'medium',
    ...bstTree,
    correctOrder: ['20', '30', '40', '50', '60', '70', '80'],
    explanation:
      'In-order traversal of a BST always produces nodes in sorted order! This is because left children are smaller and right children are larger.',
    hint: 'In a BST, in-order gives you sorted output. Start with the smallest!',
  },
  {
    id: 8,
    title: 'Right-Skewed In-order',
    description: 'Traverse this right-skewed tree in in-order.',
    traversalType: 'inorder',
    difficulty: 'easy',
    ...rightSkewedTree,
    correctOrder: ['A', 'B', 'C', 'D'],
    explanation:
      'In a right-skewed tree, with no left children, in-order is the same as pre-order: top to bottom.',
    hint: 'No left children means visit root immediately, then go right.',
  },

  // POSTORDER CHALLENGES
  {
    id: 9,
    title: 'Simple Post-order',
    description: 'Perform a post-order traversal on this simple binary tree.',
    traversalType: 'postorder',
    difficulty: 'easy',
    ...simpleTree,
    correctOrder: ['B', 'C', 'A'],
    explanation:
      'Post-order visits Left → Right → Root. Visit both children (B, C) before visiting the root (A).',
    hint: 'Remember: Visit children first, then the parent node last.',
  },
  {
    id: 10,
    title: 'Complete Tree Post-order',
    description: 'Traverse this complete binary tree in post-order.',
    traversalType: 'postorder',
    difficulty: 'medium',
    ...completeTree,
    correctOrder: ['D', 'E', 'B', 'F', 'G', 'C', 'A'],
    explanation:
      'Post-order: Left subtree (D, E, B) → Right subtree (F, G, C) → Root (A). The root is always visited last!',
    hint: 'Process children completely before their parent. Root comes last.',
  },
  {
    id: 11,
    title: 'Expression Tree Post-order',
    description: 'Evaluate this expression tree using post-order (postfix notation).',
    traversalType: 'postorder',
    difficulty: 'hard',
    ...expressionTree,
    correctOrder: ['a', 'b', '+', 'c', '*'],
    explanation:
      'Post-order of an expression tree gives postfix notation (Reverse Polish Notation): a b + c *. This equals (a + b) * c.',
    hint: 'Post-order on expression trees gives you postfix notation for evaluation.',
  },
  {
    id: 12,
    title: 'Unbalanced Post-order',
    description: 'Navigate this unbalanced tree in post-order.',
    traversalType: 'postorder',
    difficulty: 'hard',
    ...unbalancedTree,
    correctOrder: ['F', 'G', 'D', 'E', 'B', 'C', 'A'],
    explanation:
      'Post-order processes deepest leaves first, working up. F, G are processed, then their parent D, then E, then B, then C, finally A.',
    hint: 'Start from the deepest left leaf and work your way up and across.',
  },

  // LEVELORDER CHALLENGES
  {
    id: 13,
    title: 'Simple Level-order',
    description: 'Perform a level-order (BFS) traversal on this tree.',
    traversalType: 'levelorder',
    difficulty: 'easy',
    ...simpleTree,
    correctOrder: ['A', 'B', 'C'],
    explanation:
      'Level-order visits nodes level by level, left to right. Level 0: A, Level 1: B, C.',
    hint: 'Think of it as reading the tree like a book - top to bottom, left to right.',
  },
  {
    id: 14,
    title: 'Complete Tree Level-order',
    description: 'Traverse this complete binary tree level by level.',
    traversalType: 'levelorder',
    difficulty: 'medium',
    ...completeTree,
    correctOrder: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    explanation: 'Level-order uses a queue (BFS). Level 0: A, Level 1: B, C, Level 2: D, E, F, G.',
    hint: 'Visit all nodes at the current level before moving to the next level.',
  },
  {
    id: 15,
    title: 'BST Level-order',
    description: 'Perform level-order traversal on this BST.',
    traversalType: 'levelorder',
    difficulty: 'medium',
    ...bstTree,
    correctOrder: ['50', '30', '70', '20', '40', '60', '80'],
    explanation: 'Level-order visits: 50 (level 0) → 30, 70 (level 1) → 20, 40, 60, 80 (level 2).',
    hint: 'Use a queue! Add children to the queue as you visit each node.',
  },
  {
    id: 16,
    title: 'Large Tree Level-order',
    description: 'Traverse this large tree level by level.',
    traversalType: 'levelorder',
    difficulty: 'hard',
    ...largeTree,
    correctOrder: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    explanation:
      'Level-order on a complete tree with n nodes visits them in order 1, 2, 3, ..., n when nodes are numbered level by level.',
    hint: 'For complete trees, level-order gives sequential numbering!',
  },

  // MIXED DIFFICULTY CHALLENGES
  {
    id: 17,
    title: 'Expression Tree Pre-order',
    description: 'Get the prefix notation of this expression using pre-order.',
    traversalType: 'preorder',
    difficulty: 'hard',
    ...expressionTree,
    correctOrder: ['*', '+', 'a', 'b', 'c'],
    explanation:
      'Pre-order of an expression tree gives prefix notation (Polish Notation): * + a b c. The operator comes before its operands.',
    hint: 'Pre-order on expression trees gives prefix notation.',
  },
  {
    id: 18,
    title: 'Expression Tree In-order',
    description: 'Get the infix expression using in-order traversal.',
    traversalType: 'inorder',
    difficulty: 'hard',
    ...expressionTree,
    correctOrder: ['a', '+', 'b', '*', 'c'],
    explanation:
      'In-order of an expression tree gives infix notation: a + b * c. Note: without parentheses, operator precedence may differ!',
    hint: 'In-order gives the standard mathematical notation (infix).',
  },
  {
    id: 19,
    title: 'Unbalanced Pre-order',
    description: 'Traverse this unbalanced tree in pre-order.',
    traversalType: 'preorder',
    difficulty: 'hard',
    ...unbalancedTree,
    correctOrder: ['A', 'B', 'D', 'F', 'G', 'E', 'C'],
    explanation:
      'Pre-order: Visit A, then entire left subtree (B → D → F, G → E), then right subtree (C).',
    hint: 'Visit node first, then go deep into left subtree before touching right.',
  },
  {
    id: 20,
    title: 'Unbalanced In-order',
    description: 'Traverse this unbalanced tree in in-order.',
    traversalType: 'inorder',
    difficulty: 'hard',
    ...unbalancedTree,
    correctOrder: ['F', 'D', 'G', 'B', 'E', 'A', 'C'],
    explanation:
      'In-order on unbalanced tree: Go to deepest left (F), work back through D, G, B, E, then A, then C.',
    hint: 'Always go left first until you cannot, then visit, then go right.',
  },
];

export default traversalChallenges;
