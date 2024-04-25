'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllTopics } from '@/apis/topics';
import { useEffect } from 'react';
import { TopicCategory, TopicType } from '@/types/topicTypes';
import { topicCategory } from '@/utils/topicCategory';

const useGetTopicsByCategory = () => {
  const {
    data: data,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['allTopics'],
    queryFn: getAllTopics,
    staleTime: Infinity,
    select: data => {
      const filteredByCategory: Record<TopicCategory, TopicType[]> = data.data.reduce(
        (f, v) => {
          const category = v.category.split(':')[0].trim() as TopicCategory;

          if (!(category in topicCategory)) {
            return { ...f };
          }

          return {
            ...f,
            [category]: [...(f[category] || []), v],
          };
        },
        {} as Record<TopicCategory, TopicType[]>,
      );

      return filteredByCategory;
    },
  });

  useEffect(() => {
    if (isError) {
      alert(error.message);
    }
    if (isSuccess && data) {
      // console.log('select', data);
    }
  }, [data]);

  return data;
};

export default useGetTopicsByCategory;
