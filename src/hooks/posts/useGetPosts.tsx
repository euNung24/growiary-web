'use client';

import { getAllPosts } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';
import { getNewAccessToken } from '@/utils/api';

const useGetPosts = () => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: getAllPosts,
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetPosts;
