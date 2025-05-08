'use client';

import { deletePost } from '@/post/api';
import { useMutation } from '@tanstack/react-query';

const useDeletePost = (id: string) => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: () => deletePost(id),
  });
};

export default useDeletePost;
