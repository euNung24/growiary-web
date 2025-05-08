'use client';

import ReportPost from '@/report/components/ReportPost';
import ReportByDay from '@/report/components/ReportByDay';
import ReportByTime from '@/report/components/ReportByTime';
import ReportByChar from '@/report/components/ReportByChar';
import ReportByTopic from '@/report/components/ReportByTopic';
import ReportByTag from '@/report/components/ReportByTag';
import withMoveMonthly from '@/views/common/withMoveMonthly';
import ReportTotal from '@/report/components/ReportTotal';
import useReportContext from '@/report/hooks/useReportContext';
import useProfileContext from '@/hooks/profile/useProfileContext';
// import AdvanceReservation from '@/views/report/AdvanceReservation';
// import { useRecoilValue } from 'recoil';

const ReportView = () => {
  const { data } = useReportContext();
  const { isLogin } = useProfileContext();
  // const {
  //   date: { year, month },
  // } = useRecoilValue(TodayState);

  return (
    <article className="flex flex-col w-full gap-y-[102px] mt-6">
      {((isLogin === 'LOGIN' && data) || isLogin === 'NOT_LOGIN') && (
        <>
          <ReportTotal />
          <ReportPost />
          <section>
            <h2 className="title">기록 패턴</h2>
            <div className="flex gap-5 flex-wrap [&>*]:flex-1 sm:[&>*]:flex-initial">
              <ReportByDay />
              <ReportByTime />
            </div>
          </section>
          <ReportByChar />
          <ReportByTopic />
          <ReportByTag />
        </>
      )}
      {/*{isLogin === 'LOGIN' && year === selectedYear && month === selectedMonth && (*/}
      {/*  <AdvanceReservation />*/}
      {/*)}*/}
    </article>
  );
};

export default withMoveMonthly(ReportView);
