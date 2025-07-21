'use client';

import { useMutation } from '@tanstack/react-query';

import { getAllPosts } from '@user/post/apis/postApi';
import { postKeys } from '@user/post/queries/postKeys';

const useGetPosts = () => {
  return useMutation({
    mutationKey: postKeys.lists(),
    mutationFn: getAllPosts,
  });
};

export default useGetPosts;
