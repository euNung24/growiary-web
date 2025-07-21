import { decrypt, encrypt } from '@/user/features/login/components/LoginLoading';
import { browserQueryClient } from '@/shared/providers/ReactQueryProvider';
import { ALERT_ERROR_MESSAGE, SERVER_ERROR } from '@/shared/constants/error';
import Cookies from 'js-cookie';
import { ROUTES } from '@/shared/constants/routes';

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
      alert(ALERT_ERROR_MESSAGE.EXPIRED_TOKEN);
      clearAuthCookies();
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

const handleInvalidToken = () => {
  if (refreshingTokenPromise) return refreshingTokenPromise;

  alert(ALERT_ERROR_MESSAGE.INVALID_TOKEN);
  clearAuthCookies();
  window.location.href = ROUTES.landing;
};

export const handleError = async (error: unknown, retry?: () => Promise<unknown>) => {
  if (error instanceof Error) {
    switch (error.message) {
      case SERVER_ERROR.EXPIRED_TOKEN: {
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          return await retry?.();
        }
        return;
      }
      case SERVER_ERROR.INVALID_TOKEN:
        handleInvalidToken();

        return;
      case SERVER_ERROR.ONLY_ADMIN_ACCESS:
        alert(ALERT_ERROR_MESSAGE.ONLY_ADMIN_ACCESS);
        window.location.href = ROUTES.main;

        return;
      default:
        throw error;
    }
  }
  throw error;
};
