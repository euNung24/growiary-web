'use client';

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
import Image from 'next/image';
import Chip from '@/components/Chip';
import { topicCategory } from '@/utils/topicCategory';
import { TopicCategory } from '@/types/topicTypes';
import { useState } from 'react';
import useGetTopicsByCategory from '@/hooks/topics/useGetTopicsByCategory';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const TopicView = () => {
  const [currentCategory, setCurrentCategory] = useState(() => {
    return Object.keys(topicCategory)[0] as TopicCategory;
  });

  const topics = useGetTopicsByCategory();

  const handleClickCategory = (category: TopicCategory) => {
    setCurrentCategory(category);
  };

  const topics2 = topics?.[currentCategory]?.slice(0, 2);

  return (
    <>
      <section className="min-w-[940px]">
        <h2 className="title">다채로운 질문들을 만나보세요</h2>
        <div className="flex gap-5 mt-6">
          {topics2?.map((topic, i) => (
            <div key={i}>
              <TopicCard className="shrink-0">
                <TopicCardHeader>
                  <TopicCardChip>주간 인기</TopicCardChip>
                  <TopicCardTitle>{topic.category}</TopicCardTitle>
                </TopicCardHeader>
                <TopicCardContent>
                  <ul className="list-disc ml-5">
                    <li>{topic.title.replaceAll('/n ', '')}</li>
                  </ul>
                </TopicCardContent>
                <TopicCardFooter>
                  <Button
                    size="full"
                    className={cn(
                      'bg-primary-50 text-primary-900/90 group-hover:bg-white-0',
                    )}
                    asChild
                  >
                    <Link href={`/post?topic=${topic.id}&category=${topic.category}`}>
                      <ButtonIcon src="/assets/icons/edit.png" alt="write" />이 주제로
                      글쓰기
                    </Link>
                  </Button>
                </TopicCardFooter>
              </TopicCard>
              <p className="text-gray-400 font-r16 ml-3 mt-3">
                {topic.title.replaceAll('/n ', '')}
              </p>
            </div>
          ))}
        </div>
      </section>
      <hr className="border-gray-100 mt-[46px] mb-6" />
      <section>
        <ul className="flex gap-x-3">
          {(Object.keys(topicCategory) as TopicCategory[]).map((category, i) => (
            <li
              key={i}
              className={cn(
                'flex font-sb16 p-3 gap-2 cursor-pointer',
                currentCategory === category
                  ? 'text-primary-900 border-b-2 border-primary-900'
                  : 'text-gray-500',
              )}
              onClick={() => handleClickCategory(category)}
            >
              {topicCategory[category]?.Icon({
                color: currentCategory === category ? '#002861' : '#8A9299',
              })}
              {category}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-6 mt-9">
          {topics
            ? topics[currentCategory]?.map((topic, i) => (
                <li
                  key={i}
                  className={cn(
                    'group rounded-md hover:bg-primary-900 border border-gray-100',
                  )}
                >
                  <Link
                    href={`/post?topic=${topic.id}&category=${topic.category}`}
                    className="px-6 py-4 inline-block text-gray-700 group-hover:text-white-0"
                  >
                    <Image
                      src="/assets/icons/edit_white.png"
                      alt="icon"
                      width={22}
                      height={22}
                      className="hidden	group-hover:inline-block group-hover:mr-3"
                    />
                    {topic.title.replaceAll('/n ', '')}
                    <Chip className="ml-3 group-hover:bg-gray-50 group-hover:text-gray-900">
                      Best
                    </Chip>
                  </Link>
                </li>
              ))
            : [...Array(4)].map((card, i) => (
                <li
                  key={i}
                  className={cn(
                    'group px-6 py-4 rounded-md hover:bg-primary-900 border border-gray-100',
                  )}
                >
                  <Skeleton className="w-1/4 h-6" />
                </li>
              ))}
        </ul>
      </section>
    </>
  );
};

export default TopicView;
