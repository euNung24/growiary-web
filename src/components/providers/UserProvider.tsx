'use client';

import useGetProfile from '@/hooks/profile/useGetProfile';
import { useAvoidHydration } from '@/hooks/useAvoidHydration';
import { cn } from '@/lib/utils';
import { UserState } from '@/store/userStore';
import { redirect } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const UserProvider = ({ children }: PropsWithChildren) => {
  const { data } = useGetProfile();
  const [userState, setUserState] = useRecoilState(UserState);
  const isClient = useAvoidHydration();

  useEffect(() => {
    if (!isClient) return;

    if (!userState.hasVisited && !data) {
      redirect('/landing');
    }
  }, [isClient, data?.userId]);

  useEffect(() => {
    if (!data) return;

    setUserState(v => ({ ...v, profile: data }));
  }, [data]);

  if (!isClient) {
    return;
  }

  return (
    <div className={cn('h-full', !userState.profile ? 'mt-0' : 'pt-[72px]')}>
      {children}
    </div>
  );
};

export default UserProvider;
