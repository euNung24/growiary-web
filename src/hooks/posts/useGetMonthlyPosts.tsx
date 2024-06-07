'use client';

import { getMonthlyPosts } from '@/apis/post';
import { useMutation } from '@tanstack/react-query';
import { getNewAccessToken } from '@/utils/api';
import { useRef } from 'react';

const useGetMonthlyPosts = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const fn = (date: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새로운 AbortController를 생성합니다.
    abortControllerRef.current = new AbortController();
    return getMonthlyPosts(date, { abortController: abortControllerRef.current });
  };

  const mutation = useMutation({
    mutationKey: ['monthlyPosts'],
    mutationFn: (date: string) => fn(date),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
    onSettled: () => {
      // mutation이 완료된 후 실행됩니다 (성공 또는 실패 시).
      abortControllerRef.current = null;
    },
  });

  const a = mutation;
  return a;
};

export default useGetMonthlyPosts;
