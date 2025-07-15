'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Button, ButtonIcon } from '@/shared/components/ui/button';
import Image from 'next/image';
import useGetProfile from '@/shared/hooks/useGetProfile';
import { ChevronRight } from 'lucide-react';
import ServiceTerm from '@/shared/components/ServiceTerm';
import PrivateTerm from '@/shared/components/PrivateTerm';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { useAvoidHydration } from '@/shared/hooks/useAvoidHydration';

const SettingModal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isClient = useAvoidHydration();
  const { data: profile } = useGetProfile();

  const handleClickLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('hasVisited');

    queryClient.clear();
    tracking(`로그아웃`);
    sendGAEvent({ event: `로그아웃` });
    router.refresh();
  };

  const handleClose = (open: boolean) => {
    !open && history.back();
  };

  const handleAddKakaoChannel = () => {
    if (!window.Kakao.isInitialized()) {
      const script = document.createElement('script');
      script.innerHTML = window.Kakao.init('cc4180186b4c880c447667c958e415d7');
      document.body.appendChild(script);
    }

    window.Kakao.Channel.followChannel({
      channelPublicId: '_CChDG',
    });
  };

  useEffect(() => {
    if (!isClient) return;

    const script1 = document.createElement('script');
    script1.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js';
    script1.integrity =
      'sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01';
    script1.crossOrigin = 'anonymous';
    document.body.appendChild(script1);
  }, [isClient]);

  if (!isClient) {
    return;
  }

  return (
    <Dialog defaultOpen onOpenChange={open => handleClose(open)}>
      <DialogTrigger asChild>
        <Button className="hidden">설정 모달</Button>
      </DialogTrigger>
      <DialogContent className="gap-0">
        <DialogHeader className="mb-14 sm:mb-6">
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
                  priority
                />
              </div>
              <span className="ml-[18px] font-r22 text-gray-900">
                {profile ? profile.nickname || profile.email?.split('@')[0] : '그루미'}님
              </span>
            </div>
            <section className="flex flex-col gap-y-1 mt-10 text-gray-900 font-r16 sm:mt-6">
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
                    priority
                  />
                  <span className="text-gray-500">{profile?.email}</span>
                </div>
              </div>
              <ServiceTerm>
                <div className="flex justify-between py-[13px] hover:bg-gray-50">
                  <span>서비스 이용약관</span>
                  <ChevronRight className="text-gray-500" />
                </div>
              </ServiceTerm>
              <PrivateTerm>
                <div className="flex justify-between py-[13px] hover:bg-gray-50">
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
            <Button
              size="lg"
              className="bg-[#FFE501] text-[#3C1D1E] focus:bg-[#FFE501] max-w-[345px] mx-auto gap-x-2 mt-[128px] sm:mt-4"
              onClick={handleAddKakaoChannel}
            >
              <ButtonIcon src="/assets/icons/kakao_icon.png" alt="kakao_channel" />
              그루어리 채널 추가하고 알림 받기
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
