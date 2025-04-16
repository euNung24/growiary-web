import { handleError } from '@/utils/api';
import { getCookie } from '@/utils';
import { ApiSuccessResponse } from '@/types';
import { setError } from '@/utils/error';

type WithTokenType<T> = {
  body?: T;
  abortController?: AbortController | null;
};

async function withToken<T, V>(
  url: string,
  { body, abortController }: WithTokenType<V> = {},
): Promise<ApiSuccessResponse<T> | undefined> {
  const request = async () => {
    const accessToken = getCookie('accessToken');

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
      throw await setError(response);
    }

    return response.json();
  };

  try {
    return await request();
  } catch (error) {
    if (error instanceof Error) {
      await handleError(error);

      return await request();
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
}

export async function withTokenGet<T, V>(
  url: string,
  { body }: WithTokenType<V> = {},
): Promise<ApiSuccessResponse<T> | undefined> {
  const request = async () => {
    const accessToken = getCookie('accessToken');

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
      throw await setError(response);
    }

    return response.json();
  };

  try {
    return await request();
  } catch (error) {
    if (error instanceof Error) {
      await handleError(error);

      return await request();
    } else {
      throw error;
    }
  }
}

export default withToken;
