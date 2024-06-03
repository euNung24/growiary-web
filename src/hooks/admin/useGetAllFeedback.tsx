'use client';

import { getNewAccessToken } from '@/utils/api';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllFeedback } from '@/apis/admin/feedbacks';

const useGetAllFeedback = () => {
  const {
    data: data,
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
    };

    if (isError) {
      fn(error).then();
      return;
    }
  }, [data, isError, error]);

  return { data, isError };
};

export default useGetAllFeedback;
