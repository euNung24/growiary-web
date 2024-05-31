import { ReactNode } from 'react';
import AuthUserProvider from '@/components/providers/AuthUserProvider';
import Sidebar from '@/views/admin/Sidebar';
import Image from 'next/image';

export default function asLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex mx-5 pt-8 h-full">
      <aside>
        <Image
          src="/assets/icons/logo/square.png"
          width={30}
          height={28.29}
          alt="Growiary"
          className="m-auto mb-2"
          priority
        />
        <Sidebar />
      </aside>
      <div className="flex-1 flex flex-col mx-5">
        <div className="flex-1">
          <AuthUserProvider>{children}</AuthUserProvider>
        </div>
        <footer className="h-[30px] flex justify-center mt-auto">
          <a href="https://growiary.com/" target="_black" rel="noopener noreferrer">
            <p className="text-xs text-gray-600 hover:text-blue-700">ⓒ Growiary</p>
          </a>
        </footer>
      </div>
    </div>
  );
}
