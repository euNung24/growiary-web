'use client';

import ReportPost from '@/domain/report/components/ReportPost';
import ReportByDay from '@/domain/report/components/ReportByDay';
import ReportByTime from '@/domain/report/components/ReportByTime';
import ReportByChar from '@/domain/report/components/ReportByChar';
import ReportByTopic from '@/domain/report/components/ReportByTopic';
import ReportByTag from '@/domain/report/components/ReportByTag';
import withMoveMonthly from '@/views/common/withMoveMonthly';
import ReportTotal from '@/domain/report/components/ReportTotal';
import useReportContext from '@/domain/report/hooks/useReportContext';
import useProfileContext from '@/profile/hooks/useProfileContext';
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
