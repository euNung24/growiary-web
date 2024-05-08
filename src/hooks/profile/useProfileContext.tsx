'use client';
import { useContext } from 'react';
import { UserContext } from '@/components/providers/UserProvider';

const useProfileContext = () => {
  return useContext(UserContext);
};

export default useProfileContext;
