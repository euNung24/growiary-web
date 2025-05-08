'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@/domain/user/topic/api/client';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: ['recentTopic'],
    mutationFn: () => getUserRecentTopic(),
  });
};

export default useGetUserRecentTopic;
