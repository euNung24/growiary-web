'use client';

import { getReport } from '@/apis/report';
import { getNewAccessToken } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

const useGetReport = () => {
  return useMutation({
    mutationKey: ['report'],
    mutationFn: getReport,
    onError: async error => {
      await getNewAccessToken(error);
      console.log(error.message);
    },
  });
};

export default useGetReport;
