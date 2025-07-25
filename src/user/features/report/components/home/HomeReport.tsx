'use client';

import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import ReportByPostWithAll from '@/user/features/report/components/home/ReportByPostWithAll';
import ReportByWeekBar from '@/user/features/report/components/home/ReportByWeekBar';
import ReportByTimeBar from '@/user/features/report/components/home/ReportByTimeBar';
import useReportContext from '@/user/features/report/hooks/useReportContext';
import LinkOrLogin from '@/shared/components/LinkOrLogin';
import useProfileContext from '@/shared/hooks/useProfileContext';
import { MENU_NAMES } from '@/shared/utils';
import { onTrackingHandler } from '@/shared/utils/trackingAnalytics';
import { cn } from '@/shared/utils/cn';
import { ROUTES } from '@/shared/constants/routes';

const HomeReport = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const { data: report, year, month } = useReportContext();
  const { profile } = useProfileContext();

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">기록 데이터</h2>
        <LinkOrLogin
          href={ROUTES.report}
          handleClick={onTrackingHandler(MENU_NAMES['기록 데이터 보기'])}
        >
          <Button
            variant="ghostGray"
            size="sm"
            className={cn('text-gray-500 font-sb12', !profile && 'p-0')}
            asChild={!!profile}
          >
            <span>전체보기</span>
          </Button>
        </LinkOrLogin>
      </div>
      <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
      <div className="flex gap-5 flex-wrap">
        {/* 로그인 된 경우 */}
        {profile &&
          (report?.post &&
          report?.post?.user[`${year}-${month.toString().padStart(2, '0')}`] >= 1 ? (
            <>
              <ReportByPostWithAll
                date={`${year}-${month.toString().padStart(2, '0')}`}
              />
              <ReportByWeekBar />
              <ReportByTimeBar />
            </>
          ) : (
            <>
              <Image
                src="/assets/images/report-disabled-example1.png"
                alt="report-disabled-example1"
                width={300}
                height={386}
              />
              <Image
                src="/assets/images/report-disabled-example2.png"
                alt="report-disabled-example2"
                width={300}
                height={386}
              />
              <Image
                src="/assets/images/report-disabled-example3.png"
                alt="report-disabled-example3"
                width={300}
                height={386}
              />
            </>
          ))}
        {/* 로그인 안된 경우 */}
        {!profile && (
          <>
            <Image
              src="/assets/images/report-example1.png"
              alt="report-example1"
              width={300}
              height={386}
            />
            <Image
              src="/assets/images/report-example2.png"
              alt="report-example2"
              width={300}
              height={386}
            />
            <Image
              src="/assets/images/report-example3.png"
              alt="report-example3"
              width={300}
              height={386}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default HomeReport;
