'use client';

import ReportPost from '@/views/report/ReportPost';
import ReportByDay from '@/views/report/ReportByDay';
import ReportByTime from '@/views/report/ReportByTime';
import ReportByChar from '@/views/report/ReportByChar';
import ReportByTopic from '@/views/report/ReportByTopic';
import ReportByTag from '@/views/report/ReportByTag';
import withMoveMonthly, { WithMoveMonthlyProps } from '@/views/common/withMoveMonthly';
import ReportTotal from '@/views/report/ReportTotal';
import useReportContext from '@/hooks/report/useReportContext';
import useProfileContext from '@/hooks/profile/useProfileContext';
// import AdvanceReservation from '@/views/report/AdvanceReservation';
// import { useRecoilValue } from 'recoil';

type ReportViewProps = {
  selectedYear: NonNullable<WithMoveMonthlyProps['selectedYear']>;
  selectedMonth: NonNullable<WithMoveMonthlyProps['selectedMonth']>;
};
const ReportView = ({ selectedMonth, selectedYear }: ReportViewProps) => {
  const { data } = useReportContext();
  const { isLogin } = useProfileContext();
  // const {
  //   date: { year, month },
  // } = useRecoilValue(TodayState);

  return (
    <article className="flex flex-col w-full gap-y-[102px] mt-6">
      {selectedMonth && ((isLogin === 'LOGIN' && data) || isLogin === 'NOT_LOGIN') && (
        <>
          <ReportTotal
            year={selectedYear}
            month={selectedMonth.toString().padStart(2, '0')}
          />
          <ReportPost
            year={selectedYear}
            month={selectedMonth.toString().padStart(2, '0')}
          />
          <section>
            <h2 className="title">기록 패턴</h2>
            <div className="flex gap-x-5 flex-wrap">
              <ReportByDay month={selectedMonth - 1} />
              <ReportByTime month={selectedMonth - 1} />
            </div>
          </section>
          <ReportByChar
            year={selectedYear || 0}
            month={selectedMonth.toString().padStart(2, '0')}
          />
          <ReportByTopic month={selectedMonth - 1} />
          <ReportByTag month={selectedMonth - 1} />
        </>
      )}
      {/*{isLogin === 'LOGIN' && year === selectedYear && month === selectedMonth && (*/}
      {/*  <AdvanceReservation />*/}
      {/*)}*/}
    </article>
  );
};

export default withMoveMonthly(ReportView);
