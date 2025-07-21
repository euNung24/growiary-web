'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import TopStartButton from '@/shared/layouts/TopStartButton';
import FooterFeedbackView from '@/shared/layouts/FooterFeedbackView';
import useGetProfile from '@/shared/queries/profile/useGetProfile';

const ContentLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isPostPage = /^\/post(?:\/.*)?$/g.test(pathname);
  const { data } = useGetProfile();

  return (
    <div
      data-post={isPostPage}
      data-user-post={isPostPage && !!data?.userId}
      className="w-full flex flex-col pl-[200px] lg:pl-[68px] data-[user-post=true]:mt-[-48px] data-[post=false]:h-auto data-[post=true]:h-full"
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
