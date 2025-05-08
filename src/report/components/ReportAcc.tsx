'use client';

import { cn } from '@/lib/utils';
import { ReportType } from '@/report/type';
import { useRecoilValue } from 'recoil';
import { ReportState } from '@/report/store';
import useProfileContext from '@/profile/hooks/useProfileContext';
import { useMemo } from 'react';

const SAMPLE_DATA = [1028, 36, 732060, 24511];

const ReportAcc = () => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const reportData = useRecoilValue(ReportState);
  const { isLogin, profile } = useProfileContext();

  const report = useMemo(() => {
    return [
      {
        name: '총 작성된 기록',
        num: (data: ReportType['all']) => data?.post?.sum || 0,
        ext: '개',
      },
      {
        name: '월 평균 작성된 기록',
        num: (data: ReportType['all']) => data?.post?.avg || 0,
        ext: '개',
      },
      {
        name: '총 작성된 글자수',
        num: (data: ReportType['all']) => data?.charactersCount?.sum || 0,
        ext: '자',
      },
      {
        name: '월 평균 작성된 글자수',
        num: (data: ReportType['all']) => data?.charactersCount?.avg || 0,
        ext: '자',
      },
    ];
  }, [JSON.stringify(reportData)]);

  return (
    isLogin && (
      <section>
        <h2 className="title">전체 기록</h2>
        <p className="font-r16 text-gray-800 mt-1 mb-6">
          현재까지 누적된 모든 기록 데이터
        </p>
        <div className={cn('flex gap-1.5 flex-wrap', boxStyle)}>
          {[...Array(4)].map((data, i) => (
            <div
              key={i}
              className={cn(
                'group flex-[1_0_218px] rounded-xl px-4 py-3',
                i % 2 === 0
                  ? 'bg-primary-900 text-white-0'
                  : 'bg-primary-50 text-gray-500',
              )}
            >
              <div className="flex justify-between">
                <span className="font-r12">{report[i].name}</span>
              </div>
              <div
                className={cn(
                  'flex items-center justify-center font-r32 mt-[21px] mb-[28px]',
                  i % 2 !== 0 && 'text-primary-900',
                )}
              >
                {(profile ? report[i].num(reportData) : SAMPLE_DATA[i]).toLocaleString()}{' '}
                <span className={cn('ml-2 font-r16', i % 2 !== 0 && 'text-gray-800')}>
                  {report[i].ext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  );
};

export default ReportAcc;
