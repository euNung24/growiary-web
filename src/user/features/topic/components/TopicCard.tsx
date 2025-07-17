'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/shared/utils/cn';

const topicCardVariants = cva(
  'group hover:shadow w-full h-[284px] px-8 py-6 flex flex-col',
  {
    variants: {
      variant: {
        default: 'bg-white-0 border border-gray-100 text-gray-400',
        primary: 'bg-primary-900 text-white-0',
        secondary: 'bg-secondary-50 text-gray-900',
      },
      size: {
        default: 'rounded-lg pt-6 px-8 pb-[22px] font-r14',
        lg: 'rounded-xl h-[380px] p-6 font-r16',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface TopicCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof topicCardVariants> {}

const TopicCard = ({ className, variant, size, ...props }: TopicCardProps) => {
  return (
    <Card className={cn(topicCardVariants({ variant, size }), className)} {...props} />
  );
};
TopicCard.displayName = 'TopicCard';

const TopicCardChip = (props: TopicCardProps) => {
  return (
    <h3
      {...props}
      className={cn(
        'inline-block font-r14 rounded px-1.5 self-start mb-2 bg-primary-400 text-white-0',
      )}
    />
  );
};
TopicCardChip.displayName = 'CardChip';

const TopicCardHeader = CardHeader;
TopicCardHeader.displayName = 'TopicCardHeader';

const TopicCardTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <CardTitle
      {...props}
      className={cn('font-b32 text-primary-900 group-hover:text-white-0')}
    />
  );
};
TopicCardTitle.displayName = 'TopicCardTitle';

const TopicCardDescription = CardDescription;

TopicCardDescription.displayName = 'TopicCardDescription';

const TopicCardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <CardContent
      {...props}
      className={cn(
        'flex-1 flex items-center text-gray-500 relative font-r18',
        className,
      )}
    />
  );
};
TopicCardContent.displayName = 'TopicCardContent';

const TopicCardFooter = CardFooter;
TopicCardFooter.displayName = 'TopicCardFooter';

export {
  TopicCard,
  TopicCardHeader,
  TopicCardFooter,
  TopicCardTitle,
  TopicCardDescription,
  TopicCardContent,
  TopicCardChip,
};
