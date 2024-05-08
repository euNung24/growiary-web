import { ProfileType } from '@/types/profileTypes';
import { getCookie } from '@/utils';
import withToken from '@/apis/withToken';
import { BadgeKeyType } from '@/types/challengeTypes';
import { ApiSuccessResponse } from '@/types';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType> => {
  const accessToken = getCookie('accessToken');
  if (!accessToken) return {} as ProfileType;

  const response = await fetch(profileApiUrl, {
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

export const updateUserTitleBadge = (badgeKey: BadgeKeyType) =>
  withToken(profileApiUrl + '/title-badge', {
    body: {
      titleBadge: badgeKey,
    },
  }) as Promise<ApiSuccessResponse<BadgeKeyType>>;
