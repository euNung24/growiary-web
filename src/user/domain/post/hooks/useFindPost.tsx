'use client';

import { useMutation } from '@tanstack/react-query';

import { findPost } from '@user/post/api';

const useFindPost = (id?: string) => {
  if (!id) return;

  return useMutation({
    mutationKey: ['post', id],
    mutationFn: () => findPost(id),
  });
};

export default useFindPost;
