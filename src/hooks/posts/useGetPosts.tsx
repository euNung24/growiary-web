'use client';

import { getAllPosts } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';
import { getNewAccessToken } from '@/utils/api';
import withToken from '@/apis/withToken';
import { ResPostType } from '@/types/postTypes';

const useGetPosts = () => {
  const mutation = useMutation({
    mutationKey: ['posts'],
    mutationFn: withToken<ResPostType[], string>(getAllPosts),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });

  return mutation;
};

export default useGetPosts;
