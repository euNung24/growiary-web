'use client';

import useGetProfile from '@/user/profile/hooks/useGetProfile';

const useProfileContext = () => {
  const { data } = useGetProfile();

  return {
    isLogin: data ? 'LOGIN' : 'NOT_LOGIN',
    profile: data,
    titleBadge: data?.titleBadge || 'first',
  };
};

export default useProfileContext;
