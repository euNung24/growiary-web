'use client';

import { useEffect, useState } from 'react';
import DailyChecker from '@/components/DailyChecker';
import { getDailyCheckerPost } from '@/apis/post';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/components/LoginDialog';
import useGetProfile from '@/hooks/profile/useGetProfile';

const HomeDailyChecker = () => {
  const {
    date: { day },
  } = useRecoilValue(TodayState);

  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const [data, setData] = useState<number[] | undefined>(undefined);
  const today = new Date();
  const mutation = useMutation({
    mutationKey: ['dailyChecker'],
    mutationFn: getDailyCheckerPost,
  });
  const profile = useGetProfile();

  useEffect(() => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      setData(res.data);
    });
  }, []);

  return (
    <section className={cn(profile && 'mt-[72px]')}>
      <div className={cn(profile ? 'hidden' : 'flex py-[23px] mb-4 justify-end mx-2.5')}>
        <LoginDialog>
          <Button className="bg-gray-50 border-0" variant="outlineGray">
            시작하기
          </Button>
        </LoginDialog>
      </div>
      {profile ? (
        <>
          <div className="flex justify-between">
            <h2 className="title">매일 글쓰기</h2>
          </div>
          <p className={headerDescriptionStyle}>
            오늘까지 연속으로{' '}
            <span className="font-sb16 text-primary-900">{data || 0}일</span> 기록에
            성공했어요
          </p>
          <div className="border border-gray-200 rounded-xl flex justify-center gap-x-[52px] py-10 overflow-hidden">
            {[...Array(day)].map((v, i) => (
              <DailyChecker
                key={i}
                variant="prev"
                date={new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 1,
                  0,
                  0,
                  0,
                ).getDate()}
                count={i !== 0 && data ? data[i - 1] : 0}
              />
            ))}
            {day === 0 && (
              <DailyChecker
                variant="prev"
                date={new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() - 1,
                  0,
                  0,
                  0,
                ).getDate()}
                count={0}
              />
            )}
            <Link href="/post">
              <DailyChecker
                variant="today"
                date={today.getDate()}
                count={data !== undefined ? data[day] : undefined}
              />
            </Link>
            {[...Array(7 - day)].map((v, i) => (
              <DailyChecker
                key={i}
                variant="next"
                date={new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + i + 1,
                  0,
                  0,
                  0,
                ).getDate()}
                count={data && i + day + 1 !== data.length ? data[i + day + 1] : 0}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <h2 className="title">그루어리는 어떤 서비스인가요?</h2>
          </div>
          <div className="mt-6 border border-gray-200 rounded-xl flex justify-center gap-x-[52px] py-10 overflow-hidden"></div>
        </>
      )}
    </section>
  );
};

export default HomeDailyChecker;
