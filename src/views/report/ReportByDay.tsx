import { cn } from '@/lib/utils';
import PolarChart from '@/components/PolarChart';
import useReportContext from '@/hooks/report/useReportContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type ReportByDayProps = {
  month: number;
};

const DATE = ['일', '월', '화', '수', '목', '금', '토'];
const COLORS = ['#154284', '#204C90', '#3B619D', '#4F72A7', '#6E86B4', '#8094B0'];
type WeekDataType = {
  label: string;
  data: number;
};
const ReportByDay = ({ month }: ReportByDayProps) => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';

  const { data } = useReportContext();
  const [weekData, setWeekData] = useState<WeekDataType[] | null>(null);

  useEffect(() => {
    if (!data?.week) return;

    const mappedData = data.week[month].map((v, i) => ({
      label: DATE[i],
      data: v,
    }));

    setWeekData(mappedData.filter(v => v.data > 0));
  }, [data?.week, month]);

  return (
    <div className="flex-1">
      <p className={descriptionStyle}>
        <span className={strengthStyle}>
          {weekData
            ? DATE[
                weekData.findIndex(
                  data => data.data === Math.max(...weekData.map(v => v.data)),
                )
              ]
            : '목요일'}
        </span>
        에 주로 작성했어요
      </p>

      {weekData ? (
        <div className={cn(boxStyle, 'h-[358px] flex justify-center items-center')}>
          <div className="w-[300px] h-[300px] ">
            <PolarChart
              labels={weekData.map(v => v.label)}
              data={weekData.map(v => v.data)}
              backgroundColor={COLORS.slice(0, weekData.length)}
            />
          </div>
        </div>
      ) : (
        <Image
          src="/assets/images/weekReport_sample.png"
          alt="sample"
          width={460}
          height={356}
        />
      )}
    </div>
  );
};

export default ReportByDay;
