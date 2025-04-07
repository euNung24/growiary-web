'use client';

import { getAllPosts } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';

const useGetPosts = () => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: getAllPosts,
  });
};

export default useGetPosts;
