import { cn } from '@/lib/utils';
import * as React from 'react';
import { HTMLAttributes } from 'react';

type ChipProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'secondary';
};
const Chip = ({ className, variant, ...props }: ChipProps) => {
  return (
    <div
      {...props}
      className={cn(
        'inline-block font-r14 rounded px-2 py-0.5 self-start',
        variant ? 'bg-secondary-50 text-gray-900' : 'bg-primary-400 text-white-0',
        className,
      )}
    />
  );
};

export default Chip;
