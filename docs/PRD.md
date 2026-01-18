# Product Requirements Document (PRD)
## DSA Interactive Learning Game

### Document Info
- **Version:** 1.0.0
- **Last Updated:** 2025-01-18
- **Status:** In Development

---

## 1. Product Overview

### 1.1 Vision
Create an engaging, interactive learning platform for mastering Data Structures and Algorithms (DSA) concepts, specifically designed for PGD Computer Science students studying CSC 731.

### 1.2 Problem Statement
Students often struggle with:
- Understanding abstract DSA concepts without visual representation
- Connecting theoretical knowledge to real-world applications
- Practicing repeatedly until achieving mastery
- Tracking progress and identifying weak areas

### 1.3 Solution
An interactive web-based game that combines theory quizzes, visual diagram challenges, and hands-on traversal exercises with immediate feedback and progress tracking.

---

## 2. Target Users

### 2.1 Primary User Persona
**Name:** Graduate CS Student
**Background:** PGD Computer Science student taking CSC 731
**Goals:**
- Understand both theory AND practical applications of DSA
- Practice repeatedly until mastery
- Track progress over time
- Prepare effectively for exams

**Pain Points:**
- Abstract concepts hard to visualize
- Difficulty connecting theory to practice
- No feedback on weak areas
- Can't track improvement over time

---

## 3. Features

### 3.1 Core Modules

| Module | Priority | Status | Description |
|--------|----------|--------|-------------|
| Theory Quiz | P0 | In Development | MCQ with explanations and real-world context |
| Diagram Challenge | P1 | Planned | Interactive tree/graph completion using Cytoscape.js |
| Traversal Game | P1 | Planned | Click nodes in correct traversal order |
| Real-World Match | P2 | Planned | Drag-drop matching of structures to applications |
| Code Completion | P2 | Planned | Fill-in-the-blank algorithm pseudocode |

### 3.2 Feature Details

#### 3.2.1 Theory Quiz Module
**User Stories:**
- As a student, I want to answer MCQ questions so I can test my understanding
- As a student, I want to see explanations after each answer so I can learn from mistakes
- As a student, I want to see real-world applications so I understand why concepts matter
- As a student, I want to filter by category so I can focus on weak areas

**Acceptance Criteria:**
- [ ] 45+ questions covering all course topics
- [ ] Questions categorized by topic and difficulty (easy/medium/hard)
- [ ] Immediate feedback with correct answer highlighted
- [ ] Detailed explanation for every question
- [ ] Real-world application example for every question
- [ ] Category filtering before starting quiz
- [ ] Random question selection (15 questions per session)
- [ ] Timer and streak tracking
- [ ] Points system with time and streak bonuses

#### 3.2.2 Diagram Challenge Module
**User Stories:**
- As a student, I want to complete tree diagrams so I can understand hierarchies
- As a student, I want to drag nodes to correct positions so I learn relationships
- As a student, I want visual feedback so I know if I'm correct

**Acceptance Criteria:**
- [ ] Interactive Cytoscape.js diagrams
- [ ] Drag-and-drop node placement
- [ ] Binary tree structure challenges
- [ ] General tree challenges
- [ ] Organizational hierarchy examples
- [ ] Visual feedback on correct/incorrect placement

#### 3.2.3 Traversal Game Module
**User Stories:**
- As a student, I want to click nodes in traversal order so I learn traversal algorithms
- As a student, I want support for all 4 traversal types so I master them all
- As a student, I want to see my path visually so I can track my progress

**Acceptance Criteria:**
- [ ] Preorder traversal challenges
- [ ] Inorder traversal challenges
- [ ] Postorder traversal challenges
- [ ] Level-order traversal challenges
- [ ] Visual path highlighting
- [ ] Timer for competitive element
- [ ] Undo last selection option

#### 3.2.4 Real-World Match Module
**User Stories:**
- As a student, I want to match data structures to applications so I understand use cases
- As a student, I want drag-drop interface so it's engaging

**Acceptance Criteria:**
- [ ] Drag-and-drop interface
- [ ] 15+ real-world matching pairs
- [ ] Feedback on correct/incorrect matches
- [ ] Examples: Stack→Undo, Queue→Print jobs, Tree→File system, etc.

#### 3.2.5 Code Completion Module
**User Stories:**
- As a student, I want to complete algorithm pseudocode so I understand implementations
- As a student, I want to identify time complexities so I can analyze algorithms

**Acceptance Criteria:**
- [ ] Fill-in-the-blank pseudocode
- [ ] Tree ADT method completions
- [ ] Time complexity identification questions
- [ ] Insertion sort step-by-step

### 3.3 Cross-Cutting Features

#### Scoring System
- Base points by difficulty (Easy: 10, Medium: 20, Hard: 30)
- Time bonus (< 10s: 1.5x, < 20s: 1.2x)
- Streak multiplier (3+: 1.2x, 5+: 1.5x, 7+: 2x, 10+: 2.5x)
- Passing threshold: 70%

#### Progress & Persistence
- SQLite database for storing progress
- Track scores per module and overall
- Store attempt history
- Calculate improvement areas
- Downloadable results as PDF/image

#### Practice Mode
- No scoring/tracking
- Same content for learning
- Immediate access to explanations

---

## 4. Technical Requirements

### 4.1 Technology Stack
| Component | Technology | Reason |
|-----------|------------|--------|
| Framework | React 18+ | Modern, component-based UI |
| Language | TypeScript | Type safety, better DX |
| Build Tool | Vite | Fast HMR, optimized builds |
| Styling | Tailwind CSS | Utility-first, rapid development |
| State | Zustand | Simple, lightweight state management |
| Database | sql.js (SQLite) | Portable, browser-based persistence |
| Diagrams | Cytoscape.js | Powerful graph visualization |
| Testing | Vitest + Testing Library | Fast, React-integrated testing |
| Linting | ESLint + Prettier | Code quality and consistency |
| Git Hooks | Husky + lint-staged | Pre-commit quality checks |

### 4.2 Project Structure
```
dsa-game/
├── docs/                    # Documentation
│   ├── PRD.md              # This document
│   ├── PROJECT_SPEC.md     # Technical specification
│   └── CLAUDE_CODE_INSTRUCTIONS.md
├── src/
│   ├── components/         # React components
│   │   ├── common/         # Shared components
│   │   ├── quiz/           # Theory quiz components
│   │   ├── diagram/        # Diagram challenge components
│   │   ├── traversal/      # Traversal game components
│   │   └── results/        # Results and progress components
│   ├── data/               # Question banks and static data
│   ├── db/                 # SQLite database layer
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand state stores
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── tests/                  # Test files
├── public/                 # Static assets
└── config files            # Various config files
```

### 4.3 Database Schema
```sql
-- Users (for future multi-user support)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT DEFAULT 'Student',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Module scores
CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER DEFAULT 1,
  module TEXT NOT NULL,
  correct INTEGER NOT NULL,
  total INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  time_spent INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Question attempts (for analytics)
CREATE TABLE IF NOT EXISTS attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER DEFAULT 1,
  question_id INTEGER NOT NULL,
  module TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  time_taken INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

### 4.4 Quality Requirements
- **Code Coverage:** Minimum 80% for utilities, 70% for components
- **Lighthouse Score:** 90+ for Performance, Accessibility, Best Practices
- **TypeScript:** Strict mode enabled
- **ESLint:** Zero warnings policy
- **Responsive:** Mobile-first design, works on all screen sizes

---

## 5. Design Requirements

### 5.1 Visual Design
- **Primary Color:** Blue (#3B82F6) - Knowledge, trust
- **Secondary Color:** Green (#10B981) - Success, growth
- **Accent Color:** Purple (#8B5CF6) - Creativity
- **Error Color:** Red (#EF4444) - Incorrect answers
- **Typography:** Inter font family
- **Style:** Clean, academic but engaging

### 5.2 UX Requirements
- Clear visual hierarchy
- Immediate feedback on interactions
- Smooth animations (300ms transitions)
- Progress indicators
- Accessible (WCAG 2.1 AA)
- Keyboard navigable

---

## 6. Success Metrics

### 6.1 Launch Criteria
- [ ] All P0 features complete and tested
- [ ] 80% code coverage for core modules
- [ ] No critical bugs
- [ ] Passing Lighthouse scores
- [ ] Documentation complete

### 6.2 KPIs
- User completes quiz without abandoning: 90%+
- Average quiz completion time: < 10 minutes
- Return rate (same user plays again): > 50%
- Error rate: < 1%

---

## 7. Timeline

### Phase 1: Foundation (Current)
- [x] Project setup with TypeScript, Vite
- [x] Git hooks and linting configuration
- [ ] Database layer implementation
- [ ] Core game shell and navigation

### Phase 2: Theory Quiz
- [ ] Question bank (45+ questions)
- [ ] Quiz component with scoring
- [ ] Results display
- [ ] Category filtering

### Phase 3: Interactive Features
- [ ] Diagram Challenge module
- [ ] Traversal Game module
- [ ] Real-World Match module

### Phase 4: Polish
- [ ] Code Completion module
- [ ] Results download (PDF/image)
- [ ] Performance optimization
- [ ] Final testing and bug fixes

---

## 8. Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| sql.js performance | Medium | Low | Use IndexedDB as fallback |
| Cytoscape.js complexity | High | Medium | Start with simple diagrams |
| Mobile touch interactions | Medium | Medium | Test early on real devices |
| Content accuracy | High | Low | Review all questions carefully |

---

## 9. Appendix

### 9.1 Course Topics Reference
1. Data Structures Classification (Primitive vs Non-Primitive, Linear vs Non-Linear)
2. Data Structure Operations (Traverse, Search, Insert, Delete, Sort, Merge)
3. Algorithm Types (Greedy, Dynamic Programming, Divide & Conquer)
4. Trees (Root, Parent, Child, Leaf, Height, Depth, Degree, Siblings)
5. Binary Trees (Full, Complete, Array representation)
6. Tree Traversals (Preorder, Inorder, Postorder, Level Order)
7. Algorithm Analysis (Big-O notation, Worst/Best case)
8. Sorting (Insertion Sort)

### 9.2 References
- CSC 731 Lecture Notes
- CSC731_Complete_Study_Guide.html
