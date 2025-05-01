'use client';

import { useEffect } from 'react';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const LandingTracking = () => {
  useEffect(() => {
    tracking(`랜딩 페이지`);
    sendGAEvent({ event: '랜딩 페이지' });
  }, []);

  return null;
};

export default LandingTracking;
