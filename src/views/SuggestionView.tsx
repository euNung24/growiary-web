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

const SuggestionView = () => {
  const [category, setCategory] = useState(() => {
    return Object.keys(topicCategory)[0] as TopicCategory;
  });

  const topics = useGetTopicsByCategory();

  const handleClickCategory = (category: TopicCategory) => {
    setCategory(category);
  };

  const topics2 = [
    {
      category: '하루를 돌아보는 소소한',
      questions: ['하루를 돌아보는 소소한1', '하루를 돌아보는 소소한2'],
      description: '그루어리 사용자 000명이 평균 0.0회 작성한 주제',
    },
    {
      category: '하루를 돌아보는 소소한',
      questions: [
        '하루를 돌아보는 소소한1',
        '하루를 돌아보는 소소한2',
        '하루를 돌아보는 소소한1',
        '하루를 돌아보는 소소한2',
      ],
      description: '그루어리 사용자 000명이 평균 0.0회 작성한 주제',
    },
  ];

  return (
    <>
      <section>
        <h2 className="title">다채로운 질문들을 만나보세요</h2>
        <div className="flex gap-5 mt-6">
          {topics2.map((v, i) => (
            <div key={i}>
              <TopicCard className="shrink-0">
                <TopicCardHeader>
                  <TopicCardChip>주간 인기</TopicCardChip>
                  <TopicCardTitle>{v.category}</TopicCardTitle>
                </TopicCardHeader>
                <TopicCardContent>
                  <ul className="list-disc ml-5">
                    {v.questions.map((w, j) => (
                      <li key={j}>{w}</li>
                    ))}
                  </ul>
                </TopicCardContent>
                <TopicCardFooter>
                  <Button
                    size="full"
                    className={cn(
                      'bg-primary-50 text-primary-900/90 group-hover:bg-white-0',
                    )}
                  >
                    <ButtonIcon src="/assets/icons/edit.png" alt="write" />이 주제로
                    글쓰기
                  </Button>
                </TopicCardFooter>
              </TopicCard>
              <p className="text-gray-400 font-r16 ml-3 mt-3">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
      <hr className="border-gray-100 mt-[46px] mb-6" />
      <section>
        <ul className="flex gap-x-3">
          {(Object.keys(topicCategory) as TopicCategory[]).map((v, i) => {
            const { Icon } = topicCategory[v];

            return (
              <li
                key={i}
                className={cn(
                  'flex font-sb16 p-3 gap-2 cursor-pointer',
                  category === v
                    ? 'text-primary-900 border-b-2 border-primary-900'
                    : 'text-gray-500',
                )}
                onClick={() => handleClickCategory(v)}
              >
                <Icon color={category === v ? '#002861' : '#8A9299'} />
                {v}
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col gap-6 text-gray-700 mt-9">
          {topics[category]?.map((topic, i) => (
            <li
              key={i}
              className={cn(
                'group px-6 py-4 rounded-md',
                'hover:bg-primary-900 hover:text-white-0',
                'border border-gray-100',
              )}
            >
              <Image
                src="/assets/icons/edit_white.png"
                alt="icon"
                width={22}
                height={22}
                className="hidden	group-hover:inline-block group-hover:mr-3"
              />
              {topic.title}
              <Chip className="ml-3 group-hover:bg-gray-50 group-hover:text-gray-900">
                Best
              </Chip>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SuggestionView;
