'use client';

import { ApiSuccessResponse } from '@/shared/types/response';
import { withTokenGet } from '@/shared/utils/withToken';

import { ChallengeType } from '@/user/features/challenge/types/challenge';

const challengeApiUrl = process.env.NEXT_PUBLIC_API + '/challenge';

export const getUserBadge = async () =>
  withTokenGet(challengeApiUrl) as Promise<ApiSuccessResponse<ChallengeType>>;
