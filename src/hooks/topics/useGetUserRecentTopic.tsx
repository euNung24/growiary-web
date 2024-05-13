'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@/apis/topics';
import { getNewAccessToken } from '@/utils/api';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: ['recentTopic'],
    mutationFn: () => getUserRecentTopic(),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetUserRecentTopic;
