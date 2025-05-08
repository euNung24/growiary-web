'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@user/topic/infra/topicApi.client';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: ['recentTopic'],
    mutationFn: () => getUserRecentTopic(),
  });
};

export default useGetUserRecentTopic;
