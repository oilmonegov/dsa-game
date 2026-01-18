/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Toast, type ToastVariant } from './Toast';

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toast: (options: Omit<ToastItem, 'id'>) => string;
  success: (
    message: string,
    options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>
  ) => string;
  error: (
    message: string,
    options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>
  ) => string;
  warning: (
    message: string,
    options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>
  ) => string;
  info: (
    message: string,
    options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>
  ) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export function ToastProvider({
  children,
  maxToasts = 5,
  position = 'bottom-right',
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (options: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const newToast: ToastItem = { ...options, id };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        return updated.slice(0, maxToasts);
      });

      return id;
    },
    [maxToasts]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback((options: Omit<ToastItem, 'id'>) => addToast(options), [addToast]);

  const success = useCallback(
    (message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>) =>
      addToast({ message, variant: 'success', ...options }),
    [addToast]
  );

  const error = useCallback(
    (message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>) =>
      addToast({ message, variant: 'error', ...options }),
    [addToast]
  );

  const warning = useCallback(
    (message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>) =>
      addToast({ message, variant: 'warning', ...options }),
    [addToast]
  );

  const info = useCallback(
    (message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'variant'>>) =>
      addToast({ message, variant: 'info', ...options }),
    [addToast]
  );

  const value: ToastContextValue = {
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className={`fixed z-50 flex flex-col gap-2 pointer-events-none ${positionStyles[position]}`}
        style={{ maxWidth: '400px', width: '100%' }}
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              id={t.id}
              message={t.message}
              variant={t.variant}
              duration={t.duration}
              icon={t.icon}
              action={t.action}
              onClose={dismiss}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
