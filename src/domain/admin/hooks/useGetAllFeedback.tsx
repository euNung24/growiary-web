'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllFeedback } from '@/domain/admin/apis/feedbacks';

const useGetAllFeedback = () => {
  return useQuery({
    queryKey: ['All feedback'],
    queryFn: getAllFeedback,
    select: res => res.data,
  });
};

export default useGetAllFeedback;
