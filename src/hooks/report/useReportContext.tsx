'use client';
import { useContext } from 'react';
import { ReportContext } from '@/components/providers/ReportProvider';

const useReportContext = () => {
  return useContext(ReportContext);
};

export default useReportContext;
