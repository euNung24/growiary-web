'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useMutation } from '@tanstack/react-query';
import { sendGAEvent } from '@next/third-parties/google';

import DailyChecker from '@/user/features/post/components/home/DailyChecker';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { tracking } from '@/shared/utils/mixPanel';
import { MENU_NAMES } from '@/shared/utils';

import useProfileContext from '@/shared/hooks/useProfileContext';
import { DailyCheckerType } from '@/user/features/history/types/post';
import { getDailyCheckerPost } from '@/user/features/post/apis/postApi';

const HomeDailyChecker = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const [data, setData] = useState<DailyCheckerType | null>(null);
  const today = new Date();
  const mutation = useMutation({
    mutationKey: ['dailyChecker'],
    mutationFn: getDailyCheckerPost,
  });
  const { profile } = useProfileContext();

  const handleClickNewPost = () => {
    tracking(MENU_NAMES.기록하기);
    sendGAEvent({ event: MENU_NAMES.기록하기 });
  };

  useEffect(() => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      setData(res.data);
    });
  }, []);

  return (
    <section>
      {!profile && (
        <div className="pt-[72px]">
          <div
            className="relative rounded-xl h-[198px] py-10 overflow-hidden pl-[85px]"
            style={{
              background: "no-repeat center/960px 198px url('/assets/images/banner.png')",
            }}
          >
            <p className="text-white-0 font-sb24 mb-6">
              <span className="mb-3 block">기록하며 성장하는</span>
              <span>어른들을 위한 노트, 그루어리</span>
            </p>
            <p className="text-gray-100 font-r14">
              나만의 생각과 경험, 일상을 기록하고 데이터로 확인하세요
            </p>
          </div>
        </div>
      )}
      {profile && (
        <>
          <div className="flex justify-between">
            <h2 className="title">매일 글쓰기</h2>
          </div>
          <p className={headerDescriptionStyle}>
            오늘까지 연속으로{' '}
            <span className="font-sb16 text-primary-900">
              {data && (data.today > 0 ? data.continue.length + 1 : data.continue.length)}
              일째
            </span>{' '}
            기록에 성공했어요
          </p>
          <div className="border border-gray-100 rounded-xl flex flex-wrap justify-center items-end gap-[52px] pt-6 pb-[57px] overflow-hidden md:px-10">
            {data ? (
              <>
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
                <Link href="/post" onClick={handleClickNewPost}>
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
                <div
                  key={i}
                  className="group text-center text-gray-500 font-r16 pt-[17.5px]"
                >
                  <Skeleton className="mt-1 mb-3 h-4 w-11 mx-auto" />
                  <Skeleton className="mt-1.5 rounded-full w-[76px] h-[76px]" />
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
