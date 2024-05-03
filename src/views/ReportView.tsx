'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import Line from '@/components/Line';
import { cn } from '@/lib/utils';
import Chip from '@/components/Chip';
import ReportPost from '@/views/report/ReportPost';
import ReportByDay from '@/views/report/ReportByDay';
import ReportByTime from '@/views/report/ReportByTime';
import ReportByChar from '@/views/report/ReportByChar';
import ReportByTopic from '@/views/report/ReportByTopic';
import useGetReport from '@/hooks/report/useGetReport';
import { ReportType } from '@/types/reportTypes';
import ReportByTag from '@/views/report/ReportByTag';

type ReportContextType = ReportType & { month: number };
export const ReportContext = createContext<ReportContextType>({} as ReportContextType);

const ReportView = () => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const chipStyle = 'py-1 bg-gray-50 text-primary-900 font-medium mr-1';

  const {
    date: { year, month, date },
  } = useRecoilValue(TodayState);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [lastDate, setLastDate] = useState(date);
  const reports = useGetReport();

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
    <div className="min-w-[940px]">
      <div>
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
        <Line className="mt-5 mb-4" />
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
      <ReportContext.Provider value={{ month: selectedMonth, ...reports }}>
        <article className="flex flex-col w-full gap-y-[102px] mt-[60px]">
          <section>
            <h2 className="title">리포트 요약</h2>
            <ul
              className={cn(
                boxStyle,
                'flex flex-col gap-y-4 mt-5 list-disc marker:text-gray-400 pl-10',
              )}
            >
              <li>
                총 <Chip className={chipStyle}>00개</Chip>의 글을{' '}
                <Chip className={chipStyle}>000자</Chip>로 작성했어요.
              </li>
              <li>
                주로 <Chip className={chipStyle}>00개</Chip>,{' '}
                <Chip className={chipStyle}>000자</Chip>에 글 작성했어요.
              </li>
              <li>
                <Chip className={chipStyle}>00개</Chip>와 관련한 글을 가장 많이
                작성했어요.
              </li>
              <li>
                지난 3월과 비교해 새로 등장한 태그는{' '}
                <Chip className={chipStyle}>00개</Chip>
                이에요.
              </li>
            </ul>
          </section>
          <ReportPost />
          <section className="flex gap-x-5">
            <ReportByDay />
            <ReportByTime />
          </section>
          <ReportByChar />
          <ReportByTopic />
          <ReportByTag />
        </article>
      </ReportContext.Provider>
    </div>
  );
};

export default ReportView;
