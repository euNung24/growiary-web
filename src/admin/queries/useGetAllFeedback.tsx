'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllFeedback } from '@/admin/apis/feedbacks';
import { feedbackKeys } from '@admin/queries/feedbackKeys';

const useGetAllFeedback = () => {
  return useQuery({
    queryKey: feedbackKeys.all,
    queryFn: getAllFeedback,
    select: res => res.data,
  });
};

export default useGetAllFeedback;
