'use client';

import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { ReportType } from '@/user/features/report/types/report';
import useGetReport from '@/user/features/report/queries/useGetReport';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TodayState } from '@/shared/store/todayStore';
import useProfileContext from '@/shared/hooks/useProfileContext';
import { ReportState } from '@/user/features/report/store';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { debounce } from '@/shared/utils/debounce';

export const ReportContext = createContext<{
  data: ReportType | null;
  year: number;
  monthIndex: number;
  month: number;
}>({
  data: null,
  monthIndex: 0,
  year: 0,
  month: 0,
});

type ReportProvider = {
  children: ReactNode;
  selectedYear?: number;
  selectedMonth?: number;
};
const ReportProvider = ({ children, selectedYear, selectedMonth }: ReportProvider) => {
  const pathname = usePathname();
  const mutation = useGetReport();
  const [data, setData] = useState<ReportType | null>(null);
  const [dataLength, setDataLength] = useState(-1);
  const setReportAcc = useSetRecoilState(ReportState);
  const {
    date: { year, month },
  } = useRecoilValue(TodayState);
  const { isLogin } = useProfileContext();

  const mutationFn = async (year: number, month: number) => {
    const dateYYMM = `${year}-${month.toString().padStart(2, '0')}`;

    return mutation
      .mutateAsync(dateYYMM)
      .then(res => {
        if (!res) return;
        const dataCount = res.data.post?.user?.[dateYYMM] || 0;
        res.data.all && setReportAcc(res.data.all);
        setData(res.data);
        setDataLength(dataCount);
      })
      .catch(() => {
        setData({} as ReportType);
        setDataLength(0);
      });
  };

  const debouncedMutation = useMemo(() => debounce(mutationFn), []);

  useEffect(() => {
    if (isLogin !== 'LOGIN') return;
    debouncedMutation(selectedYear || year, selectedMonth || month);

    return () => {
      debouncedMutation.cancel();
    };
  }, [selectedMonth, isLogin]);

  return (
    isLogin && (
      <ReportContext.Provider
        value={{
          data,
          year: selectedYear || year,
          month: selectedMonth ? selectedMonth : month,
          monthIndex: selectedMonth ? selectedMonth - 1 : month - 1,
        }}
      >
        {dataLength === 0 && pathname === '/report' ? (
          <div className="flex flex-col gap-y-[50px] items-center mt-[50px] mb-[140px]">
            <p className="text-primary-900 text-center font-sb18">
              해당 월에는 아직 기록이 없습니다.
              <br /> 기록을 남기면 데이터를 확인할 수 있어요.
            </p>
            <Image
              src="/assets/images/empty_box.png"
              alt="no report"
              width={180}
              height={180}
            />
          </div>
        ) : (
          children
        )}
      </ReportContext.Provider>
    )
  );
};

export default ReportProvider;
