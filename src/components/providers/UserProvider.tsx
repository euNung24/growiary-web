'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { ProfileType } from '@/types/profileTypes';
import { cn } from '@/lib/utils';
import useGetProfile from '@/hooks/profile/useGetProfile';
import useGetUserBadgeInfo from '@/hooks/challenge/useGetUserBadgeInfo';
import { BADGE_INFO } from '@/utils/challenge';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { UserState } from '@/store/userStore';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { useAvoidHydration } from '@/hooks/useAvoidHydration';

export const UserContext = createContext<{
  isLogin: '' | 'LOGIN' | 'NOT_LOGIN';
  profile?: ProfileType;
  titleBadge?: Partial<keyof typeof BADGE_INFO>;
  setTitleBadge: Dispatch<SetStateAction<Partial<keyof typeof BADGE_INFO>>>;
}>({
  isLogin: '',
  profile: {} as ProfileType,
  titleBadge: 'first',
  setTitleBadge: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

const getProcessedProfile = (data?: ProfileType) => {
  if (!data?.userId) return undefined;

  return {
    ...data,
    nickname: data.nickname || data.email?.split('@')[0],
  };
};

const UserProvider = ({ children }: UserProviderProps) => {
  const router = useRouter();
  const isClient = useAvoidHydration();
  const { data } = useGetProfile();
  const userBadgeInfo = useGetUserBadgeInfo();
  const userState = useRecoilValue(UserState);

  const [titleBadge, setTitleBadge] = useState<Partial<keyof typeof BADGE_INFO>>('first');

  const hasUser = !!data?.userId;
  const hasToMoveLanding = isClient && !hasUser && userState.isNotLoginAndFirst;
  const profile = getProcessedProfile(data);

  useEffect(() => {
    if (!userBadgeInfo?.data?.titleBadge) return;

    setTitleBadge(userBadgeInfo.data.titleBadge);
  }, [userBadgeInfo?.data?.titleBadge]);

  useEffect(() => {
    if (hasToMoveLanding) {
      router.push('/landing');
      tracking('랜딩 페이지');
      sendGAEvent({ event: '랜딩 페이지' });
    }
  }, [hasToMoveLanding]);

  if (!isClient || hasToMoveLanding) return null;

  return (
    <UserContext.Provider
      value={{
        isLogin: hasUser ? 'LOGIN' : 'NOT_LOGIN',
        profile,
        titleBadge,
        setTitleBadge,
      }}
    >
      <div className={cn('h-full', !hasUser ? 'mt-0' : 'pt-[72px]')}>{children}</div>
    </UserContext.Provider>
  );
};

export default UserProvider;
