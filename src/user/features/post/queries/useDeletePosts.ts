'use client';

import { useMutation } from '@tanstack/react-query';

import { deletePost } from '@/user/features/post/apis/postApi';

const useDeletePost = (id: string) => {
  return useMutation({
    mutationFn: () => deletePost(id),
  });
};

export default useDeletePost;
