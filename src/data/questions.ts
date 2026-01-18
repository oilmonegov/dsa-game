import type { Question } from '@/types';

export const theoryQuestions: Question[] = [
  // === DATA STRUCTURES BASICS ===
  {
    id: 1,
    category: 'Data Structures Basics',
    difficulty: 'easy',
    question: 'What is the time complexity of accessing an array element by index?',
    options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
    correctAnswer: 2,
    explanation:
      'Array elements are stored in contiguous memory locations, so accessing any element by index is done in constant time O(1) using direct address calculation.',
    realWorld:
      "When you access a specific row in a spreadsheet by clicking on row number 500, the software jumps directly to that row without scanning through rows 1-499.",
  },
  {
    id: 2,
    category: 'Data Structures Basics',
    difficulty: 'easy',
    question: 'Which of the following is a primitive data type?',
    options: ['Array', 'Stack', 'Integer', 'Linked List'],
    correctAnswer: 2,
    explanation:
      'Primitive data types (Integer, Real/Float, Character, Boolean) are basic building blocks provided by programming languages. Arrays, Stacks, and Linked Lists are non-primitive/abstract data types built using primitives.',
    realWorld:
      "When you store someone's age as 25, you're using an integer primitive. When you store their browsing history (multiple pages), you need a non-primitive structure like an array or list.",
  },
  {
    id: 3,
    category: 'Data Structures Basics',
    difficulty: 'medium',
    question: 'An algorithm is best described as:',
    options: [
      'A programming language',
      'A step-by-step procedure to solve a problem',
      'A type of computer hardware',
      'A database management system',
    ],
    correctAnswer: 1,
    explanation:
      "An algorithm is a finite sequence of well-defined instructions to solve a specific problem. It's independent of any programming language—the same algorithm can be implemented in Python, Java, C++, etc.",
    realWorld:
      "A recipe is an algorithm: step-by-step instructions to make a dish. The same recipe can be followed whether you're cooking in a restaurant kitchen or at home.",
  },
  {
    id: 4,
    category: 'Data Structures Basics',
    difficulty: 'medium',
    question:
      'Which operation involves accessing each record in a data structure exactly once?',
    options: ['Searching', 'Traversing', 'Inserting', 'Sorting'],
    correctAnswer: 1,
    explanation:
      'Traversing means visiting every element in a data structure exactly once, typically to process or display all elements. Searching looks for a specific element, inserting adds new elements, and sorting reorders elements.',
    realWorld:
      'When your music app displays all songs in your library, it traverses through every song entry to show them on screen.',
  },
  {
    id: 5,
    category: 'Data Structures Basics',
    difficulty: 'easy',
    question: 'What does ADT stand for?',
    options: [
      'Advanced Data Technology',
      'Abstract Data Type',
      'Algorithmic Data Transfer',
      'Automatic Data Traversal',
    ],
    correctAnswer: 1,
    explanation:
      "ADT (Abstract Data Type) defines a data type by its behavior (operations) rather than its implementation. It separates 'what' operations are available from 'how' they're implemented.",
    realWorld:
      "A Stack ADT defines push and pop operations. Whether implemented using an array or linked list, users interact with the same operations—the implementation details are hidden.",
  },

  // === LINEAR DATA STRUCTURES ===
  {
    id: 6,
    category: 'Linear Data Structures',
    difficulty: 'easy',
    question: 'In a Stack, elements are added and removed from:',
    options: [
      'Both ends',
      'The same end (top)',
      'The front only',
      'Random positions',
    ],
    correctAnswer: 1,
    explanation:
      'A Stack follows LIFO (Last In, First Out) principle—the last element added is the first to be removed. All operations happen at the top.',
    realWorld:
      "Think of a stack of plates: you add plates to the top and remove from the top. The last plate you placed is the first one you'll pick up.",
  },
  {
    id: 7,
    category: 'Linear Data Structures',
    difficulty: 'easy',
    question: "What data structure does a browser's back button use?",
    options: ['Queue', 'Array', 'Stack', 'Tree'],
    correctAnswer: 2,
    explanation:
      "The browser uses a Stack to track visited pages. When you visit a new page, it's pushed onto the stack. Clicking 'Back' pops the most recent page, revealing the previous one.",
    realWorld:
      'Your browsing history: Home → Products → Cart → Checkout. Click back: Checkout is removed, Cart appears. Click back again: Cart removed, Products appears. Classic LIFO behavior!',
  },
  {
    id: 8,
    category: 'Linear Data Structures',
    difficulty: 'medium',
    question: 'In a Queue, elements are added at ___ and removed from ___',
    options: [
      'front, rear',
      'rear, front',
      'top, bottom',
      'any position, any position',
    ],
    correctAnswer: 1,
    explanation:
      'A Queue follows FIFO (First In, First Out) principle. New elements are added at the rear (enqueue), and elements are removed from the front (dequeue).',
    realWorld:
      'Like a line at a bank: new customers join at the back of the line (rear), and customers are served from the front. First come, first served!',
  },
  {
    id: 9,
    category: 'Linear Data Structures',
    difficulty: 'medium',
    question:
      'Which data structure would you use for implementing an Undo/Redo feature?',
    options: ['Queue', 'Stack', 'Linked List', 'Array'],
    correctAnswer: 1,
    explanation:
      'Undo/Redo uses two Stacks: one for undo history and one for redo. Each action is pushed to the undo stack. Undo pops from undo and pushes to redo. Redo does the opposite.',
    realWorld:
      "In Word: type 'Hello', then 'World'. Undo removes 'World' (last action). Undo again removes 'Hello'. Redo brings back 'Hello', then 'World'—classic stack operations!",
  },
  {
    id: 10,
    category: 'Linear Data Structures',
    difficulty: 'hard',
    question: 'What is the main advantage of a Linked List over an Array?',
    options: [
      'Faster random access',
      'Dynamic size and efficient insertion/deletion',
      'Uses less memory',
      'Simpler to implement',
    ],
    correctAnswer: 1,
    explanation:
      'Linked Lists can grow/shrink dynamically and allow O(1) insertion/deletion at known positions (no shifting needed). Arrays have fixed size and require O(n) shifting for middle insertions.',
    realWorld:
      "A music playlist: adding a song to the middle of a linked list just changes two pointers. In an array, you'd have to shift all subsequent songs to make room.",
  },

  // === NON-LINEAR DATA STRUCTURES ===
  {
    id: 11,
    category: 'Non-Linear Data Structures',
    difficulty: 'easy',
    question: 'Which of the following is a non-linear data structure?',
    options: ['Array', 'Stack', 'Queue', 'Tree'],
    correctAnswer: 3,
    explanation:
      'Trees and Graphs are non-linear because elements are not arranged sequentially—each element can connect to multiple other elements in hierarchical or networked patterns.',
    realWorld:
      "Your company's org chart is a tree: the CEO connects to multiple VPs, each VP connects to multiple managers. This hierarchy can't be represented linearly.",
  },
  {
    id: 12,
    category: 'Non-Linear Data Structures',
    difficulty: 'medium',
    question:
      'In a Graph, what represents the connections between nodes?',
    options: ['Vertices', 'Edges', 'Roots', 'Leaves'],
    correctAnswer: 1,
    explanation:
      'A Graph consists of Vertices (nodes) and Edges (connections between nodes). Edges can be directed (one-way) or undirected (two-way).',
    realWorld:
      'In a social network: people are vertices, friendships are edges. On Facebook, friendships are undirected (mutual). On Twitter, following is directed (one-way).',
  },
  {
    id: 13,
    category: 'Non-Linear Data Structures',
    difficulty: 'medium',
    question:
      'Which data structure is best suited for representing a social network?',
    options: ['Array', 'Stack', 'Queue', 'Graph'],
    correctAnswer: 3,
    explanation:
      'Graphs are perfect for social networks because they represent many-to-many relationships. Each person is a node, and connections (friendships, follows) are edges.',
    realWorld:
      "Facebook's friend recommendation: uses graph algorithms to find 'friends of friends'. LinkedIn shows '2nd connections'—people connected to your direct connections.",
  },

  // === TREES ===
  {
    id: 14,
    category: 'Trees',
    difficulty: 'easy',
    question: 'What is the root of a tree?',
    options: [
      'A node with no children',
      'The topmost node with no parent',
      'A node with only one child',
      'The bottommost node',
    ],
    correctAnswer: 1,
    explanation:
      'The root is the topmost node in a tree hierarchy—it has no parent. All other nodes in the tree are descendants of the root.',
    realWorld:
      'In a file system, the root directory (/ on Linux, C:\\ on Windows) is the topmost folder from which all other folders branch out.',
  },
  {
    id: 15,
    category: 'Trees',
    difficulty: 'easy',
    question: 'What is a leaf node?',
    options: [
      'A node with no parent',
      'A node with no children',
      'A node with exactly one child',
      'The root node',
    ],
    correctAnswer: 1,
    explanation:
      "A leaf (or external node) is a node with no children—it's at the end of a branch. Internal nodes are the opposite: they have at least one child.",
    realWorld:
      "In a folder structure, files are like leaf nodes (they don't contain other items), while folders with subfolders are internal nodes.",
  },
  {
    id: 16,
    category: 'Trees',
    difficulty: 'medium',
    question: 'What is the height of a single-node tree?',
    options: ['0', '1', '2', '-1'],
    correctAnswer: 0,
    explanation:
      'Height is the number of edges on the longest path from a node to a leaf. A single node (which is both root and leaf) has no edges below it, so height = 0.',
    realWorld:
      'If a company has only a CEO with no employees below, the org chart has height 0—there are no levels below the CEO.',
  },
  {
    id: 17,
    category: 'Trees',
    difficulty: 'medium',
    question: 'What is the depth of the root node?',
    options: ['0', '1', "The tree's height", 'Undefined'],
    correctAnswer: 0,
    explanation:
      'Depth is the number of edges from the root to a node. The root itself has depth 0 because there are no edges between it and itself.',
    realWorld:
      'In an org chart, the CEO is at depth 0 (top level), VPs at depth 1, managers at depth 2, etc.',
  },
  {
    id: 18,
    category: 'Trees',
    difficulty: 'medium',
    question: 'The degree of a node is:',
    options: [
      'Its depth in the tree',
      'The number of its children',
      'The number of its ancestors',
      'Its distance from the root',
    ],
    correctAnswer: 1,
    explanation:
      'The degree of a node is the number of children it has. A leaf has degree 0. The degree of a tree is the maximum degree of any node.',
    realWorld:
      "If a manager directly supervises 5 employees, their 'degree' in the org chart is 5. A manager with no direct reports has degree 0.",
  },
  {
    id: 19,
    category: 'Trees',
    difficulty: 'hard',
    question: 'What are siblings in a tree?',
    options: [
      'Nodes at the same depth',
      'Nodes with the same parent',
      'Nodes with the same number of children',
      'Any two connected nodes',
    ],
    correctAnswer: 1,
    explanation:
      'Siblings are nodes that share the same parent. Nodes at the same depth might not be siblings if they have different parents.',
    realWorld:
      "In a family tree, your brothers and sisters are siblings (same parents). Your cousins are at the same 'depth' but aren't siblings.",
  },

  // === BINARY TREES ===
  {
    id: 20,
    category: 'Binary Trees',
    difficulty: 'easy',
    question:
      'In a binary tree, each node can have at most how many children?',
    options: ['1', '2', '3', 'Unlimited'],
    correctAnswer: 1,
    explanation:
      'A binary tree restricts each node to at most 2 children, specifically designated as left child and right child. This distinction matters for many algorithms.',
    realWorld:
      'A decision tree for Yes/No questions: each question (node) leads to exactly two possible answers (children)—Yes (left) or No (right).',
  },
  {
    id: 21,
    category: 'Binary Trees',
    difficulty: 'medium',
    question: 'What is a Full Binary Tree?',
    options: [
      'A tree where every level is completely filled',
      'A tree where all leaves are at the same level and every internal node has 2 children',
      'A tree with the maximum number of nodes',
      'A tree where only the root has children',
    ],
    correctAnswer: 1,
    explanation:
      'A Full (or Proper) Binary Tree has all leaves at the same depth, and every internal node has exactly 2 children. No node has just one child.',
    realWorld:
      'A single-elimination tournament bracket where every round has all matches filled—no byes. Every match (internal node) has exactly 2 participants.',
  },
  {
    id: 22,
    category: 'Binary Trees',
    difficulty: 'hard',
    question:
      'In a Full Binary Tree of height h, how many leaf nodes are there?',
    options: ['h', '2h', '2^h', '2^(h+1) - 1'],
    correctAnswer: 2,
    explanation:
      'A Full Binary Tree of height h has 2^h leaves. At each level, the number of nodes doubles. Level 0 has 1 node, level 1 has 2, level h has 2^h.',
    realWorld:
      'A tournament with height 3 (3 rounds): Round 1 has 8 teams (2³ = 8 leaves), Round 2 has 4 teams, Round 3 has 2 teams, Finals has 1 winner.',
  },
  {
    id: 23,
    category: 'Binary Trees',
    difficulty: 'hard',
    question:
      'In array representation of a binary tree (root at index 1), what is the index of the left child of node at index i?',
    options: ['i + 1', 'i - 1', '2i', '2i + 1'],
    correctAnswer: 2,
    explanation:
      'With root at index 1: Left child of i is at 2i, Right child of i is at 2i + 1, Parent of i is at i/2 (integer division).',
    realWorld:
      'Heaps use this array representation for efficient storage. A heap with root at index 1: its children are at indices 2 and 3, their children at 4, 5, 6, 7, etc.',
  },
  {
    id: 24,
    category: 'Binary Trees',
    difficulty: 'medium',
    question: 'What makes binary trees different from general trees?',
    options: [
      'Binary trees must have exactly 2 children per node',
      'In binary trees, left and right children are distinguished; order matters',
      'Binary trees cannot be empty',
      'Binary trees have a maximum of 7 nodes',
    ],
    correctAnswer: 1,
    explanation:
      'In binary trees, left and right children are distinct—swapping them creates a different tree. In general trees, children are unordered (only parent-child relationship matters).',
    realWorld:
      "In a decision tree: 'If salary > 50000 go LEFT for loan approval, go RIGHT for rejection.' Swapping left/right would reverse all decisions!",
  },

  // === TREE TRAVERSALS ===
  {
    id: 25,
    category: 'Traversals',
    difficulty: 'easy',
    question: 'Which tree traversal visits the root node first?',
    options: ['Inorder', 'Postorder', 'Preorder', 'Level Order'],
    correctAnswer: 2,
    explanation:
      "Preorder visits: Root → Left subtree → Right subtree. 'Pre' means the root comes before (pre) its children. Useful for copying a tree.",
    realWorld:
      'When exploring a new building: enter main lobby (root), then explore left wing completely, then right wing. You process the main area first.',
  },
  {
    id: 26,
    category: 'Traversals',
    difficulty: 'medium',
    question:
      'Which traversal gives sorted output when applied to a Binary Search Tree?',
    options: ['Preorder', 'Inorder', 'Postorder', 'Level Order'],
    correctAnswer: 1,
    explanation:
      'Inorder (Left → Root → Right) visits nodes in ascending order for a BST because left children are smaller and right children are larger than the parent.',
    realWorld:
      'A phonebook organized as a BST: inorder traversal would list all names alphabetically, from A to Z, without any sorting needed!',
  },
  {
    id: 27,
    category: 'Traversals',
    difficulty: 'medium',
    question: 'Postorder traversal visits nodes in which order?',
    options: [
      'Root → Left → Right',
      'Left → Right → Root',
      'Left → Root → Right',
      'Right → Root → Left',
    ],
    correctAnswer: 1,
    explanation:
      "Postorder: Left subtree → Right subtree → Root. 'Post' means the root comes after (post) its children. Useful for deleting a tree (delete children before parent).",
    realWorld:
      'Deleting a folder: you must delete all files and subfolders (children) before you can delete the parent folder—classic postorder operation!',
  },
  {
    id: 28,
    category: 'Traversals',
    difficulty: 'medium',
    question: 'Level Order traversal uses which data structure?',
    options: ['Stack', 'Queue', 'Linked List', 'Heap'],
    correctAnswer: 1,
    explanation:
      'Level Order (BFS) uses a Queue. Visit root, enqueue children. Dequeue a node, visit it, enqueue its children. This processes nodes level by level.',
    realWorld:
      'Searching a corporate hierarchy: first check CEO level, then all VPs, then all managers, etc. Queue ensures you complete each level before moving deeper.',
  },
  {
    id: 29,
    category: 'Traversals',
    difficulty: 'hard',
    question:
      'For the tree A(B(D,E), C(F)), what is the postorder traversal?',
    options: [
      'A, B, D, E, C, F',
      'D, E, B, F, C, A',
      'D, B, E, A, F, C',
      'A, B, C, D, E, F',
    ],
    correctAnswer: 1,
    explanation:
      'Postorder (Left → Right → Root): Start at A, go left to B, go left to D (leaf, visit D), go right to E (leaf, visit E), visit B. Go to C, visit F, visit C. Finally visit A. Result: D, E, B, F, C, A',
    realWorld:
      "Calculating folder sizes: compute sizes of all files/subfolders before you can calculate the parent folder's total size.",
  },
  {
    id: 30,
    category: 'Traversals',
    difficulty: 'hard',
    question: 'Inorder traversal is only defined for:',
    options: [
      'All trees',
      'Binary trees only',
      'Complete trees only',
      'BST only',
    ],
    correctAnswer: 1,
    explanation:
      "Inorder (Left → Root → Right) requires distinguishing between left and right children, which only binary trees have. General trees with unordered children don't have a defined 'left' or 'right'.",
    realWorld:
      "Inorder works for binary decision trees (yes/no choices) but doesn't make sense for a general org chart where a manager might have 5 direct reports with no left/right ordering.",
  },

  // === ALGORITHM ANALYSIS ===
  {
    id: 31,
    category: 'Algorithm Analysis',
    difficulty: 'easy',
    question: 'What does Big-O notation describe?',
    options: [
      'The exact running time of an algorithm',
      "The upper bound of an algorithm's growth rate",
      'The memory usage of an algorithm',
      'The best case performance',
    ],
    correctAnswer: 1,
    explanation:
      "Big-O describes the upper bound (worst case) of how an algorithm's running time grows as input size increases. It ignores constants and lower-order terms.",
    realWorld:
      "O(n) means if you double the input, time roughly doubles. O(n²) means doubling input quadruples time. This helps predict how algorithms scale.",
  },
  {
    id: 32,
    category: 'Algorithm Analysis',
    difficulty: 'easy',
    question: 'What is the time complexity of Binary Search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctAnswer: 1,
    explanation:
      'Binary Search halves the search space with each comparison, giving O(log n). To search 1 million items, you need at most 20 comparisons (log₂ 1,000,000 ≈ 20).',
    realWorld:
      'Finding a word in a dictionary: open to middle, compare, eliminate half, repeat. Much faster than checking every page from the beginning (linear search).',
  },
  {
    id: 33,
    category: 'Algorithm Analysis',
    difficulty: 'medium',
    question: 'Which time complexity is best (fastest growth)?',
    options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
    correctAnswer: 3,
    explanation:
      'From best to worst: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ). Logarithmic time O(log n) is excellent—operations grow very slowly as input increases.',
    realWorld:
      'Database indexing achieves O(log n) lookups. Finding one record among 1 billion takes only ~30 comparisons instead of potentially 1 billion!',
  },
  {
    id: 34,
    category: 'Algorithm Analysis',
    difficulty: 'medium',
    question: 'What is the worst-case time complexity of Insertion Sort?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctAnswer: 2,
    explanation:
      'Insertion Sort has O(n²) worst case when the array is in reverse order. Each element must be compared with all previously sorted elements and shifted.',
    realWorld:
      'Sorting a deck of cards that is completely reversed: for each card, you must shift all previously sorted cards to make room. Very slow for large decks!',
  },
  {
    id: 35,
    category: 'Algorithm Analysis',
    difficulty: 'hard',
    question:
      'For Insertion Sort, what input causes the worst-case performance?',
    options: [
      'Already sorted array',
      'Random array',
      'Reverse sorted array',
      'Array with duplicates',
    ],
    correctAnswer: 2,
    explanation:
      'A reverse sorted array [5,4,3,2,1] is worst case for Insertion Sort. Each element is smaller than all sorted elements, requiring maximum comparisons and shifts.',
    realWorld:
      'Imagine organizing books by height when they arrive tallest-first: each new book must be moved past ALL previously shelved books to reach the front.',
  },
  {
    id: 36,
    category: 'Algorithm Analysis',
    difficulty: 'medium',
    question: 'What is the best-case time complexity of Insertion Sort?',
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
    correctAnswer: 1,
    explanation:
      "Best case is O(n) when the array is already sorted. Each element only needs one comparison to confirm it's in the right place—no shifting needed.",
    realWorld:
      'If books arrive already sorted by height, you just verify each one is taller than the last—one comparison per book, no rearranging needed.',
  },
  {
    id: 37,
    category: 'Algorithm Analysis',
    difficulty: 'hard',
    question:
      'What is the time complexity of accessing an element in a balanced BST?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation:
      'A balanced BST maintains O(log n) height, so searches take O(log n) time. Each comparison eliminates half the remaining nodes. Unbalanced BSTs can degrade to O(n).',
    realWorld:
      "A well-organized phone directory (BST): finding 'Martinez' means comparing at root, going left/right based on alphabetical order, eliminating half the names each step.",
  },
  {
    id: 38,
    category: 'Algorithm Analysis',
    difficulty: 'medium',
    question:
      'Which algorithm design approach solves problems by breaking them into smaller subproblems, solving each independently, then combining results?',
    options: [
      'Greedy Algorithm',
      'Dynamic Programming',
      'Divide and Conquer',
      'Brute Force',
    ],
    correctAnswer: 2,
    explanation:
      'Divide and Conquer: (1) Divide into subproblems, (2) Conquer by solving recursively, (3) Combine solutions. Examples: Merge Sort, Quick Sort, Binary Search.',
    realWorld:
      'Merge Sort: divide a deck of cards into halves repeatedly until you have single cards, then merge pairs in sorted order back up to get the full sorted deck.',
  },
  {
    id: 39,
    category: 'Algorithm Analysis',
    difficulty: 'hard',
    question: 'Dynamic Programming differs from Divide and Conquer because it:',
    options: [
      'Uses iteration instead of recursion',
      'Stores and reuses solutions to overlapping subproblems',
      'Always runs in linear time',
      'Only works with arrays',
    ],
    correctAnswer: 1,
    explanation:
      'Dynamic Programming (DP) remembers solutions to subproblems that occur multiple times (memoization). Divide and Conquer has independent subproblems, while DP has overlapping ones.',
    realWorld:
      'Calculating Fibonacci: F(5) = F(4) + F(3), but F(4) also needs F(3). DP stores F(3) once instead of recalculating it—saves exponential time!',
  },
  {
    id: 40,
    category: 'Algorithm Analysis',
    difficulty: 'medium',
    question: 'A Greedy Algorithm:',
    options: [
      'Always finds the optimal solution',
      'Makes the locally optimal choice at each step hoping for global optimum',
      'Examines all possible solutions',
      'Uses recursion exclusively',
    ],
    correctAnswer: 1,
    explanation:
      "Greedy algorithms make the best choice at each step without considering future consequences. They don't always find the optimal solution but are often fast and simple.",
    realWorld:
      "Making change with fewest coins: always pick the largest coin that fits. For 67¢ with US coins: 50¢ + 10¢ + 5¢ + 1¢ + 1¢ = 5 coins. Works well for US coins!",
  },

  // === REAL-WORLD APPLICATIONS ===
  {
    id: 41,
    category: 'Real-World Applications',
    difficulty: 'easy',
    question:
      'Which data structure is used to implement the function call stack in programming?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 1,
    explanation:
      'Function calls use a Stack: when a function is called, its context is pushed. When it returns, the context is popped. This handles nested function calls perfectly.',
    realWorld:
      'main() calls calculate() calls add(). When add() returns, we resume calculate(). When calculate() returns, we resume main(). Pure LIFO order!',
  },
  {
    id: 42,
    category: 'Real-World Applications',
    difficulty: 'easy',
    question: 'What data structure does a printer queue use?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 1,
    explanation:
      'Print jobs use a Queue (FIFO): first document sent to print is printed first. Jobs wait in line and are processed in arrival order.',
    realWorld:
      'Office printer: You send a 1-page document, colleague sends 50 pages, you send another. Your first document prints first, then 50 pages, then your second document.',
  },
  {
    id: 43,
    category: 'Real-World Applications',
    difficulty: 'medium',
    question: 'File systems on computers are best represented as:',
    options: ['Arrays', 'Stacks', 'Queues', 'Trees'],
    correctAnswer: 3,
    explanation:
      'File systems are hierarchical trees: root directory contains subdirectories and files, subdirectories contain more subdirectories and files, and so on.',
    realWorld:
      'C:\\Users\\Documents\\Work\\report.pdf — each folder is a node, files are leaves. You can navigate up to parent folders or down into subfolders.',
  },
  {
    id: 44,
    category: 'Real-World Applications',
    difficulty: 'medium',
    question:
      'Google Maps finding the shortest route uses which data structure primarily?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctAnswer: 3,
    explanation:
      "Road networks are Graphs: intersections are vertices, roads are edges (with distances as weights). Algorithms like Dijkstra's find shortest paths through the graph.",
    realWorld:
      "Getting from home to work: multiple routes exist through the road network. Google Maps' graph algorithms find the fastest path considering distance, traffic, and road types.",
  },
  {
    id: 45,
    category: 'Real-World Applications',
    difficulty: 'hard',
    question:
      'Database indexes commonly use which data structure for efficient searching?',
    options: [
      'Array',
      'Stack',
      'B-Tree (a type of balanced tree)',
      'Queue',
    ],
    correctAnswer: 2,
    explanation:
      'Databases use B-Trees (balanced trees optimized for disk access) for indexes. They provide O(log n) search, insert, and delete while minimizing disk reads.',
    realWorld:
      'Finding a customer by ID in a million records: without index (O(n)) = scanning potentially all records. With B-Tree index (O(log n)) ≈ 20 disk reads maximum!',
  },
  {
    id: 46,
    category: 'Real-World Applications',
    difficulty: 'medium',
    question: 'The HTML DOM (Document Object Model) is structured as a:',
    options: ['Linked List', 'Stack', 'Tree', 'Graph'],
    correctAnswer: 2,
    explanation:
      'The DOM is a tree structure: the document is the root, html is its child, body and head are children of html, and so on. Each element can have child elements.',
    realWorld:
      'When you use document.querySelector(), you\'re traversing the DOM tree. Parent elements contain child elements, just like folders contain files.',
  },
  {
    id: 47,
    category: 'Real-World Applications',
    difficulty: 'hard',
    question: 'CPU scheduling in operating systems typically uses which data structure?',
    options: ['Stack', 'Priority Queue', 'Linked List', 'Binary Tree'],
    correctAnswer: 1,
    explanation:
      'CPU scheduling uses Priority Queues (often implemented with heaps) to manage processes based on priority. Higher priority processes get CPU time first.',
    realWorld:
      'Your computer runs many programs. System processes get higher priority than your browser, which gets higher priority than background downloads.',
  },
  {
    id: 48,
    category: 'Real-World Applications',
    difficulty: 'medium',
    question: 'Social network friend suggestions typically use:',
    options: ['Stack traversal', 'Queue traversal', 'Graph algorithms (BFS/DFS)', 'Binary search'],
    correctAnswer: 2,
    explanation:
      'Friend suggestions use graph algorithms like BFS (Breadth-First Search) to find "friends of friends." The social network is a graph where users are nodes and connections are edges.',
    realWorld:
      'LinkedIn shows "2nd connections"—people connected to your direct connections. This is found by traversing the social graph 2 levels deep.',
  },
];

export default theoryQuestions;
