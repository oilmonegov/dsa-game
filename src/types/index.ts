// Question Types
export type QuestionCategory =
  | 'Data Structures Basics'
  | 'Linear Data Structures'
  | 'Non-Linear Data Structures'
  | 'Trees'
  | 'Binary Trees'
  | 'Traversals'
  | 'Algorithm Analysis'
  | 'Real-World Applications';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  category: QuestionCategory;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  realWorld: string;
}

// Game Module Types
export type ModuleId = 'theory' | 'diagrams' | 'traversals' | 'realWorld' | 'codeCompletion';

export interface ModuleScore {
  correct: number;
  total: number;
  points: number;
  timeSpent: number;
  attempts: number;
  lastAttempt: string | null;
}

export interface ModuleConfig {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  color: string;
  available: boolean;
}

// Quiz State Types
export interface QuizState {
  questions: Question[];
  currentIndex: number;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean;
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
  selectedCategory: QuestionCategory | 'all';
}

// Scoring Types
export interface ScoreCalculation {
  basePoints: number;
  timeBonus: number;
  streakMultiplier: number;
  totalPoints: number;
}

export interface GradeInfo {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  label: string;
  colorClass: string;
}

export interface ImprovementArea {
  category: QuestionCategory;
  count: number;
  suggestion: string;
}

// History Types
export interface AttemptRecord {
  id?: number;
  module: ModuleId;
  correct: number;
  total: number;
  points: number;
  timeSpent: number;
  percentage: number;
  timestamp: string;
}

export interface QuestionAttempt {
  id?: number;
  questionId: number;
  module: ModuleId;
  correct: boolean;
  timeTaken: number;
  timestamp: string;
}

// Game State Types
export interface GameState {
  currentModule: ModuleId | null;
  scores: Record<ModuleId, ModuleScore>;
  practiceMode: boolean;
  soundEnabled: boolean;
}

// Database Types
export interface DBUser {
  id: number;
  name: string;
  createdAt: string;
}

export interface DBScore {
  id: number;
  userId: number;
  module: ModuleId;
  correct: number;
  total: number;
  points: number;
  timeSpent: number;
  createdAt: string;
}

export interface DBAttempt {
  id: number;
  userId: number;
  questionId: number;
  module: ModuleId;
  correct: boolean;
  timeTaken: number;
  createdAt: string;
}

// Component Props Types
export interface TheoryQuizProps {
  onComplete: (score: ModuleScore) => void;
  onBack: () => void;
  practiceMode?: boolean;
}

export interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
  onSelectAnswer: (index: number) => void;
}

export interface QuizProgressProps {
  current: number;
  total: number;
  correct: number;
  streak: number;
  timeSpent: number;
}

export interface QuizResultsProps {
  score: {
    correct: number;
    total: number;
    points: number;
  };
  timeSpent: number;
  incorrectQuestions: Question[];
  practiceMode: boolean;
  onRetry: () => void;
  onBack: () => void;
}

export interface GameMenuProps {
  onSelectModule: (moduleId: ModuleId) => void;
  gameState: GameState;
}

// Utility Types
export type TimeBonus = {
  threshold: number;
  multiplier: number;
};

export type StreakMultiplier = Record<number, number>;

// Re-export diagram types
export * from './diagram';

// Re-export traversal types (excluding TraversalType which is already in diagram.ts)
export type {
  TreeNode,
  TreeEdge,
  TraversalChallenge,
  TraversalState,
  TraversalAlgorithm,
} from './traversal';
export { TRAVERSAL_ALGORITHMS } from './traversal';
