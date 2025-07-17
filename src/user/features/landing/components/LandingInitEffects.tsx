'use client';

import { useEffect } from 'react';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { browserQueryClient } from '@/shared/providers/ReactQueryProvider';
import { getProfile } from '@/shared/apis/profile/client';
import { getAllTopics } from '@user/topic/apis/topicApi.client';
import { topicKeys } from '@user/topic/queries/topicKeys';

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

    browserQueryClient?.prefetchQuery({
      queryKey: topicKeys.lists(),
      queryFn: getAllTopics,
      staleTime: 60 * 60 * 1000,
    });
  }, []);

  return null;
};

export default LandingInitEffects;
