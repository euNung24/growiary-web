'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const topicCardVariants = cva('group hover:shadow w-[300px]', {
  variants: {
    variant: {
      default: 'bg-white-0 border border-gray-100 text-gray-400',
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

export interface TopicCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof topicCardVariants> {}

const TopicCard = (props: TopicCardProps) => {
  return <Card {...props} className="w-[460px] h-[284px] px-8 py-6 flex flex-col" />;
};
TopicCard.displayName = 'TopicCard';

const TopicCardChip = (props: TopicCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-block font-r14 rounded px-2 py-0.5 self-start mb-2 bg-primary-400 text-white-0',
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
      className={cn('font-sb22 text-primary-900 group-hover:text-white-0')}
    />
  );
};
TopicCardTitle.displayName = 'TopicCardTitle';

const TopicCardDescription = CardDescription;

TopicCardDescription.displayName = 'TopicCardDescription';

const TopicCardContent = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return <CardContent {...props} className="flex-1 flex items-center text-gray-500" />;
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
