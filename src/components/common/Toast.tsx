import { useEffect, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: (id: string) => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-gradient-to-r from-mint-500 to-success-500',
  error: 'bg-gradient-to-r from-red-500 to-rose-600',
  warning: 'bg-gradient-to-r from-coral-400 to-amber-500',
  info: 'bg-gradient-to-r from-primary-500 to-blue-600',
};

const defaultIcons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
};

export function Toast({
  id,
  message,
  variant = 'info',
  duration = 4000,
  icon,
  action,
  onClose,
}: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 200);
  }, [id, onClose]);

  useEffect(() => {
    if (duration <= 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        handleClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, handleClose]);

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl shadow-playful-lg
        transform transition-all duration-200
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
        ${variantStyles[variant]}
      `}
      role="alert"
    >
      <div className="flex items-center gap-3 px-4 py-3 text-white">
        <span className="flex-shrink-0">{icon || defaultIcons[variant]}</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="flex-shrink-0 px-2 py-1 text-xs font-semibold bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            {action.label}
          </button>
        )}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
          <div
            className="h-full bg-white/40 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default Toast;
