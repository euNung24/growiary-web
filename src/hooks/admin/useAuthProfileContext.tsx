'use client';
import { useContext } from 'react';
import { AuthUserContext } from '@/components/providers/AuthUserProvider';

const useAuthProfileContext = () => {
  return useContext(AuthUserContext);
};

export default useAuthProfileContext;
