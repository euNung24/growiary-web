import { handleError } from '@/shared/apis/token/server';
import { cookies } from 'next/headers';

const createServerFetcher =
  (api: string, config?: RequestInit) => async (token?: string) => {
    const accessToken = token || cookies().get('accessToken')?.value;

    if (!accessToken) return null;

    try {
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
    } catch (error) {
      return await handleError(error, createServerFetcher(api, config));
    }
  };

export const fetchOnServer =
  <TServer>(api: string, config?: RequestInit) =>
  (): Promise<TServer> =>
    createServerFetcher(api, config)();
