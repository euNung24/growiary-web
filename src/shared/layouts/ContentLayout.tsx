'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useProfileContext from '@/shared/hooks/useProfileContext';
import TopStartButton from '@/shared/layouts/TopStartButton';
import FooterFeedbackView from '@/shared/layouts/FooterFeedbackView';

const ContentLayout = ({ children }: { children: ReactNode }) => {
  const { profile } = useProfileContext();
  const router = useRouter();
  const pathname = usePathname();
  const isPostPage = /^\/(post|history\/.*)/g.test(pathname);

  useEffect(() => {
    if (!profile && /\/admin/.test(pathname)) {
      router.push('/admin');
    }
  });

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
