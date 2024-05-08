'use client';

import { cn } from '@/lib/utils';
import { topicCategory } from '@/utils/topicCategory';
import { TopicCategory } from '@/types/topicTypes';
import { useState } from 'react';
import RecentTopic from '@/views/topic/RecentTopic';
import RecommendedTopic from '@/views/topic/RecommendedTopic';
import TopicList from '@/views/topic/TopicList';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';

const TopicView = () => {
  const [currentCategory, setCurrentCategory] = useState(() => {
    return Object.keys(topicCategory)[0] as TopicCategory;
  });

  const handleClickCategory = (category: TopicCategory) => {
    setCurrentCategory(category);
  };

  return (
    <>
      <section>
        <h2 className="title">다채로운 질문들을 만나보세요</h2>
        <div className="flex gap-5 mt-6">
          <RecommendedTopic />
          <RecentTopic />
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
          <TopicList currentCategory={currentCategory} />
        </ul>
      </section>
      <FooterFeedbackView
        category="추천 주제"
        description="간직하고 있는 좋은 질문이 있다면 공유해주세요."
      />
    </>
  );
};

export default TopicView;
