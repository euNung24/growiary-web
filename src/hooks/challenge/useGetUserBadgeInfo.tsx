'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserBadge } from '@/apis/challenge';
import { useEffect } from 'react';
import { getCookie } from '@/utils';

const useGetUserBadgeInfo = () => {
  const {
    data: data,
    isError,
    error,
  } = useQuery({
    queryKey: ['badge'],
    queryFn: getUserBadge,
    enabled: 'document' in global && !!getCookie('accessToken'),
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
