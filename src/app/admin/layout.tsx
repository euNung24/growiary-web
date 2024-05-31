import { ReactNode } from 'react';
import AuthUserProvider from '@/components/providers/AuthUserProvider';

export default function asLayout({ children }: { children: ReactNode }) {
  return <AuthUserProvider>{children}</AuthUserProvider>;
}
