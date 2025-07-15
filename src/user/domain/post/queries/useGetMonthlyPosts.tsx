'use client';

import { useMutation } from '@tanstack/react-query';

import { getMonthlyPosts } from '@user/history/apis/historyApi';

const useGetMonthlyPosts = () => {
  return useMutation({
    mutationKey: ['monthlyPosts'],
    mutationFn: (date: string) => getMonthlyPosts(date),
  });
};

export default useGetMonthlyPosts;
