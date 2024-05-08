import { cn } from '@/lib/utils';
import Image from 'next/image';
import { format } from 'date-fns';
import { Check, Ellipsis, X } from 'lucide-react';
import * as React from 'react';
import Chip from '@/components/Chip';

const dailyCheckerStyles = {
  prev: 'relative bg-primary-50 text-gray-900',
  ellipsis: 'bg-gray-50/50 text-gray-400',
  today:
    'relative text-gray-900 bg-gray-100 group-hover:bg-primary-900 group-hover:text-white-0',
  next: 'text-gray-400 border border-gray-200 border-dashed',
};

type DailyCheckerProps = {
  variant: keyof typeof dailyCheckerStyles;
  date?: Date;
  count?: number;
};

const Tooltip = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div
      className={cn(
        'absolute translate-y-full bottom-[-9px] hidden group-hover:block bg-gray-500 text-white-0 font-r12 py-[3px] px-3 rounded-[38px] text-nowrap',
        className,
      )}
    >
      <div className="absolute top-[-13px] left-1/2 translate-x-[-50%] w-4 h-4 border border-8 border-b-gray-500 border-t-transparent border-l-transparent border-r-transparent"></div>
      {text}
    </div>
  );
};
const DailyChecker = ({ variant, date, count }: DailyCheckerProps) => {
  return (
    <div className={cn('group text-center text-gray-500 font-r16')}>
      {variant === 'today' && (
        <Chip variant="gray" className="mb-1.5 font-r12">
          오늘
        </Chip>
      )}
      <span className="block font-r12">{date ? format(date, 'M월 d일') : '-'}</span>
      <div
        className={cn(
          'mt-1.5 rounded-full w-[76px] h-[76px] font-r28 flex flex-col justify-center items-center font-r11',
          dailyCheckerStyles[variant],
          variant === 'today' && count && 'bg-primary-900 text-white-0 border-none',
        )}
      >
        {variant === 'prev' && (
          <>
            <Check />
            <Tooltip text={`기록 ${count}개`} />
          </>
        )}
        {variant === 'ellipsis' && <Ellipsis />}
        {variant === 'today' &&
          (count === 0 ? (
            <>
              <X className="group-hover:hidden" />
              <div className="group-hover:flex hidden gap-y-0.5 flex-col items-center justify-center">
                <Image
                  src="/assets/icons/edit_white.png"
                  alt="post"
                  width={24}
                  height={24}
                  className=""
                />
                <span>기록하기</span>
              </div>
              <Tooltip text="오늘은 기록이 없어요" className="block" />
            </>
          ) : (
            <>
              <span>기록 완료</span>
              <Tooltip text={`기록 ${count}개`} className="block" />
            </>
          ))}
        {variant === 'next' && (
          <>
            <span>{count}일째</span>
            <span>기록 달성</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyChecker;
