'use client';

import { useMutation } from '@tanstack/react-query';

import { deletePost } from '@user/post/api';

const useDeletePost = (id: string) => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: () => deletePost(id),
  });
};

export default useDeletePost;
