import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gold' | 'success' | 'error' | 'info';
}

const variantStyles = {
  default: 'bg-ocean/10 text-ocean',
  gold: 'bg-gold text-white',
  success: 'bg-green/10 text-green',
  error: 'bg-red/10 text-red',
  info: 'bg-teal/10 text-teal',
};

export default function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
