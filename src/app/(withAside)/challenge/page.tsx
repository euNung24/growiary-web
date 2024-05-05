import ChallengeView from '@/views/ChallengeView';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';
export default function Home() {
  return (
    <>
      <ChallengeView />
      <FooterFeedbackView
        category="도전과제"
        description="궁금하거나 떠오르는 아이디어, 의견이 있다면 자유롭게 남겨주세요"
      />
    </>
  );
}
