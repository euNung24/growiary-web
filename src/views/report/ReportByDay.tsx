import { cn } from '@/lib/utils';
import PolarChart from '@/components/PolarChart';

const ReportByDay = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';

  return (
    <div className="flex-1">
      <h2 className="title">요일</h2>
      <p className={descriptionStyle}>
        <span className={strengthStyle}>목요일</span>에 주로 글을 작성했어요.
      </p>
      <div className={cn(boxStyle, 'h-[358px] flex justify-center items-center')}>
        <PolarChart
          labels={['월', '화', '수', '목', '금', '토', '일']}
          data={[11, 16, 7, 3, 14, 12, 14]}
          backgroundColor={[
            '#3B619D',
            '#4F72A7',
            '#6E86B4',
            '#154284',
            '#204C90',
            '#8094B0',
          ]}
        />
      </div>
    </div>
  );
};

export default ReportByDay;
