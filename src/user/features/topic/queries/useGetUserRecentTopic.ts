'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserRecentTopic } from '@/user/features/topic/apis/topicApi.client';
import { topicKeys } from '@/user/features/topic/queries/topicKeys';

const useGetUserRecentTopic = () => {
  return useQuery({
    queryKey: topicKeys.recent,
    queryFn: () => getUserRecentTopic(),
    select: data => data.data,
  });
};

export default useGetUserRecentTopic;
