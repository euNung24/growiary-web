import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-700/20 h-5 w-28', className)}
      {...props}
    />
  );
}

export { Skeleton };
