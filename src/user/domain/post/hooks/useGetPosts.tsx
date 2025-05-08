'use client';

import { useMutation } from '@tanstack/react-query';

import { getAllPosts } from '@user/post/api';

const useGetPosts = () => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: getAllPosts,
  });
};

export default useGetPosts;
