import ReportView from '@/views/report/ReportView';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';

export default function Home() {
  return (
    <>
      <ReportView />
      <FooterFeedbackView
        category="기록 데이터 보기"
        description=" 더 알고 싶은 기록 관련 데이터가 있다면 편하게 알려주세요"
      />
    </>
  );
}
