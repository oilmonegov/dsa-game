# Instructions for Claude Code

## Quick Start

Run this in Claude Code:
```
Read PROJECT_SPEC.md and the reference files, then build the DSA Interactive Learning Game as a single-page React application.
```

## Project Context

This is an interactive learning game for a PGD Computer Science course (CSC 731 - Data Structures and Algorithms). The student needs to:
1. Learn theory through quizzes
2. Practice with interactive diagram completion
3. Master tree traversals through hands-on exercises
4. Connect concepts to real-world applications
5. Track progress and download results

## Key Files

- `PROJECT_SPEC.md` - Complete specification with requirements, course content, and implementation notes
- `reference/CSC731_Complete_Study_Guide.html` - The full study guide HTML (use as content reference)
- `reference/course_content.txt` - Original lecture notes

## Technical Approach

### Recommended: Single React Artifact
Build as ONE comprehensive React component file that can run in Claude's artifact system:
- Use React hooks (useState, useEffect, useCallback)
- Use Cytoscape.js via CDN for interactive diagrams
- Use Tailwind CSS for styling
- Use localStorage for persistence

### Build Order
1. **Core game shell** - Navigation, state management, scoring
2. **Theory Quiz module** - MCQ with explanations
3. **Diagram Challenge module** - Cytoscape.js interactive trees
4. **Traversal Game module** - Click nodes in order
5. **Real-World Match module** - Drag-drop matching
6. **Results module** - Score display, download, history

## Important Notes

1. **Cytoscape.js** - Best for tree/graph diagrams with drag-drop
2. **localStorage** - Use for saving progress between sessions
3. **Results download** - Capture the results div as an image
4. **Mobile responsive** - Many students study on phones
5. **Academic accuracy** - All content must be correct (this is for exams!)

## Course Topics to Cover

1. Data Structures: Primitive vs Non-Primitive, Linear vs Non-Linear
2. Operations: Traversing, Searching, Inserting, Deleting, Sorting, Merging
3. Trees: Root, Parent, Child, Leaf, Height, Depth, Degree, Siblings
4. Binary Trees: Left/Right children, Full vs Complete, Array representation
5. Traversals: Preorder, Inorder, Postorder, Level Order
6. Algorithm Analysis: Big-O notation, Worst-case analysis
7. Sorting: Insertion Sort

## Design Aesthetic

- Clean, academic but engaging
- Primary: Blue (#3b82f6) - knowledge, trust
- Secondary: Green (#10b981) - growth, success
- Accent: Purple (#8b5cf6) - creativity
- Error: Red (#ef4444) - wrong answers
- Smooth animations for feedback
- Clear typography

---

Start by reading PROJECT_SPEC.md thoroughly, then implement the game module by module.
