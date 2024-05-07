'use client';

import { ApiSuccessResponse } from '@/types';
import { getCookie } from '@/utils';
import { ChallengeType } from '@/types/challengeTypes';

const challengeApiUrl = process.env.NEXT_PUBLIC_API + '/challenge';

export const getUserBadge = async (): Promise<ApiSuccessResponse<ChallengeType>> => {
  const accessToken = getCookie('accessToken');

  if (!accessToken) return {} as ApiSuccessResponse<ChallengeType>;

  const response = await fetch(challengeApiUrl, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
