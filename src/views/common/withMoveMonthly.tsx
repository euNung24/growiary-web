'use client';

import { ComponentType, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { cn } from '@/lib/utils';
import useProfileContext from '@/hooks/profile/useProfileContext';
import Image from 'next/image';

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

    useEffect(() => {
      if (profile) {
        setSelectedYear(year);
        setSelectedMonth(month);
        setLastDate(date);
      }
    }, [profile]);

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
      <div className="mx-auto mt-9">
        <div className="py-5 flex justify-between sticky top-0 bg-white-0">
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
              {profile ? selectedMonth : 4}월 리포트
            </span>
            <ChevronRight
              width={24}
              height={24}
              className={cn(
                'cursor-pointer',
                +(selectedYear.toString() + selectedMonth.toString().padStart(2, '0')) >=
                  +(year.toString() + month.toString().padStart(2, '0')) &&
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
              {profile ? selectedYear : 2024}년 {profile ? selectedMonth : 4}월 1일
            </span>{' '}
            ~{' '}
            <span>
              {profile ? selectedYear : 2024}년 {profile ? selectedMonth : 4}월{' '}
              {profile ? lastDate : 30}일
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
        <Component
          {...props}
          selectedYear={profile ? selectedYear : 2024}
          selectedMonth={profile ? selectedMonth : 4}
          selectedMonthLastDate={profile ? lastDate : 30}
        />
      </div>
    );
  };

  Component.displayName = 'MoveMonthly';

  return MoveMonthly;
};

export default withMoveMonthly;
