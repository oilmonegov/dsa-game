import type { TraversalType } from '@/types/traversal';
import { TRAVERSAL_ALGORITHMS } from '@/types/traversal';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AlgorithmPanelProps {
  traversalType: TraversalType;
  isOpen: boolean;
  onToggle: () => void;
}

export function AlgorithmPanel({ traversalType, isOpen, onToggle }: AlgorithmPanelProps) {
  const algorithm = TRAVERSAL_ALGORITHMS[traversalType];

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          <span className="font-medium">{algorithm.name}</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {/* Description */}
          <div className="text-gray-300 text-sm">{algorithm.description}</div>

          {/* Visit Order */}
          <div className="bg-purple-900/50 rounded-lg px-3 py-2">
            <span className="text-purple-300 text-sm font-medium">Order: </span>
            <span className="text-white font-mono">{algorithm.visitOrder}</span>
          </div>

          {/* Pseudocode */}
          <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
            {algorithm.pseudocode.map((line, index) => (
              <div
                key={index}
                className={`${line.startsWith('  ') ? 'text-gray-400' : 'text-green-400'}`}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="text-xs text-gray-400">
            {traversalType === 'preorder' && (
              <p>💡 Pre-order is used for copying trees and creating prefix expressions.</p>
            )}
            {traversalType === 'inorder' && <p>💡 In-order on a BST gives you sorted output!</p>}
            {traversalType === 'postorder' && (
              <p>💡 Post-order is used for deleting trees and evaluating expressions.</p>
            )}
            {traversalType === 'levelorder' && (
              <p>💡 Level-order uses a queue (BFS) and is great for finding shortest paths.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AlgorithmPanel;
