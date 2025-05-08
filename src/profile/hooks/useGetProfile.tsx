'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/profile/api/client';
import Cookies from 'js-cookie';

const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 60 * 60 * 24 * 1000,
    enabled: !!Cookies.get('accessToken'),
  });
};

export default useGetProfile;
