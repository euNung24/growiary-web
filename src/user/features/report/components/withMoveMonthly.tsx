'use client';

import { ComponentType, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import useProfileContext from '@/shared/hooks/useProfileContext';
import Image from 'next/image';
import ReportProvider from '@/user/features/report/providers/ReportProvider';
import { addMonths, format, lastDayOfMonth, subMonths } from 'date-fns';
import useGetProfile from '@/shared/queries/profile/useGetProfile';

export type WithMoveMonthlyProps = {
  selectedMonth?: number;
  selectedYear?: number;
  selectedMonthLastDate?: number;
};
const withMoveMonthly = <T extends object>(Component: ComponentType<T>): React.FC<T> => {
  const MoveMonthly = (props: T) => {
    const [date] = useState(() => new Date());
    const { profile } = useProfileContext();
    const { data } = useGetProfile();

    const [selectedDate, setSelectedDate] = useState(() =>
      data?.userId ? date : subMonths(date, 1),
    );
    const [selectedYear, selectedMonth] = [
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
    ];

    const lastDateOfMonth = lastDayOfMonth(selectedDate).getDate();
    const lastDate =
      format(selectedDate, 'yyyyMM') !== format(date, 'yyyyMM')
        ? lastDateOfMonth
        : selectedDate.getDate();

    const handleClickPrevMonth = () => {
      setSelectedDate(subMonths(selectedDate, 1));
    };

    const handleClickNextMonth = () => {
      setSelectedDate(addMonths(selectedDate, 1));
    };

    return (
      <div className="mx-auto mt-9">
        <div
          className={cn(
            'py-5 flex justify-between flex-wrap gap-y-2.5 sticky top-0 bg-white-0 z-10',
            !profile && 'sm:relative sm:z-0',
          )}
        >
          <div className="flex gap-x-3 items-center">
            <ChevronLeft
              width={24}
              height={24}
              className={cn(
                'cursor-pointer',
                !profile && 'cursor-default pointer-events-none text-gray-400',
              )}
              onClick={handleClickPrevMonth}
            />
            <span className="px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50">
              {selectedMonth}월 리포트
            </span>
            <ChevronRight
              width={24}
              height={24}
              className={cn(
                'cursor-pointer',
                +format(selectedDate, 'yyyyMM') >= +format(date, 'yyyyMM') &&
                  'cursor-default pointer-events-none text-gray-400',
                !profile && 'cursor-default pointer-events-none text-gray-400',
              )}
              onClick={handleClickNextMonth}
            />
          </div>
          <div className="flex gap-x-1.5 items-center text-gray-400 font-r14">
            <Image
              src="/assets/icons/calendar.png"
              alt="calendar"
              width={16}
              height={16}
            />
            <span>
              {selectedYear}년 {selectedMonth}월 1일
            </span>{' '}
            ~{' '}
            <span>
              {selectedYear}년 {selectedMonth}월 {lastDate}일
            </span>
          </div>
        </div>
        <ReportProvider selectedYear={selectedYear} selectedMonth={selectedMonth}>
          <Component
            {...props}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
        </ReportProvider>
      </div>
    );
  };

  return MoveMonthly;
};

export default withMoveMonthly;
