'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';

const cardVariants = cva('group flex flex-col hover:shadow w-[300px]', {
  variants: {
    variant: {
      default:
        'bg-white-0 border border-gray-100 text-gray-900 hover:bg-primary-900 hover:text-white-0 hover:border-0',
      primary: 'bg-primary-900 text-white-0',
      secondary: 'bg-secondary-50 text-gray-900',
      disabled: 'bg-gray-50 hover:shadow-none',
    },
    size: {
      default: 'rounded-lg h-[118px] px-5 pt-4 pb-6 font-r14',
      lg: 'rounded-xl h-[320px] px-6 py-5 font-r16',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const cardChipVariants = cva('inline-block font-r14 rounded px-1.5 self-start mr-1.5', {
  variants: {
    position: {
      default:
        'bg-gray-50 text-gray-900 group-hover:bg-primary-400 group-hover:text-white-0 mb-4',
      footer: 'bg-gray-50 text-gray-900',
    },
    size: {
      default: 'px-1.5',
      lg: 'py-0.5 px-2',
    },
  },
  defaultVariants: {
    position: 'default',
    size: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}
export interface CardChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardChipVariants> {}

export const CardContext = createContext<CardProps>({ size: 'default' });

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <CardContext.Provider value={{ size, variant }}>
      <div
        ref={ref}
        {...props}
        className={cn(cardVariants({ variant, size }), className)}
      />
    </CardContext.Provider>
  ),
);
Card.displayName = 'Card';

const CardChip = React.forwardRef<HTMLDivElement, CardChipProps>(
  ({ className, size, position, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(cardChipVariants({ position, size }), className)}
      />
    );
  },
);
CardChip.displayName = 'CardChip';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} {...props} className={cn(className)} />;
  },
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { size, variant } = useContext(CardContext);

  return (
    <h3
      ref={ref}
      {...props}
      className={cn(
        size === 'lg' ? 'font-sb22' : 'font-sb16',
        variant === 'disabled' && 'text-gray-500',
        className,
      )}
    />
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { size } = useContext(CardContext);

  return (
    <p
      ref={ref}
      {...props}
      className={cn(size === 'lg' ? 'font-r16' : 'font-r14', className)}
    />
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { size, variant } = useContext(CardContext);

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        'flex-1 text-gray-800 group-hover:text-white-0',
        variant === 'disabled' && 'group-hover:text-gray-800',
        size === 'lg' ? 'pt-2' : 'pt-1',
        className,
      )}
    />
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} {...props} className={cn('flex items-center mt-3', className)} />
  ),
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardChip,
};
