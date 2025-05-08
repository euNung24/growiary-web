'use client';

import { ApiSuccessResponse } from '@/shared/types';
import { ChallengeType } from '@/user/domain/challenge/type';
import { withTokenGet } from '@/shared/apis/withToken';

const challengeApiUrl = process.env.NEXT_PUBLIC_API + '/challenge';

export const getUserBadge = async () =>
  withTokenGet(challengeApiUrl) as Promise<ApiSuccessResponse<ChallengeType>>;
