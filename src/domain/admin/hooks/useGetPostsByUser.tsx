'use client';

import { useMutation } from '@tanstack/react-query';
import { getPostsByUser } from '@/domain/admin/apis/posts';

const useGetPostsByUser = () => {
  const query = useMutation({
    mutationKey: ['postsByUser'],
    mutationFn: getPostsByUser,
  });

  return query;
};

export default useGetPostsByUser;
