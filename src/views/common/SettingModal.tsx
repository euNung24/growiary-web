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
import useGetProfile from '@/hooks/profile/useGetProfile';
import { ChevronRight } from 'lucide-react';
import ServiceTerm from '@/views/common/ServiceTerm';
import PrivateTerm from '@/views/common/PrivateTerm';

const SettingModal = () => {
  const [isClient, setIsClient] = useState(false);
  const profile = useGetProfile();

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
            {typeof profile !== 'string' && (
              <>
                <div className="flex items-center">
                  <div className="flex justify-center items-center w-[76px] h-[76px] rounded-full bg-gray-100 overflow-hidden lg:hidden">
                    <Image
                      src={profile?.profileImage || '/assets/icons/profile.png'}
                      alt="profile"
                      width={profile?.profileImage ? 76 : 42}
                      height={profile?.profileImage ? 76 : 42}
                    />
                  </div>
                  <span className="ml-[18px] font-r22 text-gray-900">
                    {profile?.nickname || '그루미'}님
                  </span>
                </div>
                <section className="flex flex-col gap-y-1 mt-10 text-gray-900 font-r16">
                  <div className="flex justify-between py-[13px]">
                    <span>연결된 계정</span>
                    <div className="flex items-center">
                      <Image
                        src="/assets/icons/kakao.png"
                        alt={profile?.social || 'social'}
                        width={24}
                        height={24}
                        className="rounded-full mr-3"
                      />
                      <span className="text-gray-500">{profile?.email}</span>
                    </div>
                  </div>
                  <div className="flex justify-between py-[13px]">
                    <span>서비스 이용약관</span>
                    <ServiceTerm>
                      <ChevronRight className="text-gray-500" />
                    </ServiceTerm>
                  </div>
                  <div className="flex justify-between py-[13px]">
                    <span>개인정보 처리방침</span>
                    <PrivateTerm>
                      <ChevronRight className="text-gray-500" />
                    </PrivateTerm>
                  </div>
                  <div className="flex justify-between py-[13px]">
                    <span>버전 정보</span>
                    <span className="text-gray-500">v1.0.0.최신버전</span>
                  </div>
                  <div className="flex justify-between py-[13px]">
                    <Button
                      size="sm"
                      variant="ghostGray"
                      className="hover:bg-background focus:bg-background p-0"
                    >
                      로그아웃
                    </Button>
                  </div>
                </section>
              </>
            )}
          </DialogContent>
          <DialogFooter></DialogFooter>
        </Dialog>
      )}
    </>
  );
};

export default SettingModal;
