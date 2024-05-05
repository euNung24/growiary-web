import TopicView from '@/views/TopicView';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';
export default function Home() {
  return (
    <>
      <TopicView />
      <FooterFeedbackView
        category="추천 주제"
        description="간직하고 있는 좋은 질문이 있다면 공유해주세요."
      />
    </>
  );
}
