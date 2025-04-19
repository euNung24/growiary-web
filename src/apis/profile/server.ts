import { ProfileType } from '@/types/profileTypes';
import { setError } from '@/utils/error';
import { cookies } from 'next/headers';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType | null> => {
  const request = async () => {
    const accessToken = cookies().get('accessToken')?.value;

    if (!accessToken) return null;

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
      //   await handleError(error);
      //   return await request();
      return null;
    } else {
      throw error;
    }
  }
};
