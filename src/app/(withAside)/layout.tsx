import Sidebar from '@/shared/views/common/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import ServerProfile from '@/components/server/ServerProfile';
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
