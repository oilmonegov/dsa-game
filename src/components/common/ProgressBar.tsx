import { useEffect, useState } from 'react';

interface Milestone {
  value: number;
  label?: string;
  icon?: string;
}

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  labelPosition?: 'top' | 'bottom' | 'inline' | 'inside';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'gradient';
  animated?: boolean;
  striped?: boolean;
  milestones?: Milestone[];
  celebrate?: boolean;
  className?: string;
}

const sizeStyles = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const colorStyles = {
  blue: 'bg-gradient-to-r from-primary-400 to-primary-600',
  green: 'bg-gradient-to-r from-mint-400 to-success-500',
  purple: 'bg-gradient-to-r from-lavender-400 to-accent-600',
  orange: 'bg-gradient-to-r from-coral-400 to-amber-500',
  pink: 'bg-gradient-to-r from-candy-400 to-rose-500',
  gradient: 'bg-gradient-to-r from-primary-500 via-accent-500 to-candy-500',
};

const labelColorStyles = {
  blue: 'text-primary-600',
  green: 'text-success-600',
  purple: 'text-accent-600',
  orange: 'text-coral-600',
  pink: 'text-candy-600',
  gradient: 'text-accent-600',
};

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  labelPosition = 'top',
  size = 'md',
  color = 'blue',
  animated = true,
  striped = false,
  milestones,
  celebrate = false,
  className = '',
}: ProgressBarProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Celebrate when reaching 100%
  useEffect(() => {
    if (celebrate && percentage === 100 && prevValue < 100) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 1500);
      return () => clearTimeout(timer);
    }
    setPrevValue(percentage);
  }, [percentage, prevValue, celebrate]);

  const renderLabel = () => {
    if (!showLabel) return null;
    return (
      <span className={`text-sm font-semibold ${labelColorStyles[color]}`}>
        {Math.round(percentage)}%
      </span>
    );
  };

  return (
    <div className={className}>
      {/* Top label and milestone labels */}
      {labelPosition === 'top' && (
        <div className="flex items-center justify-between mb-1">
          {renderLabel()}
        </div>
      )}

      {/* Progress bar container */}
      <div className="relative">
        <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
          <div
            className={`
              ${sizeStyles[size]}
              ${colorStyles[color]}
              rounded-full
              ${animated ? 'transition-all duration-500 ease-out' : ''}
              ${striped ? 'progress-stripes animate-stripe-slide' : ''}
              ${showCelebration ? 'shimmer' : ''}
            `}
            style={{ width: `${percentage}%` }}
          >
            {/* Inside label */}
            {labelPosition === 'inside' && size === 'lg' && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>

        {/* Milestone markers */}
        {milestones && milestones.length > 0 && (
          <div className="absolute inset-0 flex items-center">
            {milestones.map((milestone, index) => {
              const position = (milestone.value / max) * 100;
              const isReached = percentage >= position;
              return (
                <div
                  key={index}
                  className="absolute flex flex-col items-center transform -translate-x-1/2"
                  style={{ left: `${position}%` }}
                >
                  <div
                    className={`
                      w-3 h-3 rounded-full border-2 border-white
                      transition-all duration-300
                      ${isReached
                        ? `${colorStyles[color]} shadow-md scale-110`
                        : 'bg-gray-300'}
                    `}
                  >
                    {milestone.icon && isReached && (
                      <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-sm animate-bounce-in">
                        {milestone.icon}
                      </span>
                    )}
                  </div>
                  {milestone.label && (
                    <span
                      className={`
                        text-2xs mt-1 whitespace-nowrap
                        ${isReached ? 'text-gray-700 font-medium' : 'text-gray-400'}
                      `}
                    >
                      {milestone.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Celebration particles */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="absolute right-0 top-1/2 animate-confetti"
                style={{
                  animationDelay: `${i * 50}ms`,
                  transform: `rotate(${i * 45}deg) translateX(${5 + i * 3}px)`,
                }}
              >
                {['✨', '🎉', '⭐', '💫'][i % 4]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom/inline label */}
      {labelPosition === 'bottom' && (
        <div className="flex items-center justify-end mt-1">
          {renderLabel()}
        </div>
      )}

      {labelPosition === 'inline' && (
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1" />
          {renderLabel()}
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
