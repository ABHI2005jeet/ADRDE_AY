import { twMerge } from 'tailwind-merge';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={twMerge(
        'bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] card-shadow overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={twMerge('px-6 py-4 border-b border-[var(--border-color)]', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={twMerge('font-semibold text-lg text-[var(--text-main)]', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={twMerge('p-6', className)} {...props}>
      {children}
    </div>
  );
}
