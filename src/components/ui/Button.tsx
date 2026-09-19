import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  ...props
}) => {

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-colors cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc3366]';

  const variantStyles = {
    primary: 'bg-[#cc3366] text-white hover:bg-[#ab2b56] shadow-md shadow-[#cc3366]/20 border border-[#cc3366]/30',
    secondary: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60',
    outline: 'border border-zinc-300 dark:border-zinc-700/80 hover:border-zinc-400 dark:hover:border-zinc-500 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200',
    ghost: 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300',
    glass: 'glass-panel text-zinc-900 dark:text-zinc-100 hover:border-zinc-400/30 shadow-sm'
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'p-2 rounded-xl'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};
