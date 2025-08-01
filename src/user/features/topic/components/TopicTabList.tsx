'use client';

import { useState } from 'react';

import { topicCategory } from '@/shared/types/topicCategory';
import useGetTopicsByCategory from '@/user/features/topic/queries/useGetTopicsByCategory';
import { TopicCategory } from '@user/topic/types/topic';
import TopicList from '@user/topic/components/TopicList';
import useGetRecommendedTopic from '@user/topic/queries/useGetRecommendedTopic';
import { Skeleton } from '@/shared/components/ui/skeleton';

const TopicTabList = () => {
  const { data: topicsByCategory } = useGetTopicsByCategory();
  const { data: recommendedTopicByCategory } = useGetRecommendedTopic();

  const allCategories = Object.keys(topicCategory).filter(
    v => v !== '자유',
  ) as TopicCategory[];

  const [currentCategory, setCurrentCategory] = useState(allCategories[0]);

  const handleClickCategory = (category: TopicCategory) => {
    setCurrentCategory(category);
  };

  return (
    <section>
      <div className="flex gap-x-3 sm:flex-col" role="tablist" aria-label="topic Tabs">
        {allCategories.map(category => (
          <button
            key={category}
            role="tab"
            aria-selected={currentCategory === category}
            aria-controls={`panel-${category}`}
            id={`tab-${category}`}
            className="flex font-sb16 p-3 gap-2 cursor-pointer text-gray-500 aria-selected:text-primary-900 aria-selected:border-b-2 aria-selected:border-primary-900"
            onClick={() => handleClickCategory(category)}
          >
            {topicCategory[category]?.Icon({
              color: currentCategory === category ? '#002861' : '#8A9299',
            })}
            {category}
          </button>
        ))}
      </div>
      {topicsByCategory && recommendedTopicByCategory ? (
        allCategories.map(category => (
          <TopicList
            key={category}
            category={category}
            topics={topicsByCategory?.[category]}
            recommendedTopic={recommendedTopicByCategory?.[category]}
            hidden={currentCategory !== category}
          />
        ))
      ) : (
        <ul className="flex flex-col gap-6 mt-9">
          {[...Array(4)].map((_, i) => (
            <li
              key={i}
              className="group px-6 py-4 rounded-md hover:bg-primary-900 border border-gray-100"
            >
              <Skeleton className="w-1/4 h-6" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TopicTabList;
