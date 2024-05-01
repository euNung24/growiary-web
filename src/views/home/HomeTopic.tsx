'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TopicCategory } from '@/types/topicTypes';
import { topicCategory } from '@/utils/topicCategory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';
import Image from 'next/image';
import { genRandomNum } from '@/utils';
import { useEffect, useState } from 'react';
import useGetTopicsByCategory from '@/hooks/topics/useGetTopicsByCategory';
import { Skeleton } from '@/components/ui/skeleton';

const HomeTopic = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';

  const topics = useGetTopicsByCategory();
  const [randomTopics, setRandomTopics] = useState<Record<TopicCategory, number>>(
    {} as Record<TopicCategory, number>,
  );
  const changeTopicTitle = (
    e: React.MouseEvent<SVGSVGElement>,
    category: TopicCategory,
    originIdx: number,
  ) => {
    e.preventDefault();

    if (!topics) return 0;

    let randomTopicIdx;

    while (!randomTopicIdx || randomTopicIdx === originIdx) {
      randomTopicIdx = genRandomNum(0, topics[category].length);
    }

    const copiedTopics = { ...randomTopics };
    copiedTopics[category] = randomTopicIdx;
    setRandomTopics(copiedTopics);
  };

  useEffect(
    function initRandomTopics() {
      if (!topics) return;

      const categories = Object.keys(topicCategory) as TopicCategory[];
      const mapCategoryTitle = categories.reduce(
        (f, category) => ({
          ...f,
          [category]: genRandomNum(0, topics[category].length),
        }),
        {} as Record<TopicCategory, number>,
      );

      setRandomTopics(mapCategoryTitle);
    },
    [topics],
  );

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">오늘의 추천 주제</h2>
        <Button variant="ghostGray" size="sm" asChild>
          <Link href="/suggestion">전체보기</Link>
        </Button>
      </div>
      <p className={headerDescriptionStyle}>추천 주제로 기록을 쉽게 시작해보세요</p>
      <div className="flex gap-5 flex-wrap">
        {topics ? (
          <>
            {(Object.keys(randomTopics) as TopicCategory[]).map((category, i) => {
              const randomTitleIndex = randomTopics[category];
              const topic = topics[category][randomTitleIndex];
              const Icon = topicCategory[category]?.Icon;

              return (
                <Link key={i} href={`/post?topic=${topic.id}&category=${topic.category}`}>
                  <Card className="shrink-0">
                    <CardHeader className="flex gap-2 items-baseline">
                      <div className="flex gap-2 flex-1">
                        <div className="flex justify-center items-center rounded-[50%] flex-[0_0_24px] text-primary-900 group-hover:text-gray-400 w-6 h-6 bg-gray-50">
                          {Icon && <Icon width={16} height={16} color="#002861" />}
                        </div>
                        <CardTitle className="break-keep">{topic.category}</CardTitle>
                      </div>
                      <RotateCw
                        width={20}
                        height={20}
                        className="text-gray-500 mt-[5px] cursor-pointer"
                        onClick={e => changeTopicTitle(e, category, randomTitleIndex)}
                      />
                    </CardHeader>
                    <CardContent className="overflow-hidden">
                      {topic.title.split('/n').map((text, i) => (
                        <p
                          key={i}
                          className="overflow-hidden whitespace-nowrap	text-ellipsis"
                        >
                          {text}
                          <br />
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            {[...Array(6 - Object.keys(topicCategory).length)].map((card, i) => (
              <Card key={i} className="shrink-0" variant="disabled">
                <CardHeader className="flex gap-2 items-center">
                  <Image src="/assets/icons/lock.png" width={24} height={24} alt="lock" />
                  <CardTitle className="break-keep">곧 만나요!</CardTitle>
                </CardHeader>
                <CardContent>새로운 주제들을 준비하고 있어요! 😄</CardContent>
              </Card>
            ))}
          </>
        ) : (
          [...Array(6)].map((card, i) => (
            <Card key={i} className="shrink-0" variant="disabled">
              <CardHeader className="flex gap-2 items-center">
                <Skeleton className="w-6 h-6" />
                <CardTitle className="break-keep">
                  <Skeleton />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full mt-2" />
                <Skeleton className="w-full mt-2" />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default HomeTopic;
