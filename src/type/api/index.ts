'use client';

import { ApiSuccessResponse } from '@/types';
import { ChallengeType } from '@/challenge/type';
import withTokenGet from '@/shared/apis/withToken';

const challengeApiUrl = process.env.NEXT_PUBLIC_API + '/challenge';

export const getUserBadge = async () =>
  withTokenGet(challengeApiUrl) as Promise<ApiSuccessResponse<ChallengeType>>;
