'use client';

import { UserState } from '@/store/userStore';
import { useRecoilValue } from 'recoil';

const useProfileContext = () => {
  const { profile } = useRecoilValue(UserState);

  return {
    isLogin: profile ? 'LOGIN' : 'NOT_LOGIN',
    profile,
    titleBadge: profile?.titleBadge || 'first',
  };
};

export default useProfileContext;
