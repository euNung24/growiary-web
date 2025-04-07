'use client';

import { useMutation } from '@tanstack/react-query';
import { getAllUsers } from '@/apis/admin/users';

const useGetUsersInfo = () => {
  return useMutation({
    mutationKey: ['usersInfo'],
    mutationFn: getAllUsers,
    onError: async error => {
      return error;
    },
  });
};

export default useGetUsersInfo;
