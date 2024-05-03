import { cn } from '@/lib/utils';
import RectAreaChart from '@/components/RectAreaChart';
import { useEffect, useRef, useState } from 'react';
import useReportContext from '@/hooks/report/useReportContext';
import { getPercentage } from '@/utils';

const TIMELINE = ['새벽', '아침', '점심', '저녁'];
const ReportByTime = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const { time, month } = useReportContext();
  const [timeRankByPercent, setTimeRankByPercent] = useState<[string, number][] | null>(
    null,
  );

  const totalTimeRef = useRef(0);

  useEffect(() => {
    const monthTimeData = time?.[month];

    if (!monthTimeData) return;

    monthTimeData.forEach(v => {
      totalTimeRef.current += v;
    });
    const percentDataWithTimeline = monthTimeData.map(
      (v, i) => [TIMELINE[i], getPercentage(v, totalTimeRef.current)] as [string, number],
    );
    const sortedTimeByPercent = percentDataWithTimeline.sort((a, b) =>
      a[1] > b[1] ? -1 : 1,
    );

    setTimeRankByPercent(sortedTimeByPercent);
  }, [time, month]);

  return (
    <div className="flex-1">
      <h2 className="title">시간대</h2>
      <p className={descriptionStyle}>
        <span className={strengthStyle}>저녁</span>에 주로 글을 작성했어요.
      </p>
      <div className={cn(boxStyle)}>
        <RectAreaChart data={timeRankByPercent} />
      </div>
    </div>
  );
};

export default ReportByTime;
