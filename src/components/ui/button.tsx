'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { createContext, useContext } from 'react';
import Image from 'next/image';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-primary-900 text-white-0 focus:bg-primary-900/90 dark:bg-primary-900 dark:text-white-0 dark:focus:bg-primary-900/90',
        secondary:
          'bg-secondary-700 text-white-0 focus:bg-secondary-700/90 dark:bg-secondary-700 dark:text-white-0 dark:focus:bg-secondary-700/90',
        outline:
          'border border-primary-900 bg-white-0 text-primary-900 hover:border-primary-900/90 hover:text-primary-900/90 focus:border-2 dark:border-primary-900 dark:bg-white-0 dark:hover:border-primary-900/90 dark:hover:text-primary-900/90',
        outlineGray:
          'border border-gray-200 bg-white-0 text-gray-900 hover:border-gray-200/90 hover:text-gray-900/90 focus:border-2 focus:border-gray-400 dark:border-gray-200 dark:bg-white-0 dark:hover:border-gray-200/90 dark:hover:text-gray-900/90 dark:focus:border-gray-400',
        ghost:
          'text-primary-900 hover:text-primary-900/90 focus:bg-primary-50 dark:hover:text-primary-900/90 dark:focus:bg-primary-50',
        ghostGray:
          'text-gray-900 hover:text-gray-900/90 focus:bg-gray-50 dark:hover:text-gray-900/90 dark:focus:bg-gray-50',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
      },
      size: {
        default: 'h-10 px-6 py-[11px] font-sb14',
        sm: 'h-8 px-6 py-2 font-sb12',
        lg: 'h-12 rounded-lg px-6 py-[13px] font-sb16',
        xl: 'h-16 rounded-lg px-6 py-5 font-sb18',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
}

const ButtonContext = createContext<ButtonProps>({ size: 'default' });

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    let disableClass = '';

    if (disabled) {
      disableClass = 'pointer-events-none ';
      switch (variant) {
        case 'outline':
          disableClass +=
            'border-gray-100 text-gray-400 dark:border-gray-100 dark:text-gray-400';
          break;
        case 'outlineGray':
          disableClass +=
            'border-gray-100 text-gray-400 dark:border-gray-100 dark:text-gray-400';
          break;
        case 'ghost':
          disableClass += 'text-gray-400 dark:text-gray-400';
          break;
        case 'ghostGray':
          disableClass += 'text-gray-400 dark:text-gray-400';
          break;
        default:
          disableClass += 'bg-gray-400 text-white-0 dark:bg-gray-400 dark:text-white-0';
          break;
      }
    }

    return (
      <ButtonContext.Provider value={{ size }}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }), disableClass)}
          ref={ref}
          {...props}
        />
      </ButtonContext.Provider>
    );
  },
);
Button.displayName = 'Button';

const ButtonIcon = ({ src, alt }: { src: string; alt: string }) => {
  const { size } = useContext(ButtonContext);

  let width;
  let marginRight;

  switch (size) {
    case 'lg':
      width = 22;
      marginRight = 'mr-[2px]';
      break;
    case 'xl':
      width = 24;
      marginRight = 'mr-[2px]';
      break;
    default:
      width = 20;
      marginRight = 'mr-[1px]';
      break;
  }

  return (
    <Image src={src} width={width} height={width} alt={alt} className={marginRight} />
  );
};

export { Button, buttonVariants, ButtonIcon };
