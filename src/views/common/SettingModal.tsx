'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SettingModal = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Dialog defaultOpen>
          <DialogTrigger asChild>
            <Button className="hidden">설정 모달</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] gap-0">
            <DialogHeader className="mb-14">
              <DialogTitle className="text-primary-900 mt-10">설정</DialogTitle>
            </DialogHeader>
            <div className="flex items-center">
              <div className="flex justify-center items-center w-[76px] h-[76px] rounded-full bg-gray-100 lg:hidden">
                <Image
                  src="/assets/icons/profile.png"
                  alt="profile"
                  width={42}
                  height={42}
                />
              </div>
              <span className="ml-[18px] font-r22 text-gray-900">그루미님</span>
            </div>
            <section className="flex flex-col gap-y-1 mt-10 text-gray-900 font-r16">
              <div className="flex justify-between py-[13px]">
                <span>연결된 계정</span>
                <span>연결된 계정</span>
              </div>
              <div className="flex justify-between py-[13px]">
                <span>연결된 계정</span>
                <span>연결된 계정</span>
              </div>
              <div className="flex justify-between py-[13px]">
                <span>연결된 계정</span>
                <span>연결된 계정</span>
              </div>
              <div className="flex justify-between py-[13px]">
                <span>연결된 계정</span>
                <span>연결된 계정</span>
              </div>
              <div className="flex justify-between py-[13px]">
                <Button
                  size="sm"
                  variant="ghostGray"
                  className="hover:bg-background focus:bg-background"
                >
                  로그아웃
                </Button>
              </div>
            </section>
          </DialogContent>
          <DialogFooter></DialogFooter>
        </Dialog>
      )}
    </>
  );
};

export default SettingModal;
