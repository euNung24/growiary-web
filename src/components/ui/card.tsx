'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { createContext, useContext } from 'react';

const cardVariants = cva('hover:shadow w-[300px]', {
  variants: {
    variant: {
      default: 'bg-white-0 border border-gray-100 text-gray-900',
      primary: 'bg-primary-900 text-white-0',
      secondary: 'bg-secondary-50 text-gray-900',
    },
    size: {
      default: 'rounded-lg h-[118px] p-5 font-r14',
      lg: 'rounded-xl h-[380px] p-6 font-r16',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const CardContext = createContext<CardProps>({ size: 'default' });

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <CardContext.Provider value={{ size, variant }}>
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size }), className)}
        {...props}
      />
    </CardContext.Provider>
  ),
);
Card.displayName = 'Card';

const CardChip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { variant } = useContext(CardContext);
    let styles = '';

    switch (variant) {
      case 'primary':
        styles = 'bg-primary-400 text-white-0';
        break;
      default:
        styles = 'bg-gray-50 text-gray-900';
        break;
    }

    return (
      <div
        ref={ref}
        className={cn('font-r12 rounded px-2 py-0.5 self-start mb-4', styles, className)}
        {...props}
      />
    );
  },
);
CardChip.displayName = 'CardChip';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex flex-col', className)} {...props} />;
  },
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { size } = useContext(CardContext);
  let fontSize;

  switch (size) {
    case 'lg':
      fontSize = 'font-sb22';
      break;
    default:
      fontSize = 'font-sb16';
      break;
  }

  return <h3 ref={ref} className={cn(fontSize, className)} {...props} />;
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { size, variant } = useContext(CardContext);

  let marginTop;

  switch (size) {
    case 'lg':
      marginTop = 'pt-2';
      break;
    default:
      marginTop = 'pt-1';
      break;
  }

  return (
    <div
      ref={ref}
      className={cn(marginTop, `${variant !== 'primary' && 'text-gray-700'}`, className)}
      {...props}
    />
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-3', className)} {...props} />
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
