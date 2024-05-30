import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import UserProvider from '@/components/providers/UserProvider';
import DetailLayout from '@/app/(withAside)/detailLayout';

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
        <DetailLayout>{children}</DetailLayout>
      </UserProvider>
      <Toaster />
    </>
  );
}
