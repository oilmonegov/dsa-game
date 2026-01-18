import { type ReactNode } from 'react';
import { Card, CardHeader, Badge } from '@/components/common';

type Difficulty = 'easy' | 'medium' | 'hard';
type GradientColor = 'purple' | 'blue' | 'green' | 'pink' | 'orange';

interface ChallengeCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  difficulty?: Difficulty;
  badges?: Array<{
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  }>;
  gradient?: GradientColor;
  icon?: string;
  instruction?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const difficultyVariants: Record<Difficulty, 'success' | 'warning' | 'error'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
};

export function ChallengeCard({
  title,
  subtitle,
  description,
  difficulty,
  badges,
  gradient = 'purple',
  icon,
  instruction,
  children,
  footer,
  className = '',
}: ChallengeCardProps) {
  return (
    <Card padding="none" className={`mb-4 ${className}`} variant="elevated">
      {/* Header */}
      <CardHeader gradient={gradient}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <span className="text-2xl">{icon}</span>}
            <div>
              <h2 className="font-semibold text-lg">{title}</h2>
              {subtitle && (
                <p className="text-white/80 text-sm">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {difficulty && (
              <Badge variant={difficultyVariants[difficulty]}>
                {difficulty}
              </Badge>
            )}
            {badges?.map((badge, index) => (
              <Badge key={index} variant={badge.variant || 'default'}>
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <div className="p-6">
        {/* Description and instruction */}
        {(description || instruction) && (
          <div className="mb-4 space-y-2">
            {description && (
              <p className="text-gray-700">{description}</p>
            )}
            {instruction && (
              <div className="flex items-center gap-2 text-accent-600 font-medium">
                <span className="text-lg">🎯</span>
                <span>{instruction}</span>
              </div>
            )}
          </div>
        )}

        {/* Main content */}
        {children}
      </div>

      {/* Footer */}
      {footer}
    </Card>
  );
}

interface ChallengeResultProps {
  isCorrect: boolean;
  explanation?: string;
  correctAnswer?: string;
}

export function ChallengeResult({
  isCorrect,
  explanation,
  correctAnswer,
}: ChallengeResultProps) {
  return (
    <div
      className={`
        p-6 border-t
        ${isCorrect
          ? 'bg-gradient-to-br from-mint-50 to-success-50'
          : 'bg-gradient-to-br from-amber-50 to-orange-50'}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{isCorrect ? '✅' : '💡'}</span>
        <div>
          <h3 className="font-semibold mb-1">
            {isCorrect ? 'Excellent!' : 'Explanation'}
          </h3>
          {explanation && (
            <p className="text-sm opacity-90 mb-3">{explanation}</p>
          )}
          {!isCorrect && correctAnswer && (
            <div className="bg-white/50 rounded-lg p-3">
              <span className="text-sm font-medium">Correct answer: </span>
              <span className="font-mono text-sm">{correctAnswer}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
