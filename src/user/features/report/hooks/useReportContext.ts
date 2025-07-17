'use client';
import { useContext } from 'react';
import { ReportContext } from '@/user/features/report/providers/ReportProvider';

const useReportContext = () => {
  return useContext(ReportContext);
};

export default useReportContext;
