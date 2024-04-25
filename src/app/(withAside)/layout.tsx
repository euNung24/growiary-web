import Sidebar from '@/views/common/Sidebar';
import { ReactNode } from 'react';

export default async function asLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex flex-col mx-auto max-w-[960px] my-[72px]">{children}</main>
    </div>
  );
}
