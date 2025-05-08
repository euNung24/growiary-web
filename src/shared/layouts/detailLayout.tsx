'use client';

import { ReactNode, useEffect } from 'react';
import useProfileContext from '@/shared/hooks/useProfileContext';
import TopStartButton from '@/shared/layouts/TopStartButton';
import FooterFeedbackView from '@/shared/layouts/FooterFeedbackView';
import { cn } from '@/shared/utils/cn';
import { usePathname, useRouter } from 'next/navigation';

export default function DetailLayout({ children }: { children: ReactNode }) {
  const { profile } = useProfileContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!profile && /\/admin/.test(pathname)) {
      router.push('/admin');
    }
  });

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col pl-[200px] lg:pl-[68px]',
        !profile && 'overflow-auto',
        (pathname === '/post' || /\/history\/./g.test(pathname)) &&
          profile &&
          'mt-[-48px] h-[calc(100%+48px)]',
      )}
    >
      <TopStartButton />
      <main
        className={cn(
          'mx-auto relative w-[960px] md:w-[640px] sm:w-[320px] [&>*]:mx-2.5 flex-1 pb-[72px]',
          (pathname === '/post' || /\/history\/./g.test(pathname)) && 'overflow-hidden',
        )}
      >
        {children}
      </main>
      <FooterFeedbackView />
    </div>
  );
}
