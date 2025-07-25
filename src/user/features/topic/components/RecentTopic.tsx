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
import useGetUserRecentTopic from '@/user/features/topic/queries/useGetUserRecentTopic';
import { useEffect, useState } from 'react';
import { RecentTopicType } from '@/user/features/topic/types/topic';
import Image from 'next/image';
import LoginDialog from '@/shared/components/LoginDialog';
import { topicCategory } from '@/shared/types/topicCategory';
import useProfileContext from '@/shared/hooks/useProfileContext';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ROUTES } from '@/shared/constants/routes';

const RecentTopic = () => {
  const mutation = useGetUserRecentTopic();
  const [recentTopic, setRecentTopic] = useState<RecentTopicType | null>(null);
  const { profile } = useProfileContext();

  const onClickNewPost = () => {
    tracking('최근에 기록한');
    sendGAEvent({ event: '최근에 기록한' });
  };

  useEffect(() => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      setRecentTopic(res.data);
    });
    return () => {};
  }, []);

  return (
    <div className="flex flex-col [&>div]:grow">
      {profile &&
        (recentTopic ? (
          Object.keys(recentTopic).length > 0 ? (
            <>
              <TopicCard>
                <TopicCardHeader>
                  <TopicCardChip>최근에 기록한</TopicCardChip>
                  <TopicCardTitle>{recentTopic.topic?.category}</TopicCardTitle>
                </TopicCardHeader>
                <TopicCardContent>
                  <div className="z-[1]">
                    {recentTopic?.topic?.title?.split('/n').map((text, i) => (
                      <p key={i}>
                        {text}
                        <br />
                      </p>
                    ))}
                  </div>
                  <div className="absolute right-0">
                    {recentTopic?.topic?.category &&
                      topicCategory[recentTopic?.topic?.category].Icon({
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
                    onClick={onClickNewPost}
                  >
                    <Link
                      href={`${ROUTES.post.newFilter({ topic: recentTopic.topicId, category: recentTopic.topic?.category })}`}
                    >
                      <ButtonIcon src="/assets/icons/edit_primary.png" alt="write" />이
                      주제로 기록하기
                    </Link>
                  </Button>
                </TopicCardFooter>
              </TopicCard>
              <p className="text-gray-400 font-r16 ml-3 mt-3">
                {profile?.nickname || '그루미'}님이{' '}
                {recentTopic.day === 0
                  ? '오늘'
                  : recentTopic.day === 1
                    ? '하루 전에'
                    : recentTopic.day + '일 전에'}{' '}
                기록한 주제
              </p>
            </>
          ) : (
            <TopicCard className="shrink-0 bg-primary-50 border-none mb-[38px]">
              <TopicCardHeader>
                <TopicCardChip>최근에 기록한</TopicCardChip>
              </TopicCardHeader>
              <TopicCardContent>
                <div className="flex flex-col items-center justify-center mx-auto text-center gap-y-2.5 font-r16 text-gray-800 group-hover:text-white-0">
                  <Image
                    src="/assets/icons/info_white.png"
                    alt="info"
                    width={21.5}
                    height={21.5}
                  />
                  최근에 작성한 기록이 없어요
                  <br /> 기록을 작성해 주세요
                </div>
              </TopicCardContent>
              <TopicCardFooter>
                <Button
                  size="full"
                  className={cn(
                    'bg-white-0 text-primary-900/90 group-hover:bg-white-0 transition-colors duration-150',
                  )}
                  asChild
                >
                  <Link href={ROUTES.post.new} onClick={onClickNewPost}>
                    <ButtonIcon src="/assets/icons/edit_primary.png" alt="write" />
                    자유주제로 기록하기
                  </Link>
                </Button>
              </TopicCardFooter>
            </TopicCard>
          )
        ) : (
          <Skeleton className="w-full h-[284px] mb-[38px]" />
        ))}
      {!profile && (
        <>
          <TopicCard className="shrink-0">
            <TopicCardHeader>
              <TopicCardChip>최근에 기록한</TopicCardChip>
              <TopicCardTitle>무엇이든 쓸 수 있어요</TopicCardTitle>
            </TopicCardHeader>
            <TopicCardContent>
              마음에 드는 주제와 질문을 골라
              <br /> 기록을 시작해보세요!
            </TopicCardContent>
            <TopicCardFooter>
              <LoginDialog>
                <Button
                  size="full"
                  className={cn(
                    'bg-primary-50 text-primary-900/90 group-hover:bg-white-0 transition-colors duration-150',
                  )}
                >
                  <ButtonIcon src="/assets/icons/edit_primary.png" alt="write" />
                  로그인하고 내 기록 확인하기
                </Button>
              </LoginDialog>
            </TopicCardFooter>
          </TopicCard>
          <p className="text-gray-400 font-r16 ml-3 mt-3">
            그루미님이 최근에 기록한 주제
          </p>
        </>
      )}
    </div>
  );
};

export default RecentTopic;
