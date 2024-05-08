'use client';

import Image from 'next/image';
import ReportPost from '@/views/report/ReportPost';
import ReportByDay from '@/views/report/ReportByDay';
import ReportByTime from '@/views/report/ReportByTime';
import ReportByChar from '@/views/report/ReportByChar';
import ReportByTopic from '@/views/report/ReportByTopic';
import ReportByTag from '@/views/report/ReportByTag';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AdvanceReservation from '@/views/common/AdvanceReservation';
import { Button } from '@/components/ui/button';
import withMoveMonthly, { WithMoveMonthlyProps } from '@/views/common/withMoveMonthly';
import Line from '@/components/Line';
import ReportTotal from '@/views/report/ReportTotal';
import ReportProvider from '@/components/providers/ReportProvider';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';

const ReportView = ({
  selectedMonth,
  selectedYear,
  selectedMonthLastDate,
}: WithMoveMonthlyProps) => {
  return (
    <ReportProvider selectedYear={selectedYear} selectedMonth={selectedMonth}>
      <div>
        <Line className="mt-5 mb-4" />
        <div className="flex gap-x-1.5 items-center text-gray-400 font-r14">
          <Image src="/assets/icons/calendar.png" alt="calendar" width={16} height={16} />
          <span>
            {selectedYear}년 {selectedMonth}월 1일
          </span>{' '}
          ~{' '}
          <span>
            {selectedYear}년 {selectedMonth}월 {selectedMonthLastDate}일
          </span>
        </div>
      </div>
      <article className="flex flex-col w-full gap-y-[102px] mt-[60px]">
        {selectedMonth && (
          <>
            <ReportTotal
              year={selectedYear || 0}
              month={selectedMonth.toString().padStart(2, '0')}
            />
            <ReportPost
              year={selectedYear || 0}
              month={selectedMonth.toString().padStart(2, '0')}
            />
            <section>
              <h2 className="title">기록 패턴</h2>
              <div className="flex gap-x-5">
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
        <section>
          <h2 className="title">AI와 함께하는 자아발견 인터뷰</h2>
          <div className="font-r16 text-gray-800 mt-1 mb-6">
            <p>내가 쓴 기록들을 기반으로 나를 더 잘 알기 위한 질문들을 생성해요. 😊</p>
            <p>
              총 30가지의 질문과 답변들을 모아 4-Points(성장, 건강, 취향, 관계)의 성향
              진단과 개선점 제안 리포트를 제작합니다
            </p>
          </div>
          <Card
            className="w-full flex-row p-6 h-[112px] justify-between items-center"
            variant="disabled"
          >
            <CardHeader className="flex flex-col gap-2 justify-center">
              <CardTitle className="flex gap-2 items-center">
                <Image src="/assets/icons/lock.png" width={24} height={24} alt="lock" />
                업데이트 준비 중이에요.
              </CardTitle>
              <CardDescription>
                지금 사전 신청하면 50% 할인 혜택이 있어요!{' '}
                <span className="text-gray-500 line-through">11,000원</span>{' '}
                <span className="text-gray-500">→</span>{' '}
                <b className="text-primary-900">5,500원</b>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-initial">
              <AdvanceReservation>
                <Button variant="outlineGray">사전 예약 신청하기</Button>
              </AdvanceReservation>
            </CardContent>
          </Card>
        </section>
      </article>
      <FooterFeedbackView
        category="기록 데이터 보기"
        description=" 더 알고 싶은 기록 관련 데이터가 있다면 편하게 알려주세요"
      />
    </ReportProvider>
  );
};

export default withMoveMonthly(ReportView);
