import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import UserProvider from '@/components/providers/UserProvider';
import TopStartButton from '@/views/common/TopStartButton';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function asLayout({ modal, children }: LayoutProps) {
  return (
    <>
      {modal}
      <UserProvider>
        <Sidebar />
        <div className="w-full h-full flex flex-col pl-[200px] lg:pl-[68px]">
          <TopStartButton />
          <main className="mx-auto relative w-[960px] md:w-[640px] sm:w-[320px] [&>*]:mx-2.5 flex-1 pb-[72px]">
            {children}
          </main>
          <FooterFeedbackView />
        </div>
      </UserProvider>
      <Toaster />
    </>
  );
}
