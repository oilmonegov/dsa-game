import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'gradient';
type BadgeSize = 'xs' | 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  pulse?: boolean;
  glow?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-gradient-to-r from-mint-100 to-success-100 text-success-700',
  warning: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700',
  error: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700',
  info: 'bg-gradient-to-r from-primary-100 to-blue-100 text-primary-700',
  purple: 'bg-gradient-to-r from-lavender-100 to-purple-100 text-lavender-700',
  gradient: 'bg-gradient-to-r from-primary-500 via-accent-500 to-candy-500 text-white',
};

const glowStyles: Record<BadgeVariant, string> = {
  default: '',
  success: 'shadow-glow-green',
  warning: 'shadow-glow-orange',
  error: 'shadow-glow-pink',
  info: 'shadow-glow-blue',
  purple: 'shadow-glow-purple',
  gradient: 'shadow-glow-purple',
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-2xs gap-0.5',
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-sm gap-1.5',
};

const iconSizeStyles: Record<BadgeSize, string> = {
  xs: 'w-2.5 h-2.5',
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  pulse = false,
  glow = false,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full
        transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${pulse ? 'animate-pulse' : ''}
        ${glow ? glowStyles[variant] : ''}
        ${className}
      `}
      {...props}
    >
      {icon && <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>{icon}</span>}
      {children}
    </span>
  );
}

export function DotBadge({
  variant = 'default',
  pulse = false,
  className = '',
}: {
  variant?: BadgeVariant;
  pulse?: boolean;
  className?: string;
}) {
  const dotColors: Record<BadgeVariant, string> = {
    default: 'bg-gray-400',
    success: 'bg-success-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-primary-500',
    purple: 'bg-lavender-500',
    gradient: 'bg-gradient-to-r from-primary-500 to-accent-500',
  };

  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      {pulse && (
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
        />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`} />
    </span>
  );
}

export default Badge;
