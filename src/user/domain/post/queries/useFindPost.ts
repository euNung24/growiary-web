'use client';

import { useMutation } from '@tanstack/react-query';

import { findPost } from '@user/post/apis/postApi';
import { postKeys } from '@user/post/queries/postKeys';

const useFindPost = (id?: string) => {
  if (!id) return;

  return useMutation({
    mutationKey: postKeys.detail(id),
    mutationFn: () => findPost(id),
  });
};

export default useFindPost;
