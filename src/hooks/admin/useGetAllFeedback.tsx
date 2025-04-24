'use client';

import { UnauthorizedError } from '@/apis/token/client';
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

  if (isError) {
    UnauthorizedError(error).then(() => router.push('/'));
  }

  return { data, isError, isSuccess };
};

export default useGetAllFeedback;
