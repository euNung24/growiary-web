'use client';

import { useEffect } from 'react';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { browserQueryClient } from '@/components/providers/ReactQueryProvider';
import { getProfile } from '@/apis/profile';

const LandingInitEffects = () => {
  useEffect(() => {
    tracking(`랜딩 페이지`);
    sendGAEvent({ event: '랜딩 페이지' });
  }, []);

  useEffect(() => {
    browserQueryClient?.prefetchQuery({
      queryKey: ['profile'],
      queryFn: getProfile,
      staleTime: 5 * 60 * 1000,
    });
  }, []);

  return null;
};

export default LandingInitEffects;
