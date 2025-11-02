import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const spinnerVariants = cva('animate-spin rounded-full border-2 border-current border-t-transparent', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    color: {
      primary: 'text-blue-600',
      white: 'text-white',
      gray: 'text-gray-600',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ size, color, className }: SpinnerProps) {
  return (
    <div className={clsx(spinnerVariants({ size, color, className }))} />
  );
}
