import { cn } from '@/lib/utils';
import PolarChart from '@/components/PolarChart';
import useReportContext from '@/hooks/report/useReportContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { WEEK } from '@/utils';

const COLORS = ['#154284', '#204C90', '#3B619D', '#4F72A7', '#6E86B4', '#8094B0'];
type WeekDataType = {
  label: string;
  data: number;
};
const ReportByDay = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';

  const { data, monthIndex } = useReportContext();
  const [weekData, setWeekData] = useState<WeekDataType[] | null>(null);

  useEffect(() => {
    if (!data?.week) return;

    const mappedData = data.week[monthIndex].map((v, i) => ({
      label: WEEK[i],
      data: v,
    }));

    setWeekData(mappedData);
  }, [data?.week, monthIndex]);

  return (
    <div className="flex-1">
      <p className={descriptionStyle}>
        <span className={strengthStyle}>
          {weekData
            ? WEEK[
                weekData.findIndex(
                  data => data.data === Math.max(...weekData.map(v => v.data)),
                )
              ] + '요일'
            : '목요일'}
        </span>
        에 주로 작성했어요
      </p>

      {weekData ? (
        <div className={cn(boxStyle, 'h-[358px] flex justify-center items-center')}>
          <div className="w-[300px] h-[300px] ">
            <PolarChart
              labels={weekData.filter(v => v.data > 0).map(v => v.label)}
              data={weekData.filter(v => v.data > 0).map(v => v.data)}
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
