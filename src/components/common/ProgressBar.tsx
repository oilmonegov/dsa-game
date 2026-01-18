interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'orange';
  animated?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-4',
};

const colorStyles = {
  blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
  green: 'bg-gradient-to-r from-green-500 to-emerald-600',
  purple: 'bg-gradient-to-r from-purple-500 to-indigo-600',
  orange: 'bg-gradient-to-r from-orange-500 to-red-500',
};

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  color = 'blue',
  animated = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full ${
            animated ? 'transition-all duration-300 ease-out' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 mt-1">{Math.round(percentage)}%</p>
      )}
    </div>
  );
}

export default ProgressBar;
