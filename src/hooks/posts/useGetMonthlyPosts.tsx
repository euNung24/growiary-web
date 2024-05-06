'use client';

import { getMonthlyPosts } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';
import { getNewAccessToken } from '@/utils/api';

const useGetMonthlyPosts = () => {
  return useMutation({
    mutationKey: ['monthlyPosts'],
    mutationFn: (id: number) => getMonthlyPosts(id),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetMonthlyPosts;
