import { ProfileType } from '@/types/profileTypes';
import withToken from '@/apis/withToken';
import { BadgeKeyType } from '@/types/challengeTypes';
import { ApiSuccessResponse } from '@/types';
import { getCookie } from '@/utils';
import { getNewAccessToken, setError } from '@/utils/api';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType> => {
  const request = async () => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return {};

    const response = await fetch(profileApiUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw await setError(response);
    }

    return await response.json();
  };

  try {
    return await request();
  } catch (error) {
    if (error instanceof Error && error.message === 'Expired token') {
      await getNewAccessToken();

      return await request();
    } else {
      throw error;
    }
  }
};

export const updateUserTitleBadge = (badgeKey: BadgeKeyType) =>
  withToken(profileApiUrl + '/title-badge', {
    body: {
      titleBadge: badgeKey,
    },
  }) as Promise<ApiSuccessResponse<BadgeKeyType>>;
