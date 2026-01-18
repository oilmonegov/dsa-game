# DSA Interactive Learning Game - Project Specification

## Project Overview

Build an interactive learning game for CSC 731 - Data Structures and Algorithms course. The game should teach theory, test understanding through interactive diagram completion, and provide real-world context for why these concepts matter.

## Target User
- PGD Computer Science student
- Needs to understand both theory AND practical applications
- Must be able to practice repeatedly until mastery
- Wants downloadable results to track progress

## Core Requirements

### 1. Game Modules (5 Total)

#### Module 1: Theory Quiz
- Multiple choice questions covering all course topics
- Categories: Data Structures Basics, Linear/Non-Linear, Trees, Binary Trees, Traversals, Algorithm Analysis
- Show explanation after each answer
- Include real-world application for each concept

#### Module 2: Interactive Diagram Completion
- Use Cytoscape.js or D3.js for interactive tree/graph diagrams
- Present incomplete diagrams where user must:
  - Drag nodes to correct positions
  - Fill in missing node values
  - Connect nodes with correct edges
- Diagram types needed:
  - General tree structures (parent-child relationships)
  - Binary trees (left/right children)
  - Tree traversal order (label nodes 1-7 in correct order)
  - Organizational hierarchy (Company XYZ example)

#### Module 3: Traversal Challenge
- Given a tree, user must click nodes in correct traversal order
- Support all 4 traversals: Preorder, Inorder, Postorder, Level Order
- Visual feedback showing the path taken
- Timer for competitive element

#### Module 4: Real-World Matching
- Match data structures to their real-world applications
- Drag-and-drop interface
- Examples:
  - Stack → Browser back button, Undo/Redo, Function calls
  - Queue → Print queue, CPU scheduling, Message queues
  - Tree → File systems, HTML DOM, Organization charts
  - Binary Search Tree → Database indexes, Autocomplete
  - Graph → Social networks, Google Maps, Internet routing

#### Module 5: Fill-in-the-Blank / Code Completion
- Complete algorithm pseudocode
- Fill missing parts of tree ADT methods
- Identify time complexity of given code

### 2. Scoring System
- Points per correct answer (varies by difficulty)
- Time bonus for quick answers
- Streak multiplier for consecutive correct answers
- Passing score: 70%

### 3. Progress & Results
- Track scores per module and overall
- Store progress in localStorage
- Downloadable results as PDF/image showing:
  - Date and time
  - Score per module
  - Overall percentage
  - Areas needing improvement
  - Time taken

### 4. Retry & Practice
- "Try Again" button for failed modules
- Practice mode (no scoring, just learning)
- Review incorrect answers with explanations

## Technical Requirements

### Frontend Stack
- React (single-file JSX for artifact compatibility)
- Cytoscape.js for interactive graph/tree diagrams
- Tailwind CSS for styling
- localStorage for persistence

### Design Direction
- Clean, academic but engaging aesthetic
- Color scheme: Blues and greens (knowledge/growth)
- Clear visual hierarchy
- Smooth animations for feedback
- Mobile-responsive

### Key Libraries
```javascript
// Available in React artifacts:
import { useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
// For Cytoscape, use CDN: https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.23.0/cytoscape.min.js
```

## Course Content Summary

### Topics Covered (from CSC 731 Lecture Notes)

#### 1. About the Course
- Technique vs Programming Language
- Phone book lookup example (Sequential vs Binary Search)
- Algorithm = step-by-step procedure

#### 2. Data Structures Classification
```
Data Structures
├── Primitive
│   ├── Integer
│   ├── Real (Float)
│   ├── Character
│   └── Boolean
└── Non-Primitive (ADTs)
    ├── Linear
    │   ├── Array
    │   ├── Stack (LIFO)
    │   ├── Queue (FIFO)
    │   └── Linked List
    └── Non-Linear
        ├── Tree
        ├── Graph
        └── Set
```

#### 3. Data Structure Operations
- Traversing: Access each record exactly once
- Searching: Find location of record with given key
- Inserting: Add new record
- Deleting: Remove record
- Sorting: Arrange in logical order
- Merging: Combine two sorted files

#### 4. Algorithm Types
- Greedy Algorithms: Local optimum hoping for global optimum
- Dynamic Programming: Remember past results
- Divide & Conquer: Split, solve, combine

#### 5. Tree Terminology
- Root: Topmost node (no parent)
- Parent/Child: Hierarchical relationship
- Leaf: Node with no children
- Internal Node: Node with at least one child
- Siblings: Nodes with same parent
- Ancestors/Descendants: Path relationships
- Height: Longest path from node to leaf
- Depth: Path length from root to node
- Degree: Number of children
- Size: Total number of nodes

#### 6. Tree ADT Methods
- Accessor: root(), parent(p), children(p)
- Generic: size(), isEmpty(), iterator(), positions()
- Query: isInternal(p), isExternal(p), isRoot(p)
- Update: replace(p, e)

#### 7. Binary Trees
- Each node has at most 2 children (left, right)
- Left vs Right child distinction MATTERS
- Empty tree is valid for binary trees
- Full Binary Tree: All leaves same level, all internal nodes have 2 children
- Complete Binary Tree: Full except missing leaves on right of bottom level

#### 8. Binary Tree Formulas
- Full binary tree height h:
  - Leaves: 2^h
  - Internal nodes: 2^h - 1
  - Total nodes: 2^(h+1) - 1
- Array representation (root at index 1):
  - Parent of i: i/2
  - Left child of i: 2i
  - Right child of i: 2i + 1

#### 9. Tree Traversals
- Level Order: Level by level, left to right (uses Queue)
- Preorder: Root → Left → Right (flag on LEFT)
- Inorder: Left → Root → Right (flag on BOTTOM) - BINARY TREES ONLY
- Postorder: Left → Right → Root (flag on RIGHT)

#### 10. Algorithm Analysis
- Count primitive operations as function of input size n
- Big-O Notation:
  - O(1): Constant
  - O(log n): Logarithmic (Binary Search)
  - O(n): Linear
  - O(n log n): Linearithmic (Merge Sort)
  - O(n²): Quadratic (Insertion Sort worst case)
- Worst-case analysis: Ascending array [1,2,3,4] needs most comparisons

#### 11. Insertion Sort
- Start with size 1, repeatedly insert remaining elements
- Compare and shift elements to make room
- Time: O(n²) worst case, O(n) best case (already sorted)

## Sample Questions for Game

### Theory Questions (MCQ)
1. What is the time complexity of accessing an array element by index? → O(1)
2. Which traversal gives sorted output from BST? → Inorder
3. What data structure does browser's back button use? → Stack
4. In a Queue, elements are added at ___ and removed from ___ → rear, front
5. What is the height of a single-node tree? → 0

### Diagram Challenges
1. Complete the binary tree: Given root and left child, add right child
2. Label nodes in preorder: Number nodes 1-7 in correct order
3. Build Company XYZ org chart: Drag employees to correct positions
4. Connect parent-child: Draw edges between related nodes

### Traversal Challenges
Given tree:
```
       A
      / \
     B   C
    / \   \
   D   E   F
```
- Preorder: A, B, D, E, C, F
- Inorder: D, B, E, A, C, F
- Postorder: D, E, B, F, C, A
- Level Order: A, B, C, D, E, F

### Real-World Matching
| Structure | Application |
|-----------|-------------|
| Stack | Undo/Redo, Browser back, Call stack |
| Queue | Print jobs, CPU scheduling, BFS |
| Tree | File systems, DOM, Org charts |
| BST | Database indexes, Dictionaries |
| Heap | Priority queues, Heap sort |
| Graph | Social networks, Maps, Internet |

## File Structure (Suggested)
```
dsa-game/
├── PROJECT_SPEC.md (this file)
├── src/
│   ├── App.jsx (main component)
│   ├── components/
│   │   ├── GameMenu.jsx
│   │   ├── TheoryQuiz.jsx
│   │   ├── DiagramChallenge.jsx
│   │   ├── TraversalGame.jsx
│   │   ├── RealWorldMatch.jsx
│   │   └── Results.jsx
│   ├── data/
│   │   ├── questions.js
│   │   └── diagrams.js
│   └── utils/
│       ├── scoring.js
│       └── storage.js
└── index.html
```

## Implementation Notes

### For Cytoscape.js Integration
```javascript
// Initialize Cytoscape
const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    { data: { id: 'a', label: 'A' } },
    { data: { id: 'b', label: 'B' } },
    { data: { source: 'a', target: 'b' } }
  ],
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#3b82f6',
        'label': 'data(label)',
        'color': '#fff',
        'text-valign': 'center'
      }
    }
  ],
  layout: { name: 'breadthfirst', roots: ['a'] }
});
```

### For Results Download
```javascript
// Use html2canvas or similar to capture results
import html2canvas from 'html2canvas';

const downloadResults = async () => {
  const element = document.getElementById('results');
  const canvas = await html2canvas(element);
  const link = document.createElement('a');
  link.download = `DSA_Results_${new Date().toISOString()}.png`;
  link.href = canvas.toDataURL();
  link.click();
};
```

### localStorage Structure
```javascript
const gameState = {
  currentModule: 1,
  scores: {
    theory: { correct: 0, total: 0, time: 0 },
    diagrams: { correct: 0, total: 0, time: 0 },
    traversals: { correct: 0, total: 0, time: 0 },
    realWorld: { correct: 0, total: 0, time: 0 },
    codeCompletion: { correct: 0, total: 0, time: 0 }
  },
  history: [], // Past attempts
  lastPlayed: null
};
localStorage.setItem('dsa_game', JSON.stringify(gameState));
```

## Success Criteria
1. ✅ All 5 modules functional
2. ✅ Interactive diagrams work smoothly
3. ✅ Scores persist across sessions
4. ✅ Results downloadable as image
5. ✅ Mobile responsive
6. ✅ Clear explanations for learning
7. ✅ Real-world examples for every concept
8. ✅ Retry functionality works

---

## How to Use This Spec with Claude Code

1. Copy this file to your project directory
2. Run Claude Code: `claude`
3. Tell Claude: "Read PROJECT_SPEC.md and build the DSA learning game"
4. Claude will implement each module based on this specification

The complete study guide HTML is also available at:
`/mnt/user-data/outputs/CSC731_Complete_Study_Guide.html`
