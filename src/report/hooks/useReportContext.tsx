'use client';
import { useContext } from 'react';
import { ReportContext } from '@/report/components/ReportProvider';

const useReportContext = () => {
  return useContext(ReportContext);
};

export default useReportContext;
