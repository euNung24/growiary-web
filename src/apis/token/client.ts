import { decrypt, encrypt } from '@/components/LoginLoading';
import { browserQueryClient } from '@/components/providers/ReactQueryProvider';
import Cookies from 'js-cookie';

let refreshingTokenPromise: Promise<string | void> | null = null;

const clearAuthCookies = () => {
  refreshingTokenPromise = null;

  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  browserQueryClient?.clear();
};

const getNewAccessToken = async () => {
  if (refreshingTokenPromise) return refreshingTokenPromise;

  refreshingTokenPromise = (async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        key: encrypt(Cookies.get('refreshToken') ?? ''),
      }),
    });

    if (!res.ok) {
      throw new Error('토큰을 새로 발급할 수 없습니다.');
    }

    const data = await res.json();
    const accessToken = decrypt(data.key) ?? '';
    Cookies.set('accessToken', accessToken);
    refreshingTokenPromise = null;

    return accessToken;
  })();

  return refreshingTokenPromise;
};

const handleInvalidToken = () => {
  if (refreshingTokenPromise) return refreshingTokenPromise;

  clearAuthCookies();
  alert('유효하지 않은 토큰입니다. 다시 로그인해주세요.');
  window.location.href = '/landing';
};

export const handleError = async (error: unknown, retry: () => Promise<unknown>) => {
  if (error instanceof Error) {
    switch (error.message) {
      case '만료된 토큰입니다.': {
        try {
          const newAccessToken = await getNewAccessToken();

          if (newAccessToken) {
            return await retry();
          }
        } catch {
          clearAuthCookies();
          alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
          window.location.reload();
          throw new Error('Redirected due to invalid token');
        }
        break;
      }
      case '유효하지 않은 토큰입니다.':
        handleInvalidToken();

        break;
      case '관리자만 접근 가능합니다.':
        alert('관리자만 접근가능합니다.');

        break;
      default:
        throw error;
    }
    return;
  }
  throw new Error('Network response was not ok');
};
