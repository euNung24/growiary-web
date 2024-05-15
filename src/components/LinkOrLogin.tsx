import { ReactNode } from 'react';
import Link from 'next/link';
import LoginDialog from '@/components/LoginDialog';

type LinkOrLoginProps = {
  href: string;
  children: ReactNode;
  isLogin: boolean;
  className?: string;
  handleClick?: () => void;
};
const LinkOrLogin = ({
  href,
  children,
  className,
  isLogin,
  handleClick,
}: LinkOrLoginProps) => {
  return isLogin ? (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  ) : (
    <LoginDialog>{children}</LoginDialog>
  );
};

export default LinkOrLogin;
