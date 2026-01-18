// Real-World Match Types

export interface DataStructureCard {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'linear' | 'nonlinear' | 'hash' | 'graph' | 'tree';
}

export interface ApplicationCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  matchesStructure: string; // ID of the matching data structure
}

export interface MatchChallenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  // Data structures to match
  structures: DataStructureCard[];
  // Real-world applications
  applications: ApplicationCard[];
  // Explanation for each match
  explanations: Record<string, string>;
  hint: string;
  timeLimit?: number;
}

export interface MatchPair {
  structureId: string;
  applicationId: string;
}

export interface RealWorldState {
  challenges: MatchChallenge[];
  currentIndex: number;
  currentChallenge: MatchChallenge | null;
  // User's matches
  matches: MatchPair[];
  // Selected items for matching
  selectedStructure: string | null;
  selectedApplication: string | null;
  // Validation state
  validatedMatches: Record<string, boolean>; // applicationId -> isCorrect
  // Progress
  isComplete: boolean;
  showResult: boolean;
  score: {
    correct: number;
    total: number;
    points: number;
  };
  timeSpent: number;
  streak: number;
}

// Common data structures with their real-world uses
export const DATA_STRUCTURES: Record<string, DataStructureCard> = {
  array: {
    id: 'array',
    name: 'Array',
    icon: '📊',
    description: 'Fixed-size sequential collection with O(1) index access',
    category: 'linear',
  },
  linkedList: {
    id: 'linkedList',
    name: 'Linked List',
    icon: '🔗',
    description: 'Dynamic sequential collection with O(1) insertions',
    category: 'linear',
  },
  stack: {
    id: 'stack',
    name: 'Stack',
    icon: '📚',
    description: 'LIFO (Last-In-First-Out) data structure',
    category: 'linear',
  },
  queue: {
    id: 'queue',
    name: 'Queue',
    icon: '🚶',
    description: 'FIFO (First-In-First-Out) data structure',
    category: 'linear',
  },
  hashTable: {
    id: 'hashTable',
    name: 'Hash Table',
    icon: '🗂️',
    description: 'Key-value store with O(1) average lookup',
    category: 'hash',
  },
  binaryTree: {
    id: 'binaryTree',
    name: 'Binary Tree',
    icon: '🌲',
    description: 'Hierarchical structure with at most 2 children per node',
    category: 'tree',
  },
  bst: {
    id: 'bst',
    name: 'Binary Search Tree',
    icon: '🔍',
    description: 'Ordered tree with O(log n) search',
    category: 'tree',
  },
  heap: {
    id: 'heap',
    name: 'Heap',
    icon: '⛰️',
    description: 'Complete binary tree for priority ordering',
    category: 'tree',
  },
  graph: {
    id: 'graph',
    name: 'Graph',
    icon: '🕸️',
    description: 'Nodes connected by edges, models relationships',
    category: 'graph',
  },
  trie: {
    id: 'trie',
    name: 'Trie',
    icon: '🔤',
    description: 'Tree for storing strings with shared prefixes',
    category: 'tree',
  },
  deque: {
    id: 'deque',
    name: 'Deque',
    icon: '↔️',
    description: 'Double-ended queue with O(1) operations at both ends',
    category: 'linear',
  },
  priorityQueue: {
    id: 'priorityQueue',
    name: 'Priority Queue',
    icon: '🎯',
    description: 'Queue where elements have priority ordering',
    category: 'linear',
  },
  set: {
    id: 'set',
    name: 'Set',
    icon: '🎱',
    description: 'Collection of unique elements with fast membership testing',
    category: 'hash',
  },
  balancedTree: {
    id: 'balancedTree',
    name: 'Balanced Tree (AVL/Red-Black)',
    icon: '⚖️',
    description: 'Self-balancing tree maintaining O(log n) operations',
    category: 'tree',
  },
};
