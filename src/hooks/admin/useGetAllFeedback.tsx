'use client';

import { getNewAccessToken, UnauthorizedError } from '@/utils/api';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllFeedback } from '@/apis/admin/feedbacks';
import { useRouter } from 'next/navigation';

const useGetAllFeedback = () => {
  const router = useRouter();
  const {
    data: data,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['All feedback'],
    queryFn: getAllFeedback,
    select: res => res.data,
  });

  useEffect(() => {
    const fn = async (error: Error) => {
      await getNewAccessToken(error);
      UnauthorizedError(error).then(() => router.push('/'));
    };

    if (isError) {
      fn(error).then();
      return;
    }
  }, [data, isError, error]);

  return { data, isError, isSuccess };
};

export default useGetAllFeedback;
