'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { format } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SelectSingleEventHandler } from 'react-day-picker';

import { cn } from '@/shared/utils/cn';
import { TodayState } from '@/shared/store/todayStore';
import { getTwoFormatDate } from '@/shared/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import LoginDialog from '@/shared/components/LoginDialog';
import { Button } from '@/shared/components/ui/button';

import useProfileContext from '@/shared/hooks/useProfileContext';
import useGetMonthlyPosts from '@user/post/queries/useGetMonthlyPosts';
import { TopicCategory } from '@user/topic/types/topic';
import { ResPostType } from '@user/history/types/post';
import CategoryHistory from '@user/history/components/CategoryHistory';
import TodayNewPost from '@user/history/components/TodayNewPost';
import PostHistory from '@user/history/components/PostHistory';
import CalendarHistory from '@user/history/components/CalendarHistory';
import { debounce } from '@/shared/utils/debounce';

type HistoryPostType = {
  [key: string]: ResPostType[];
};
const HistoryView = () => {
  const {
    date: { year, month, date: todayDate },
  } = useRecoilValue(TodayState);
  const { isLogin, profile } = useProfileContext();
  const mutation = useGetMonthlyPosts();

  const postsRef = useRef<{ [id: string]: HTMLDivElement }>({});
  const topStickyElRef = useRef<HTMLDivElement | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [posts, setPosts] = useState<HistoryPostType>({});
  const [categories, setCategories] = useState<Record<TopicCategory, number>>(
    {} as Record<TopicCategory, number>,
  );

  const today = `${year}-${getTwoFormatDate(month)}-${getTwoFormatDate(todayDate)}`;
  const selectedYear = date?.getFullYear();
  const selectedMonth = (date?.getMonth() || 0) + 1;

  const assignRef = (index: string) => (element: HTMLDivElement) => {
    postsRef.current[index] = element;
  };

  const handleClickPrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0));
  };

  const handleClickNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0));
  };

  const handleSelectADay: SelectSingleEventHandler = (day, selectedDay) => {
    setDate(selectedDay);
    const date = format(selectedDay, 'yyyy-MM-dd');
    const stickyHeight = postsRef.current[date]?.offsetTop;

    if (!stickyHeight || !topStickyElRef.current) return;

    const offsetTop = topStickyElRef.current?.offsetHeight - 40;
    const targetPosition = stickyHeight - offsetTop;

    document.querySelector('#scroll')?.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  const mutationFn = async (year: number, month: number) => {
    const dateYYMM = `${year}-${month.toString().padStart(2, '0')}`;

    return mutation.mutateAsync(dateYYMM).then(res => {
      if (!res) return;
      if (!('posts' in res.data)) {
        setPosts({});
        setCategories({} as Record<TopicCategory, number>);
        return;
      }
      const sortDataByDate = res.data.posts.reduce((f, v) => {
        const date = format(new Date(v.writeDate), 'yyyy-MM-dd');
        return {
          ...f,
          [date]: [...(f[date] || []), v],
        };
      }, {} as HistoryPostType);

      setPosts(sortDataByDate);
      setCategories(res.data.category);
    });
  };

  const debouncedMutation = useMemo(() => debounce(mutationFn), []);

  useEffect(() => {
    if (isLogin === 'NOT_LOGIN') {
      setDate(new Date(2024, 3, 30, 0, 0, 0));
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLogin !== 'LOGIN') return;
    debouncedMutation(selectedYear, selectedMonth);

    return () => {
      debouncedMutation.cancel();
    };
  }, [isLogin, selectedMonth]);

  return (
    isLogin && (
      <div
        className={cn(
          'w-full flex border-gray-100 lg:max-w-[640px] mb-[-72px] !mx-auto lg:min-w-[auto]',
          profile && 'mt-[-72px]',
        )}
      >
        <div className="flex-1">
          <div
            className="flex justify-between sticky z-10 top-0 bg-white-0 border-b border-gray-100"
            ref={topStickyElRef}
          >
            <div className="py-5 flex gap-x-3 items-center">
              <ChevronLeft
                width={24}
                height={24}
                className={cn(
                  'cursor-pointer',
                  !profile && 'cursor-default pointer-events-none text-gray-400',
                )}
                onClick={handleClickPrevMonth}
              />
              <div className="relative">
                <span className="block px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50 lg:hidden">
                  {selectedYear}년 {selectedMonth}월
                </span>
                <Popover>
                  <PopoverTrigger asChild role="button">
                    <span className="px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50 hidden break-keep text-center lg:block">
                      {selectedYear}년 {selectedMonth}월
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    className="flex flex-col justify-center bg-white-0 w-auto"
                    align="start"
                  >
                    <CalendarHistory
                      date={date}
                      setDate={setDate}
                      handleSelectADay={handleSelectADay}
                    />
                  </PopoverContent>
                </Popover>
              </div>
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
            <div className="flex gap-x-[18px] items-center flex-wrap-reverse justify-end ">
              <Popover>
                <PopoverTrigger asChild>
                  <h4 className="font-r12 py-3 mx-4 text-gray-500 hidden lg:block shrink-0">
                    카테고리
                  </h4>
                </PopoverTrigger>
                <PopoverContent
                  className="px-3 pt-2.5 pb-6 bg-white-0 mr-5 border-none !shadow-dialog hidden lg:block"
                  align="start"
                >
                  <CategoryHistory
                    selectedMonth={selectedMonth}
                    categories={categories}
                  />
                </PopoverContent>
              </Popover>
              {isLogin === 'NOT_LOGIN' && (
                <LoginDialog>
                  <Button
                    className="bg-gray-50 border-0 mr-4 focus:border-transparent focus:border-0 lg:mr-0"
                    size="sm"
                    variant="outlineGray"
                  >
                    시작하기
                  </Button>
                </LoginDialog>
              )}
            </div>
          </div>
          <section className="flex flex-col gap-y-[72px] pb-5 mx-2.5 my-4 pt-3">
            {(isLogin === 'NOT_LOGIN' ||
              (mutation.isSuccess &&
                !posts[today] &&
                year === selectedYear &&
                month === selectedMonth)) && (
              <TodayNewPost
                assignRef={assignRef}
                year={year}
                month={month}
                date={todayDate}
              />
            )}
            {(isLogin === 'NOT_LOGIN' || mutation.isSuccess) && (
              <PostHistory posts={posts} assignRef={assignRef} setPosts={setPosts} />
            )}
            <div className="h-[300px]"></div>
          </section>
        </div>
        <div className="sticky h-screen w-[240px] top-0 pt-3 border-l lg:hidden">
          <CalendarHistory
            date={date}
            setDate={setDate}
            handleSelectADay={handleSelectADay}
          />
          <div className="mt-16">
            <CategoryHistory selectedMonth={selectedMonth} categories={categories} />
          </div>
        </div>
      </div>
    )
  );
};

export default HistoryView;
