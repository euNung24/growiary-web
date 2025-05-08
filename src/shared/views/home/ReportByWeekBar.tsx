import { useContext, useEffect, useRef, useState } from 'react';
import { ReportContext } from '@user/report/components/ReportProvider';
import { cn } from '@/shared/utils/cn';
import { WEEK, WEEK_ENG } from '@/shared/utils';

const MAX_BAR_HEIGHT = 121;
const DATE_ENG = WEEK_ENG.map(day => day.toUpperCase().slice(0, 3));

const ReportByWeekBar = () => {
  const historyDescriptionStyle = 'font-r22 text-gray-900 mt-5 mb-3';
  const historyStrengthStyle = 'font-sb22 text-primary-900';

  const [weekData, setWeekData] = useState<[number, number][] | null>(null);
  const totalWeekRef = useRef(0);
  const { data: report, monthIndex } = useContext(ReportContext);

  const getLowBarHeight = (max: number, data: number) => {
    const multiple = MAX_BAR_HEIGHT / max;

    return data * multiple;
  };

  useEffect(() => {
    const monthWeek = report?.week?.[monthIndex];
    if (!report || !monthWeek) return;

    const mappingWithDate = monthWeek.map((count, i) => {
      totalWeekRef.current += count;
      return [i, count] as [number, number];
    });
    const sortedData = mappingWithDate.sort((a, b) => (a[1] > b[1] ? -1 : 1));

    setWeekData(sortedData.filter(([, data]) => data > 0).slice(0, 3));

    return () => {};
  }, [report]);

  return (
    <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
      <div className="flex justify-between text-gray-800 font-r16">
        <span>요일</span>
      </div>
      {weekData && (
        <>
          <p className={historyDescriptionStyle}>
            <span className={historyStrengthStyle}>{WEEK[weekData[0][0]]}요일</span>
            에 주로
            <br />
            작성했어요
          </p>
          <div className="flex justify-around items-end gap-x-2.5 [&>*]:flex [&>*]:flex-col [&>*]:flex-1">
            {/* 2등 */}
            {weekData[1] && (
              <div>
                <div className={cn('text-gray-800 font-r14 flex flex-col items-center')}>
                  <div className="w-[46px] h-[46px] rounded-[10px] bg-primary-100 flex justify-center items-center mb-[3px]">
                    {DATE_ENG[weekData[1][0]]}
                  </div>
                  <span>{WEEK[weekData[1][0]]}요일</span>
                  <span className="font-r12 text-gray-500">
                    {Math.round((weekData[1][1] / totalWeekRef.current) * 100)}%
                  </span>
                </div>
                <div
                  className="relative bg-gray-50 rounded mt-2"
                  style={{
                    height: getLowBarHeight(weekData[0][1], weekData[1][1]),
                  }}
                >
                  <span className="absolute inset-x-0 bottom-1 text-center text-gray-500">
                    2
                  </span>
                </div>
              </div>
            )}
            {/* 1등 */}
            {weekData[0] && (
              <div>
                <div className={cn('text-gray-800 font-r14 flex flex-col items-center')}>
                  <div className="w-[46px] h-[46px] rounded-[10px] bg-primary-100 flex justify-center items-center mb-[3px]">
                    {DATE_ENG[weekData[0][0]]}
                  </div>
                  <span>{WEEK[weekData[0][0]]}요일</span>
                  <span className="font-r12 text-gray-500">
                    {Math.round((weekData[0][1] / totalWeekRef.current) * 100)}%
                  </span>
                </div>
                <div
                  className="relative bg-gray-50 rounded mt-2"
                  style={{
                    height: MAX_BAR_HEIGHT + 'px',
                  }}
                >
                  <span className="absolute inset-x-0 bottom-1 text-center text-gray-500">
                    1
                  </span>
                </div>
              </div>
            )}
            {/* 3등 */}
            {weekData[2] && (
              <div>
                <div className={cn('text-gray-800 font-r14 flex flex-col items-center')}>
                  <div className="w-[46px] h-[46px] rounded-[10px] bg-primary-100 flex justify-center items-center mb-[3px]">
                    {DATE_ENG[weekData[2][0]]}
                  </div>
                  <span>{WEEK[weekData[2][0]]}요일</span>
                  <span className="font-r12 text-gray-500">
                    {Math.round((weekData[2][1] / totalWeekRef.current) * 100)}%
                  </span>
                </div>
                <div
                  className="relative bg-gray-50 rounded mt-2"
                  style={{
                    height: getLowBarHeight(weekData[0][1], weekData[2][1]),
                  }}
                >
                  <span className="absolute inset-x-0 bottom-1 text-center text-gray-500">
                    3
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportByWeekBar;
