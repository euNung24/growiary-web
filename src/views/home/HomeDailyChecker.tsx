'use client';

import { useEffect, useRef, useState } from 'react';
import DailyChecker from '@/components/DailyChecker';

const HomeDailyChecker = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const [data, setData] = useState<number[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setData([12, 13, 14, 15, 16, 1, 1, 1, 1]);
    }, 2000);
    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">매일 글쓰기</h2>
      </div>
      <p className={headerDescriptionStyle}>
        오늘까지 연속으로 <span className="font-sb16 text-primary-900">nn일</span> 기록에
        성공했어요
      </p>
      <div className="border border-gray-200 rounded-xl flex justify-center gap-x-[52px] py-10 overflow-hidden">
        {[...Array(4)].map((v, i) => (
          <DailyChecker key={i} variant="prev" date={data[i]} count={data[i]} />
        ))}
        <DailyChecker variant="today" date={data[4]} count={data[4]} />
        {[...Array(4)].map((v, i) => (
          <DailyChecker key={i} variant="prev" date={data[i + 5]} count={data[i + 5]} />
        ))}
      </div>
    </section>
  );
};

export default HomeDailyChecker;
