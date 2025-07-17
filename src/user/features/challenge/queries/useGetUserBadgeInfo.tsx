'use client';

import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { getUserBadge } from '@/user/features/challenge/apis/challengeApi';
import { challengeKeys } from '@/user/features/challenge/queries/challengeKeys';

const useGetUserBadgeInfo = () => {
  return useQuery({
    queryKey: challengeKeys.lists(),
    queryFn: getUserBadge,
    enabled: !!Cookies.get('accessToken'),
    select: data => {
      return data.data;
    },
  });
};

export default useGetUserBadgeInfo;
