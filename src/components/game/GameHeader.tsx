import { ArrowLeft, Flame } from 'lucide-react';
import { Button, Badge } from '@/components/common';
import { formatTime } from '@/hooks';

interface GameHeaderProps {
  onBack: () => void;
  timeSpent: number;
  streak?: number;
  streakThreshold?: number;
  showTimer?: boolean;
  rightContent?: React.ReactNode;
}

export function GameHeader({
  onBack,
  timeSpent,
  streak = 0,
  streakThreshold = 2,
  showTimer = true,
  rightContent,
}: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        onClick={onBack}
        leftIcon={<ArrowLeft size={20} />}
        className="hover:bg-gray-100/80"
      >
        Back
      </Button>
      <div className="flex items-center gap-3">
        {streak >= streakThreshold && (
          <Badge
            variant="warning"
            pulse
            glow
            icon={<Flame size={14} className="text-amber-600" />}
            className="animate-bounce-in"
          >
            {streak} streak!
          </Badge>
        )}
        {showTimer && (
          <span className="text-gray-600 font-mono text-sm bg-gray-100/80 px-3 py-1.5 rounded-lg shadow-sm">
            {formatTime(timeSpent)}
          </span>
        )}
        {rightContent}
      </div>
    </div>
  );
}

export default GameHeader;
