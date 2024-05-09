import { cn } from '@/lib/utils';
import RectAreaChart from '@/components/RectAreaChart';
import { useEffect, useRef, useState } from 'react';
import useReportContext from '@/hooks/report/useReportContext';
import { getPercentage } from '@/utils';
import Image from 'next/image';

const TIME = ['새벽', '아침', '오후', '저녁'];

type ReportByTimeProps = {
  month: number;
};
const ReportByTime = ({ month }: ReportByTimeProps) => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const { data } = useReportContext();
  const [timeRankByPercent, setTimeRankByPercent] = useState<[string, number][] | null>(
    null,
  );

  const totalTimeRef = useRef(0);

  useEffect(() => {
    const monthTimeData = data?.time?.[month];

    if (!monthTimeData) return;

    monthTimeData.forEach(v => {
      totalTimeRef.current += v;
    });
    const percentDataWithTimeline = monthTimeData.map(
      (v, i) => [TIME[i], getPercentage(v, totalTimeRef.current)] as [string, number],
    );
    const sortedTimeByPercent = percentDataWithTimeline.sort((a, b) =>
      a[1] > b[1] ? -1 : 1,
    );

    setTimeRankByPercent(sortedTimeByPercent);
  }, [data?.time, month]);

  return (
    <div className="flex-1">
      <p className={descriptionStyle}>
        <span className={strengthStyle}>
          {timeRankByPercent ? timeRankByPercent[0][0] : TIME[3]}
        </span>
        에 주로 작성했어요
      </p>
      <div className={cn(boxStyle)}>
        {timeRankByPercent ? (
          <RectAreaChart data={timeRankByPercent} />
        ) : (
          <Image
            src="/assets/images/timeReport_sample.png"
            alt="sample"
            width={460}
            height={356}
          />
        )}
      </div>
    </div>
  );
};

export default ReportByTime;
