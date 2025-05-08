'use client';

import { getAllPosts } from '@/domain/user/post/api';
import { useMutation } from '@tanstack/react-query';

const useGetPosts = () => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: getAllPosts,
  });
};

export default useGetPosts;
