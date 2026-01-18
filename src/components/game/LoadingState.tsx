import { LoadingSpinner, LoadingDots } from '@/components/common';

interface LoadingStateProps {
  message?: string;
  variant?: 'default' | 'spinner' | 'dots' | 'skeleton';
  minHeight?: string;
}

export function LoadingState({
  message = 'Loading challenges...',
  variant = 'spinner',
  minHeight = '400px',
}: LoadingStateProps) {
  if (variant === 'skeleton') {
    return <GameSkeleton minHeight={minHeight} />;
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight }}
    >
      <div className="text-center animate-fade-in">
        {variant === 'spinner' && (
          <LoadingSpinner size="xl" color="gradient" className="mx-auto mb-4" />
        )}
        {variant === 'dots' && (
          <div className="mb-4 flex justify-center">
            <LoadingDots color="primary" size="md" />
          </div>
        )}
        {variant === 'default' && (
          <div className="text-4xl mb-4 animate-bounce">
            🎮
          </div>
        )}
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

interface GameSkeletonProps {
  minHeight?: string;
}

export function GameSkeleton({ minHeight = '400px' }: GameSkeletonProps) {
  return (
    <div className="animate-pulse" style={{ minHeight }}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-24 h-10 bg-gray-200 rounded-xl" />
        <div className="flex items-center gap-3">
          <div className="w-16 h-8 bg-gray-200 rounded-full" />
          <div className="w-16 h-8 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Progress skeleton */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-32 h-4 bg-gray-200 rounded" />
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full" />
      </div>

      {/* Card skeleton */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-gray-200 to-gray-300" />
        <div className="p-6 space-y-4">
          <div className="w-3/4 h-4 bg-gray-200 rounded" />
          <div className="w-1/2 h-4 bg-gray-200 rounded" />
          <div className="h-48 bg-gray-100 rounded-xl" />
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
            <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContentSkeletonProps {
  lines?: number;
  className?: string;
}

export function ContentSkeleton({
  lines = 3,
  className = '',
}: ContentSkeletonProps) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="w-1/2 h-5 bg-gray-200 rounded mb-2" />
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-4 bg-gray-200 rounded" />
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="w-full h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

export default LoadingState;
