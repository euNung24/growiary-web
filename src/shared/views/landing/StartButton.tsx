'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const getCookieExpireDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 1);

  return date;
};

const StartButton = () => {
  const router = useRouter();

  const handleClickStart = () => {
    Cookies.set('hasVisited', 'Y', {
      expires: getCookieExpireDate(),
    });
    tracking(`메인 페이지`);
    sendGAEvent({ event: '메인 페이지' });
    performance.mark('landing-to-main-start');
    router.push('/');
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="text-gray-900 bg-secondary-400"
      onClick={handleClickStart}
    >
      그루어리 시작하기
    </Button>
  );
};

export default StartButton;
