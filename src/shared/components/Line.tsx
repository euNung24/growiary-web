import { cn } from '@/shared/utils/cn';

type LineProps = {
  variant?: 'dark' | 'light';
  className?: string;
};
const Line = ({ variant = 'light', className }: LineProps) => {
  return (
    <hr
      className={cn(
        variant === 'light' ? 'border-gray-100' : 'border-gray-200',
        className,
      )}
    />
  );
};

export default Line;
