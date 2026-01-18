import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  onRetry?: () => void;
  onGoHome?: () => void;
  variant?: 'default' | 'playful' | 'minimal';
}

export function ErrorState({
  title = 'Oops! Something went wrong',
  message = "Don't worry, it happens to the best of us.",
  icon,
  onRetry,
  onGoHome,
  variant = 'playful',
}: ErrorStateProps) {
  if (variant === 'minimal') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-coral-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <Button variant="secondary" onClick={onRetry} leftIcon={<RefreshCw size={16} />}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto animate-fade-in p-4">
      <Card variant="elevated" padding="none">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-coral-400 to-rose-500 px-6 py-8 text-center text-white">
          <div className="flex justify-center mb-4">
            {icon || (
              <div className="text-6xl animate-wiggle">
                {variant === 'playful' ? '🤔' : '⚠️'}
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-shadow">{title}</h2>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">{message}</p>

          {variant === 'playful' && (
            <div className="bg-coral-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-coral-700 font-medium mb-2">
                Things you can try:
              </p>
              <ul className="text-sm text-coral-600 space-y-1">
                <li>• Refresh the page</li>
                <li>• Check your internet connection</li>
                <li>• Try again in a few moments</li>
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onGoHome && (
              <Button
                variant="secondary"
                onClick={onGoHome}
                leftIcon={<Home size={16} />}
                fullWidth
              >
                Go Home
              </Button>
            )}
            {onRetry && (
              <Button
                variant="primary"
                onClick={onRetry}
                leftIcon={<RefreshCw size={16} />}
                fullWidth
                bounce
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode | string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title = 'Nothing here yet',
  message = 'Get started by adding some content.',
  icon = '📭',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="text-5xl mb-4 animate-float">
        {typeof icon === 'string' ? icon : icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4 max-w-sm">{message}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick} bounce>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
