import { cn } from '@/shared/utils/cn';
import * as React from 'react';
import { HTMLAttributes } from 'react';

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'secondary' | 'gray';
  size?: 'lg' | 'md';
};
const Chip = ({ className, variant, size = 'md', ...props }: ChipProps) => {
  let style = '';

  switch (variant) {
    case 'secondary':
      style = 'bg-secondary-50 text-gray-900';
      break;
    case 'gray':
      style = 'bg-gray-50 text-gray-900';
      break;
    default:
      style = 'bg-primary-400 text-white-0';
      break;
  }

  return (
    <span
      {...props}
      className={cn(
        'inline-block font-r14 rounded self-start',
        size === 'md' ? 'px-1.5' : 'py-0.5 px-2',
        style,
        className,
      )}
    />
  );
};

export default Chip;
