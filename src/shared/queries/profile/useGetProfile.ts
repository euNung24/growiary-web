'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/shared/apis/profile/client';
import Cookies from 'js-cookie';
import { profileKeys } from '@/shared/queries/profile/profileKeys';

const useGetProfile = () => {
  return useQuery({
    queryKey: profileKeys.all,
    queryFn: getProfile,
    staleTime: 60 * 60 * 24 * 1000,
    enabled: !!Cookies.get('accessToken'),
  });
};

export default useGetProfile;
