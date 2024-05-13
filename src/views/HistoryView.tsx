/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { useEffect, useRef, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { deletePost } from '@/apis/post';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTitleIcon,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import useProfileContext from '@/hooks/profile/useProfileContext';
import LoginDialog from '@/components/LoginDialog';
import { CardChip } from '@/components/ui/card';

const SAMPLE_CATEGORY_DATA: Record<TopicCategory, number> = {
  하루생각: 8,
  회고: 10,
  자아탐험: 4,
  크리에이티브: 4,
  자유: 12,
};
const SAMPLE_DATA: {
  [key: string]: (Pick<ResPostType, 'title' | 'tags' | 'id'> & {
    content: string;
    date: string;
    topic: {
      category: TopicCategory;
    };
    index: number;
  })[];
} = {
  '04월 29일': [
    {
      index: 38,
      id: '123123123',
      topic: { category: '하루생각' },
      title: '요즘 나의 최대 걱정거리',
      content:
        '요즘 내 마음이 너무 뒤숭숭하다. 가족들에게도 투정을 많이 부리고 있다. 일단 투정부터 부린 다음 뒤늦게 후회하고 사과를 드리는 일이 많아졌는데, 그래도 개선된 모습을 만들어나가고 싶어서 짜증이 날 때면 참거나 다른 생각을 하며 리프레시하는 연습을 한다.',
      tags: ['걱정', '생각', '개선', '투정'],
      date: '04월 29일. 오후 3시 22분',
    },
  ],
  '04월 28일': [
    {
      index: 37,
      id: 'zxcvzxcvzcxv',
      topic: { category: '하루생각' },
      title: '새벽 운동과 부상',
      content:
        '감기에서 적당히 회복된 것 같고 마침 기온도 조금 오른 것 같아서 새벽 운동을 나갔다. 그리고 뭔가 호흡이 평소보다 가빴는데, 그냥 감기가 덜 나은 탓이려니 하고  계속 뛰었고 그게 탈이 났다. 운동을 다녀오고',
      tags: ['운동', '부상', '건강', '일상'],
      date: '04월 28일. 오전 11시 44분',
    },
  ],
};

type HistoryPostType = {
  [key: string]: ResPostType[];
};
const HistoryView = () => {
  const {
    date: { year, month, date: todayDate },
  } = useRecoilValue(TodayState);
  const { profile } = useProfileContext();
  const [selectedYear, setSelectedYear] = useState(profile ? year : 2024);
  const [selectedMonth, setSelectedMonth] = useState(profile ? month : 4);
  const [posts, setPosts] = useState<HistoryPostType | null>(null);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [categories, setCategories] = useState<Record<TopicCategory, number>>(
    {} as Record<TopicCategory, number>,
  );
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const mutation = useGetMonthlyPosts();
  const today = `${year}-${getTwoFormatDate(month)}-${getTwoFormatDate(todayDate)}`;
  const postsRef = useRef<{ [id: string]: HTMLDivElement }>({});
  const topStickyElRef = useRef<HTMLDivElement | null>(null);

  const assignRef = (index: string) => (element: HTMLDivElement) => {
    postsRef.current[index] = element;
  };

  const handleClickPrevMonth = () => {
    const prevMonth = selectedMonth - 1 > 0 ? selectedMonth - 1 : 12;
    let prevYear = selectedYear;

    if (prevMonth >= 12) {
      prevYear -= 1;
      setSelectedYear(prevYear);
    }
    setSelectedMonth(prevMonth);
    setDate(new Date(prevYear, prevMonth - 1, date?.getDate() || todayDate, 0, 0, 0));
  };

  const handleClickNextMonth = () => {
    const nextMonth = selectedMonth + 1 < 13 ? selectedMonth + 1 : 1;
    let nextYear = selectedYear;

    if (nextMonth <= 1) {
      nextYear += 1;
      setSelectedYear(nextYear);
    }

    setSelectedMonth(nextMonth < 13 ? nextMonth : 1);
    setDate(new Date(nextYear, nextMonth - 1, date?.getDate() || todayDate, 0, 0, 0));
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

  const handleDeletePost = async (id: string, date: string) => {
    await deletePost(id).then(res => {
      if (!res) return;
      toast({
        description: '기록이 삭제되었습니다',
      });
      const filteredPosts = {
        ...posts,
        [date]: [...(posts?.[date]?.filter(post => post.id !== id) || [])],
      };
      if (filteredPosts[date] && !filteredPosts[date].length) {
        delete filteredPosts[date];
        setDates(Object.keys(filteredPosts).reverse());
      }
      setPosts(filteredPosts);
    });
  };

  useEffect(() => {
    if (profile) {
      setSelectedMonth(month);
      setSelectedYear(year);
    } else {
      setDate(new Date(2024, 3, 30, 0, 0, 0));
    }
  }, [profile]);

  useEffect(() => {
    mutation.mutateAsync(selectedMonth).then(res => {
      if (!res) return;
      if (!('posts' in res.data)) {
        setPosts({});
        setDates([]);
        return;
      }
      const sortDataByDate = res.data.posts.reduce((f, v) => {
        const date = format(new Date(v.writeDate), 'yyyy-MM-dd');
        return {
          ...f,
          [date]: [...(f[date] || []), v],
        };
      }, {} as HistoryPostType);

      setTotalPostCount(res.data.posts.length);
      setPosts(sortDataByDate);
      setDates(
        Object.keys(sortDataByDate).toSorted((a, b) =>
          +a.slice(-2) > +b.slice(-2) ? -1 : 1,
        ),
      );
      setCategories(res.data.category);
    });
  }, [selectedMonth]);

  return (
    <div className="w-full mt-[-83px] flex border-gray-100 lg:max-w-[640px] mb-[-72px] mx-auto lg:min-w-[auto] !mx-auto">
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
                    month={date}
                    onMonthChange={setDate}
                    selected={date}
                    onSelect={handleSelectADay}
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
                        <span>
                          {posts
                            ? Object.keys(posts).length
                              ? categories[category]
                              : 0
                            : SAMPLE_CATEGORY_DATA[category]}
                          개
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-gray-500 font-r12">
                    <span>{selectedMonth}월에 작성한 글</span>
                    <span>
                      {posts ? (Object.keys(posts).length ? totalPostCount : 0) : 38}개
                    </span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {!profile && (
              <LoginDialog>
                <Button
                  className="bg-gray-50 border-0 mr-4"
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
          {((posts &&
            !posts[today] &&
            year === selectedYear &&
            month === selectedMonth) ||
            !posts) && (
            <div>
              <div className="mb-3">
                <span className="mr-2">
                  {posts ? month : 4}월 {posts ? todayDate : 30}일
                </span>
                <Chip variant="gray">오늘</Chip>
              </div>
              <div className="bg-gray-50o flex flex-col gap-y-[13px] justify-center items-center h-[149px] rounded-2xl text-gray-900 font-r16	">
                <p>오늘 작성한 글이 없어요</p>
                <Link href="/post" className="flex gap-x-2.5 text-gray-500 font-r14">
                  <Image src="/assets/icons/edit.png" alt="post" width={20} height={20} />
                  새로운 기록하기
                </Link>
              </div>
            </div>
          )}
          {(posts ? dates : Object.keys(SAMPLE_DATA)).map(date => (
            <div
              ref={assignRef(
                posts
                  ? date
                  : selectedYear + '-' + date.slice(0, 2) + '-' + date.slice(-3, -1),
              )}
              id={date}
              key={date}
            >
              <div className="mb-3">
                <span
                  className={cn('mr-2 text-gray-500', today === date && 'text-gray-900')}
                >
                  {posts ? `${+date.split('-')[1]}월 ${+date.split('-')[2]}일` : date}
                </span>
                {today === date && <Chip variant="gray">오늘</Chip>}
              </div>
              <div key={date} className="space-y-3">
                {(
                  posts?.[date]?.toSorted((a, b) =>
                    new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1,
                  ) || SAMPLE_DATA[date]
                ).map(post => (
                  <div key={post.id} className="relative">
                    <Link
                      href={profile ? `/history/${post.id}` : ''}
                      className={cn(
                        'block',
                        !profile && 'cursor-default pointer-events-none',
                      )}
                    >
                      <div className="p-6 flex flex-col rounded-2xl border border-gray-200 relative">
                        <div className="flex justify-between items-center">
                          <CardChip size="lg">
                            {topicCategory[post.topic?.category || '자유'].Icon({
                              width: 12,
                              height: 12,
                              color: 'currentColor',
                            })}
                            {post.topic?.category || '자유'}
                          </CardChip>
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
                          {typeof post.content !== 'string'
                            ? post.content?.ops?.map(op =>
                                typeof op.insert === 'string' && op.insert !== '\n'
                                  ? op.insert
                                  : '',
                              )
                            : post.content}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <div className="flex flex-wrap gap-x-3 max-w-[472px] lg:max-w-[402px] h-[22px] overflow-hidden">
                            {post.tags?.map((tag, i) => (
                              <Chip key={tag + i} variant="gray">
                                {tag}
                              </Chip>
                            ))}
                          </div>
                          <span className="text-gray-500 font-r14 tracking-tight shrink-0">
                            {'writeDate' in post
                              ? getStringDateAndTime(new Date(post.writeDate))
                              : post.date}
                          </span>
                        </div>
                        {post.topic && (
                          <div className="absolute bottom-0 right-6 z-[-1]">
                            {topicCategory[post.topic.category]?.Icon({
                              width: 160,
                              height: 160,
                              color: '#EEF9E6',
                            })}
                          </div>
                        )}
                      </div>
                    </Link>
                    <Popover>
                      <PopoverTrigger
                        className={cn(
                          'absolute right-6 top-6',
                          !profile && 'cursor-default pointer-events-none',
                        )}
                      >
                        <Ellipsis width={24} height={24} color="#747F89" />
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col justify-center overflow-hidden bg-white-0 w-auto p-0 [&>*]:py-2.5 [&>*]:px-10 [&>*]:block [&>*]:font-r14">
                        <Button asChild variant="ghostGrayHover">
                          <Link href={`/history/${post.id}/edit`}>수정하기</Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghostGrayHover">삭제하기</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitleIcon
                                src="/assets/icons/info.png"
                                width={32}
                                height={32}
                                alt="info"
                              />
                              <AlertDialogTitle>
                                기록을 정말 삭제하시겠습니까?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                삭제된 글은 복원할 수 없습니다.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => handleDeletePost(post.id, date)}
                              >
                                확인
                              </AlertDialogCancel>
                              <AlertDialogAction>취소</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="h-[300px]"></div>
        </section>
      </div>
      <div className="sticky h-screen w-[240px] top-0 pt-3 border-l lg:hidden">
        <Calendar
          mode="single"
          month={date}
          onMonthChange={setDate}
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
                <span>
                  {posts
                    ? Object.keys(posts).length
                      ? categories[category]
                      : 0
                    : SAMPLE_CATEGORY_DATA[category]}
                  개
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-gray-500 font-r12">
            <span>{selectedMonth}월에 작성한 글</span>
            <span>{posts ? (Object.keys(posts).length ? totalPostCount : 0) : 38}개</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
