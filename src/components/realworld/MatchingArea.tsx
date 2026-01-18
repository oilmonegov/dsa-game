import { RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/common';
import { ChallengeCard } from '@/components/game';
import { StructureCard, ApplicationCardComponent } from './MatchCard';
import type { MatchChallenge, MatchPair } from '@/types/realworld';

interface MatchingAreaProps {
  challenge: MatchChallenge;
  matches: MatchPair[];
  selectedStructure: string | null;
  selectedApplication: string | null;
  validatedMatches: Record<string, boolean>;
  showResult: boolean;
  allCorrect: boolean;
  onSelectStructure: (id: string) => void;
  onSelectApplication: (id: string) => void;
  onRemoveMatch: (appId: string) => void;
}

export function MatchingArea({
  challenge,
  matches,
  selectedStructure,
  selectedApplication,
  validatedMatches,
  showResult,
  allCorrect,
  onSelectStructure,
  onSelectApplication,
  onRemoveMatch,
}: MatchingAreaProps) {
  const matchedStructureIds = new Set(matches.map((m) => m.structureId));
  const matchedApplicationIds = new Set(matches.map((m) => m.applicationId));

  return (
    <ChallengeCard
      title={challenge.title}
      subtitle={challenge.category}
      description={challenge.description}
      difficulty={challenge.difficulty}
      gradient="orange"
      instruction="Click a data structure, then click its matching application"
      footer={
        showResult && (
          <MatchResultSection
            isCorrect={allCorrect}
            structures={challenge.structures}
            explanations={challenge.explanations}
          />
        )
      }
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Data Structures Column */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-lg">📊</span> Data Structures
          </h3>
          <div className="space-y-3">
            {challenge.structures.map((structure) => {
              const isMatched = matchedStructureIds.has(structure.id);
              const match = matches.find((m) => m.structureId === structure.id);
              const isCorrect = match ? validatedMatches[match.applicationId] : undefined;

              return (
                <StructureCard
                  key={structure.id}
                  structure={structure}
                  isSelected={selectedStructure === structure.id}
                  isMatched={isMatched}
                  isCorrect={isCorrect}
                  showResult={showResult}
                  onClick={() => onSelectStructure(structure.id)}
                  disabled={showResult}
                />
              );
            })}
          </div>
        </div>

        {/* Applications Column */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-lg">🌍</span> Real-World Applications
          </h3>
          <div className="space-y-3">
            {challenge.applications.map((app) => {
              const isMatched = matchedApplicationIds.has(app.id);
              const match = matches.find((m) => m.applicationId === app.id);
              const matchedStructure = match
                ? challenge.structures.find((s) => s.id === match.structureId)
                : undefined;
              const isCorrect = validatedMatches[app.id];

              return (
                <ApplicationCardComponent
                  key={app.id}
                  application={app}
                  isSelected={selectedApplication === app.id}
                  isMatched={isMatched}
                  matchedStructureName={matchedStructure?.name}
                  isCorrect={isCorrect}
                  showResult={showResult}
                  onClick={() => onSelectApplication(app.id)}
                  onRemoveMatch={() => onRemoveMatch(app.id)}
                  disabled={showResult}
                />
              );
            })}
          </div>
        </div>
      </div>
    </ChallengeCard>
  );
}

interface MatchProgressProps {
  matchCount: number;
  totalCount: number;
  showResult: boolean;
  onReset: () => void;
}

export function MatchProgress({
  matchCount,
  totalCount,
  showResult,
  onReset,
}: MatchProgressProps) {
  return (
    <div className="mt-6 p-4 bg-gray-50/80 rounded-xl">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Matches:{' '}
          <span className="font-semibold">
            {matchCount} / {totalCount}
          </span>
        </span>
        {!showResult && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            disabled={matchCount === 0}
            leftIcon={<RotateCcw size={14} />}
          >
            Reset All
          </Button>
        )}
      </div>
    </div>
  );
}

interface MatchActionsProps {
  showResult: boolean;
  allMatched: boolean;
  remainingCount: number;
  isLastChallenge: boolean;
  onReset: () => void;
  onSubmit: () => void;
  onNext: () => void;
}

export function MatchActions({
  showResult,
  allMatched,
  remainingCount,
  isLastChallenge,
  onReset,
  onSubmit,
  onNext,
}: MatchActionsProps) {
  if (showResult) {
    return (
      <div className="flex gap-3 mb-4">
        <Button
          variant="gradient"
          onClick={onNext}
          fullWidth
          rightIcon={<ArrowRight size={18} />}
          bounce
        >
          {isLastChallenge ? 'See Results' : 'Next Challenge'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-4">
      <Button variant="secondary" onClick={onReset}>
        Reset
      </Button>
      <Button
        variant="primary"
        onClick={onSubmit}
        fullWidth
        disabled={!allMatched}
        bounce
      >
        {allMatched
          ? 'Check Matches'
          : `Match ${remainingCount} more`}
      </Button>
    </div>
  );
}

interface MatchResultSectionProps {
  isCorrect: boolean;
  structures: Array<{ id: string; name: string; icon: string }>;
  explanations: Record<string, string>;
}

function MatchResultSection({
  isCorrect,
  structures,
  explanations,
}: MatchResultSectionProps) {
  return (
    <div
      className={`
        p-6 border-t
        ${isCorrect
          ? 'bg-gradient-to-br from-mint-50 to-success-50'
          : 'bg-gradient-to-br from-amber-50 to-orange-50'}
      `}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{isCorrect ? '✅' : '💡'}</span>
        <div>
          <h3 className="font-semibold mb-1">
            {isCorrect ? 'Perfect Match!' : "Here's why each match works:"}
          </h3>
        </div>
      </div>
      <div className="space-y-3">
        {structures.map((structure) => (
          <div key={structure.id} className="p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span>{structure.icon}</span>
              <span className="font-medium">{structure.name}</span>
            </div>
            <p className="text-sm text-gray-600">
              {explanations[structure.id]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchingArea;
