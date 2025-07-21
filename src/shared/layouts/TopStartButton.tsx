'use client';

import LoginDialog from '@/shared/components/LoginDialog';
import { Button } from '@/shared/components/ui/button';
import { usePathname } from 'next/navigation';
import useProfileContext from '@/shared/hooks/useProfileContext';
import Image from 'next/image';

const TopStartButton = () => {
  const pathname = usePathname();
  const { profile } = useProfileContext();

  return (
    !profile &&
    !['/posts'].includes(pathname) && (
      <div className={'sticky top-0 bg-white-0 z-10'}>
        <div className="flex justify-end py-[23px] mx-auto bg-white-0">
          <div className="flex-[0_0_960px] md:flex-[0_0_640px] sm:flex-[0_0_320px] mx-auto px-2.5 text-end">
            <LoginDialog>
              <Button
                className="bg-gray-50 border-0 focus:border-transparent focus:border-0"
                size="sm"
                variant="outlineGray"
              >
                시작하기
              </Button>
            </LoginDialog>
            <PreloadedImages />
          </div>
        </div>
      </div>
    )
  );
};

export default TopStartButton;

const PreloadedImages = () => {
  return (
    <div className="w-0 h-0 overflow-hidden" aria-placeholder="preloaded images">
      <Image src="/assets/icons/logo/wide.png" alt="logo" width={133.84} height={32} />
      <Image
        src="/assets/icons/login_kakao.png"
        alt="kakao_login"
        width={308}
        height={52}
      />
      <Image
        src="/assets/icons/login_google.png"
        alt="google_login"
        width={308}
        height={52}
      />
    </div>
  );
};
