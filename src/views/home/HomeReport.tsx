'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ReportByPostWithAll from '@/views/home/ReportByPostWithAll';
import ReportByWeekBar from '@/views/home/ReportByWeekBar';
import ReportByTimeBar from '@/views/home/ReportByTimeBar';
import useReportContext from '@/hooks/report/useReportContext';
import LinkOrLogin from '@/components/LinkOrLogin';

const HomeReport = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const { data: report, month } = useReportContext();

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">기록 데이터</h2>
        <Button variant="ghostGray" size="sm" className="text-gray-500 font-sb12" asChild>
          <LinkOrLogin href="/report" isLogin={!!report}>
            <Button
              variant="ghostGray"
              size="sm"
              className="text-gray-500 font-sb12 p-0 cursor-pointer"
              asChild
            >
              <span>전체보기</span>
            </Button>
          </LinkOrLogin>
        </Button>
      </div>
      <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
      <div className="flex gap-5 flex-wrap">
        {/* 로그인 된 경우 */}
        {report?.post &&
          (report?.post?.user[month] > 3 ? (
            <>
              <ReportByPostWithAll />
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
        {!report?.post && (
          <>
            <Image
              src="/assets/images/report-example1.png"
              alt="report-example1"
              className="flex-1"
              width={300}
              height={386}
            />
            <Image
              src="/assets/images/report-example2.png"
              alt="report-example2"
              className="flex-1"
              width={300}
              height={386}
            />
            <Image
              src="/assets/images/report-example3.png"
              alt="report-example3"
              className="flex-1"
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
