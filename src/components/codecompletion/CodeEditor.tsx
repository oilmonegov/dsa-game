import { useMemo } from 'react';
import type { CodeCompletionChallenge } from '@/types/codecompletion';

interface CodeEditorProps {
  challenge: CodeCompletionChallenge;
  blankAnswers: Record<string, string>;
  validatedBlanks: Record<string, boolean>;
  activeBlank: string | null;
  showResult: boolean;
  onBlankClick: (blankId: string) => void;
  onBlankChange: (blankId: string, value: string) => void;
}

export function CodeEditor({
  challenge,
  blankAnswers,
  validatedBlanks,
  activeBlank,
  showResult,
  onBlankClick,
  onBlankChange,
}: CodeEditorProps) {
  // Parse code template and replace blanks with inputs
  const renderedCode = useMemo(() => {
    const lines = challenge.codeTemplate.split('\n');

    return lines.map((line, lineIndex) => {
      // Find all blanks in this line
      const blankPattern = /___([A-Z0-9]+)___/g;
      const parts: (string | { blankId: string; index: number })[] = [];
      let lastIndex = 0;
      let match;

      while ((match = blankPattern.exec(line)) !== null) {
        // Add text before the blank
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Add the blank placeholder
        parts.push({ blankId: match[1], index: match.index });
        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // If no blanks, just return the line
      if (parts.length === 0) {
        parts.push(line);
      }

      return { lineNumber: lineIndex + 1, parts };
    });
  }, [challenge.codeTemplate]);

  const getBlankStyle = (blankId: string) => {
    if (showResult) {
      const isCorrect = validatedBlanks[blankId];
      if (isCorrect === true) {
        return 'bg-green-200 border-green-500 text-green-800';
      } else if (isCorrect === false) {
        return 'bg-red-200 border-red-500 text-red-800';
      }
    }
    if (activeBlank === blankId) {
      return 'bg-yellow-100 border-yellow-500 ring-2 ring-yellow-300';
    }
    return 'bg-white border-gray-300 hover:border-blue-400';
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-sm ml-2">{challenge.algorithm}</span>
        <span className="text-gray-600 text-xs">({challenge.language})</span>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm">
          {renderedCode.map(({ lineNumber, parts }) => (
            <div key={lineNumber} className="flex">
              {/* Line number */}
              <span className="text-gray-600 select-none w-8 text-right pr-4 flex-shrink-0">
                {lineNumber}
              </span>
              {/* Code content */}
              <code className="text-gray-100 flex-1">
                {parts.map((part, partIndex) => {
                  if (typeof part === 'string') {
                    // Syntax highlighting for keywords
                    return <span key={partIndex}>{highlightSyntax(part)}</span>;
                  } else {
                    // Blank input
                    const blank = challenge.blanks.find((b) => b.id === part.blankId);
                    const value = blankAnswers[part.blankId] || '';
                    const isCorrect = validatedBlanks[part.blankId];

                    return (
                      <span key={partIndex} className="inline-block mx-1">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onBlankChange(part.blankId, e.target.value)}
                          onClick={() => onBlankClick(part.blankId)}
                          disabled={showResult}
                          placeholder={blank?.hint || '???'}
                          className={`
                            px-2 py-0.5 rounded border font-mono text-sm
                            min-w-[80px] max-w-[150px]
                            focus:outline-none transition-all
                            ${getBlankStyle(part.blankId)}
                            ${showResult ? 'cursor-default' : 'cursor-text'}
                          `}
                          style={{ width: `${Math.max(80, (value.length || 8) * 8)}px` }}
                        />
                        {showResult && isCorrect === false && blank && (
                          <span className="text-green-400 text-xs ml-1">
                            ({blank.correctAnswer})
                          </span>
                        )}
                      </span>
                    );
                  }
                })}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// Simple syntax highlighting
function highlightSyntax(code: string): React.ReactNode {
  const keywords = [
    'function',
    'if',
    'else',
    'while',
    'for',
    'return',
    'class',
    'new',
    'null',
    'true',
    'false',
    'AND',
    'OR',
    'NOT',
    'in',
    'not',
    'to',
    'each',
  ];
  const parts: React.ReactNode[] = [];

  // Split by words while preserving whitespace and punctuation
  const tokens = code.split(/(\s+|[(){}[\]:,.<>=+\-*/])/);

  tokens.forEach((token, index) => {
    if (keywords.includes(token)) {
      parts.push(
        <span key={index} className="text-purple-400">
          {token}
        </span>
      );
    } else if (/^\/\/.*/.test(token)) {
      parts.push(
        <span key={index} className="text-gray-500">
          {token}
        </span>
      );
    } else if (/^['"].*['"]$/.test(token)) {
      parts.push(
        <span key={index} className="text-green-400">
          {token}
        </span>
      );
    } else if (/^\d+$/.test(token)) {
      parts.push(
        <span key={index} className="text-orange-400">
          {token}
        </span>
      );
    } else {
      parts.push(<span key={index}>{token}</span>);
    }
  });

  return parts;
}

export default CodeEditor;
