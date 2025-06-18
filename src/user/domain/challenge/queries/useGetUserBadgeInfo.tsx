'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserBadge } from '@user/challenge/apis/challengeApi';

const useGetUserBadgeInfo = () => {
  const { data } = useQuery({
    queryKey: ['badge'],
    queryFn: getUserBadge,
    staleTime: 0,
  });

  return data;
};

export default useGetUserBadgeInfo;
