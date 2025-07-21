'use client';

import { useMutation } from '@tanstack/react-query';
import { getMonthlyPosts } from '@user/post/apis/postApi';


const useGetMonthlyPosts = () => {
  return useMutation({
    mutationFn: (date: string) => getMonthlyPosts(date),
  });
};

export default useGetMonthlyPosts;
