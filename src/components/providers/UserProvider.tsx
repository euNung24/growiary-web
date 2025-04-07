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
import { useRecoilState } from 'recoil';
import { UserState } from '@/store/userStore';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

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

type UserProvider = {
  children: ReactNode;
};
const UserProvider = ({ children }: UserProvider) => {
  const router = useRouter();
  const { data: profile, isError } = useGetProfile();
  const userBadgeInfo = useGetUserBadgeInfo();
  const [titleBadge, setTitleBadge] = useState<Partial<keyof typeof BADGE_INFO>>('first');
  const [isClient, setIsClient] = useState(false);
  const [userState, setUserState] = useRecoilState(UserState);

  useEffect(() => {
    if (!userBadgeInfo) return;
    setTitleBadge(userBadgeInfo.data?.titleBadge || 'first');
  }, [userBadgeInfo]);

  useEffect(() => {
    if (
      isClient &&
      (!profile || !Object.keys(profile).length) &&
      userState.isNotLoginAndFirst
    ) {
      router.push('/landing');
      tracking('랜딩 페이지');
      sendGAEvent({ event: '랜딩 페이지' });
    } else if (profile && Object.keys(profile).length) {
      setUserState(v => ({ ...v, isNotLoginAndFirst: false }));
    }
  }, [profile]);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  return (
    isClient &&
    (isError || !userState.isNotLoginAndFirst) && (
      <UserContext.Provider
        value={{
          isLogin: !profile ? '' : Object.keys(profile).length ? 'LOGIN' : 'NOT_LOGIN',
          profile:
            !profile || !Object.keys(profile).length
              ? undefined
              : {
                  ...profile,
                  nickname: profile.nickname || profile.email?.split('@')[0],
                },
          titleBadge: titleBadge || 'first',
          setTitleBadge,
        }}
      >
        <div
          className={cn(
            'h-full',
            !profile || !Object.keys(profile).length ? 'mt-0' : 'pt-[72px]',
          )}
        >
          {children}
        </div>
      </UserContext.Provider>
    )
  );
};

export default UserProvider;
