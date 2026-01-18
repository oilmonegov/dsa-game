import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface HintPanelProps {
  hint: string;
  defaultOpen?: boolean;
  title?: string;
  variant?: 'default' | 'warning' | 'info';
}

const variantStyles = {
  default: 'bg-amber-50 border-amber-200 text-amber-800',
  warning: 'bg-orange-50 border-orange-200 text-orange-800',
  info: 'bg-primary-50 border-primary-200 text-primary-800',
};

const iconColors = {
  default: 'text-amber-500',
  warning: 'text-orange-500',
  info: 'text-primary-500',
};

export function HintPanel({
  hint,
  defaultOpen = false,
  title = 'Need a hint?',
  variant = 'default',
}: HintPanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`
        mt-4 rounded-xl border overflow-hidden
        transition-all duration-300
        ${variantStyles[variant]}
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-2 p-4
          font-medium cursor-pointer
          hover:bg-black/5 transition-colors
        `}
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={18} className={iconColors[variant]} />
          <span>{title}</span>
        </div>
        <span className="transition-transform duration-200">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <p className="px-4 pb-4 text-sm leading-relaxed">{hint}</p>
      </div>
    </div>
  );
}

interface CollapsiblePanelProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

const panelVariantStyles = {
  default: 'bg-gray-50 border-gray-200',
  success: 'bg-mint-50 border-mint-200',
  warning: 'bg-amber-50 border-amber-200',
  info: 'bg-primary-50 border-primary-200',
};

export function CollapsiblePanel({
  title,
  icon,
  children,
  defaultOpen = false,
  variant = 'default',
}: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`
        rounded-xl border overflow-hidden
        ${panelVariantStyles[variant]}
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 p-4 font-medium cursor-pointer hover:bg-black/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <span className="transition-transform duration-200">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

export default HintPanel;
