'use client';

import LoginDialog from '@/shared/components/LoginDialog';
import { Button } from '@/shared/components/ui/button';
import { usePathname } from 'next/navigation';
import useProfileContext from '@/user/profile/hooks/useProfileContext';

const TopStartButton = () => {
  const pathname = usePathname();
  const { profile } = useProfileContext();

  return (
    !profile &&
    !['/history'].includes(pathname) && (
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
          </div>
        </div>
      </div>
    )
  );
};

export default TopStartButton;
