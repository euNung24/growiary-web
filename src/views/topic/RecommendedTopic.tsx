import useGetRecommendedTopic from '@/hooks/topics/useGetRecommendedTopic';
import {
  TopicCard,
  TopicCardChip,
  TopicCardContent,
  TopicCardFooter,
  TopicCardHeader,
  TopicCardTitle,
} from '@/components/TopicCard';
import { Button, ButtonIcon } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { topicCategory } from '@/utils/topicCategory';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const RecommendedTopic = () => {
  const recommendedTopic = useGetRecommendedTopic();
  const topTopic = recommendedTopic?.top;

  return (
    <div>
      <TopicCard className="shrink-0">
        <TopicCardHeader>
          <TopicCardChip>주간 인기</TopicCardChip>
          <TopicCardTitle>{topTopic?.topic.category}</TopicCardTitle>
        </TopicCardHeader>
        <TopicCardContent>
          <div className="z-[1]">
            {topTopic?.topic.title?.split('/n').map((text, i) => (
              <p key={i}>
                {text}
                <br />
              </p>
            ))}
          </div>
          <div className="absolute right-0">
            {topTopic?.topic.category &&
              topicCategory[topTopic?.topic.category].Icon({
                width: 110,
                height: 110,
                color: '#EEF9E6',
              })}
          </div>
        </TopicCardContent>
        <TopicCardFooter>
          <Button
            size="full"
            className={cn('bg-primary-50 text-primary-900/90 group-hover:bg-white-0')}
            asChild
          >
            <Link
              href={`/post?topic=${topTopic?.topic.id}&category=${topTopic?.topic.category}`}
              onClick={() => {
                tracking('주간 인기');
                sendGAEvent({ event: '주간 인기' });
              }}
            >
              <ButtonIcon src="/assets/icons/edit_primary.png" alt="write" />이 주제로
              기록하기
            </Link>
          </Button>
        </TopicCardFooter>
      </TopicCard>
      <p className="text-gray-400 font-r16 ml-3 mt-3">
        그루어리 사용자 {topTopic?.users}명이 평균 {topTopic?.count}회 작성한 주제
      </p>
    </div>
  );
};

export default RecommendedTopic;
