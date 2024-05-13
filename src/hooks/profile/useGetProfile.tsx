'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/apis/profile';
import { useEffect, useState } from 'react';
import { getNewAccessToken } from '@/utils/api';

const useGetProfile = () => {
  const {
    data: data,
    isError,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  useEffect(() => {
    const fn = async (error: Error) => {
      await getNewAccessToken(error);
    };

    if (isError) {
      fn(error).then();
      return;
    }
  }, [data, isError, error]);

  return { profile: data, isError };
};

export default useGetProfile;
