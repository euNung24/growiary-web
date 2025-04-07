import { decrypt, encrypt } from '@/components/LoginLoading';
import { queryClient } from '@/components/providers/ReactQueryProvider';
import { getCookie } from '@/utils/index';
import Cookies from 'js-cookie';

export const setError = async (response: Response) => {
  const { message } = await response.json();
  if (response.status === 400 && message === '만료된 토큰입니다.') {
    return new Error('Expired token');
  } else if (response.status === 400 && message === '유효하지 않은 토큰입니다.') {
    return new Error('Expired token');
  } else if (response.status === 400 && message === '관리자만 접근 가능합니다.') {
    return new Error('Unauthorized');
  }
  return new Error('Network response was not ok');
};

let refreshingTokenPromise: Promise<string | void> | null = null;

export const getNewAccessToken = async () => {
  if (refreshingTokenPromise) return refreshingTokenPromise;

  refreshingTokenPromise = (async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        key: encrypt(getCookie('refreshToken')),
      }),
    });

    if (!res.ok || res.status === 400) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      queryClient.clear();
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      refreshingTokenPromise = null;
      window.location.reload();
      return;
    }

    const data = await res.json();
    const accessToken = decrypt(data.key) ?? '';
    Cookies.set('accessToken', accessToken);
    refreshingTokenPromise = null;

    return accessToken;
  })();

  return refreshingTokenPromise;
};

export const UnauthorizedError = async (error: Error) => {
  if (error.message === 'Unauthorized') {
    alert('관리자만 접근가능합니다.');
  }
};
