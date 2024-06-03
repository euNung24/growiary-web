'use client';

import { getNewAccessToken } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { getPostsByUser } from '@/apis/admin/posts';

const useGetPostsByUser = () => {
  return useMutation({
    mutationKey: ['postsByUser'],
    mutationFn: getPostsByUser,
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetPostsByUser;
