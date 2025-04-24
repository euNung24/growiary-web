import { handleError } from '@/apis/token/server';
import { ProfileType } from '@/types/profileTypes';
import { cookies } from 'next/headers';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType | undefined> => {
  const request = async (token?: string) => {
    const accessToken = token || cookies().get('accessToken')?.value;

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
          message = await response.json();
        } catch (e) {
          if (e instanceof Error) {
            message = e.message;
          }
        }
        throw new Error(message);
      }
    }

    return await response.json();
  };

  try {
    return await request();
  } catch (error) {
    await handleError(error, request);
  }
};
