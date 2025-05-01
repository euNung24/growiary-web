import { cookies } from 'next/headers';

export const fetchOnServer = (api: string, config?: RequestInit) => async (token?: string) => {
  const accessToken = token || cookies().get('accessToken')?.value;

  if (!accessToken) return null;

  const response = await fetch(api, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    ...config,
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

  return await response.json();
};
