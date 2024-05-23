import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import UserProvider from '@/components/providers/UserProvider';
import TopStartButton from '@/views/common/TopStartButton';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function asLayout({ modal, children }: LayoutProps) {
  return (
    <div>
      {modal}
      <UserProvider>
        <Sidebar />
        <div className="w-full pl-[200px] lg:pl-[68px]">
          <TopStartButton />
          <main className="mx-auto relative w-[960px] md:w-[640px] sm:w-[320px] [&>*]:mx-2.5">
            {children}
          </main>
        </div>
      </UserProvider>
      <Toaster />
    </div>
  );
}
