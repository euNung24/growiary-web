'use client';

import { getReport } from '@/apis/report';
import { getNewAccessToken } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

const useGetReport = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const checkAbort = (date: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새로운 AbortController를 생성합니다.
    abortControllerRef.current = new AbortController();
    return getReport(date, { abortController: abortControllerRef.current });
  };

  return useMutation({
    mutationKey: ['report'],
    mutationFn: (date: string) => checkAbort(date),
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetReport;
