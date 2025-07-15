'use client';

import { getReport } from '@user/report/apis/reportApi';
import { useMutation } from '@tanstack/react-query';

const useGetReport = () => {
  return useMutation({
    mutationKey: ['report'],
    mutationFn: (date: string) => getReport(date),
  });
};

export default useGetReport;
