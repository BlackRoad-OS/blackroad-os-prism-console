import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const pillStyles = cva('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', {
  variants: {
    tone: {
      healthy: 'bg-green-500/15 text-green-300 ring-1 ring-green-500/30',
      warning: 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30',
      degraded: 'bg-red-500/15 text-red-200 ring-1 ring-red-500/30'
    }
  },
  defaultVariants: {
    tone: 'healthy'
  }
});

interface StatusPillProps extends VariantProps<typeof pillStyles> {
  label: string;
}

export function StatusPill({ label, tone }: StatusPillProps) {
  return <span className={cn(pillStyles({ tone }))}>{label}</span>;
}
