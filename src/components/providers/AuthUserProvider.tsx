'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { ProfileType } from '@/types/profileTypes';
import useGetProfile from '@/hooks/profile/useGetProfile';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const AuthUserContext = createContext<{
  profile?: ProfileType;
}>({
  profile: {} as ProfileType,
});

type AuthUserProvider = {
  children: ReactNode;
};
const AuthUserProvider = ({ children }: AuthUserProvider) => {
  const { data: profile, isError } = useGetProfile();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isClient && (!profile || !Object.keys(profile).length)) {
      router.push('/admin/login');
    }
  }, [profile]);

  useEffect(() => {
    if (isError) {
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      router.push('/admin/login');
    }
  }, [isError]);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  return (
    isClient &&
    profile && (
      <AuthUserContext.Provider
        value={{
          profile: !profile || !Object.keys(profile).length ? undefined : profile,
        }}
      >
        {children}
      </AuthUserContext.Provider>
    )
  );
};

export default AuthUserProvider;
