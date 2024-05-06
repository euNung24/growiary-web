'use client';

import { deletePost } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';
import { getNewAccessToken } from '@/utils/api';

const useDeletePost = (id: string) => {
  return useMutation({
    mutationKey: ['posts'],
    mutationFn: () => deletePost(id),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useDeletePost;
