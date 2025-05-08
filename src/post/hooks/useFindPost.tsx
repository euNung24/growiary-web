'use client';

import { findPost } from '@/post/api';
import { useMutation } from '@tanstack/react-query';

const useFindPost = (id?: string) => {
  if (!id) return;

  return useMutation({
    mutationKey: ['post', id],
    mutationFn: () => findPost(id),
  });
};

export default useFindPost;
