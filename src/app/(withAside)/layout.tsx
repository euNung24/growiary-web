import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function asLayout({ modal, children }: LayoutProps) {
  return (
    <div className="flex">
      {modal}
      <Sidebar />
      <div className="w-full ml-[200px] lg:ml-[68px]">
        <main className="mx-auto relative w-[960px] md:w-[640px] sm:w-[320px]">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
