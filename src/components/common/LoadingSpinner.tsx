interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'white' | 'gradient';
  className?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorStyles = {
  blue: 'text-blue-600',
  white: 'text-white',
  gradient: 'text-purple-600',
};

export function LoadingSpinner({
  size = 'md',
  color = 'blue',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <svg
      className={`animate-spin ${colorStyles[color]} ${sizeStyles[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        {message && <p className="text-gray-600 text-sm">{message}</p>}
      </div>
    </div>
  );
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

const dotSizeStyles = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
};

const dotColorStyles = {
  primary: 'bg-blue-600',
  white: 'bg-white',
  gray: 'bg-gray-400',
};

export function LoadingDots({ size = 'md', color = 'primary', className = '' }: LoadingDotsProps) {
  const dotClass = `${dotSizeStyles[size]} ${dotColorStyles[color]} rounded-full animate-bounce`;
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className={dotClass} style={{ animationDelay: '0ms' }} />
      <span className={dotClass} style={{ animationDelay: '150ms' }} />
      <span className={dotClass} style={{ animationDelay: '300ms' }} />
    </span>
  );
}

export default LoadingSpinner;
