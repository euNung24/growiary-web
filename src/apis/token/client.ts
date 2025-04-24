import { decrypt, encrypt } from '@/components/LoginLoading';
import { browserQueryClient } from '@/components/providers/ReactQueryProvider';
import Cookies from 'js-cookie';

let refreshingTokenPromise: Promise<string | void> | null = null;

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

    if (!res.ok || res.status === 400) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      browserQueryClient?.clear();
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

const handleInvalidToken = async () => {
  if (refreshingTokenPromise) return refreshingTokenPromise;

  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  browserQueryClient?.clear();
  alert('유효하지 않은 토큰입니다. 다시 로그인해주세요.');
  refreshingTokenPromise = null;
  window.location.href = '/landing';
};

export const UnauthorizedError = async (error: Error) => {
  if (error.message === 'Unauthorized') {
    alert('관리자만 접근가능합니다.');
  }
};

export const handleError = async (error: Error) => {
  switch (error.message) {
    case 'Expired token': {
      await getNewAccessToken();

      return { shouldRetry: true };
    }
    case 'Invalid token': {
      await handleInvalidToken();
      break;
    }
    default: {
      throw error;
    }
  }
};
