'use client';

import { useState } from 'react';
import Image from 'next/image';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, format, lastDayOfMonth, subMonths } from 'date-fns';

import { cn } from '@/shared/utils/cn';
import useGetProfile from '@/shared/queries/profile/useGetProfile';
import ReportPost from '@/user/features/report/components/ReportPost';
import ReportByDay from '@/user/features/report/components/ReportByDay';
import ReportByTime from '@/user/features/report/components/ReportByTime';
import ReportByChar from '@/user/features/report/components/ReportByChar';
import ReportByTopic from '@/user/features/report/components/ReportByTopic';
import ReportByTag from '@/user/features/report/components/ReportByTag';
import ReportTotal from '@/user/features/report/components/ReportTotal';
import ReportProvider from '@/user/features/report/providers/ReportProvider';

const ReportView = () => {
  const [date] = useState(() => new Date());
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
          !data?.userId && 'sm:relative sm:z-0',
        )}
      >
        <div className="flex gap-x-3 items-center">
          <ChevronLeft
            width={24}
            height={24}
            className={cn(
              'cursor-pointer',
              !data?.userId && 'cursor-default pointer-events-none text-gray-400',
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
              !data?.userId && 'cursor-default pointer-events-none text-gray-400',
            )}
            onClick={handleClickNextMonth}
          />
        </div>
        <div className="flex gap-x-1.5 items-center text-gray-400 font-r14">
          <Image src="/assets/icons/calendar.png" alt="calendar" width={16} height={16} />
          <span>
            {selectedYear}년 {selectedMonth}월 1일
          </span>{' '}
          ~{' '}
          <span>
            {selectedYear}년 {selectedMonth}월 {lastDate}일
          </span>
        </div>
      </div>
      <article className="flex flex-col w-full gap-y-[102px] mt-6">
        <ReportProvider selectedYear={selectedYear} selectedMonth={selectedMonth}>
          <ReportTotal />
          <ReportPost />
          <section>
            <h2 className="title">기록 패턴</h2>
            <div className="flex gap-5 flex-wrap [&>*]:flex-1 sm:[&>*]:flex-initial">
              <ReportByDay />
              <ReportByTime />
            </div>
          </section>
          <ReportByChar />
          <ReportByTopic />
          <ReportByTag />
        </ReportProvider>
      </article>
    </div>
  );
};

export default ReportView;
