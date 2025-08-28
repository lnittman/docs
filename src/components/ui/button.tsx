import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium text-sm lowercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-2 border-black bg-black text-white hover:scale-[1.02] hover:bg-gray-900 active:scale-[0.98] active:bg-black',
        destructive:
          'border-2 border-red-600 bg-white text-red-600 hover:scale-[1.02] hover:bg-red-50 active:scale-[0.98] active:bg-red-100',
        outline:
          'border-2 border-black bg-white text-black hover:scale-[1.02] hover:bg-gray-50 active:scale-[0.98] active:bg-gray-100',
        secondary:
          'border-2 border-gray-300 bg-gray-100 text-black hover:scale-[1.02] hover:border-black active:scale-[0.98] active:bg-gray-200',
        ghost:
          'hover:scale-[1.02] hover:bg-gray-100 active:scale-[0.98] active:bg-gray-200',
        link: 'text-black underline-offset-4 hover:text-gray-700 hover:underline active:text-gray-900',
        terminal:
          'border-2 border-[#00ff00] bg-black font-mono text-[#00ff00] hover:scale-[1.02] hover:bg-[#001100] active:scale-[0.98]',
        paper:
          'border-2 border-black bg-white text-black hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none',
        mono: 'border-2 border-gray-400 bg-gray-100 font-mono text-black hover:scale-[1.02] hover:border-black hover:bg-white active:scale-[0.98]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
