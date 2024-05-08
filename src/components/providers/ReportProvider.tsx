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
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
  const [dataLength, setDataLength] = useState(0);
  const {
    date: { year, month },
  } = useRecoilValue(TodayState);
  const dateYYMM = `${selectedYear}-${(selectedMonth || month).toString().padStart(2, '0')}`;

  useEffect(() => {
    mutation.mutateAsync(dateYYMM).then(res => {
      if (!res) return;
      setData(res.data);
      setDataLength(data.post?.user?.[dateYYMM] || 0);
    });
  }, [selectedMonth]);

  useEffect(() => {
    if (!modalBtnRef.current) return;
    dataLength < 3 && pathname === '/report' && modalBtnRef.current.click();
  }, [dataLength, modalBtnRef.current]);

  return (
    <ReportContext.Provider
      value={{
        data: !data || !Object.keys(data).length ? null : data,
        year: selectedYear || year,
        month: selectedMonth ? selectedMonth - 1 : month - 1,
      }}
    >
      {children}
      <AlertDialog>
        <AlertDialogTrigger className="hidden" ref={modalBtnRef}>
          기록 데이터 부족 모달
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-primary-50 px-10">
          <div className="text-primary-900 font-r16 text-center mt-[70px] mb-8">
            나의 기록 데이터를 확인하려면 최소 3개의 기록이 필요해요!
            <br />
            기록을 마저 작성해주시면 바로 데이터를 보실 수 있어요.
          </div>
          <div className="flex items-center justify-center gap-x-2.5">
            {[...Array(dataLength)].map((v, i) => (
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
          <AlertDialogFooter className="mt-[50px]">
            <Button variant="outline" size="lg" asChild>
              <Link href="/" className="flex gap-x-2 border-0">
                <Image
                  src="/assets/icons/edit_primary.png"
                  alt="post"
                  width={22}
                  height={22}
                />
                홈으로 가기
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/post" className="flex gap-x-2 border-0">
                <Image
                  src="/assets/icons/edit_primary.png"
                  alt="post"
                  width={22}
                  height={22}
                />
                기록하러 가기
              </Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ReportContext.Provider>
  );
};

export default ReportProvider;
