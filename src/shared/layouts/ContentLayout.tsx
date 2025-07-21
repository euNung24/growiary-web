'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import useProfileContext from '@/shared/hooks/useProfileContext';
import TopStartButton from '@/shared/layouts/TopStartButton';
import FooterFeedbackView from '@/shared/layouts/FooterFeedbackView';

const ContentLayout = ({ children }: PropsWithChildren) => {
  const { profile } = useProfileContext();
  const pathname = usePathname();
  const isPostPage = /^\/(post\/.*)/g.test(pathname);

  return (
    <div
      data-user-post={isPostPage && !!profile}
      className="w-full h-full flex flex-col pl-[200px] lg:pl-[68px] data-[user-post=true]:mt-[-48px] data-[user-post=true]:h-[calc(100%+48px)]"
    >
      <TopStartButton />
      <main
        data-overflow={!isPostPage}
        className="mx-auto relative w-[960px] md:w-[640px] sm:w-[320px] [&>*]:mx-2.5 flex-1 pb-[72px] data-[overflow=false]:overflow-hidden"
      >
        {children}
      </main>
      <FooterFeedbackView />
    </div>
  );
};

export default ContentLayout;
