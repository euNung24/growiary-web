import { ReactNode } from 'react';
import Link from 'next/link';
import LoginDialog from '@/shared/components/LoginDialog';
import useProfileContext from '@/shared/hooks/useProfileContext';

type LinkOrLoginProps = {
  href: string;
  children: ReactNode;
  className?: string;
  handleClick?: () => void;
};

const LinkOrLogin = ({ href, children, className, handleClick }: LinkOrLoginProps) => {
  const { profile } = useProfileContext();

  return profile ? (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  ) : (
    <LoginDialog>{children}</LoginDialog>
  );
};

export default LinkOrLogin;
