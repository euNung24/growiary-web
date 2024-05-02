import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function asLayout({ modal, children }: LayoutProps) {
  return (
    <div className="flex">
      {modal}
      <Sidebar />
      <main className="flex flex-col mx-auto max-w-[960px] my-[72px]">{children}</main>
    </div>
  );
}
