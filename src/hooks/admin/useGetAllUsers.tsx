'use client';

import { getNewAccessToken } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { getAllUsers } from '@/apis/admin/users';

const useGetUsersInfo = () => {
  return useMutation({
    mutationKey: ['usersInfo'],
    mutationFn: getAllUsers,
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetUsersInfo;
