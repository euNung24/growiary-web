'use client';

import { ApiSuccessResponse } from '@/types';
import { ChallengeType } from '@/types/challengeTypes';
import { withTokenGet } from '@/apis/withToken';

const challengeApiUrl = process.env.NEXT_PUBLIC_API + '/challenge';

export const getUserBadge = async () =>
  withTokenGet(challengeApiUrl) as Promise<ApiSuccessResponse<ChallengeType>>;
