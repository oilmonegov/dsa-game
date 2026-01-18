import type { DiagramChallenge } from '@/types';

export const diagramChallenges: DiagramChallenge[] = [
  // === NODE PLACEMENT CHALLENGES ===
  {
    id: 1,
    type: 'node-placement',
    title: 'Complete the Binary Tree',
    description: 'Drag the missing nodes to their correct positions in the binary tree.',
    instruction: 'Place nodes D and E as children of node B (D on left, E on right).',
    difficulty: 'easy',
    category: 'Binary Trees',
    initialNodes: [
      { data: { id: 'A', label: 'A' }, position: { x: 300, y: 50 } },
      { data: { id: 'B', label: 'B' }, position: { x: 200, y: 150 } },
      { data: { id: 'C', label: 'C' }, position: { x: 400, y: 150 } },
      {
        data: { id: 'dropD', label: '?', isDropZone: true },
        position: { x: 150, y: 250 },
        classes: 'drop-zone',
      },
      {
        data: { id: 'dropE', label: '?', isDropZone: true },
        position: { x: 250, y: 250 },
        classes: 'drop-zone',
      },
    ],
    initialEdges: [
      { data: { id: 'AB', source: 'A', target: 'B' } },
      { data: { id: 'AC', source: 'A', target: 'C' } },
      { data: { id: 'BdropD', source: 'B', target: 'dropD' }, classes: 'dashed' },
      { data: { id: 'BdropE', source: 'B', target: 'dropE' }, classes: 'dashed' },
    ],
    draggableNodes: [
      {
        data: { id: 'D', label: 'D', correctPosition: { x: 150, y: 250 } },
        position: { x: 500, y: 100 },
        classes: 'draggable',
      },
      {
        data: { id: 'E', label: 'E', correctPosition: { x: 250, y: 250 } },
        position: { x: 500, y: 180 },
        classes: 'draggable',
      },
    ],
    explanation:
      'In a binary tree, each node has at most two children: a left child and a right child. Node D is the left child of B, and E is the right child of B.',
    hint: 'Remember: in binary trees, left child is positioned to the left of the parent, right child to the right.',
  },
  {
    id: 2,
    type: 'node-placement',
    title: 'Build Organization Chart',
    description: 'Create the company hierarchy by placing employees in correct positions.',
    instruction:
      'Place the managers (Bob, Carol) under CEO Alice, and employees (Dave, Eve, Frank) under their respective managers.',
    difficulty: 'medium',
    category: 'Trees',
    initialNodes: [
      { data: { id: 'alice', label: 'Alice\n(CEO)' }, position: { x: 300, y: 50 } },
      {
        data: { id: 'drop1', label: '?', isDropZone: true },
        position: { x: 175, y: 150 },
        classes: 'drop-zone',
      },
      {
        data: { id: 'drop2', label: '?', isDropZone: true },
        position: { x: 425, y: 150 },
        classes: 'drop-zone',
      },
      {
        data: { id: 'drop3', label: '?', isDropZone: true },
        position: { x: 100, y: 250 },
        classes: 'drop-zone',
      },
      {
        data: { id: 'drop4', label: '?', isDropZone: true },
        position: { x: 250, y: 250 },
        classes: 'drop-zone',
      },
      {
        data: { id: 'drop5', label: '?', isDropZone: true },
        position: { x: 425, y: 250 },
        classes: 'drop-zone',
      },
    ],
    initialEdges: [
      { data: { id: 'e1', source: 'alice', target: 'drop1' }, classes: 'dashed' },
      { data: { id: 'e2', source: 'alice', target: 'drop2' }, classes: 'dashed' },
      { data: { id: 'e3', source: 'drop1', target: 'drop3' }, classes: 'dashed' },
      { data: { id: 'e4', source: 'drop1', target: 'drop4' }, classes: 'dashed' },
      { data: { id: 'e5', source: 'drop2', target: 'drop5' }, classes: 'dashed' },
    ],
    draggableNodes: [
      {
        data: { id: 'bob', label: 'Bob\n(Manager)', correctPosition: { x: 175, y: 150 } },
        position: { x: 550, y: 50 },
        classes: 'draggable',
      },
      {
        data: { id: 'carol', label: 'Carol\n(Manager)', correctPosition: { x: 425, y: 150 } },
        position: { x: 550, y: 120 },
        classes: 'draggable',
      },
      {
        data: { id: 'dave', label: 'Dave', correctPosition: { x: 100, y: 250 } },
        position: { x: 550, y: 190 },
        classes: 'draggable',
      },
      {
        data: { id: 'eve', label: 'Eve', correctPosition: { x: 250, y: 250 } },
        position: { x: 550, y: 260 },
        classes: 'draggable',
      },
      {
        data: { id: 'frank', label: 'Frank', correctPosition: { x: 425, y: 250 } },
        position: { x: 550, y: 330 },
        classes: 'draggable',
      },
    ],
    explanation:
      'Organization charts are tree structures. The CEO is the root, managers are internal nodes, and employees without direct reports are leaves. This hierarchical structure shows reporting relationships.',
    hint: 'Managers report to CEO (level 2), employees report to managers (level 3).',
  },

  // === VALUE FILL CHALLENGES ===
  {
    id: 3,
    type: 'value-fill',
    title: 'Complete the BST',
    description: 'Fill in the missing values to make this a valid Binary Search Tree.',
    instruction:
      'In a BST, left children are smaller than parent, right children are larger. Fill in the missing values.',
    difficulty: 'medium',
    category: 'Binary Trees',
    initialNodes: [
      { data: { id: 'root', label: '50', value: 50 }, position: { x: 300, y: 50 } },
      { data: { id: 'left', label: '?', value: undefined }, position: { x: 175, y: 150 } },
      { data: { id: 'right', label: '75', value: 75 }, position: { x: 425, y: 150 } },
      { data: { id: 'll', label: '10', value: 10 }, position: { x: 100, y: 250 } },
      { data: { id: 'lr', label: '?', value: undefined }, position: { x: 250, y: 250 } },
      { data: { id: 'rl', label: '?', value: undefined }, position: { x: 350, y: 250 } },
      { data: { id: 'rr', label: '90', value: 90 }, position: { x: 500, y: 250 } },
    ],
    initialEdges: [
      { data: { id: 'e1', source: 'root', target: 'left' } },
      { data: { id: 'e2', source: 'root', target: 'right' } },
      { data: { id: 'e3', source: 'left', target: 'll' } },
      { data: { id: 'e4', source: 'left', target: 'lr' } },
      { data: { id: 'e5', source: 'right', target: 'rl' } },
      { data: { id: 'e6', source: 'right', target: 'rr' } },
    ],
    missingValues: [
      { nodeId: 'left', correctValue: 30 },
      { nodeId: 'lr', correctValue: 40 },
      { nodeId: 'rl', correctValue: 60 },
    ],
    explanation:
      'In a BST: Left subtree values < Parent value < Right subtree values. For node 50: left subtree must have values < 50. The left child (30) must be > 10 and < 50. Node 40 must be > 30 and < 50. Node 60 must be > 50 and < 75.',
    hint: 'Think about what range of values each node can have based on its ancestors.',
  },
  {
    id: 4,
    type: 'value-fill',
    title: 'Array to Binary Tree',
    description:
      'Given array representation [_, 1, 2, 3, 4, 5, 6, 7], fill in the tree node values.',
    instruction:
      'In array representation (1-indexed): left child of i is at 2i, right child at 2i+1. Fill the missing values.',
    difficulty: 'hard',
    category: 'Binary Trees',
    initialNodes: [
      { data: { id: 'n1', label: '1', value: 1 }, position: { x: 300, y: 50 } },
      { data: { id: 'n2', label: '?', value: undefined }, position: { x: 175, y: 130 } },
      { data: { id: 'n3', label: '?', value: undefined }, position: { x: 425, y: 130 } },
      { data: { id: 'n4', label: '4', value: 4 }, position: { x: 100, y: 210 } },
      { data: { id: 'n5', label: '?', value: undefined }, position: { x: 250, y: 210 } },
      { data: { id: 'n6', label: '?', value: undefined }, position: { x: 350, y: 210 } },
      { data: { id: 'n7', label: '7', value: 7 }, position: { x: 500, y: 210 } },
    ],
    initialEdges: [
      { data: { id: 'e1', source: 'n1', target: 'n2' } },
      { data: { id: 'e2', source: 'n1', target: 'n3' } },
      { data: { id: 'e3', source: 'n2', target: 'n4' } },
      { data: { id: 'e4', source: 'n2', target: 'n5' } },
      { data: { id: 'e5', source: 'n3', target: 'n6' } },
      { data: { id: 'e6', source: 'n3', target: 'n7' } },
    ],
    missingValues: [
      { nodeId: 'n2', correctValue: 2 },
      { nodeId: 'n3', correctValue: 3 },
      { nodeId: 'n5', correctValue: 5 },
      { nodeId: 'n6', correctValue: 6 },
    ],
    explanation:
      'Array representation maps tree levels to array indices. Root at index 1. For node at index i: left child at 2i, right child at 2i+1, parent at i/2. So index 2,3 are children of 1; indices 4,5 are children of 2; indices 6,7 are children of 3.',
    hint: 'The array index corresponds to the node value in this example. Left child = 2*parent, Right child = 2*parent + 1.',
  },

  // === TRAVERSAL ORDER CHALLENGES ===
  {
    id: 5,
    type: 'traversal-order',
    title: 'Preorder Traversal',
    description: 'Number the nodes in preorder traversal sequence (Root → Left → Right).',
    instruction:
      'Click nodes in preorder: visit root first, then left subtree, then right subtree.',
    difficulty: 'medium',
    category: 'Traversals',
    traversalType: 'preorder',
    initialNodes: [
      { data: { id: 'A', label: 'A', traversalOrder: 1 }, position: { x: 300, y: 50 } },
      { data: { id: 'B', label: 'B', traversalOrder: 2 }, position: { x: 175, y: 150 } },
      { data: { id: 'C', label: 'C', traversalOrder: 5 }, position: { x: 425, y: 150 } },
      { data: { id: 'D', label: 'D', traversalOrder: 3 }, position: { x: 100, y: 250 } },
      { data: { id: 'E', label: 'E', traversalOrder: 4 }, position: { x: 250, y: 250 } },
      { data: { id: 'F', label: 'F', traversalOrder: 6 }, position: { x: 425, y: 250 } },
    ],
    initialEdges: [
      { data: { id: 'AB', source: 'A', target: 'B' } },
      { data: { id: 'AC', source: 'A', target: 'C' } },
      { data: { id: 'BD', source: 'B', target: 'D' } },
      { data: { id: 'BE', source: 'B', target: 'E' } },
      { data: { id: 'CF', source: 'C', target: 'F' } },
    ],
    correctTraversalOrder: ['A', 'B', 'D', 'E', 'C', 'F'],
    explanation:
      'Preorder: Root → Left → Right. Start at A (1), go left to B (2), go left to D (3), back to B, go right to E (4), back to A, go right to C (5), go left to F (6). Result: A, B, D, E, C, F.',
    hint: 'Think of preorder as "visit yourself, then visit left subtree completely, then right subtree completely."',
  },
  {
    id: 6,
    type: 'traversal-order',
    title: 'Inorder Traversal',
    description: 'Number the nodes in inorder traversal sequence (Left → Root → Right).',
    instruction: 'Click nodes in inorder: visit left subtree first, then root, then right subtree.',
    difficulty: 'medium',
    category: 'Traversals',
    traversalType: 'inorder',
    initialNodes: [
      { data: { id: 'A', label: 'A', traversalOrder: 4 }, position: { x: 300, y: 50 } },
      { data: { id: 'B', label: 'B', traversalOrder: 2 }, position: { x: 175, y: 150 } },
      { data: { id: 'C', label: 'C', traversalOrder: 5 }, position: { x: 425, y: 150 } },
      { data: { id: 'D', label: 'D', traversalOrder: 1 }, position: { x: 100, y: 250 } },
      { data: { id: 'E', label: 'E', traversalOrder: 3 }, position: { x: 250, y: 250 } },
      { data: { id: 'F', label: 'F', traversalOrder: 6 }, position: { x: 425, y: 250 } },
    ],
    initialEdges: [
      { data: { id: 'AB', source: 'A', target: 'B' } },
      { data: { id: 'AC', source: 'A', target: 'C' } },
      { data: { id: 'BD', source: 'B', target: 'D' } },
      { data: { id: 'BE', source: 'B', target: 'E' } },
      { data: { id: 'CF', source: 'C', target: 'F' } },
    ],
    correctTraversalOrder: ['D', 'B', 'E', 'A', 'C', 'F'],
    explanation:
      "Inorder: Left → Root → Right. Go left until you can't (D, visit 1), back to B (visit 2), right to E (visit 3), back to A (visit 4), right to C (visit 5), C has no left so down to F (visit 6). Result: D, B, E, A, C, F.",
    hint: 'Think of inorder as "visit left subtree completely, then yourself, then right subtree completely."',
  },
  {
    id: 7,
    type: 'traversal-order',
    title: 'Postorder Traversal',
    description: 'Number the nodes in postorder traversal sequence (Left → Right → Root).',
    instruction: 'Click nodes in postorder: visit left subtree, then right subtree, then root.',
    difficulty: 'medium',
    category: 'Traversals',
    traversalType: 'postorder',
    initialNodes: [
      { data: { id: 'A', label: 'A', traversalOrder: 6 }, position: { x: 300, y: 50 } },
      { data: { id: 'B', label: 'B', traversalOrder: 3 }, position: { x: 175, y: 150 } },
      { data: { id: 'C', label: 'C', traversalOrder: 5 }, position: { x: 425, y: 150 } },
      { data: { id: 'D', label: 'D', traversalOrder: 1 }, position: { x: 100, y: 250 } },
      { data: { id: 'E', label: 'E', traversalOrder: 2 }, position: { x: 250, y: 250 } },
      { data: { id: 'F', label: 'F', traversalOrder: 4 }, position: { x: 425, y: 250 } },
    ],
    initialEdges: [
      { data: { id: 'AB', source: 'A', target: 'B' } },
      { data: { id: 'AC', source: 'A', target: 'C' } },
      { data: { id: 'BD', source: 'B', target: 'D' } },
      { data: { id: 'BE', source: 'B', target: 'E' } },
      { data: { id: 'CF', source: 'C', target: 'F' } },
    ],
    correctTraversalOrder: ['D', 'E', 'B', 'F', 'C', 'A'],
    explanation:
      'Postorder: Left → Right → Root. Go left to D (leaf, visit 1), right to E (leaf, visit 2), back up to B (visit 3), go right to C, down to F (visit 4), back to C (visit 5), finally A (visit 6). Result: D, E, B, F, C, A.',
    hint: 'Think of postorder as "visit left subtree, then right subtree, then yourself last."',
  },
  {
    id: 8,
    type: 'traversal-order',
    title: 'Level Order Traversal',
    description: 'Number the nodes in level order (breadth-first) sequence.',
    instruction: 'Click nodes level by level, left to right on each level.',
    difficulty: 'easy',
    category: 'Traversals',
    traversalType: 'levelorder',
    initialNodes: [
      { data: { id: 'A', label: 'A', traversalOrder: 1 }, position: { x: 300, y: 50 } },
      { data: { id: 'B', label: 'B', traversalOrder: 2 }, position: { x: 175, y: 150 } },
      { data: { id: 'C', label: 'C', traversalOrder: 3 }, position: { x: 425, y: 150 } },
      { data: { id: 'D', label: 'D', traversalOrder: 4 }, position: { x: 100, y: 250 } },
      { data: { id: 'E', label: 'E', traversalOrder: 5 }, position: { x: 250, y: 250 } },
      { data: { id: 'F', label: 'F', traversalOrder: 6 }, position: { x: 425, y: 250 } },
    ],
    initialEdges: [
      { data: { id: 'AB', source: 'A', target: 'B' } },
      { data: { id: 'AC', source: 'A', target: 'C' } },
      { data: { id: 'BD', source: 'B', target: 'D' } },
      { data: { id: 'BE', source: 'B', target: 'E' } },
      { data: { id: 'CF', source: 'C', target: 'F' } },
    ],
    correctTraversalOrder: ['A', 'B', 'C', 'D', 'E', 'F'],
    explanation:
      'Level Order (BFS): Visit nodes level by level using a queue. Level 0: A. Level 1: B, C. Level 2: D, E, F. Result: A, B, C, D, E, F. This is used in BFS algorithms.',
    hint: 'Visit all nodes at depth 0, then depth 1, then depth 2, etc. Go left to right at each level.',
  },

  // === EDGE CONNECTION CHALLENGES ===
  {
    id: 9,
    type: 'edge-connection',
    title: 'Connect the Tree',
    description: 'Draw edges to create a valid binary tree structure.',
    instruction: 'Click on a parent node, then click on a child node to create an edge.',
    difficulty: 'easy',
    category: 'Binary Trees',
    initialNodes: [
      { data: { id: 'A', label: 'A' }, position: { x: 300, y: 50 } },
      { data: { id: 'B', label: 'B' }, position: { x: 175, y: 150 } },
      { data: { id: 'C', label: 'C' }, position: { x: 425, y: 150 } },
      { data: { id: 'D', label: 'D' }, position: { x: 100, y: 250 } },
      { data: { id: 'E', label: 'E' }, position: { x: 250, y: 250 } },
    ],
    initialEdges: [],
    requiredEdges: [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'B', target: 'E' },
    ],
    explanation:
      'A tree is connected and acyclic. In a binary tree, each node has at most 2 children. A is the root with children B and C. B has children D and E. C is a leaf.',
    hint: 'Start from the root (A) and connect to children. Each internal node can have at most 2 children.',
  },
  {
    id: 10,
    type: 'edge-connection',
    title: 'Build a Linked List',
    description: 'Connect nodes to form a singly linked list.',
    instruction: 'Create edges to link nodes in order: 1 → 2 → 3 → 4 → 5.',
    difficulty: 'easy',
    category: 'Linear Data Structures',
    initialNodes: [
      { data: { id: 'n1', label: '1' }, position: { x: 100, y: 150 } },
      { data: { id: 'n2', label: '2' }, position: { x: 200, y: 150 } },
      { data: { id: 'n3', label: '3' }, position: { x: 300, y: 150 } },
      { data: { id: 'n4', label: '4' }, position: { x: 400, y: 150 } },
      { data: { id: 'n5', label: '5' }, position: { x: 500, y: 150 } },
    ],
    initialEdges: [],
    requiredEdges: [
      { source: 'n1', target: 'n2' },
      { source: 'n2', target: 'n3' },
      { source: 'n3', target: 'n4' },
      { source: 'n4', target: 'n5' },
    ],
    explanation:
      'A singly linked list is a linear data structure where each node points to the next. The last node points to null. Unlike arrays, linked lists allow efficient insertion/deletion.',
    hint: 'Each node should point to exactly one next node, forming a chain.',
  },
];

export default diagramChallenges;
