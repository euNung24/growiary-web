'use client';

import { findPost } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';
import { getNewAccessToken } from '@/utils/api';

const useFindPost = (id?: string) => {
  if (!id) return;
  return useMutation({
    mutationKey: ['post', id],
    mutationFn: () => findPost(id),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useFindPost;
