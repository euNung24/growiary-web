'use client';

import { getMonthlyPosts } from '@/domain/post/api';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

const useGetMonthlyPosts = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const checkAbort = (date: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새로운 AbortController를 생성합니다.
    abortControllerRef.current = new AbortController();
    return getMonthlyPosts(date, { abortController: abortControllerRef.current });
  };

  return useMutation({
    mutationKey: ['monthlyPosts'],
    mutationFn: (date: string) => checkAbort(date),
    onSettled: () => {
      // mutation이 완료된 후 실행됩니다 (성공 또는 실패 시).
      abortControllerRef.current = null;
    },
  });
};

export default useGetMonthlyPosts;
