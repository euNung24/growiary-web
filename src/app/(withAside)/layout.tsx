import Sidebar from '@/shared/layouts/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/shared/components/ui/toaster';
import ServerProfile from '@/shared/layouts/server/ServerProfile';
import ContentLayout from '@/shared/layouts/ContentLayout';

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
        <ContentLayout>{children}</ContentLayout>
      </ServerProfile>
      <Toaster />
    </>
  );
}
