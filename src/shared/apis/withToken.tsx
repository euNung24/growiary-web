import { handleError } from '@/shared/apis/token/client';
import { ApiSuccessResponse } from '@/shared/types';
import Cookies from 'js-cookie';

type WithTokenType<T> = {
  body?: T;
  abortController?: AbortController | null;
};

async function withToken<T, V>(
  url: string,
  { body, abortController }: WithTokenType<V> = {},
): Promise<ApiSuccessResponse<T> | undefined> {
  const request = async () => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) return;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      signal: abortController?.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const res = await response.json();
        throw new Error(res.message);
      }
    }
    return response.json();
  };

  try {
    return await request();
  } catch (error) {
    await handleError(error, request);
  }
}

export async function withTokenGet<T, V>(
  url: string,
  { body }: WithTokenType<V> = {},
): Promise<ApiSuccessResponse<T> | undefined> {
  const request = async () => {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) return {};

    const response = await fetch(url, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
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
    return response.json();
  };

  try {
    return await request();
  } catch (error) {
    await handleError(error, request);
  }
}

export default withToken;
