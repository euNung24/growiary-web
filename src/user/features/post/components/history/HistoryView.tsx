'use client';

import { useRef, useState } from 'react';

import { format, subMonths } from 'date-fns';
import { SelectSingleEventHandler } from 'react-day-picker';

import { cn } from '@/shared/utils/cn';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import LoginDialog from '@/shared/components/LoginDialog';
import { Button } from '@/shared/components/ui/button';

import useProfileContext from '@/shared/hooks/useProfileContext';
import { TopicCategory } from '@/user/features/topic/types/topic';
import CategoryHistory from '@/user/features/post/components/history/CategoryHistory';
import PostHistory from '@/user/features/post/components/history/PostHistory';
import CalendarHistory from '@/user/features/post/components/history/CalendarHistory';
import MonthNavigator from '@user/post/components/history/MonthNavigator';

const HistoryView = () => {
  const { isLogin, profile } = useProfileContext();

  const postsRef = useRef<{ [id: string]: HTMLDivElement }>({});
  const topStickyElRef = useRef<HTMLDivElement | null>(null);
  const [date, setDate] = useState<Date>(() =>
    profile ? new Date() : subMonths(new Date(), 1),
  );
  const [categories, setCategories] = useState<Record<TopicCategory, number>>(
    {} as Record<TopicCategory, number>,
  );
  const selectedMonth = (date.getMonth() || 0) + 1;

  const assignRef = (index: string) => (element: HTMLDivElement) => {
    postsRef.current[index] = element;
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
            <MonthNavigator
              date={date}
              setDate={setDate}
              handleSelectADay={handleSelectADay}
            />
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
          <PostHistory assignRef={assignRef} date={date} setCategories={setCategories} />
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
