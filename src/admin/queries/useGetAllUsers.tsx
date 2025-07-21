'use client';

import { useMutation } from '@tanstack/react-query';
import { getAllUsers } from '@/admin/apis/users';

const useGetUsersInfo = () => {
  return useMutation({
    mutationFn: getAllUsers,
    onError: async error => {
      return error;
    },
  });
};

export default useGetUsersInfo;
