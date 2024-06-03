import { setError, UnauthorizedError } from '@/utils/api';
import { getCookie } from '@/utils';
import { ApiSuccessResponse } from '@/types';

type WithTokenType<T> = {
  body?: T;
  token?: string;
};

async function withToken<T, V>(
  url: string,
  { body, token }: WithTokenType<V> = {},
): Promise<ApiSuccessResponse<T> | undefined> {
  const accessToken = token || getCookie('accessToken');

  if (!accessToken) return;

  const response = await fetch(url, {
    method: 'POST',
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
}

export async function withTokenGet<T, V>(
  url: string,
  { body, token }: WithTokenType<V> = {},
): Promise<ApiSuccessResponse<T> | undefined> {
  const accessToken = token || getCookie('accessToken');

  if (!accessToken) return;

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
}

export default withToken;
