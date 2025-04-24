import { ProfileType } from '@/types/profileTypes';
import withToken from '@/apis/withToken';
import { BadgeKeyType } from '@/types/challengeTypes';
import { ApiSuccessResponse } from '@/types';
import { handleError } from '@/apis/token/client';
import { setError } from '@/utils/error';
import Cookies from 'js-cookie';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType | undefined> => {
  const request = async () => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) return;

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
    if (error instanceof Error) {
      const result = await handleError(error);

      if (result?.shouldRetry) {
        return await request();
      }
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

export const updateUserTitleBadge = (badgeKey: BadgeKeyType) =>
  withToken(profileApiUrl + '/title-badge', {
    body: {
      titleBadge: badgeKey,
    },
  }) as Promise<ApiSuccessResponse<BadgeKeyType>>;
