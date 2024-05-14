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
import withMoveMonthly, { WithMoveMonthlyProps } from '@/views/common/withMoveMonthly';
import ReportTotal from '@/views/report/ReportTotal';
import ReportProvider from '@/components/providers/ReportProvider';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';
import useProfileContext from '@/hooks/profile/useProfileContext';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const ReportView = ({ selectedMonth, selectedYear }: WithMoveMonthlyProps) => {
  const { profile } = useProfileContext();
  const {
    date: { year, month },
  } = useRecoilValue(TodayState);

  return (
    <ReportProvider selectedYear={selectedYear} selectedMonth={selectedMonth}>
      <article className="flex flex-col w-full gap-y-[102px] mt-6">
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
        {profile && year === selectedYear && month === selectedMonth && (
          <section className="mb-[116px]">
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
                  <button
                    className="text-gray-800 bg-white-0 rounded-md py-2 px-6 font-r14"
                    onClick={() => {
                      tracking('사전 예약 신청 모달 클릭');
                      sendGAEvent({ event: '사전 예약 신청 모달 클릭' });
                    }}
                  >
                    사전 예약 신청하기
                  </button>
                </AdvanceReservation>
              </CardContent>
            </Card>
          </section>
        )}
      </article>
      <FooterFeedbackView
        category="기록 데이터 보기"
        description=" 더 알고 싶은 기록 관련 데이터가 있다면 편하게 알려주세요"
      />
    </ReportProvider>
  );
};

export default withMoveMonthly(ReportView);
