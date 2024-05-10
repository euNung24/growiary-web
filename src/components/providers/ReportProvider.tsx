'use client';

import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { ReportType } from '@/types/reportTypes';
import useGetReport from '@/hooks/report/useGetReport';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useProfileContext from '@/hooks/profile/useProfileContext';

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
  const pathname = usePathname();
  const modalBtnRef = useRef<HTMLButtonElement | null>(null);
  const mutation = useGetReport();
  const [data, setData] = useState<ReportType>({} as ReportType);
  const [isClient, setIsClient] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const {
    date: { year, month },
  } = useRecoilValue(TodayState);
  const { profile } = useProfileContext();

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
      return;
    }
    if (!profile) return;

    const dateYYMM = profile
      ? `${selectedYear || year}-${(selectedMonth || month).toString().padStart(2, '0')}`
      : '2024-04';
    // setData(REPORT);
    mutation
      .mutateAsync(dateYYMM)
      .then(res => {
        if (!res) return;
        const dataCount = res.data.post?.user?.[dateYYMM] || 0;

        setData(res.data);
        setDataLength(dataCount);
        dataCount < 3 && modalBtnRef.current?.click();
      })
      .catch(() => {
        modalBtnRef.current?.click();
      });
  }, [selectedMonth, profile, isClient]);

  return (
    <ReportContext.Provider
      value={{
        data: !data || !Object.keys(data).length ? null : data,
        year: selectedYear || year,
        month: selectedMonth ? selectedMonth - 1 : month - 1,
      }}
    >
      {children}
      {isClient && profile && dataLength < 3 && pathname === '/report' && (
        <AlertDialog>
          <AlertDialogTrigger className="hidden" ref={modalBtnRef}>
            기록 데이터 부족 모달
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-primary-50 px-10 gap-0 w-[540px] md:w-[300px] box-content">
            <div className="flex items-center justify-center gap-x-2.5 mt-8">
              {dataLength < 3 &&
                dataLength >= 0 &&
                [...Array(dataLength)].map((v, i) => (
                  <span
                    key={i}
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500"
                  >
                    <Check width={16} height={16} color="#ffffff" />
                  </span>
                ))}
              {[...Array(3 - dataLength)].map((v, i) => (
                <span key={i} className="block w-6 h-6 rounded-full bg-white-0"></span>
              ))}
            </div>
            <div className="text-primary-900 font-r14 text-center mt-[70px] mt-8">
              <p>
                나의 기록 데이터를 확인하려면 <br className="hidden md:block " />
                최소 3개의 기록이 필요해요!
              </p>
              <p className="font-r12 text-gray-500 mt-1 md:mt-2.5">
                기록을 마저 작성해주시면 바로 데이터를 보실 수 있어요.
              </p>
            </div>

            <AlertDialogFooter className="mt-12 pb-2">
              <Button variant="outline" size="sm" className="px-[41px]" asChild>
                <Link href="/report/preview" className="flex gap-x-2 border-0">
                  기록 미리보기
                </Link>
              </Button>
              <Button size="sm" className="bg-primary-900 px-[41px]" asChild>
                <Link href="/post" className="flex gap-x-2 border-0">
                  기록하러 가기
                </Link>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
