import type { QuestionCategory } from '@/types';
import { theoryQuestions } from '@/data/questions';

interface CategoryFilterProps {
  selectedCategory: QuestionCategory | 'all';
  onSelectCategory: (category: QuestionCategory | 'all') => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  // Get unique categories from questions
  const categories: (QuestionCategory | 'all')[] = [
    'all',
    ...Array.from(new Set(theoryQuestions.map((q) => q.category))),
  ];

  // Count questions per category
  const getCategoryCount = (category: QuestionCategory | 'all') => {
    if (category === 'all') return theoryQuestions.length;
    return theoryQuestions.filter((q) => q.category === category).length;
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Select a topic to focus on:
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
            }`}
          >
            {category === 'all' ? 'All Topics' : category}
            <span
              className={`ml-1.5 text-xs ${
                selectedCategory === category ? 'text-blue-100' : 'text-gray-500'
              }`}
            >
              ({getCategoryCount(category)})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
