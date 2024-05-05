import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/apis/profile';
import { useEffect } from 'react';

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
    if (isError) {
      alert(error.message);
      return;
    }
  }, [data]);

  return data;
};

export default useGetProfile;
