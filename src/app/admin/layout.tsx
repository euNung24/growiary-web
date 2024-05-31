import { ReactNode } from 'react';
import AuthUserProvider from '@/components/providers/AuthUserProvider';

export default function asLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full mx-5 pt-8">
      <AuthUserProvider>{children}</AuthUserProvider>
      <footer className="h-[30px] flex justify-center mt-auto">
        <a href="https://growiary.com/" target="_black" rel="noopener noreferrer">
          <p className="text-xs text-gray-600 hover:text-blue-700">ⓒ Growiary</p>
        </a>
      </footer>
    </div>
  );
}
