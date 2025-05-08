'use client';

import ReportPost from '@/domain/user/report/components/ReportPost';
import ReportByDay from '@/domain/user/report/components/ReportByDay';
import ReportByTime from '@/domain/user/report/components/ReportByTime';
import ReportByChar from '@/domain/user/report/components/ReportByChar';
import ReportByTopic from '@/domain/user/report/components/ReportByTopic';
import ReportByTag from '@/domain/user/report/components/ReportByTag';
import withMoveMonthly from '@/shared/views/common/withMoveMonthly';
import ReportTotal from '@/domain/user/report/components/ReportTotal';
import useReportContext from '@/domain/user/report/hooks/useReportContext';
import useProfileContext from '@/domain/profile/hooks/useProfileContext';
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
