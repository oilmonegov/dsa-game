# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DSA Interactive Learning Game - a React-based educational web app for CSC 731 (Data Structures & Algorithms). Features five learning modules: Theory Quiz, Diagram Challenge, Traversal Game, Real-World Match, and Code Completion.

## Commands

```bash
# Development
npm run dev              # Start Vite dev server
npm run build            # TypeScript check + Vite production build
npm run preview          # Preview production build

# Testing
npm test                 # Run Vitest in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage

# Code Quality
npm run lint             # ESLint check (zero warnings policy)
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier format
npm run format:check     # Prettier check
npm run typecheck        # TypeScript type checking only
```

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build**: Vite
- **State**: Zustand (persisted to localStorage)
- **Database**: sql.js (SQLite in browser, persisted to localStorage as base64)
- **Styling**: Tailwind CSS
- **Diagrams**: Cytoscape.js for interactive tree/graph visualizations
- **Testing**: Vitest + React Testing Library

### Key Patterns

**Module Structure**: Each game module follows a consistent pattern:
- `src/components/{module}/` - React components for the module
- `src/data/{module}.ts` - Static data (questions, challenges)
- `src/store/{module}Store.ts` - Zustand store for module state
- `src/types/{module}.ts` - TypeScript types

**Database Layer** (`src/db/database.ts`):
- sql.js initializes from CDN WASM file
- Database persists to localStorage as base64-encoded blob
- Tables: `users`, `scores`, `attempts`, `settings`
- All DB operations are async

**Scoring System** (`src/utils/scoring.ts`):
- Base points by difficulty (Easy: 10, Medium: 20, Hard: 30)
- Time bonus multipliers (<10s: 1.5x, <20s: 1.2x)
- Streak multipliers (3+: 1.2x, 5+: 1.5x, 7+: 2x, 10+: 2.5x)
- Passing threshold: 70%

**Path Aliases**: Use `@/` for `src/` imports (configured in tsconfig and vite.config)

### Module IDs
```typescript
type ModuleId = 'theory' | 'diagrams' | 'traversals' | 'realWorld' | 'codeCompletion';
```

### Component Hierarchy
```
App.tsx
├── GameMenu.tsx (module selection)
├── TheoryQuiz (src/components/quiz/)
├── DiagramChallenge (src/components/diagram/) - uses Cytoscape.js
├── TraversalGame (src/components/traversal/)
├── RealWorldMatch (src/components/realworld/)
└── CodeCompletion (src/components/codecompletion/)
```

Common components in `src/components/common/` include: Button, Card, Modal, Toast, ErrorBoundary, LoadingSpinner.

### State Management
- `gameStore.ts` - Global game state, scores, practice mode
- Module-specific stores handle local quiz/challenge state
- Database syncs with Zustand stores on score updates

## Security

Cursor rules require running `snyk_code_scan` on new/modified code and fixing any issues found before completion.
