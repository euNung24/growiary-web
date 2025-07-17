'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@/user/features/topic/apis/topicApi.client';
import { topicKeys } from '@/user/features/topic/queries/topicKeys';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: topicKeys.recent,
    mutationFn: () => getUserRecentTopic(),
  });
};

export default useGetUserRecentTopic;
