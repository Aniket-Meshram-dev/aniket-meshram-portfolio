import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'brand' | 'accent' | 'outline' | 'success';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-md transition-colors';

  const variantStyles = {
    default: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50',
    brand: 'bg-[#cc3366]/10 text-[#cc3366] dark:text-[#efc8d5] border border-[#cc3366]/20',
    accent: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    outline: 'border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
};
