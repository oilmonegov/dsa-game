// Code Completion Types

export type ComplexityClass =
  | 'O(1)'
  | 'O(log n)'
  | 'O(n)'
  | 'O(n log n)'
  | 'O(n²)'
  | 'O(n³)'
  | 'O(2^n)'
  | 'O(n!)';

export type ChallengeType = 'fill-blank' | 'complexity' | 'mixed';

export interface CodeBlank {
  id: string;
  lineNumber: number;
  position: number; // character position in line
  length: number; // length of blank
  correctAnswer: string;
  hint?: string;
}

export interface CodeCompletionChallenge {
  id: number;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  // The code template with blanks marked as ___BLANK_ID___
  codeTemplate: string;
  // Language for syntax highlighting
  language: 'pseudocode' | 'python' | 'javascript' | 'java';
  // Blanks to fill in
  blanks: CodeBlank[];
  // Complexity questions (if type is 'complexity' or 'mixed')
  complexityQuestions?: {
    id: string;
    question: string;
    correctAnswer: ComplexityClass;
    options: ComplexityClass[];
  }[];
  // Explanation
  explanation: string;
  hint: string;
  // Related algorithm/data structure
  algorithm: string;
}

export interface UserAnswer {
  blankId: string;
  answer: string;
}

export interface ComplexityAnswer {
  questionId: string;
  answer: ComplexityClass;
}

export interface CodeCompletionState {
  challenges: CodeCompletionChallenge[];
  currentIndex: number;
  currentChallenge: CodeCompletionChallenge | null;
  // User's answers
  blankAnswers: Record<string, string>;
  complexityAnswers: Record<string, ComplexityClass>;
  // Validation
  validatedBlanks: Record<string, boolean>;
  validatedComplexity: Record<string, boolean>;
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
  // UI state
  activeBlank: string | null;
}

// Common complexity options for questions
export const COMPLEXITY_OPTIONS: ComplexityClass[] = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2^n)',
  'O(n!)',
];

// Algorithm categories
export const ALGORITHM_CATEGORIES = [
  'Sorting',
  'Searching',
  'Tree Traversal',
  'Graph Algorithms',
  'Dynamic Programming',
  'Recursion',
  'Data Structure Operations',
] as const;
