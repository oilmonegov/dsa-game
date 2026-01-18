# DSA Learning Game

An interactive web-based learning game for mastering Data Structures and Algorithms, built for CSC 731 (Data Structures & Algorithms) coursework.

## Features

### Learning Modules

1. **Theory Quiz** - Multiple choice questions covering data structures, trees, traversals, and algorithm analysis with detailed explanations
2. **Diagram Challenge** - Interactive tree/graph completion using drag-and-drop with Cytoscape.js visualizations
3. **Traversal Game** - Practice tree traversals (Preorder, Inorder, Postorder, Level Order) by clicking nodes in the correct order
4. **Real-World Match** - Connect data structures to their practical applications (Stack → Undo/Redo, Queue → Print jobs, etc.)
5. **Code Completion** - Fill in algorithm pseudocode and identify time complexities

### Progress Tracking

- Scores persist across sessions using browser-based SQLite (sql.js)
- Track attempts, points, and time spent per module
- 70% passing threshold with visual progress indicators
- Practice mode available for learning without scoring

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/oilmonegov/dsa-game.git
cd dsa-game
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Select a Module** - Choose from the five learning modules on the main menu
2. **Answer Questions** - Each module presents interactive challenges
3. **Get Feedback** - Receive immediate feedback with explanations for each answer
4. **Track Progress** - View your scores and retry modules to improve
5. **Practice Mode** - Use practice mode to learn without affecting your scores

## Topics Covered

- Data Structures: Primitive vs Non-Primitive, Linear vs Non-Linear
- Operations: Traversing, Searching, Inserting, Deleting, Sorting, Merging
- Trees: Root, Parent, Child, Leaf, Height, Depth, Degree
- Binary Trees: Full, Complete, Array representation
- Traversals: Preorder, Inorder, Postorder, Level Order
- Algorithm Analysis: Big-O notation (O(1), O(log n), O(n), O(n²))
- Sorting: Insertion Sort

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- sql.js (SQLite in browser)
- Cytoscape.js (graph visualization)
- Vitest (testing)

## License

MIT
