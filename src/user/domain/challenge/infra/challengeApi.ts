'use client';

import { ApiSuccessResponse } from '@/shared/types';
import { withTokenGet } from '@/shared/apis/withToken';

import { ChallengeType } from '@user/challenge/models/challenge';

const challengeApiUrl = process.env.NEXT_PUBLIC_API + '/challenge';

export const getUserBadge = async () =>
  withTokenGet(challengeApiUrl) as Promise<ApiSuccessResponse<ChallengeType>>;
