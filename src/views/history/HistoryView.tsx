'use client';

import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ResPostType } from '@/types/postTypes';
import { getTwoFormatDate } from '@/utils';
import { TopicCategory } from '@/types/topicTypes';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { SelectSingleEventHandler } from 'react-day-picker';
import useGetMonthlyPosts from '@/hooks/posts/useGetMonthlyPosts';
import { Button } from '@/components/ui/button';
import useProfileContext from '@/hooks/profile/useProfileContext';
import LoginDialog from '@/components/LoginDialog';
import CategoryHistory from '@/views/history/CategoryHistory';
import TodayNewPost from '@/views/history/TodayNewPost';
import PostHistory from '@/views/history/PostHistory';
import CalendarHistory from '@/views/history/CalendarHistory';

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

    const offsetTop = topStickyElRef.current?.offsetHeight + 20;
    const targetPosition = stickyHeight - offsetTop;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (isLogin === 'NOT_LOGIN') {
      setDate(new Date(2024, 3, 30, 0, 0, 0));
    }
  }, [isLogin]);

  useEffect(() => {
    if (!profile) return;

    mutation
      .mutateAsync(`${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`)
      .then(res => {
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
  }, [profile, selectedMonth]);

  return (
    isLogin && (
      <div
        className={cn(
          'w-full flex border-gray-100 lg:max-w-[640px] mb-[-72px] !mx-auto lg:min-w-[auto]',
          profile && 'mt-[-72px]',
        )}
      >
        <div className="flex-1 overflow-hidden">
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
                  <PopoverTrigger asChild>
                    <span className="px-6 py-1.5 rounded-[30px] text-primary-900 font-sb18 bg-primary-50 hidden lg:block">
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
            <div className="flex gap-x-[18px] items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <h4 className="font-r12 py-3 mx-4 text-gray-500 hidden lg:block">
                    카테고리
                  </h4>
                </PopoverTrigger>
                <PopoverContent
                  className="px-3 pt-2.5 pb-6 flex flex-col justify-center bg-white-0 mr-5 border-none !shadow-dialog hidden lg:block"
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
            <TodayNewPost
              condition={
                isLogin === 'NOT_LOGIN' ||
                (!posts[today] && year === selectedYear && month === selectedMonth)
              }
              assignRef={assignRef}
              year={selectedYear}
              month={selectedMonth}
              date={date.getDate()}
            />
            <PostHistory posts={posts} assignRef={assignRef} setPosts={setPosts} />
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
