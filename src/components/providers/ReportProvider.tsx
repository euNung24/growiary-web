'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { ReportType } from '@/types/reportTypes';
import useGetReport from '@/hooks/report/useGetReport';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';

export const ReportContext = createContext<{
  data: ReportType | null;
  year: number;
  month: number;
}>({
  data: null,
  month: 0,
  year: 0,
});

type ReportProvider = {
  children: ReactNode;
  selectedYear?: number;
  selectedMonth?: number;
};
const ReportProvider = ({ children, selectedYear, selectedMonth }: ReportProvider) => {
  const mutation = useGetReport();
  const [data, setData] = useState<ReportType>({} as ReportType);
  const {
    date: { year, month },
  } = useRecoilValue(TodayState);

  useEffect(() => {
    // setData(REPORT);
    mutation
      .mutateAsync(
        `${selectedYear}-${(selectedMonth || month).toString().padStart(2, '0')}`,
      )
      .then(res => {
        if (!res) return;
        setData(res.data);
      });
  }, [selectedMonth]);

  return (
    <ReportContext.Provider
      value={{
        data,
        year: selectedYear || year,
        month: selectedMonth ? selectedMonth - 1 : month - 1,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
