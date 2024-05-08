import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import UserProvider from '@/components/providers/UserProvider';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function asLayout({ modal, children }: LayoutProps) {
  return (
    <div className="flex">
      {modal}
      <UserProvider>
        <Sidebar />
      </UserProvider>
      <div className="w-full ml-[200px] lg:ml-[68px]">
        <main className="mx-auto relative w-[960px] md:w-[640px] sm:w-[320px]">
          <UserProvider showNav={true}>{children}</UserProvider>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
