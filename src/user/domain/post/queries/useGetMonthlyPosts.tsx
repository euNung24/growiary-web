'use client';

import { useMutation } from '@tanstack/react-query';

import { getMonthlyPosts } from '@user/history/apis/historyApi';

const useGetMonthlyPosts = () => {
  return useMutation({
    mutationFn: (date: string) => getMonthlyPosts(date),
  });
};

export default useGetMonthlyPosts;
