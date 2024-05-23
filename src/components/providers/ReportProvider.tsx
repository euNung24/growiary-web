'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { ReportType } from '@/types/reportTypes';
import useGetReport from '@/hooks/report/useGetReport';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TodayState } from '@/store/todayStore';
import useProfileContext from '@/hooks/profile/useProfileContext';
import { ReportState } from '@/store/reportStore';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';

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

  useEffect(() => {
    if (isLogin !== 'LOGIN') return;
    const dateYYMM = `${selectedYear || year}-${(selectedMonth || month).toString().padStart(2, '0')}`;

    mutation
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
        {data && pathname === '/report' && (
          <FooterFeedbackView
            category="기록 데이터 보기"
            description=" 더 알고 싶은 기록 관련 데이터가 있다면 편하게 알려주세요"
          />
        )}
      </ReportContext.Provider>
    )
  );
};

export default ReportProvider;
