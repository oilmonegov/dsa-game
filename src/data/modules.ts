import type { ModuleConfig } from '@/types';

export const moduleConfigs: ModuleConfig[] = [
  {
    id: 'theory',
    title: 'Theory Quiz',
    description: 'Test your knowledge with multiple choice questions covering all DSA topics.',
    icon: '📚',
    color: 'bg-blue-500',
    available: true,
  },
  {
    id: 'diagrams',
    title: 'Diagram Challenge',
    description: 'Complete interactive tree and graph diagrams by placing nodes correctly.',
    icon: '🌳',
    color: 'bg-green-500',
    available: true,
  },
  {
    id: 'traversals',
    title: 'Traversal Game',
    description: 'Click nodes in the correct order for different tree traversals.',
    icon: '🎯',
    color: 'bg-purple-500',
    available: true,
  },
  {
    id: 'realWorld',
    title: 'Real-World Match',
    description: 'Match data structures to their real-world applications.',
    icon: '🔗',
    color: 'bg-orange-500',
    available: true,
  },
  {
    id: 'codeCompletion',
    title: 'Code Completion',
    description: 'Fill in missing parts of algorithm pseudocode and identify complexities.',
    icon: '💻',
    color: 'bg-pink-500',
    available: true,
  },
];

export default moduleConfigs;
