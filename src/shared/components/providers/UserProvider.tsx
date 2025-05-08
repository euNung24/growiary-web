'use client';

import useGetProfile from '@/profile/hooks/useGetProfile';
import { cn } from '@/shared/utils/cn';
import { PropsWithChildren, useEffect } from 'react';

const UserProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetProfile();

  useEffect(() => {
    if (performance.getEntriesByName('landing-to-main-start').length > 0) {
      performance.mark('landing-to-main-end');
      performance.measure(
        'LandingToMain',
        'landing-to-main-start',
        'landing-to-main-end',
      );
    }
  }, []);

  return <div className={cn('h-full', !data ? 'mt-0' : 'pt-[72px]')}>{children}</div>;
};

export default UserProvider;
