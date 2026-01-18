import type { HTMLAttributes, ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'glass' | 'gradient' | 'interactive' | 'glow';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: CardVariant;
  hover?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white shadow-lg',
  elevated: 'bg-white shadow-playful-lg',
  glass: 'glass backdrop-saturate-150',
  gradient: 'bg-gradient-to-br from-white to-gray-50 shadow-lg',
  interactive: 'bg-white shadow-lg card-interactive cursor-pointer',
  glow: 'bg-white shadow-lg card-glow',
};

export function Card({
  children,
  padding = 'md',
  variant = 'default',
  hover = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl overflow-hidden
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hover && variant !== 'interactive' ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  colorBar?: string;
  gradient?: 'purple' | 'blue' | 'green' | 'pink' | 'orange' | 'custom';
  gradientClasses?: string;
}

const gradientStyles = {
  purple: 'bg-gradient-to-r from-purple-500 to-indigo-600',
  blue: 'bg-gradient-to-r from-primary-500 to-blue-600',
  green: 'bg-gradient-to-r from-mint-500 to-success-500',
  pink: 'bg-gradient-to-r from-pink-500 to-rose-600',
  orange: 'bg-gradient-to-r from-coral-500 to-amber-600',
  custom: '',
};

export function CardHeader({
  children,
  colorBar,
  gradient,
  gradientClasses,
  className = '',
  ...props
}: CardHeaderProps) {
  if (gradient) {
    return (
      <div
        className={`
          px-6 py-4 text-white
          ${gradient === 'custom' ? gradientClasses : gradientStyles[gradient]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      {colorBar && <div className={`h-2 ${colorBar}`} />}
      <div className={`px-6 py-4 border-b bg-gray-50/80 ${className}`} {...props}>
        {children}
      </div>
    </>
  );
}

export function CardBody({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 border-t bg-gray-50/80 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardResultProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant: 'success' | 'warning' | 'error' | 'info';
}

const resultStyles = {
  success: 'bg-gradient-to-br from-mint-50 to-success-50 border-t border-mint-200',
  warning: 'bg-gradient-to-br from-amber-50 to-orange-50 border-t border-amber-200',
  error: 'bg-gradient-to-br from-red-50 to-rose-50 border-t border-red-200',
  info: 'bg-gradient-to-br from-primary-50 to-blue-50 border-t border-primary-200',
};

export function CardResult({ children, variant, className = '', ...props }: CardResultProps) {
  return (
    <div className={`p-6 ${resultStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
