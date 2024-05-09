'use client';

import { createContext, ReactNode } from 'react';

import { ProfileType } from '@/types/profileTypes';
import { cn } from '@/lib/utils';
import LoginDialog from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import useGetProfile from '@/hooks/profile/useGetProfile';

export const UserContext = createContext<{ profile: ProfileType | undefined }>({
  profile: {} as ProfileType,
});

type UserProvider = {
  children: ReactNode;
  showNav?: boolean;
};
const UserProvider = ({ children, showNav = false }: UserProvider) => {
  const profile = useGetProfile();

  return (
    <UserContext.Provider
      value={{ profile: !profile || !Object.keys(profile).length ? undefined : profile }}
    >
      {(!profile || !Object.keys(profile).length) && showNav ? (
        <div className="max-w-[960px] space-y-[96px] mb-[72px] mx-auto mb-[72px]">
          {/* profile = 'hidden' */}
          <div className={cn('fixed inset-x-0 top-0 ml-[200px] lg:ml-[68px]')}>
            <div className="w-[960px] md:w-[640px] sm:w-[320px] py-[23px] mx-auto text-end bg-white-0 pl-2.5">
              <LoginDialog>
                <Button className="bg-gray-50 border-0" size="sm" variant="outlineGray">
                  시작하기
                </Button>
              </LoginDialog>
            </div>
          </div>
          {children}
        </div>
      ) : (
        <div className="mx-2.5 mt-[83px]">{children}</div>
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;
