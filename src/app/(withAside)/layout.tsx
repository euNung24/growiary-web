import Sidebar from '@/shared/components/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/shared/components/ui/toaster';
import ServerProfile from '@/shared/components/server/ServerProfile';
import DetailLayout from '@/app/(withAside)/detailLayout';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function asLayout({ modal, children }: LayoutProps) {
  return (
    <>
      {modal}
      <ServerProfile>
        <Sidebar />
        <DetailLayout>{children}</DetailLayout>
      </ServerProfile>
      <Toaster />
    </>
  );
}
