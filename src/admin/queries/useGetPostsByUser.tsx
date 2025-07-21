'use client';

import { useMutation } from '@tanstack/react-query';
import { getPostsByUser } from '@/admin/apis/posts';

const useGetPostsByUser = () => {
  const query = useMutation({
    mutationFn: getPostsByUser,
  });

  return query;
};

export default useGetPostsByUser;
