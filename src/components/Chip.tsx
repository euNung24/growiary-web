import { cn } from '@/lib/utils';
import * as React from 'react';
import { HTMLAttributes } from 'react';

type ChipProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'secondary' | 'gray';
};
const Chip = ({ className, variant, ...props }: ChipProps) => {
  let style = '';

  switch (variant) {
    case 'secondary':
      style = 'bg-secondary-50 text-gray-900';
      break;
    case 'gray':
      style = 'bg-gray-50 text-primary-900';
      break;
    default:
      style = 'bg-primary-400 text-white-0';
      break;
  }

  return (
    <div
      {...props}
      className={cn(
        'inline-block font-r14 rounded px-2 py-0.5 self-start',
        style,
        className,
      )}
    />
  );
};

export default Chip;
