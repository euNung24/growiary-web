'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllTopics } from '@/apis/topics';
import { useRecoilState } from 'recoil';
import { TopicsByCategoryState } from '@/store/topics';
import { useEffect } from 'react';
import { TopicCategory, TopicType } from '@/types/topicTypes';

const useGetTopicsByCategory = () => {
  const [topicsByCategory, setTopicsByCategory] = useRecoilState(TopicsByCategoryState);

  const {
    data: data,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['allTopics'],
    queryFn: getAllTopics,
    enabled: !Object.keys(topicsByCategory).length,
  });

  useEffect(() => {
    if (isError) {
      alert(error.message);
    }
    if (isSuccess && data) {
      const filteredByCategory: Record<TopicCategory, TopicType[]> = data.data.reduce(
        (f, v) => {
          const category = v.title.split(':')[0].trim() as TopicCategory;

          return {
            ...f,
            [category]: [...(f[category] || []), v],
          };
        },
        {} as Record<TopicCategory, TopicType[]>,
      );
      setTopicsByCategory(filteredByCategory);
    }
  }, [data]);

  return topicsByCategory;
};

export default useGetTopicsByCategory;
