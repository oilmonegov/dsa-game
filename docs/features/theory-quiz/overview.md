# Theory Quiz Module

## Overview
The Theory Quiz module is the foundational learning component of the DSA Interactive Learning Game. It tests students' understanding of Data Structures and Algorithms concepts through multiple-choice questions with immediate feedback, detailed explanations, and real-world application examples.

## Status
**Priority:** P0 (Critical)
**Status:** In Development
**Target Completion:** Phase 2

## User Stories

### US-TQ-001: Answer Quiz Questions
**As a** student
**I want to** answer multiple-choice questions about DSA topics
**So that** I can test my understanding of the material

**Acceptance Criteria:**
- Display one question at a time
- Show 4 answer options (A, B, C, D)
- Allow single selection only
- Provide immediate feedback on selection

### US-TQ-002: View Explanations
**As a** student
**I want to** see explanations after answering each question
**So that** I can learn from both correct and incorrect answers

**Acceptance Criteria:**
- Show explanation immediately after answer selection
- Highlight the correct answer
- Display detailed explanation text
- Include real-world application example

### US-TQ-003: Filter by Category
**As a** student
**I want to** filter questions by topic category
**So that** I can focus on areas where I need improvement

**Acceptance Criteria:**
- Show category filter before quiz starts
- Support filtering by: All, Data Structures Basics, Linear Structures, Non-Linear Structures, Trees, Binary Trees, Traversals, Algorithm Analysis
- Remember last selected category

### US-TQ-004: Track Progress
**As a** student
**I want to** see my score and progress during the quiz
**So that** I know how well I'm doing

**Acceptance Criteria:**
- Display current question number (e.g., "Question 5 of 15")
- Show running score (correct answers)
- Display streak counter when applicable
- Show elapsed time

### US-TQ-005: View Results
**As a** student
**I want to** see comprehensive results after completing the quiz
**So that** I can understand my performance

**Acceptance Criteria:**
- Show final score and percentage
- Display grade (A/B/C/D/F)
- Show time taken
- List areas needing improvement
- Provide option to retry or return to menu

## Technical Specification

### Component Structure
```
src/components/quiz/
├── TheoryQuiz.tsx       # Main quiz container
├── QuestionCard.tsx     # Question display component
├── AnswerOption.tsx     # Individual answer button
├── QuizProgress.tsx     # Progress bar and stats
├── QuizResults.tsx      # Results screen
├── CategoryFilter.tsx   # Category selection
└── index.ts            # Barrel export
```

### State Management
```typescript
interface QuizState {
  questions: Question[];
  currentIndex: number;
  selectedAnswer: number | null;
  showResult: boolean;
  score: {
    correct: number;
    total: number;
    points: number;
  };
  streak: number;
  timeSpent: number;
  questionStartTime: number;
  quizComplete: boolean;
  incorrectQuestions: Question[];
  selectedCategory: string;
}
```

### Data Model
```typescript
interface Question {
  id: number;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  realWorld: string;
}

type QuestionCategory =
  | 'Data Structures Basics'
  | 'Linear Data Structures'
  | 'Non-Linear Data Structures'
  | 'Trees'
  | 'Binary Trees'
  | 'Traversals'
  | 'Algorithm Analysis'
  | 'Real-World Applications';
```

## Scoring System

### Base Points
| Difficulty | Points |
|------------|--------|
| Easy | 10 |
| Medium | 20 |
| Hard | 30 |

### Time Bonus Multipliers
| Response Time | Multiplier |
|---------------|------------|
| < 10 seconds | 1.5x |
| < 20 seconds | 1.2x |
| < 30 seconds | 1.0x |
| > 30 seconds | 1.0x |

### Streak Multipliers
| Streak Length | Multiplier |
|---------------|------------|
| 3+ correct | 1.2x |
| 5+ correct | 1.5x |
| 7+ correct | 2.0x |
| 10+ correct | 2.5x |

## Question Bank Requirements

### Coverage by Category
| Category | Min Questions | Difficulty Mix |
|----------|---------------|----------------|
| Data Structures Basics | 8 | 3 easy, 3 medium, 2 hard |
| Linear Data Structures | 6 | 2 easy, 2 medium, 2 hard |
| Non-Linear Data Structures | 4 | 1 easy, 2 medium, 1 hard |
| Trees | 8 | 3 easy, 3 medium, 2 hard |
| Binary Trees | 6 | 2 easy, 2 medium, 2 hard |
| Traversals | 8 | 2 easy, 4 medium, 2 hard |
| Algorithm Analysis | 8 | 2 easy, 4 medium, 2 hard |
| **Total** | **48+** | - |

### Quality Requirements
- Every question must have a clear, unambiguous correct answer
- All distractors (wrong answers) must be plausible
- Explanations must be educational, not just "X is correct"
- Real-world examples must be relatable and accurate

## UI/UX Design

### States
1. **Category Selection** - Initial state, choose topic filter
2. **Question Active** - Display question, await answer
3. **Answer Revealed** - Show correct/incorrect, explanation
4. **Quiz Complete** - Display final results

### Animations
- Fade in for question transitions (300ms)
- Pulse effect for correct answers
- Shake effect for incorrect answers
- Progress bar smooth transition

### Color Scheme
- Correct answer: Green (#10B981)
- Incorrect answer: Red (#EF4444)
- Selected (pre-submit): Blue (#3B82F6)
- Neutral: Gray (#6B7280)

## Testing Requirements

### Unit Tests
- [ ] Question shuffling produces random order
- [ ] Score calculation is accurate
- [ ] Time bonus applies correctly
- [ ] Streak multiplier works
- [ ] Category filtering works

### Component Tests
- [ ] Question renders correctly
- [ ] Answer selection works
- [ ] Feedback displays correctly
- [ ] Progress updates correctly
- [ ] Results show accurate data

### Integration Tests
- [ ] Full quiz flow from start to finish
- [ ] Score persists to database
- [ ] Retry functionality works

## Dependencies
- React 18+
- TypeScript 5+
- Zustand (state management)
- Tailwind CSS (styling)
- sql.js (persistence)
- Lucide React (icons)

## Related Documents
- [Question Bank](./question-bank.md)
- [Scoring Algorithm](./scoring.md)
