'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@/topic/api/client';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: ['recentTopic'],
    mutationFn: () => getUserRecentTopic(),
  });
};

export default useGetUserRecentTopic;
