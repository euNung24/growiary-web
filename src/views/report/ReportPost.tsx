import { cn } from '@/lib/utils';
import BarChart from '@/components/BarChart';

const ReportPost = () => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';

  return (
    <section>
      <div>
        <h2 className="title">기록한 글</h2>
        <p className={descriptionStyle}>
          <span className={strengthStyle}>38개</span>의 글을 작성했어요.
        </p>
        <div className="flex gap-x-5 h-[356px]">
          <div className={cn(boxStyle, 'flex-1')}>
            <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
              <span>
                전체 <b className="ml-[5px] text-gray-700">00개</b>
              </span>
              <span>
                평균 <b className="ml-[5px] text-gray-700">00개</b>
              </span>
              <span>
                최대 <b className="ml-[5px] text-gray-700">00개</b>
              </span>
            </div>
            <BarChart
              height="130%"
              data={[12, 19, 3, 5, 2, 3, 3, 4]}
              labels={['1', '2', '3', '4', '5', '6', '7', '8']}
              backgroundColor={['#BFCADF', '#204C90']}
            />
          </div>
          <div className={cn(boxStyle, 'w-[300px] flex flex-col')}>
            <p className={cn(descriptionStyle, 'mt-0 mb-7')}>
              전체 이용자보다 <br />
              <span className={strengthStyle}>+12개</span> 더 기록했어요
            </p>
            <BarChart
              className="mt-auto"
              height={200}
              data={[12, 19]}
              labels={['그루어리 평균', '그루미님']}
              backgroundColor={['#BEBFBF', '#204C90']}
              axisDisplay={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportPost;
