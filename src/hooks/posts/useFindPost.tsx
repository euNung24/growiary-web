'use client';

import { findPost } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';

const useFindPost = (id?: string) => {
  if (!id) return;

  return useMutation({
    mutationKey: ['post', id],
    mutationFn: () => findPost(id),
  });
};

export default useFindPost;
