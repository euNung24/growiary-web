'use client';

import { useEffect, useState } from 'react';
import { getReport } from '@/apis/report';
import { ReportType } from '@/types/reportTypes';

const useGetReport = () => {
  const [report, setReport] = useState<ReportType>({} as ReportType);

  useEffect(() => {
    const fn = async () => {
      const res = await getReport();
      setReport(res.data);
      console.log(res);
    };
    fn();
  }, []);

  return report;
};

export default useGetReport;
