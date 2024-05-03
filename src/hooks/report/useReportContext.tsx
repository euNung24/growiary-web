'use client';
import { useContext } from 'react';
import { ReportContext } from '@/views/ReportView';

const useReportContext = () => {
  const context = useContext(ReportContext);

  return context;
};

export default useReportContext;
