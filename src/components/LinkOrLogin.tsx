import { ReactNode } from 'react';
import Link from 'next/link';
import LoginDialog from '@/components/LoginDialog';

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
    <LoginDialog>
      <div>{children}</div>
    </LoginDialog>
  );
};

export default LinkOrLogin;
