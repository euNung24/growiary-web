'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserBadge } from '@user/challenge/apis/challengeApi';
import { challengeKeys } from '@user/challenge/queries/challengeKeys';

const useGetUserBadgeInfo = () => {
  const { data } = useQuery({
    queryKey: challengeKeys.lists(),
    queryFn: getUserBadge,
    staleTime: 0,
  });

  return data;
};

export default useGetUserBadgeInfo;
