'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { ReportType } from '@/types/reportTypes';
import useGetReport from '@/hooks/report/useGetReport';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';

export const ReportContext = createContext<{ data: ReportType | null; month: number }>({
  data: null,
  month: 0,
});
const ReportProvider = ({ children }: { children: ReactNode }) => {
  const mutation = useGetReport();
  const [data, setData] = useState<ReportType>({} as ReportType);
  const {
    date: { month },
  } = useRecoilValue(TodayState);

  useEffect(() => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      setData(res.data);
    });
  }, []);

  return (
    <ReportContext.Provider value={{ data, month: month - 1 }}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
