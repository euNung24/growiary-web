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
import LoginDialog from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import useGetProfile from '@/hooks/profile/useGetProfile';
import useGetUserBadgeInfo from '@/hooks/challenge/useGetUserBadgeInfo';
import { BADGE_INFO } from '@/utils/challenge';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { UserState } from '@/store/userStore';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

export const UserContext = createContext<{
  profile?: ProfileType;
  titleBadge?: Partial<keyof typeof BADGE_INFO>;
  setTitleBadge: Dispatch<SetStateAction<Partial<keyof typeof BADGE_INFO>>>;
}>({
  profile: {} as ProfileType,
  titleBadge: 'first',
  setTitleBadge: () => {},
});

type UserProvider = {
  children: ReactNode;
};
const UserProvider = ({ children }: UserProvider) => {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, isError } = useGetProfile();
  const userBadgeInfo = useGetUserBadgeInfo();
  const [titleBadge, setTitleBadge] = useState<Partial<keyof typeof BADGE_INFO>>('first');
  const [isClient, setIsClient] = useState(false);
  const [userState, setUserState] = useRecoilState(UserState);

  useEffect(() => {
    if (!userBadgeInfo) return;
    setTitleBadge(userBadgeInfo.data?.titleBadge || 'first');
  }, [userBadgeInfo]);

  useEffect(() => {
    if (isError) {
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    }
  }, [isError]);

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
        <>
          {(!profile || !Object.keys(profile).length) &&
            !['/history'].includes(pathname) && (
              <div
                className={cn(
                  'fixed inset-x-0 top-0 ml-[200px] lg:ml-[68px] bg-white-0 z-10',
                )}
              >
                <div className="flex justify-end py-[23px] mx-auto bg-white-0">
                  <div className="flex-[0_0_960px] md:flex-[0_0_640px] sm:flex-[0_0_320px] mx-auto px-2.5 text-end">
                    <LoginDialog>
                      <Button
                        className="bg-gray-50 border-0 focus:border-transparent focus:border-0"
                        size="sm"
                        variant="outlineGray"
                      >
                        시작하기
                      </Button>
                    </LoginDialog>
                  </div>
                </div>
              </div>
            )}
          <div
            className={cn(
              !profile || !Object.keys(profile).length
                ? 'mt-[86px] mb-[72px]'
                : 'mt-[72px]',
            )}
          >
            {children}
          </div>
        </>
      </UserContext.Provider>
    )
  );
};

export default UserProvider;
