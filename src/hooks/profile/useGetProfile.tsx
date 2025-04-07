'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/apis/profile';

const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  });
};

export default useGetProfile;
