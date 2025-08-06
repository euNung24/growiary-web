import useGetWeeklyHotTopic from '@user/topic/queries/useGetWeeklyHotTopic';
import {
  TopicCard,
  TopicCardChip,
  TopicCardContent,
  TopicCardFooter,
  TopicCardHeader,
  TopicCardTitle,
} from '@/user/features/topic/components/TopicCard';
import { Button, ButtonIcon } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import Link from 'next/link';
import { topicCategory } from '@/shared/types/topicCategory';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ROUTES } from '@/shared/constants/routes';

const WeeklyHotTopic = () => {
  const { data, isLoading, isError } = useGetWeeklyHotTopic();

  if (isLoading) {
    return <Skeleton className="w-full h-[284px]" data-testid="loading" />;
  }

  if (isError) {
    return (
      <TopicCard className="w-full h-[284px] pointer-events-none">
        <TopicCardHeader>
          <TopicCardChip>주간 인기</TopicCardChip>
        </TopicCardHeader>
        <TopicCardContent className="text-red-500">오류가 발생했습니다.</TopicCardContent>
      </TopicCard>
    );
  }

  if (!data) {
    return (
      <TopicCard className="w-full h-[284px]">
        <TopicCardHeader>
          <TopicCardChip>주간 인기</TopicCardChip>
        </TopicCardHeader>
        <TopicCardContent>주간 인기 주제가 없습니다.</TopicCardContent>
      </TopicCard>
    );
  }

  return (
    <div className="flex flex-col [&>div]:grow">
      <TopicCard>
        <TopicCardHeader>
          <TopicCardChip>주간 인기</TopicCardChip>
          <TopicCardTitle>{data.topic.category}</TopicCardTitle>
        </TopicCardHeader>
        <TopicCardContent>
          <div className="z-[1]">
            {data.topic.title?.split('/n').map((text, i) => (
              <p key={i}>
                {text}
                <br />
              </p>
            ))}
          </div>
          <div className="absolute right-0">
            {data.topic.category &&
              topicCategory[data.topic.category].Icon({
                width: 110,
                height: 110,
                color: '#EEF9E6',
              })}
          </div>
        </TopicCardContent>
        <TopicCardFooter>
          <Button
            size="full"
            className={cn(
              'bg-primary-50 text-primary-900/90 group-hover:bg-white-0 transition-colors duration-150',
            )}
            asChild
          >
            <Link
              href={`${ROUTES.post.newFilter({ topic: data.topic.id, category: data.topic.category })}`}
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
        그루어리 사용자 {data.users}명이 평균 {data.count}회 작성한 주제
      </p>
    </div>
  );
};

export default WeeklyHotTopic;
