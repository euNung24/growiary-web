import { ReactNode } from 'react';
import Link from 'next/link';
import LoginDialog from '@/components/LoginDialog';
import { tracking } from '@/utils/mixPanel';
import { menu } from '@/utils';

type LinkOrLoginProps = {
  href: string;
  children: ReactNode;
  isLogin: boolean;
  className?: string;
};
const LinkOrLogin = ({ href, children, className, isLogin }: LinkOrLoginProps) => {
  return isLogin ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <LoginDialog>{children}</LoginDialog>
  );
};

export default LinkOrLogin;
