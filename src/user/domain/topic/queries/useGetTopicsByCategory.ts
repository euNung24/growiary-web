'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllTopics } from '@user/topic/apis/topicApi.client';
import { topicKeys } from '@user/topic/queries/topicKeys';
import { TopicCategory, TopicType } from '@user/topic/types/topic';

const useGetTopicsByCategory = () => {
  return useQuery({
    queryKey: topicKeys.lists(),
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
