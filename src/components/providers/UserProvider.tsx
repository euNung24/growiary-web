'use client';

import useGetProfile from '@/hooks/profile/useGetProfile';
import { cn } from '@/lib/utils';
import { UserState } from '@/store/userStore';
import { redirect } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const UserProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetProfile();
  const userState = useRecoilValue(UserState);

  useEffect(() => {
    if (!userState.hasVisited && !data) {
      redirect('/landing');
    }
  }, [data?.userId]);

  return <div className={cn('h-full', !data ? 'mt-0' : 'pt-[72px]')}>{children}</div>;
};

export default UserProvider;
