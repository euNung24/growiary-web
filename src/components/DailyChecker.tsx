import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
    <div className="group text-center text-gray-500 font-r16">
      {count !== undefined ? date : <Skeleton className="mt-1 mb-3 h-4 w-10 mx-auto" />}
      {count !== undefined ? (
        <div
          className={cn(
            'mt-1.5 rounded-full w-[70px] h-[70px] font-r28 flex justify-center items-center',
            dailyCheckerStyles[variant],
            variant === 'today' && count > 0 && 'bg-primary-900 text-white-0 border-none',
          )}
        >
          <span className={cn(variant === 'today' && 'group-hover:hidden')}>{count}</span>
          {variant === 'today' && count === 0 && (
            <span className="absolute w-1 h-1 rounded-full bg-secondary-600 top-[27px] left-[50px]"></span>
          )}
          <div className="group-hover:block hidden">
            {variant === 'today' && (
              <Image
                src="/assets/icons/edit.png"
                alt="post"
                width={24}
                height={24}
                className=""
              />
            )}
          </div>
        </div>
      ) : (
        <Skeleton className="mt-1.5 rounded-full w-[70px] h-[70px]" />
      )}
    </div>
  );
};

export default DailyChecker;
