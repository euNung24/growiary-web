'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserBadge } from '@/apis/challenge';
import { useEffect } from 'react';
import { getNewAccessToken } from '@/utils/api';

const useGetUserBadgeInfo = () => {
  const {
    data: data,
    isError,
    error,
  } = useQuery({
    queryKey: ['badge'],
    queryFn: getUserBadge,
    staleTime: 0,
  });

  useEffect(() => {
    const fn = async (error: Error) => {
      await getNewAccessToken(error);
      // console.log(error.message);
    };

    if (isError) {
      fn(error).then(res => console.log(res));
      // alert(error.message);
      return;
    }
  }, [data]);

  return data;
};

export default useGetUserBadgeInfo;
