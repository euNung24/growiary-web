import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  // modal: ReactNode;
};

export default async function asLayout({ children }: LayoutProps) {
  return (
    <div className="flex">
      {/*{modal}*/}
      <Sidebar />
      <main className="mx-auto w-full my-[72px] min-w-[960px] lg:min-w-[auto]">
        {children}
      </main>
    </div>
  );
}
