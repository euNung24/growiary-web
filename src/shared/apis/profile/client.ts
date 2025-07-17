import { ProfileType } from '@/shared/types/profile';
import withToken from '@/shared/utils/withToken';
import { BadgeKeyType } from '@/user/features/challenge/constants/badges';
import { ApiSuccessResponse } from '@/shared/types/response';
import { handleError } from '@/shared/apis/token/client';
import Cookies from 'js-cookie';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType | undefined> => {
  const request = async () => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) return null;

    const response = await fetch(profileApiUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        let message = 'Unknown error';
        try {
          const res = await response.json();
          message = res.message;
        } catch (e) {
          if (e instanceof Error) {
            message = e.message;
          }
        }
        throw new Error(message);
      }
    }
    return response.json();
  };

  try {
    return await request();
  } catch (error) {
    await handleError(error, request);
  }
};

export const updateUserTitleBadge = (badgeKey: BadgeKeyType) =>
  withToken(profileApiUrl + '/title-badge', {
    body: {
      titleBadge: badgeKey,
    },
  }) as Promise<ApiSuccessResponse<BadgeKeyType>>;
