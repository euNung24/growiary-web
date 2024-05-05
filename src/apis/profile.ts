import { ProfileType } from '@/types/profileTypes';
import { getCookie } from '@/utils';

const profileApiUrl = process.env.NEXT_PUBLIC_API + '/profile';

export const getProfile = async (): Promise<ProfileType | undefined> => {
  const accessToken = getCookie('accessToken');
  if (!accessToken) return;

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
