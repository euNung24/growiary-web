import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/apis/profile';
import { useEffect } from 'react';
import { getCookie } from '@/utils';

const useGetProfile = () => {
  const {
    data: data,
    isError,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
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

export default useGetProfile;
