import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, useState } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'gradient' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bounce?: boolean;
  ripple?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-md hover:shadow-lg',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
  success: 'bg-gradient-to-r from-mint-500 to-success-500 text-white hover:from-mint-600 hover:to-success-600 focus:ring-success-500 shadow-md hover:shadow-lg',
  danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 focus:ring-red-500 shadow-md hover:shadow-lg',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  gradient: 'bg-gradient-to-r from-primary-500 via-accent-500 to-candy-500 text-white hover:from-primary-600 hover:via-accent-600 hover:to-candy-600 focus:ring-accent-500 shadow-md hover:shadow-lg',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      children,
      bounce = false,
      ripple = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const isDisabled = disabled || loading;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (ripple && !isDisabled) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }

      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        className={`
          relative inline-flex items-center justify-center
          font-semibold rounded-xl
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
          active:scale-[0.98]
          overflow-hidden
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${bounce && !isDisabled ? 'hover:-translate-y-0.5 active:translate-y-0' : ''}
          ${className}
        `}
        {...props}
      >
        {/* Ripple effect */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{
              left: r.x,
              top: r.y,
              width: '10px',
              height: '10px',
              marginLeft: '-5px',
              marginTop: '-5px',
            }}
          />
        ))}

        {loading ? (
          <svg
            className={`animate-spin ${iconSizeStyles[size]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
