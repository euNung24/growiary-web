'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Triangle } from 'lucide-react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import Line from '@/components/Line';
import { cn } from '@/lib/utils';
import Chip from '@/components/Chip';
import BarChart from '@/components/BarChart';
import PolarChart from '@/components/PolarChart';
import RectAreaChart from '@/components/RectAreaChart';
const HistoryView = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const chipStyle = 'py-1 bg-gray-50 text-primary-900 font-medium mr-1';

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
    <>
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
      <article className="flex flex-col gap-y-[102px] mt-[60px]">
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
              <Chip className={chipStyle}>00개</Chip>와 관련한 글을 가장 많이 작성했어요.
            </li>
            <li>
              지난 3월과 비교해 새로 등장한 태그는 <Chip className={chipStyle}>00개</Chip>
              이에요.
            </li>
          </ul>
        </section>
        <section>
          <div>
            <h2 className="title">기록한 글</h2>
            <p className={descriptionStyle}>
              <span className={strengthStyle}>38개</span>의 글을 작성했어요.
            </p>
            <div className="flex gap-x-5 h-[356px]">
              <div className={cn(boxStyle, 'flex-2')}>
                <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
                  <span>
                    전체 <b className="ml-[5px] text-gray-700">00개</b>
                  </span>
                  <span>
                    평균 <b className="ml-[5px] text-gray-700">00개</b>
                  </span>
                  <span>
                    최대 <b className="ml-[5px] text-gray-700">00개</b>
                  </span>
                </div>
                <BarChart
                  data={[12, 19, 3, 5, 2, 3, 3, 4]}
                  labels={['1', '2', '3', '4', '5', '6', '7', '8']}
                  backgroundColor={['#BFCADF', '#204C90']}
                />
              </div>
              <div className={cn(boxStyle, 'w-[300px]')}>
                <p className={cn(descriptionStyle, 'mt-0')}>
                  전체 이용자보다 <br />
                  <span className={strengthStyle}>+12개</span> 더 기록했어요
                </p>
                <BarChart
                  data={[12, 19]}
                  labels={['그루어리 평균', '그루미님']}
                  backgroundColor={['#BEBFBF', '#204C90']}
                  axisDisplay={false}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="flex gap-x-5">
          <div>
            <h2 className="title">요일</h2>
            <p className={descriptionStyle}>
              <span className={strengthStyle}>목요일</span>에 주로 글을 작성했어요.
            </p>
            <div className={cn(boxStyle)}>
              <PolarChart
                labels={['월', '화', '수', '목', '금', '토', '일']}
                data={[11, 16, 7, 3, 14, 12, 14]}
                backgroundColor={[
                  '#3B619D',
                  '#4F72A7',
                  '#6E86B4',
                  '#154284',
                  '#204C90',
                  '#8094B0',
                ]}
              />
            </div>
          </div>
          <div>
            <h2 className="title">시간대</h2>
            <p className={descriptionStyle}>
              <span className={strengthStyle}>저녁</span>에 주로 글을 작성했어요.
            </p>
            <div className={cn(boxStyle)}>
              <RectAreaChart />
            </div>
          </div>
        </section>
        <section>
          <h2 className="title">글자수</h2>
          <p className={descriptionStyle}>
            <span className={strengthStyle}>12,310자</span> 글자를 작성했어요.
          </p>
          <div className={cn(boxStyle)}>
            <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
              <span>
                전체 <b className="ml-[5px] text-gray-700">00개</b>
              </span>
              <span>
                평균 <b className="ml-[5px] text-gray-700">00개</b>
              </span>
              <span>
                최대 <b className="ml-[5px] text-gray-700">00개</b>
              </span>
            </div>
            <div className="flex gap-x-3">
              <div className="group flex-1 bg-primary-50 rounded-xl px-6 py-3 text-primary-900 hover:bg-primary-700 hover:text-white-0">
                <div className="flex justify-between text-gray-500 group-hover:text-white-0">
                  <span className="font-r16">3월</span>
                  <span className="font-r12 flex items-center gap-x-0.5">
                    123자
                    <Triangle
                      className="text-primary-200"
                      fill="#96A8CA"
                      width={6}
                      height={6}
                    />
                  </span>
                </div>
                <div className="flex items-center justify-center font-m36 mt-2 mb-[38px] group-hover:text-white-0">
                  1234{' '}
                  <span className="ml-2 text-gray-800 font-r16 group-hover:text-white-0">
                    자
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>추후 변경</div>
        </section>
        <section>
          <h2 className="title">주제</h2>
          <p className={descriptionStyle}>
            <span className={strengthStyle}>최종글자수</span>로 많은 글쓰기를 했어요.
          </p>
          <div className="flex rounded-lg overflow-hidden text-center h-9 leading-9">
            <div className="w-[10%] bg-primary-900">1</div>
            <div className="w-[20%] bg-primary-700">2</div>
            <div className="w-[30%] bg-primary-400">3</div>
            <div className="w-[40%] bg-primary-200">4</div>
          </div>
          <div className="flex gap-x-5 mt-5">
            <div className={cn(boxStyle, 'flex gap-x-12')}>
              <div className="flex flex-col justify-between">
                <span className="font-sb22">하루생각</span>
                <span className="font-r16 text-gray-800">
                  작성한 글 <b className="font-m36 text-primary-900">12</b> 개
                </span>
              </div>
              <div>표1</div>
            </div>
            <div className="flex flex-col flex-1 gap-y-4">
              <div className="flex p-3 rounded-lg border border-gray-100 items-center">
                <div className="font-r14 text-gray-500">4월 24일</div>
                <div className="ml-[25px] mr-3 flex-1 font-r16 text-gray-900">
                  글 타이틀
                </div>
                <Chip variant="secondary">오늘은 카페에서 기록</Chip>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="title">태그</h2>
          <p className={descriptionStyle}>
            <span className={strengthStyle}>32개</span>의 태그를 사용했어요.
          </p>
          <div className={cn(boxStyle)}>표</div>
        </section>
      </article>
    </>
  );
};

export default HistoryView;
