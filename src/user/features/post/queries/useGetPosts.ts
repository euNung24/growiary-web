'use client';

import { useMutation } from '@tanstack/react-query';

import { getAllPosts } from '@/user/features/post/apis/postApi';
import { postKeys } from '@/user/features/post/queries/postKeys';

const useGetPosts = () => {
  return useMutation({
    mutationKey: postKeys.lists(),
    mutationFn: getAllPosts,
  });
};

export default useGetPosts;
