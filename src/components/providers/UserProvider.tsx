'use client';

import useGetProfile from '@/hooks/profile/useGetProfile';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const UserProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetProfile();

  return <div className={cn('h-full', !data ? 'mt-0' : 'pt-[72px]')}>{children}</div>;
};

export default UserProvider;
