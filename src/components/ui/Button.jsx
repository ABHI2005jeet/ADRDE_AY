import { twMerge } from 'tailwind-merge';

export function Button({ className, variant = 'primary', size = 'default', children, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--color-primary-light)] text-white hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]',
    outline: 'border border-[var(--border-color)] bg-transparent hover:bg-[var(--border-color)] text-[var(--text-main)] focus:ring-[var(--border-color)]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-[var(--border-color)] text-[var(--text-main)] focus:ring-[var(--border-color)]',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  return (
    <button
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
