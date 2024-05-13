'use client';

import { cn } from '@/lib/utils';
import { ReportType } from '@/types/reportTypes';
import { useRecoilValue } from 'recoil';
import { ReportState } from '@/store/reportStore';
import useProfileContext from '@/hooks/profile/useProfileContext';

const SAMPLE_DATA = [1028, 36, 732060, 24511];
type ReportAccProps = {
  isPreview: boolean;
};
const ReportAcc = ({ isPreview = false }: ReportAccProps) => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const reportData = useRecoilValue(ReportState);
  const { profile } = useProfileContext();

  const report = [
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

  return (
    <section>
      <h2 className="title">전체 기록</h2>
      <p className="font-r16 text-gray-800 mt-1 mb-6">현재까지 누적된 모든 기록 데이터</p>
      <div className={cn('flex gap-x-2.5', boxStyle)}>
        {[...Array(4)].map((data, i) => (
          <div
            key={i}
            className={cn(
              'group flex-1 rounded-xl px-4 py-3',
              i % 2 === 0 ? 'bg-primary-900 text-white-0' : 'bg-primary-50 text-gray-500',
            )}
          >
            <div className="flex justify-between">
              <span className="'font-r14'">{report[i].name}</span>
            </div>
            <div
              className={cn(
                'flex items-center justify-center font-r36 mt-2 mb-[38px]',
                i % 2 !== 0 && 'text-primary-900',
              )}
            >
              {(profile && !isPreview
                ? report[i].num(reportData)
                : SAMPLE_DATA[i]
              ).toLocaleString()}{' '}
              <span className={cn('ml-2 font-r16', i % 2 !== 0 && 'text-gray-800')}>
                {report[i].ext}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportAcc;
