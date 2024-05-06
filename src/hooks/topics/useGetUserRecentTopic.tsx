'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserRecentTopic } from '@/apis/topics';

const useGetUserRecentTopic = () => {
  return useMutation({
    mutationKey: ['recentTopic'],
    mutationFn: () => getUserRecentTopic(),
    onSuccess: data => {
      data && console.log(data);
    },
    onError: error => {
      console.log(error.message);
    },
  });
};

export default useGetUserRecentTopic;
