interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray' | 'gradient';
  className?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorStyles = {
  primary: 'text-primary-500',
  white: 'text-white',
  gray: 'text-gray-400',
  gradient: '',
};

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
}: LoadingSpinnerProps) {
  if (color === 'gradient') {
    return (
      <div className={`${sizeStyles[size]} ${className}`}>
        <svg
          className="animate-spin"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="5"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="url(#spinner-gradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="80 50"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${sizeStyles[size]} ${colorStyles[color]} ${className}`}>
      <svg
        className="animate-spin"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="80 50"
        />
      </svg>
    </div>
  );
}

interface LoadingOverlayProps {
  message?: string;
  blur?: boolean;
}

export function LoadingOverlay({ message, blur = true }: LoadingOverlayProps) {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-white/80 ${blur ? 'backdrop-blur-sm' : ''}
      `}
    >
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <LoadingSpinner size="xl" color="gradient" />
        {message && (
          <p className="text-gray-600 font-medium animate-pulse-soft">{message}</p>
        )}
      </div>
    </div>
  );
}

interface LoadingDotsProps {
  color?: 'primary' | 'gray' | 'white';
  size?: 'sm' | 'md';
}

export function LoadingDots({ color = 'primary', size = 'md' }: LoadingDotsProps) {
  const dotColor = {
    primary: 'bg-primary-500',
    gray: 'bg-gray-400',
    white: 'bg-white',
  };

  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`
            ${dotSize} ${dotColor[color]} rounded-full
            animate-bounce
          `}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export default LoadingSpinner;
