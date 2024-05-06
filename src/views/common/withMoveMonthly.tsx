'use client';

import { ComponentType, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';

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
    const [selectedYear, setSelectedYear] = useState(year);
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [lastDate, setLastDate] = useState(date);

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
      <div className="w-[940px] mx-auto mt-5 mb-[72px]">
        <div className="flex gap-x-3 items-center">
          <ChevronLeft
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleClickPrevMonth}
          />
          <span className="px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50">
            {selectedYear}년 {selectedMonth}월
          </span>
          <ChevronRight
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleClickNextMonth}
          />
        </div>
        <Component
          {...props}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedMonthLastDate={lastDate}
        />
      </div>
    );
  };

  Component.displayName = 'MoveMonthly';

  return MoveMonthly;
};

export default withMoveMonthly;
