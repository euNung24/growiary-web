'use client';

import { ReactNode, useEffect } from 'react';
import useProfileContext from '@/hooks/profile/useProfileContext';
import TopStartButton from '@/views/common/TopStartButton';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useAvoidHydration } from '@/hooks/useAvoidHydration';

export default function DetailLayout({ children }: { children: ReactNode }) {
  const { profile } = useProfileContext();
  const router = useRouter();
  const pathname = usePathname();
  const isClient = useAvoidHydration();

  useEffect(() => {
    if (!profile && /\/admin/.test(pathname)) {
      router.push('/admin');
    }
  });

  if (!isClient) return;

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
