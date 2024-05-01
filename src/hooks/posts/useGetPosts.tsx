'use client';

import { getAllPosts } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';

const useGetPosts = () => {
  const mutation = useMutation({
    mutationKey: ['posts'],
    mutationFn: getAllPosts,
    onError: error => {
      console.log(error.message);
    },
  });

  return mutation;
};

export default useGetPosts;
