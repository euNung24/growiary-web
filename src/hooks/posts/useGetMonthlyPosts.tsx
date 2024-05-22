'use client';

import { getMonthlyPosts } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';
import { getNewAccessToken } from '@/utils/api';

const useGetMonthlyPosts = () => {
  return useMutation({
    mutationKey: ['monthlyPosts'],
    mutationFn: (date: string) => getMonthlyPosts(date),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetMonthlyPosts;
