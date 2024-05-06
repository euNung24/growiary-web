/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import Line from '@/components/Line';
import Chip from '@/components/Chip';
import Link from 'next/link';
import Image from 'next/image';
import { ResPostType } from '@/types/postTypes';
import { getStringDateAndTime, getTwoFormatDate } from '@/utils';
import { topicCategory } from '@/utils/topicCategory';
import { Calendar } from '@/components/ui/calendar';
import { TopicCategory } from '@/types/topicTypes';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { SelectSingleEventHandler } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import useGetMonthlyPosts from '@/hooks/posts/useGetMonthlyPosts';

type HistoryPostType = {
  [key: string]: ResPostType[];
};
const HistoryView = () => {
  const {
    date: { year, month, date: todayDate },
  } = useRecoilValue(TodayState);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [posts, setPosts] = useState<HistoryPostType>({});
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const mutation = useGetMonthlyPosts();
  const today = `${year}-${getTwoFormatDate(month)}-${getTwoFormatDate(todayDate)}`;
  const router = useRouter();

  const handleClickPrevMonth = () => {
    const prevMonth = selectedMonth - 1 > 0 ? selectedMonth - 1 : 12;
    let prevYear = year;

    if (prevMonth >= 12) {
      prevYear -= 1;
      setSelectedYear(prevYear);
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

    setSelectedMonth(nextMonth < 13 ? nextMonth : 1);
  };

  const handleSelectADay: SelectSingleEventHandler = (day, selectedDay) => {
    setDate(selectedDay);

    router.push(`/history#${format(selectedDay, 'yyyy-MM-dd')}`);
  };

  useEffect(() => {
    mutation.mutateAsync(selectedMonth).then(res => {
      if (!res) return;
      if (!Array.isArray(res.data)) {
        setPosts(res.data);
        return;
      }

      const sortDataByDate = res.data.reduce((f, v) => {
        const date = format(new Date(v.writeDate), 'yyyy-MM-dd');
        return {
          ...f,
          [date]: [...(f[date] || []), v],
        };
      }, {} as HistoryPostType);
      setPosts(sortDataByDate);
      setDates(
        Object.keys(sortDataByDate).toSorted((a, b) =>
          +a.slice(-2) > +b.slice(-2) ? -1 : 1,
        ),
      );
    });
  }, [selectedMonth]);

  return (
    <div className="w-full flex border-gray-100 lg:max-w-[640px] mb-[-72px] mx-auto lg:min-w-[auto]">
      <div className="flex-1 mt-5">
        <div className="flex justify-between">
          <div className="flex gap-x-3 items-center">
            <ChevronLeft
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleClickPrevMonth}
            />
            <div className="relative">
              <span className="block px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50 lg:hidden">
                {selectedYear}년 {selectedMonth}월
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <span className="px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50 hidden lg:block">
                    {selectedYear}년 {selectedMonth}월
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  className="flex flex-col justify-center bg-white-0 w-auto"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={date => date > new Date() || date < new Date('1900-01-01')}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <ChevronRight
              width={24}
              height={24}
              className={cn(
                'cursor-pointer',
                +(selectedYear.toString() + selectedMonth.toString().padStart(2, '0')) >=
                  +(year.toString() + month.toString().padStart(2, '0')) &&
                  'cursor-default pointer-events-none text-gray-400',
              )}
              onClick={handleClickNextMonth}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <h4 className="font-r12 py-3 mx-4 text-gray-500 hidden lg:block">
                카테고리
              </h4>
            </PopoverTrigger>
            <PopoverContent
              className="px-3 pt-2.5 pb-6 w-[274px] h-[278px] flex flex-col justify-center bg-white-0 mr-5"
              align="start"
            >
              <div className="mx-4 space-y-2">
                <h4 className="text-gray-900 font-r12 py-3">카테고리</h4>
                <div>
                  {(Object.keys(topicCategory) as TopicCategory[]).map(category => (
                    <div
                      key={category}
                      className="flex items-center justify-between font-r14"
                    >
                      <div className="flex items-center gap-x-1 py-2.5">
                        {topicCategory[category].Icon({
                          color: '#002861',
                          width: 16,
                          height: 16,
                        })}
                        <span>{category}</span>
                      </div>
                      <span>00개</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-gray-500 font-r12">
                  <span>{selectedMonth}월에 작성한 글</span>
                  <span>00개</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Line className="mt-5 mb-4" />
        <section className="flex flex-col gap-y-[72px] pb-5  mx-2.5">
          {posts && !posts[today] && year === selectedYear && month === selectedMonth && (
            <div>
              <div className="mb-3">
                <span className="mr-2">
                  {month}월 {todayDate}일
                </span>
                <Chip variant="gray">오늘</Chip>
              </div>
              <div className="bg-gray-50/50 flex flex-col gap-y-[13px] justify-center items-center h-[149px] rounded-2xl text-gray-900 font-r16	">
                <p>오늘 작성한 글이 없어요</p>
                <Link href="/post" className="flex gap-x-2.5 text-gray-500 font-r14">
                  <Image src="/assets/icons/edit.png" alt="post" width={20} height={20} />
                  새로운 기록하기
                </Link>
              </div>
            </div>
          )}
          {}
          {posts &&
            dates.map(date => (
              <div id={date} key={date}>
                <div className="mb-3">
                  <span
                    className={cn(
                      'mr-2 text-gray-500',
                      today === date && 'text-gray-900',
                    )}
                  >
                    {+date.split('-')[1]}월 {+date.split('-')[2]}일
                  </span>
                  {today === date && <Chip variant="gray">오늘</Chip>}
                </div>
                <div key={date} className="space-y-3">
                  {posts[date]
                    ?.toSorted((a, b) =>
                      new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1,
                    )
                    .map(post => (
                      <Link key={post.id} href={`/history/${post.id}`} className="block">
                        <div className="p-6 flex flex-col rounded-2xl border border-gray-200 relative">
                          <div className="flex justify-between items-center">
                            <Chip className="text-gray-900" variant="gray">
                              No.{post.index}
                            </Chip>
                            <Ellipsis width={24} height={24} color="#747F89" />
                          </div>
                          <p className="font-sb22 text-gray-900 mt-4 mb-2">
                            {post.title || '제목 타이틀'}
                          </p>
                          <div
                            className="overflow-hidden text-ellipsis min-h-[54px] font-r16 text-gray-800"
                            style={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 6,
                              maxHeight: '156px',
                            }}
                          >
                            {post.content?.ops?.map(op =>
                              typeof op.insert === 'string' && op.insert !== '\n'
                                ? op.insert
                                : '',
                            )}
                          </div>
                          <div className="mt-6 flex justify-between items-center">
                            <div className="flex gap-x-3">
                              {post.tags?.map((tag, i) => (
                                <Chip
                                  key={tag + i}
                                  className="text-gray-900"
                                  variant="gray"
                                >
                                  {tag}
                                </Chip>
                              ))}
                            </div>
                            <span className="text-gray-500 font-r14">
                              {getStringDateAndTime(new Date(post.writeDate))}
                            </span>
                          </div>
                          {post.category && (
                            <div className="absolute bottom-0 right-6 z-[-1]">
                              {topicCategory[post.category]?.Icon({
                                width: 160,
                                height: 160,
                                color: '#EEF9E6',
                              })}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </section>
      </div>
      <div className="sticky h-screen top-0 pt-3 border-l lg:hidden">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectADay}
          disabled={date => date > new Date() || date < new Date('1900-01-01')}
        />
        <div className="mt-16 mx-4 space-y-2">
          <h4 className="text-gray-900 font-r12 py-3">카테고리</h4>
          <div>
            {(Object.keys(topicCategory) as TopicCategory[]).map(category => (
              <div key={category} className="flex items-center justify-between font-r14">
                <div className="flex items-center gap-x-1 py-2.5">
                  {topicCategory[category].Icon({
                    color: '#002861',
                    width: 16,
                    height: 16,
                  })}
                  <span>{category}</span>
                </div>
                <span>00개</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-gray-500 font-r12">
            <span>{selectedMonth}월에 작성한 글</span>
            <span>00개</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
