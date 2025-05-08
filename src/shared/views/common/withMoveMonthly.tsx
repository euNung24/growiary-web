'use client';

import { ComponentType, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/shared/store/todayStore';
import { cn } from '@/shared/utils/cn';
import useProfileContext from '@/user/profile/hooks/useProfileContext';
import Image from 'next/image';
import ReportProvider from '@/user/domain/report/components/ReportProvider';

export type WithMoveMonthlyProps = {
  selectedMonth?: number;
  selectedYear?: number;
  selectedMonthLastDate?: number;
};
const withMoveMonthly = <T extends object>(Component: ComponentType<T>): React.FC<T> => {
  const MoveMonthly = (props: T) => {
    const {
      date: { year, month, date },
    } = useRecoilValue(TodayState);
    const { profile } = useProfileContext();
    const [selectedYear, setSelectedYear] = useState(year);
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [lastDate, setLastDate] = useState(date);

    const { isLogin } = useProfileContext();

    useEffect(() => {
      if (isLogin === 'NOT_LOGIN') {
        setSelectedYear(2024);
        setSelectedMonth(4);
        setLastDate(30);
      }
    }, [isLogin]);

    const handleClickPrevMonth = () => {
      const prevMonth = selectedMonth - 1 > 0 ? selectedMonth - 1 : 12;
      let prevYear = year;

      if (prevMonth >= 12) {
        prevYear -= 1;
        setSelectedYear(prevYear);
      }
      if (prevYear === year && prevMonth === month) {
        setLastDate(date);
      } else {
        const lastDateOfMonth = new Date(prevYear, prevMonth, 0).getDate();
        setLastDate(lastDateOfMonth);
      }

      setSelectedMonth(prevMonth);
    };

    const handleClickNextMonth = () => {
      const nextMonth = selectedMonth + 1 < 13 ? selectedMonth + 1 : 1;
      let nextYear = year;

      if (nextMonth <= 1) {
        nextYear += 1;
        setSelectedYear(nextYear);
      }

      if (nextYear === year && nextMonth === month) {
        setLastDate(date);
      } else {
        const lastDateOfMonth = new Date(nextYear, nextMonth, 0).getDate();
        setLastDate(lastDateOfMonth);
      }
      setSelectedMonth(nextMonth < 13 ? nextMonth : 1);
    };
    return (
      isLogin && (
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
                  +(
                    selectedYear.toString() + selectedMonth.toString().padStart(2, '0')
                  ) >= +(year.toString() + month.toString().padStart(2, '0')) &&
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
            {/*{!profile && (*/}
            {/*  <LoginDialog>*/}
            {/*    <Button*/}
            {/*      className="bg-gray-50 border-0 focus:border-transparent focus:border-0"*/}
            {/*      size="sm"*/}
            {/*      variant="outlineGray"*/}
            {/*    >*/}
            {/*      시작하기*/}
            {/*    </Button>*/}
            {/*  </LoginDialog>*/}
            {/*)}*/}
          </div>
          <ReportProvider selectedYear={selectedYear} selectedMonth={selectedMonth}>
            <Component
              {...props}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
            />
          </ReportProvider>
        </div>
      )
    );
  };

  Component.displayName = 'MoveMonthly';

  return MoveMonthly;
};

export default withMoveMonthly;
