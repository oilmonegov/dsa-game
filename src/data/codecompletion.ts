import type { CodeCompletionChallenge } from '@/types/codecompletion';

export const codeCompletionChallenges: CodeCompletionChallenge[] = [
  // EASY - Fill in the blanks
  {
    id: 1,
    title: 'Binary Search Basics',
    description: 'Complete the binary search algorithm to find a target value.',
    type: 'fill-blank',
    difficulty: 'easy',
    category: 'Searching',
    algorithm: 'Binary Search',
    language: 'pseudocode',
    codeTemplate: `function binarySearch(arr, target):
    left = 0
    right = ___BLANK1___

    while left <= right:
        mid = (left + right) / 2

        if arr[mid] == target:
            return ___BLANK2___
        else if arr[mid] < target:
            left = ___BLANK3___
        else:
            right = mid - 1

    return -1`,
    blanks: [
      { id: 'BLANK1', lineNumber: 3, position: 12, length: 12, correctAnswer: 'arr.length - 1', hint: 'Last valid index' },
      { id: 'BLANK2', lineNumber: 9, position: 19, length: 8, correctAnswer: 'mid', hint: 'What index did we find?' },
      { id: 'BLANK3', lineNumber: 11, position: 19, length: 10, correctAnswer: 'mid + 1', hint: 'Search right half' },
    ],
    explanation: 'Binary search divides the search space in half each iteration. We update left to mid+1 when target is larger, and right to mid-1 when target is smaller.',
    hint: 'Think about which half of the array to search next.',
  },
  {
    id: 2,
    title: 'Stack Push & Pop',
    description: 'Complete the basic stack operations.',
    type: 'fill-blank',
    difficulty: 'easy',
    category: 'Data Structure Operations',
    algorithm: 'Stack',
    language: 'pseudocode',
    codeTemplate: `class Stack:
    items = []

    function push(item):
        items.___BLANK1___(item)

    function pop():
        if isEmpty():
            return null
        return items.___BLANK2___()

    function isEmpty():
        return items.length == ___BLANK3___`,
    blanks: [
      { id: 'BLANK1', lineNumber: 5, position: 14, length: 10, correctAnswer: 'append', hint: 'Add to the end' },
      { id: 'BLANK2', lineNumber: 10, position: 21, length: 8, correctAnswer: 'pop', hint: 'Remove from end' },
      { id: 'BLANK3', lineNumber: 13, position: 30, length: 5, correctAnswer: '0', hint: 'Empty means no items' },
    ],
    explanation: 'Stacks use LIFO (Last-In-First-Out). Push adds to the top (end), pop removes from the top. isEmpty checks if length is 0.',
    hint: 'Stacks add and remove from the same end.',
  },
  {
    id: 3,
    title: 'Linear Search',
    description: 'Complete the simple linear search algorithm.',
    type: 'fill-blank',
    difficulty: 'easy',
    category: 'Searching',
    algorithm: 'Linear Search',
    language: 'pseudocode',
    codeTemplate: `function linearSearch(arr, target):
    for i = 0 to ___BLANK1___:
        if arr[___BLANK2___] == target:
            return ___BLANK3___
    return -1`,
    blanks: [
      { id: 'BLANK1', lineNumber: 2, position: 17, length: 12, correctAnswer: 'arr.length - 1', hint: 'Loop through all elements' },
      { id: 'BLANK2', lineNumber: 3, position: 15, length: 5, correctAnswer: 'i', hint: 'Current index' },
      { id: 'BLANK3', lineNumber: 4, position: 19, length: 5, correctAnswer: 'i', hint: 'Return found index' },
    ],
    explanation: 'Linear search checks each element one by one until finding the target or reaching the end.',
    hint: 'We need to check every element from start to end.',
  },

  // EASY - Complexity identification
  {
    id: 4,
    title: 'Basic Complexity Analysis',
    description: 'Identify the time complexity of these common operations.',
    type: 'complexity',
    difficulty: 'easy',
    category: 'Algorithm Analysis',
    algorithm: 'Various',
    language: 'pseudocode',
    codeTemplate: `// Operation 1: Array access
value = arr[5]

// Operation 2: Linear search
for i = 0 to n:
    if arr[i] == target: return i

// Operation 3: Nested loops
for i = 0 to n:
    for j = 0 to n:
        print(i, j)`,
    blanks: [],
    complexityQuestions: [
      { id: 'Q1', question: 'Array access by index (arr[5])', correctAnswer: 'O(1)', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'] },
      { id: 'Q2', question: 'Linear search through array', correctAnswer: 'O(n)', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'] },
      { id: 'Q3', question: 'Nested loops (both 0 to n)', correctAnswer: 'O(n²)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'] },
    ],
    explanation: 'Array access is O(1) - direct index. Linear search is O(n) - may check all elements. Nested loops multiply: n × n = O(n²).',
    hint: 'Count how many times the innermost operation runs.',
  },

  // MEDIUM - Fill in the blanks
  {
    id: 5,
    title: 'Merge Sort Merge Step',
    description: 'Complete the merge function that combines two sorted arrays.',
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'Sorting',
    algorithm: 'Merge Sort',
    language: 'pseudocode',
    codeTemplate: `function merge(left, right):
    result = []
    i = 0, j = 0

    while i < left.length AND j < right.length:
        if left[i] ___BLANK1___ right[j]:
            result.append(left[i])
            i = ___BLANK2___
        else:
            result.append(right[j])
            j = j + 1

    // Append remaining elements
    while i < left.length:
        result.append(___BLANK3___)
        i = i + 1

    while j < right.length:
        result.append(right[j])
        j = j + 1

    return result`,
    blanks: [
      { id: 'BLANK1', lineNumber: 6, position: 20, length: 5, correctAnswer: '<=', hint: 'For stable sort, include equal' },
      { id: 'BLANK2', lineNumber: 8, position: 16, length: 8, correctAnswer: 'i + 1', hint: 'Move to next left element' },
      { id: 'BLANK3', lineNumber: 16, position: 23, length: 8, correctAnswer: 'left[i]', hint: 'Remaining left elements' },
    ],
    explanation: 'Merge compares elements from both sorted arrays, taking the smaller one each time. Using <= makes it stable (preserves order of equal elements).',
    hint: 'We compare and take the smaller element, then move that pointer forward.',
  },
  {
    id: 6,
    title: 'BST Insert',
    description: 'Complete the binary search tree insertion algorithm.',
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'Tree Traversal',
    algorithm: 'BST Insert',
    language: 'pseudocode',
    codeTemplate: `function insert(root, value):
    if root == ___BLANK1___:
        return new Node(value)

    if value < root.value:
        root.left = insert(___BLANK2___, value)
    else:
        root.right = insert(___BLANK3___, value)

    return root`,
    blanks: [
      { id: 'BLANK1', lineNumber: 2, position: 17, length: 6, correctAnswer: 'null', hint: 'Base case: empty spot' },
      { id: 'BLANK2', lineNumber: 6, position: 28, length: 10, correctAnswer: 'root.left', hint: 'Recurse into left subtree' },
      { id: 'BLANK3', lineNumber: 8, position: 29, length: 11, correctAnswer: 'root.right', hint: 'Recurse into right subtree' },
    ],
    explanation: 'BST insert recursively finds the correct position. Values less than current go left, greater go right. When we hit null, we create the new node.',
    hint: 'BST property: left < parent < right.',
  },
  {
    id: 7,
    title: 'Queue with Array',
    description: 'Complete the queue implementation using an array.',
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'Data Structure Operations',
    algorithm: 'Queue',
    language: 'pseudocode',
    codeTemplate: `class Queue:
    items = []

    function enqueue(item):
        items.___BLANK1___(item)

    function dequeue():
        if isEmpty():
            return null
        return items.___BLANK2___(0)

    function front():
        if isEmpty():
            return null
        return items[___BLANK3___]`,
    blanks: [
      { id: 'BLANK1', lineNumber: 5, position: 14, length: 8, correctAnswer: 'append', hint: 'Add to the back' },
      { id: 'BLANK2', lineNumber: 10, position: 21, length: 8, correctAnswer: 'remove', hint: 'Remove from front' },
      { id: 'BLANK3', lineNumber: 15, position: 21, length: 5, correctAnswer: '0', hint: 'Front is first element' },
    ],
    explanation: 'Queues use FIFO (First-In-First-Out). Enqueue adds to back (append), dequeue removes from front (index 0).',
    hint: 'Queue: first in, first out - like a line of people.',
  },

  // MEDIUM - Complexity
  {
    id: 8,
    title: 'Sorting Complexity',
    description: 'Identify the time complexity of common sorting algorithms.',
    type: 'complexity',
    difficulty: 'medium',
    category: 'Sorting',
    algorithm: 'Various Sorting',
    language: 'pseudocode',
    codeTemplate: `// Bubble Sort (average case)
for i = 0 to n:
    for j = 0 to n-i-1:
        if arr[j] > arr[j+1]: swap

// Merge Sort
function mergeSort(arr):
    if length <= 1: return arr
    mid = length / 2
    left = mergeSort(arr[0:mid])
    right = mergeSort(arr[mid:])
    return merge(left, right)

// Quick Sort (average case)
Divide and conquer with pivot`,
    blanks: [],
    complexityQuestions: [
      { id: 'Q1', question: 'Bubble Sort (average/worst case)', correctAnswer: 'O(n²)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'] },
      { id: 'Q2', question: 'Merge Sort (all cases)', correctAnswer: 'O(n log n)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'] },
      { id: 'Q3', question: 'Quick Sort (average case)', correctAnswer: 'O(n log n)', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'] },
    ],
    explanation: 'Bubble sort has nested loops = O(n²). Merge/Quick sort divide the problem (log n levels) and do O(n) work per level = O(n log n).',
    hint: 'Divide-and-conquer algorithms often have log n in their complexity.',
  },

  // MEDIUM - Mixed
  {
    id: 9,
    title: 'Quick Sort Partition',
    description: 'Complete the partition function and identify its complexity.',
    type: 'mixed',
    difficulty: 'medium',
    category: 'Sorting',
    algorithm: 'Quick Sort',
    language: 'pseudocode',
    codeTemplate: `function partition(arr, low, high):
    pivot = arr[___BLANK1___]
    i = low - 1

    for j = low to high - 1:
        if arr[j] < pivot:
            i = ___BLANK2___
            swap(arr[i], arr[j])

    swap(arr[___BLANK3___], arr[high])
    return i + 1`,
    blanks: [
      { id: 'BLANK1', lineNumber: 2, position: 16, length: 6, correctAnswer: 'high', hint: 'Use last element as pivot' },
      { id: 'BLANK2', lineNumber: 7, position: 16, length: 8, correctAnswer: 'i + 1', hint: 'Move partition boundary' },
      { id: 'BLANK3', lineNumber: 10, position: 14, length: 8, correctAnswer: 'i + 1', hint: 'Place pivot in correct position' },
    ],
    complexityQuestions: [
      { id: 'Q1', question: 'Time complexity of partition function', correctAnswer: 'O(n)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'] },
    ],
    explanation: 'Partition uses the last element as pivot and rearranges so smaller elements are left, larger are right. It scans once through the array = O(n).',
    hint: 'The partition function processes each element exactly once.',
  },

  // HARD - Fill in the blanks
  {
    id: 10,
    title: 'Dijkstra\'s Algorithm',
    description: 'Complete Dijkstra\'s shortest path algorithm.',
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'Graph Algorithms',
    algorithm: 'Dijkstra',
    language: 'pseudocode',
    codeTemplate: `function dijkstra(graph, start):
    dist = {v: INFINITY for v in graph}
    dist[start] = ___BLANK1___
    pq = PriorityQueue()
    pq.push((0, start))

    while not pq.isEmpty():
        (d, u) = pq.pop()

        if d > dist[u]:
            ___BLANK2___

        for each neighbor v of u:
            newDist = dist[u] + ___BLANK3___
            if newDist < dist[v]:
                dist[v] = newDist
                pq.push((newDist, v))

    return dist`,
    blanks: [
      { id: 'BLANK1', lineNumber: 3, position: 18, length: 5, correctAnswer: '0', hint: 'Distance to start from start' },
      { id: 'BLANK2', lineNumber: 11, position: 12, length: 10, correctAnswer: 'continue', hint: 'Skip if already processed better' },
      { id: 'BLANK3', lineNumber: 14, position: 33, length: 15, correctAnswer: 'weight(u, v)', hint: 'Edge weight to neighbor' },
    ],
    explanation: 'Dijkstra uses a priority queue to always process the closest unvisited node. Distance to start is 0, and we relax edges to find shorter paths.',
    hint: 'We always process the node with minimum distance first.',
  },
  {
    id: 11,
    title: 'DFS Traversal',
    description: 'Complete the depth-first search algorithm.',
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'Graph Algorithms',
    algorithm: 'DFS',
    language: 'pseudocode',
    codeTemplate: `function DFS(graph, start):
    visited = Set()
    stack = [start]
    result = []

    while not stack.isEmpty():
        node = stack.___BLANK1___()

        if node in visited:
            continue

        visited.___BLANK2___(node)
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in ___BLANK3___:
                stack.push(neighbor)

    return result`,
    blanks: [
      { id: 'BLANK1', lineNumber: 7, position: 21, length: 6, correctAnswer: 'pop', hint: 'LIFO - Last In First Out' },
      { id: 'BLANK2', lineNumber: 12, position: 16, length: 6, correctAnswer: 'add', hint: 'Mark as visited' },
      { id: 'BLANK3', lineNumber: 16, position: 32, length: 8, correctAnswer: 'visited', hint: 'Check if already seen' },
    ],
    explanation: 'DFS uses a stack (LIFO) to explore as deep as possible before backtracking. We mark nodes visited to avoid cycles.',
    hint: 'DFS goes deep first - stack gives us LIFO behavior.',
  },
  {
    id: 12,
    title: 'BFS Traversal',
    description: 'Complete the breadth-first search algorithm.',
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'Graph Algorithms',
    algorithm: 'BFS',
    language: 'pseudocode',
    codeTemplate: `function BFS(graph, start):
    visited = Set()
    queue = [start]
    visited.add(start)
    result = []

    while not queue.isEmpty():
        node = queue.___BLANK1___()
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.___BLANK2___(___BLANK3___)

    return result`,
    blanks: [
      { id: 'BLANK1', lineNumber: 8, position: 22, length: 10, correctAnswer: 'dequeue', hint: 'FIFO - First In First Out' },
      { id: 'BLANK2', lineNumber: 14, position: 22, length: 8, correctAnswer: 'enqueue', hint: 'Add to back of queue' },
      { id: 'BLANK3', lineNumber: 14, position: 31, length: 10, correctAnswer: 'neighbor', hint: 'Add the unvisited neighbor' },
    ],
    explanation: 'BFS uses a queue (FIFO) to explore level by level. We mark nodes visited when adding to queue to prevent duplicates.',
    hint: 'BFS explores all neighbors at current depth before going deeper.',
  },

  // HARD - Complexity
  {
    id: 13,
    title: 'Advanced Complexity',
    description: 'Analyze the complexity of these algorithms.',
    type: 'complexity',
    difficulty: 'hard',
    category: 'Algorithm Analysis',
    algorithm: 'Various',
    language: 'pseudocode',
    codeTemplate: `// Binary Search
function binarySearch(arr, target):
    // Divides search space in half each time

// Fibonacci (naive recursive)
function fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

// Matrix multiplication (naive)
for i = 0 to n:
    for j = 0 to n:
        for k = 0 to n:
            C[i][j] += A[i][k] * B[k][j]`,
    blanks: [],
    complexityQuestions: [
      { id: 'Q1', question: 'Binary Search', correctAnswer: 'O(log n)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'] },
      { id: 'Q2', question: 'Naive Recursive Fibonacci', correctAnswer: 'O(2^n)', options: ['O(n)', 'O(n²)', 'O(2^n)', 'O(n!)'] },
      { id: 'Q3', question: 'Naive Matrix Multiplication', correctAnswer: 'O(n³)', options: ['O(n)', 'O(n²)', 'O(n³)', 'O(2^n)'] },
    ],
    explanation: 'Binary search halves input = O(log n). Naive Fibonacci has overlapping subproblems = O(2^n). Matrix multiply has 3 nested loops = O(n³).',
    hint: 'Count how the work grows as n increases.',
  },

  // HARD - Mixed
  {
    id: 14,
    title: 'Dynamic Programming - Fibonacci',
    description: 'Complete the memoized Fibonacci and analyze complexity.',
    type: 'mixed',
    difficulty: 'hard',
    category: 'Dynamic Programming',
    algorithm: 'Fibonacci',
    language: 'pseudocode',
    codeTemplate: `function fibMemo(n, memo = {}):
    if n in memo:
        return ___BLANK1___

    if n <= ___BLANK2___:
        return n

    memo[n] = fibMemo(n-1, memo) + fibMemo(___BLANK3___, memo)
    return memo[n]`,
    blanks: [
      { id: 'BLANK1', lineNumber: 3, position: 15, length: 8, correctAnswer: 'memo[n]', hint: 'Return cached result' },
      { id: 'BLANK2', lineNumber: 5, position: 12, length: 5, correctAnswer: '1', hint: 'Base case: fib(0)=0, fib(1)=1' },
      { id: 'BLANK3', lineNumber: 8, position: 43, length: 6, correctAnswer: 'n - 2', hint: 'Second recursive call' },
    ],
    complexityQuestions: [
      { id: 'Q1', question: 'Time complexity with memoization', correctAnswer: 'O(n)', options: ['O(1)', 'O(n)', 'O(n²)', 'O(2^n)'] },
      { id: 'Q2', question: 'Space complexity (memo table)', correctAnswer: 'O(n)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'] },
    ],
    explanation: 'Memoization caches results, so each fib(k) is computed only once. We compute n values = O(n) time, store n values = O(n) space.',
    hint: 'Memoization prevents redundant calculations.',
  },
  {
    id: 15,
    title: 'Heap Operations',
    description: 'Complete heap insert and analyze complexity.',
    type: 'mixed',
    difficulty: 'hard',
    category: 'Data Structure Operations',
    algorithm: 'Binary Heap',
    language: 'pseudocode',
    codeTemplate: `function heapInsert(heap, value):
    heap.append(value)
    index = heap.length - 1

    // Bubble up
    while index > 0:
        parent = (index - 1) / 2

        if heap[index] > heap[___BLANK1___]:
            swap(heap[index], heap[parent])
            index = ___BLANK2___
        else:
            ___BLANK3___`,
    blanks: [
      { id: 'BLANK1', lineNumber: 9, position: 32, length: 8, correctAnswer: 'parent', hint: 'Compare with parent' },
      { id: 'BLANK2', lineNumber: 11, position: 20, length: 8, correctAnswer: 'parent', hint: 'Move up to parent position' },
      { id: 'BLANK3', lineNumber: 13, position: 12, length: 8, correctAnswer: 'break', hint: 'Heap property satisfied' },
    ],
    complexityQuestions: [
      { id: 'Q1', question: 'Heap insert time complexity', correctAnswer: 'O(log n)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'] },
    ],
    explanation: 'Heap insert adds at the end and bubbles up. The tree height is log n, so worst case we swap log n times = O(log n).',
    hint: 'How many levels might we need to bubble up?',
  },
  {
    id: 16,
    title: 'Hash Table Operations',
    description: 'Complete hash table insert and understand complexity.',
    type: 'mixed',
    difficulty: 'medium',
    category: 'Data Structure Operations',
    algorithm: 'Hash Table',
    language: 'pseudocode',
    codeTemplate: `function hashInsert(table, key, value):
    index = ___BLANK1___(key) % table.size

    // Handle collision with chaining
    if table[index] == null:
        table[index] = []

    // Check if key exists
    for item in table[index]:
        if item.key == ___BLANK2___:
            item.value = value
            return

    table[index].append({key: key, value: ___BLANK3___})`,
    blanks: [
      { id: 'BLANK1', lineNumber: 2, position: 12, length: 6, correctAnswer: 'hash', hint: 'Compute hash of key' },
      { id: 'BLANK2', lineNumber: 10, position: 24, length: 5, correctAnswer: 'key', hint: 'Compare with input key' },
      { id: 'BLANK3', lineNumber: 14, position: 46, length: 8, correctAnswer: 'value', hint: 'Store the value' },
    ],
    complexityQuestions: [
      { id: 'Q1', question: 'Average case insert/lookup', correctAnswer: 'O(1)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'] },
      { id: 'Q2', question: 'Worst case (all collisions)', correctAnswer: 'O(n)', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'] },
    ],
    explanation: 'Hash tables have O(1) average case due to direct indexing. Worst case is O(n) if all keys hash to the same bucket (rare with good hash function).',
    hint: 'Consider what happens with no collisions vs all collisions.',
  },
];

export default codeCompletionChallenges;
