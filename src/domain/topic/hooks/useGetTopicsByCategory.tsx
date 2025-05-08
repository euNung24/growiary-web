'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllTopics } from '@/domain/topic/api/client';
import { TopicCategory, TopicType } from '@/domain/topic/type';

const useGetTopicsByCategory = () => {
  return useQuery({
    queryKey: ['allTopics'],
    queryFn: getAllTopics,
    staleTime: 60 * 60 * 1 * 1000,
    select: data => {
      const filteredByCategory: Record<TopicCategory, TopicType[]> = data.data.reduce(
        (f, v) => {
          return {
            ...f,
            [v.category]: [...(f[v.category] || []), v],
          };
        },
        {} as Record<TopicCategory, TopicType[]>,
      );

      return filteredByCategory;
    },
  });
};

export default useGetTopicsByCategory;
