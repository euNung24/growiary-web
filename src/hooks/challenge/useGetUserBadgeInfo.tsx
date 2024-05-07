'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserBadge } from '@/apis/challenge';
import { useEffect } from 'react';

const useGetUserBadgeInfo = () => {
  const {
    data: data,
    isError,
    error,
  } = useQuery({
    queryKey: ['badge'],
    queryFn: getUserBadge,
  });

  useEffect(() => {
    if (isError) {
      alert(error.message);
      return;
    }
  }, [data]);

  return data;
};

export default useGetUserBadgeInfo;
