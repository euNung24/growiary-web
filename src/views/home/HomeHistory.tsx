import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BarChart from '@/components/BarChart';

const HomeHistory = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const historyDescriptionStyle = 'font-r22 text-gray-900 mt-5 mb-[43px]';
  const historyStrengthStyle = 'font-sb22 text-primary-900';

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">기록 데이터</h2>
        <Button variant="ghostGray" size="sm" asChild>
          <Link href="/history">전체보기</Link>
        </Button>
      </div>
      <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
      <div className="flex gap-5">
        <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
          <div className="flex justify-between items-center text-gray-800 font-r16">
            <span>작성한 글</span>
            <span className="text-gray-400 font-r12">변경 시점 06:00</span>
          </div>
          <p className={historyDescriptionStyle}>
            다른 이용자보다
            <br />
            <span className={historyStrengthStyle}>+ nn개</span> 더 기록했어요
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
        <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
          <div className="flex justify-between text-gray-800 font-r16">
            <span>요일</span>
          </div>
          <p className={historyDescriptionStyle}>
            <span className={historyStrengthStyle}>목요일</span>
            에 주로
            <br />
            글을 작성했어요
          </p>
          <BarChart
            className="mt-auto"
            height={200}
            data={[12, 19, 14]}
            labels={['1', '2', '3']}
            backgroundColor={['#BEBFBF', '#204C90', '#123123']}
            axisDisplay={false}
          />
        </div>
        <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
          <div className="flex justify-between text-gray-800 font-r16">
            <span>시간</span>
          </div>
          <p className={historyDescriptionStyle}>
            <span className={historyStrengthStyle}>저녁</span>
            에 주로
            <br />
            글을 작성했어요
          </p>
          <BarChart
            className="mt-auto"
            height={200}
            data={[12, 19, 14]}
            labels={['1', '2', '3']}
            backgroundColor={['#BEBFBF', '#204C90', '#123123']}
            axisDisplay={false}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHistory;
