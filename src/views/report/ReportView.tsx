'use client';

import ReportPost from '@/views/report/ReportPost';
import ReportByDay from '@/views/report/ReportByDay';
import ReportByTime from '@/views/report/ReportByTime';
import ReportByChar from '@/views/report/ReportByChar';
import ReportByTopic from '@/views/report/ReportByTopic';
import ReportByTag from '@/views/report/ReportByTag';
import withMoveMonthly from '@/views/common/withMoveMonthly';
import ReportTotal from '@/views/report/ReportTotal';
import useReportContext from '@/hooks/report/useReportContext';
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
            <div className="flex gap-5 flex-wrap">
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
