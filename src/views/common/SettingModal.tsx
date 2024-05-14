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
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { UserState } from '@/store/userStore';
import { tracking } from '@/utils/mixPanel';

const SettingModal = () => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const setUserState = useSetRecoilState(UserState);
  const { profile } = useGetProfile();
  const queryClient = useQueryClient();

  const handleClickLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setIsLogout(true);
  };

  const handleClose = (open: boolean) => {
    !open && history.back();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isLogout) {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setUserState(v => ({ ...v, isNotLoginAndFirst: true }));
      router.push('/');
    }
  }, [isLogout, profile]);

  return (
    <>
      {isClient && (
        <Dialog defaultOpen onOpenChange={open => handleClose(open)}>
          <DialogTrigger asChild>
            <Button className="hidden">설정 모달</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] gap-0">
            <DialogHeader className="mb-14">
              <DialogTitle className="text-primary-900 mt-10">설정하기</DialogTitle>
            </DialogHeader>
            {profile && Object.keys(profile) && (
              <>
                <div className="flex items-center">
                  <div className="flex justify-center items-center w-[76px] h-[76px] rounded-full bg-gray-100 overflow-hidden">
                    <Image
                      src={profile?.profileImage || '/assets/icons/profile.png'}
                      alt="profile"
                      width={profile?.profileImage ? 76 : 42}
                      height={profile?.profileImage ? 76 : 42}
                    />
                  </div>
                  <span className="ml-[18px] font-r22 text-gray-900">
                    {profile
                      ? profile.nickname || profile.email?.split('@')[0]
                      : '그루미'}
                    님
                  </span>
                </div>
                <section className="flex flex-col gap-y-1 mt-10 text-gray-900 font-r16">
                  <div className="flex justify-between py-[13px]">
                    <span>연결된 계정</span>
                    <div className="flex items-center">
                      <Image
                        src={
                          profile.social === 'kakao'
                            ? '/assets/icons/kakao.png'
                            : '/assets/icons/google.png'
                        }
                        alt={
                          profile.social === 'kakao'
                            ? '/assets/icons/kakao.png'
                            : '/assets/icons/google.png'
                        }
                        width={24}
                        height={24}
                        className="rounded-full mr-3"
                      />
                      <span className="text-gray-500">{profile?.email}</span>
                    </div>
                  </div>
                  <ServiceTerm>
                    <div
                      className="flex justify-between py-[13px] hover:bg-gray-50"
                      onClick={() => {
                        tracking(`서비스 이용약관`);
                      }}
                    >
                      <span>서비스 이용약관</span>
                      <ChevronRight className="text-gray-500" />
                    </div>
                  </ServiceTerm>
                  <PrivateTerm>
                    <div
                      className="flex justify-between py-[13px] hover:bg-gray-50"
                      onClick={() => {
                        tracking(`개인정보 처리방침`);
                      }}
                    >
                      <span>개인정보 처리방침</span>
                      <ChevronRight className="text-gray-500" />
                    </div>
                  </PrivateTerm>
                  <div className="flex justify-between py-[13px]">
                    <span>버전 정보</span>
                    <span className="text-gray-500">v1.0.0.최신버전</span>
                  </div>
                  <div className="flex justify-between py-[13px]">
                    <Button
                      size="sm"
                      variant="ghostGray"
                      className="hover:bg-background focus:bg-background p-0"
                      onClick={handleClickLogout}
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
