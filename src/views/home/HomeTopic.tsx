'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { MENU_NAMES } from '@/utils';
import { onTrackingHandler } from '@/utils/trackingAnalytics';
import { TopicCategory } from '@/topic/type';

import useGetProfile from '@/profile/hooks/useGetProfile';
import useGetTopicsByCategory from '@/topic/hooks/useGetTopicsByCategory';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LinkOrLogin from '@/components/LinkOrLogin';
import HomeTopicCard from '@/views/home/HomeTopicCard';

const TOTAL_TOPIC_COUNT = 6;

const HomeTopic = () => {
  const { data: profile } = useGetProfile();
  const { data } = useGetTopicsByCategory();

  const categories = Object.keys(data || []) as TopicCategory[];
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">오늘의 추천 주제</h2>
        <LinkOrLogin
          href="/topics"
          handleClick={onTrackingHandler(MENU_NAMES['추천 주제'])}
        >
          <Button
            variant="ghostGray"
            size="sm"
            className={cn('text-gray-500 font-sb12', !profile && 'p-0')}
            asChild={!!profile}
          >
            <span>전체보기</span>
          </Button>
        </LinkOrLogin>
      </div>
      <p className={headerDescriptionStyle}>추천 주제로 기록을 쉽게 시작해보세요</p>
      <div className="flex gap-5 flex-wrap">
        {data && (
          <>
            {categories.map(category => (
              <HomeTopicCard key={category} category={category} topics={data[category]} />
            ))}
            {[...Array(TOTAL_TOPIC_COUNT - categories.length)].map((_, i) => (
              <Card key={i} className="shrink-0" variant="disabled">
                <CardHeader className="flex gap-2 items-center">
                  <Image src="/assets/icons/lock.png" width={24} height={24} alt="lock" />
                  <CardTitle className="break-keep">곧 만나요!</CardTitle>
                </CardHeader>
                <CardContent>새로운 주제들을 준비하고 있어요! 😄</CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default HomeTopic;
