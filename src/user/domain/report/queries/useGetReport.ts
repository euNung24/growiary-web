'use client';

import { getReport } from '@user/report/apis/reportApi';
import { useMutation } from '@tanstack/react-query';
import { reportKeys } from '@user/report/queries/reportKeys';

const useGetReport = () => {
  return useMutation({
    mutationKey: reportKeys.all,
    mutationFn: (date: string) => getReport(date),
  });
};

export default useGetReport;
