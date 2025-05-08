import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AdvanceReservationModal from '@/report/components/AdvanceReservationModal';

const AdvanceReservation = () => {
  return (
    <section className="mb-[116px]">
      <h2 className="title">AI와 함께하는 자아발견 인터뷰</h2>
      <div className="font-r16 text-gray-800 mt-1 mb-6">
        <p>내가 쓴 기록들을 기반으로 나를 더 잘 알기 위한 질문들을 생성해요. 😊</p>
        <p>
          총 30가지의 질문과 답변들을 모아 4-Points(성장, 건강, 취향, 관계)의 성향 진단과
          개선점 제안 리포트를 제작합니다
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
          <AdvanceReservationModal>
            <button className="text-gray-800 bg-white-0 rounded-md py-2 px-6 font-r14">
              사전 예약 신청하기
            </button>
          </AdvanceReservationModal>
        </CardContent>
      </Card>
    </section>
  );
};

export default AdvanceReservation;
