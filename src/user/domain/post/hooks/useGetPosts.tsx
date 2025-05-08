'use client';

import { getAllPosts } from '@/user/domain/post/api';
import { useMutation } from '@tanstack/react-query';

const useGetPosts = () => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: getAllPosts,
  });
};

export default useGetPosts;
