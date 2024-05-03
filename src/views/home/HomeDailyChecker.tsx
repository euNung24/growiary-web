'use client';

import { useEffect, useState } from 'react';
import DailyChecker from '@/components/DailyChecker';
import { getDailyCheckerPost } from '@/apis/post';

const HomeDailyChecker = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const [data, setData] = useState<number | undefined>(undefined);
  const today = new Date();

  useEffect(() => {
    const fn = async () => {
      const res = await getDailyCheckerPost();
      setData(res.data.count);
    };

    fn();
  }, []);

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">매일 글쓰기</h2>
      </div>
      <p className={headerDescriptionStyle}>
        오늘까지 연속으로{' '}
        <span className="font-sb16 text-primary-900">{data || 0}일</span> 기록에
        성공했어요
      </p>
      <div className="border border-gray-200 rounded-xl flex justify-center gap-x-[52px] py-10 overflow-hidden">
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
          count={data !== undefined ? 0 : undefined}
        />
        <DailyChecker variant="today" date={today.getDate()} count={data} />
        {[...Array(7)].map((v, i) => (
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
            count={data !== undefined ? data + i + 1 : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeDailyChecker;
