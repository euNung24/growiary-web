import { useContext, useEffect, useRef, useState } from 'react';
import { ReportContext } from '@/components/providers/ReportProvider';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TIME } from '@/utils';

const MAX_BAR_HEIGHT = 121;

const IMAGE_SRC = [
  '/assets/images/morning.png',
  '/assets/images/lunch.png',
  '/assets/images/afternoon.png',
  '/assets/images/night.png',
];

const ReportByTimeBar = () => {
  const historyDescriptionStyle = 'font-r22 text-gray-900 mt-5 mb-3';
  const historyStrengthStyle = 'font-sb22 text-primary-900';
  const [timeData, setTimeData] = useState<[number, number][] | null>(null);
  const totalTimeRef = useRef(0);
  const { data: report, monthIndex } = useContext(ReportContext);

  const getLowBarHeight = (max: number, data: number) => {
    const multiple = MAX_BAR_HEIGHT / max;

    return data * multiple;
  };

  useEffect(() => {
    const monthTime = report?.time?.[monthIndex];
    if (!report || !monthTime) return;

    const mappingWithDate = monthTime.map((count, i) => {
      totalTimeRef.current += count;
      return [i, count] as [number, number];
    });
    const sortedData = mappingWithDate.sort((a, b) => (a[1] > b[1] ? -1 : 1));

    setTimeData(sortedData.filter(([, data]) => data > 0).slice(0, 3));

    return () => {};
  }, [report]);

  return (
    <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
      <div className="flex justify-between text-gray-800 font-r16">
        <span>시간</span>
      </div>
      {timeData && (
        <>
          <p className={historyDescriptionStyle}>
            <span className={historyStrengthStyle}>{TIME[timeData[0][0]]}</span>
            에 주로
            <br />
            작성했어요
          </p>
          <div className="flex justify-around items-end  gap-x-2.5 [&>*]:flex [&>*]:flex-col [&>*]:flex-1">
            {/* 2등 */}
            {timeData[1] && (
              <div>
                <div className={cn('text-gray-800 font-r14 flex flex-col items-center')}>
                  <Image
                    src={IMAGE_SRC[timeData[1][0]]}
                    width={46}
                    height={46}
                    alt={IMAGE_SRC[timeData[1][0]]}
                  />
                  <span>{TIME[timeData[1][0]]}</span>
                  <span className="font-r12 text-gray-500">
                    {Math.round((timeData[1][1] / totalTimeRef.current) * 100)}%
                  </span>
                </div>
                <div
                  className="relative bg-gray-50 rounded mt-2"
                  style={{
                    height: getLowBarHeight(timeData[0][1], timeData[1][1]),
                  }}
                >
                  <span className="absolute inset-x-0 bottom-1 text-center text-gray-500">
                    2
                  </span>
                </div>
              </div>
            )}
            {/* 1등 */}
            {timeData[0] && (
              <div>
                <div className={cn('text-gray-800 font-r14 flex flex-col items-center')}>
                  <Image
                    src={IMAGE_SRC[timeData[0][0]]}
                    width={46}
                    height={46}
                    alt={IMAGE_SRC[timeData[0][0]]}
                  />
                  <span>{TIME[timeData[0][0]]}</span>
                  <span className="font-r12 text-gray-500">
                    {Math.round((timeData[0][1] / totalTimeRef.current) * 100)}%
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
            {timeData[2] && (
              <div>
                <div className={cn('text-gray-800 font-r14 flex flex-col items-center')}>
                  <Image
                    src={IMAGE_SRC[timeData[2][0]]}
                    width={46}
                    height={46}
                    alt={IMAGE_SRC[timeData[2][0]]}
                  />
                  <span>{TIME[timeData[2][0]]}</span>
                  <span className="font-r12 text-gray-500">
                    {Math.round((timeData[2][1] / totalTimeRef.current) * 100)}%
                  </span>
                </div>
                <div
                  className="relative bg-gray-50 rounded mt-2"
                  style={{
                    height: getLowBarHeight(timeData[0][1], timeData[2][1]),
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

export default ReportByTimeBar;
