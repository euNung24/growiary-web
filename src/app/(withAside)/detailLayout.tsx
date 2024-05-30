'use client';

import { ReactNode } from 'react';
import useProfileContext from '@/hooks/profile/useProfileContext';
import TopStartButton from '@/views/common/TopStartButton';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';
import { cn } from '@/lib/utils';

export default function DetailLayout({ children }: { children: ReactNode }) {
  const { profile } = useProfileContext();

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col pl-[200px] lg:pl-[68px]',
        !profile && 'overflow-auto',
      )}
    >
      <TopStartButton />
      <main
        className={cn(
          'mx-auto relative w-[960px] md:w-[640px] sm:w-[320px] [&>*]:mx-2.5 flex-1 pb-[72px]',
        )}
      >
        {children}
      </main>
      <FooterFeedbackView />
    </div>
  );
}
