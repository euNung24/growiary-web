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
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const profile = useGetProfile();
  const userBadgeInfo = useGetUserBadgeInfo();
  const [titleBadge, setTitleBadge] = useState<Partial<keyof typeof BADGE_INFO>>('first');

  useEffect(() => {
    if (!userBadgeInfo) return;
    setTitleBadge(userBadgeInfo.data?.titleBadge || 'first');
  }, [userBadgeInfo]);

  return (
    <UserContext.Provider
      value={{
        profile:
          !profile || !Object.keys(profile).length
            ? undefined
            : { ...profile, nickname: profile.nickname || profile.email.split('@')[0] },
        titleBadge: titleBadge || 'first',
        setTitleBadge,
      }}
    >
      <>
        {(!profile || !Object.keys(profile).length) &&
          !['/history', '/report'].includes(pathname) && (
            <div className="max-w-[960px] space-y-[96px] mb-[72px] mx-auto mb-[72px]">
              {/* profile = 'hidden' */}
              <div
                className={cn(
                  'fixed inset-x-0 top-0 ml-[200px] lg:ml-[68px]  bg-white-0 z-10',
                )}
              >
                <div className="w-[960px] md:w-[640px] sm:w-[320px] py-[23px] mx-auto text-end bg-white-0 pl-2.5">
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
          {profile && children}
        </div>
      </>
    </UserContext.Provider>
  );
};

export default UserProvider;
