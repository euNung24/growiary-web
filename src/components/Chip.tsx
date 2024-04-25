import { cn } from '@/lib/utils';
import * as React from 'react';
import { HTMLAttributes } from 'react';

const Chip = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-block font-r14 rounded px-2 py-0.5 self-start bg-primary-400 text-white-0',
        className,
      )}
    />
  );
};

export default Chip;
