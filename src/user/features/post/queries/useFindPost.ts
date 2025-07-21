'use client';

import { useMutation } from '@tanstack/react-query';

import { findPost } from '@/user/features/post/apis/postApi';
import { postKeys } from '@/user/features/post/queries/postKeys';

const useFindPost = (id: string) => {
  return useMutation({
    mutationKey: postKeys.detail(id),
    mutationFn: () => findPost(id),
  });
};

export default useFindPost;
