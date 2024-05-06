'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContext } from 'react';
import Image from 'next/image';
import ReportProvider, { ReportContext } from '@/components/providers/ReportProvider';
import ReportByPostWithAll from '@/views/report/ReportByPostWithAll';
import ReportByWeekBar from '@/views/report/ReportByWeekBar';
import ReportByTimeBar from '@/views/report/ReportByTimeBar';

const HomeReport = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const { data: report, month } = useContext(ReportContext);

  return (
    <ReportProvider>
      <section>
        <div className="flex justify-between">
          <h2 className="title">기록 데이터</h2>
          <Button variant="ghostGray" size="sm" asChild>
            <Link href="/history">전체보기</Link>
          </Button>
        </div>
        <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
        <div className="flex gap-2.5">
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
    </ReportProvider>
  );
};

export default HomeReport;
