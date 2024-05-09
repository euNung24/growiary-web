import { cn } from '@/lib/utils';
import { WithMoveMonthlyProps } from '@/views/common/withMoveMonthly';

const ReportAcc = ({
  selectedMonth,
  selectedYear,
  selectedMonthLastDate,
}: WithMoveMonthlyProps) => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';

  return (
    <section>
      <div>
        <h2 className="title">전체 기록</h2>
        <p className="font-r16 text-gray-800">현재까지 누적된 모든 기록 데이터</p>
        <div className={cn('flex gap-x-2.5', boxStyle)}></div>
      </div>
    </section>
  );
};

export default ReportAcc;
