import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const dailyCheckerStyles = {
  prev: 'bg-primary-50 text-gray-900',
  today: 'relative border border-primary-300 border-dashed text-primary-400 pr-0.5',
  next: 'bg-gray-100 text-gray-700',
};

type DailyCheckerProps = {
  variant: keyof typeof dailyCheckerStyles;
  date?: number;
  count?: number;
};
const DailyChecker = ({ variant, date, count }: DailyCheckerProps) => {
  return (
    <div className="text-center text-gray-500 font-r16">
      {date ? date : <Skeleton className="mt-1 mb-3 h-4 w-10 mx-auto" />}
      {count ? (
        <div
          className={cn(
            'mt-1.5 rounded-full w-[70px] h-[70px] font-r28 flex justify-center items-center',
            dailyCheckerStyles[variant],
          )}
        >
          {count}
          {variant === 'today' && (
            <span className="absolute w-1 h-1 rounded-full bg-secondary-600 top-[27px] left-[50px]"></span>
          )}
        </div>
      ) : (
        <Skeleton className="mt-1.5 rounded-full w-[70px] h-[70px]" />
      )}
    </div>
  );
};

export default DailyChecker;
