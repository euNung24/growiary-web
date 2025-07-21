'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@user/topic/apis/topicApi.client';
import { topicKeys } from '@user/topic/queries/topicKeys';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: topicKeys.recent,
    mutationFn: () => getUserRecentTopic(),
  });
};

export default useGetUserRecentTopic;
