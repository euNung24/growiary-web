'use client';

import useGetProfile from '@/shared/hooks/useGetProfile';
import { PropsWithChildren, useEffect } from 'react';

const UserLayoutWrapper = ({ children }: PropsWithChildren) => {
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

  return (
    <div
      data-login={!!data}
      className="h-full data-[login=false]:mt-0 data-[login=true]:pt-[72px]"
    >
      {children}
    </div>
  );
};

export default UserLayoutWrapper;
