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
import useGetUserRecentTopic from '@/hooks/topics/useGetUserRecentTopic';
import { useEffect, useState } from 'react';
import { RecentTopicType } from '@/types/topicTypes';
import useGetProfile from '@/hooks/profile/useGetProfile';
import Image from 'next/image';
import LoginDialog from '@/components/LoginDialog';
import { topicCategory } from '@/utils/topicCategory';

const RecentTopic = () => {
  const mutation = useGetUserRecentTopic();
  const [recentTopic, setRecentTopic] = useState<RecentTopicType | null>(null);
  const profile = useGetProfile();

  useEffect(() => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      setRecentTopic(res.data);
    });
    return () => {};
  }, []);

  return (
    <>
      {profile &&
        recentTopic &&
        (Object.keys(recentTopic).length > 0 ? (
          <div>
            <TopicCard className="shrink-0">
              <TopicCardHeader>
                <TopicCardChip>최근에 작성한</TopicCardChip>
                <TopicCardTitle>{recentTopic.topic?.category}</TopicCardTitle>
              </TopicCardHeader>
              <TopicCardContent>
                <div>
                  {recentTopic?.topic?.title?.split('/n').map((text, i) => (
                    <p key={i}>
                      {text}
                      <br />
                    </p>
                  ))}
                </div>
                <div className="absolute right-[26px]">
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
                    'bg-primary-50 text-primary-900/90 group-hover:bg-white-0',
                  )}
                  asChild
                >
                  <Link
                    href={`/post?topic=${recentTopic.topicId}&category=${recentTopic.topic?.category}`}
                  >
                    <ButtonIcon src="/assets/icons/edit_primary.png" alt="write" />이
                    주제로 글쓰기
                  </Link>
                </Button>
              </TopicCardFooter>
            </TopicCard>
            <p className="text-gray-400 font-r16 ml-3 mt-3">
              그루미님이 최근에 기록한 주제
            </p>
          </div>
        ) : (
          <TopicCard className="shrink-0 bg-primary-50 border-none">
            <TopicCardHeader>
              <TopicCardChip>최근에 기록한</TopicCardChip>
            </TopicCardHeader>
            <TopicCardContent>
              <div className="flex flex-col items-center justify-center mx-auto text-center gap-y-2.5 text-gray-800 group-hover:text-white-0">
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
                className={cn('bg-white-0 text-primary-900/90 group-hover:bg-white-0')}
                asChild
              >
                <Link href={`/post`}>
                  <ButtonIcon src="/assets/icons/edit_primary.png" alt="write" />
                  자유주제로 작성하기
                </Link>
              </Button>
            </TopicCardFooter>
          </TopicCard>
        ))}
      {!profile && (
        <div>
          <TopicCard className="shrink-0">
            <TopicCardHeader>
              <TopicCardChip>최근에 기록한</TopicCardChip>
              <TopicCardTitle>최근에 기록한 주제</TopicCardTitle>
            </TopicCardHeader>
            <TopicCardContent>
              그루어리에서 여러 주제에 맞는 <br />
              다양한 글을 작성해봐요!
            </TopicCardContent>
            <TopicCardFooter>
              <LoginDialog>
                <Button
                  size="full"
                  className={cn(
                    'bg-primary-50 text-primary-900/90 group-hover:bg-white-0',
                  )}
                >
                  <ButtonIcon src="/assets/icons/edit_primary.png" alt="write" />
                  로그인하고 글쓰기
                </Button>
              </LoginDialog>
            </TopicCardFooter>
          </TopicCard>
          <p className="text-gray-400 font-r16 ml-3 mt-3">
            그루미님이 최근에 기록한 주제
          </p>
        </div>
      )}
    </>
  );
};

export default RecentTopic;
