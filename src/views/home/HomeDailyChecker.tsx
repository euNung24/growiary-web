'use client';

import { useEffect, useState } from 'react';
import DailyChecker from '@/components/DailyChecker';
import { getDailyCheckerPost } from '@/apis/post';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/components/LoginDialog';
import useGetProfile from '@/hooks/profile/useGetProfile';
import { DailyCheckerType } from '@/types/postTypes';
import { Skeleton } from '@/components/ui/skeleton';

const HomeDailyChecker = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const [data, setData] = useState<DailyCheckerType | null>(null);
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

      {!profile && (
        <>
          <div className="flex justify-between">
            <h2 className="title">그루어리는 어떤 서비스인가요?</h2>
          </div>
          <div className="mt-6 border border-gray-200 rounded-xl flex justify-center gap-x-[52px] py-10 overflow-hidden"></div>
        </>
      )}
      {profile && (
        <>
          <div className="flex justify-between">
            <h2 className="title">매일 글쓰기</h2>
          </div>
          <p className={headerDescriptionStyle}>
            오늘까지 연속으로{' '}
            <span className="font-sb16 text-primary-900">
              {data?.today ? data?.continue.length + 1 : 0}일
            </span>{' '}
            기록에 성공했어요
          </p>
          <div className="border border-gray-200 rounded-xl flex justify-center gap-x-[52px] py-10 overflow-hidden">
            {data ? (
              <>
                {' '}
                {/* 연속 기록 시작일 */}
                {data.continue[data.continue.length - 1] && (
                  <DailyChecker
                    variant="prev"
                    date={
                      new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - data.continue.length,
                        0,
                        0,
                        0,
                      )
                    }
                    count={data.continue[data.continue.length - 1]}
                  />
                )}
                {/* 중략 */}
                {data.continue.length > 6 && (
                  <DailyChecker variant="ellipsis" count={0} />
                )}
                {/* 중략 이후 데이터 */}
                {data.continue
                  .slice(1, data.continue.length > 6 ? 5 : 6)
                  .map((count, i) => (
                    <DailyChecker
                      key={i}
                      variant="prev"
                      date={
                        new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          today.getDate() - i - 1,
                          0,
                          0,
                          0,
                        )
                      }
                      count={data.continue[i]}
                    />
                  ))
                  .reverse()}
                {/* 오늘 */}
                <Link href="/post">
                  <DailyChecker variant="today" date={today} count={data.today} />
                </Link>
                {/* 빈 값 */}
                {data.continue.length < 6 &&
                  [...Array(7 - data.continue.length - 1)].map((v, i) => (
                    <DailyChecker
                      key={i}
                      variant="next"
                      date={
                        new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          today.getDate() + i + 1,
                          0,
                          0,
                          0,
                        )
                      }
                      count={data.continue.length + 1 + i + 1}
                    />
                  ))}
              </>
            ) : (
              [...Array(7)].map((v, i) => (
                <div key={i} className="group text-center text-gray-500 font-r16">
                  <Skeleton className="mt-1 mb-3 h-4 w-10 mx-auto" />
                  <Skeleton className="mt-1.5 rounded-full w-[70px] h-[70px]" />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default HomeDailyChecker;
