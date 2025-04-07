'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@/apis/topics';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: ['recentTopic'],
    mutationFn: () => getUserRecentTopic(),
  });
};

export default useGetUserRecentTopic;
