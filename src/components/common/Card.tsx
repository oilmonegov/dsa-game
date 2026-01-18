import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, padding = 'md', className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  colorBar?: string;
}

export function CardHeader({
  children,
  colorBar,
  className = '',
  ...props
}: CardHeaderProps) {
  return (
    <>
      {colorBar && <div className={`h-2 ${colorBar}`} />}
      <div className={`px-6 py-4 border-b bg-gray-50 ${className}`} {...props}>
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
    <div className={`px-6 py-4 border-t bg-gray-50 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
