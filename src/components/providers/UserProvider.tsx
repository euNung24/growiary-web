'use client';

import useGetProfile from '@/hooks/profile/useGetProfile';
import { cn } from '@/lib/utils';
import { PropsWithChildren, useEffect } from 'react';

const UserProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetProfile();

  useEffect(() => {
    performance.mark('landing-to-main-end');
    performance.measure('LandingToMain', 'landing-to-main-start', 'landing-to-main-end');
  }, []);

  return <div className={cn('h-full', !data ? 'mt-0' : 'pt-[72px]')}>{children}</div>;
};

export default UserProvider;
