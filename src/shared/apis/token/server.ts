import { decrypt, encrypt } from '@/user/features/login/components/LoginLoading';
import { SERVER_ERROR } from '@/shared/constants/error';
import { cookies } from 'next/headers';

const getNewAccessToken = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      key: encrypt(cookies().get('refreshToken')?.value ?? ''),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const message = data.message;
    throw new Error(message);
  }

  const accessToken = decrypt(data.key) ?? '';

  return accessToken;
};

export const handleError = async (
  error: unknown,
  retry: (token?: string) => Promise<unknown>,
) => {
  if (error instanceof Error) {
    let errorType: keyof typeof SERVER_ERROR | undefined;

    switch (error.message) {
      case SERVER_ERROR.EXPIRED_TOKEN: {
        try {
          const accessToken = await getNewAccessToken();

          if (accessToken) {
            return await retry(accessToken);
          }
        } catch {
          errorType = 'EXPIRED_TOKEN';
          throw new Error(errorType);
        }

        break;
      }
      case SERVER_ERROR.INVALID_TOKEN:
        errorType = 'INVALID_TOKEN';

        throw new Error(errorType);
      case SERVER_ERROR.ONLY_ADMIN_ACCESS: {
        errorType = 'ONLY_ADMIN_ACCESS';

        throw new Error(errorType);
      }
      default: {
        throw error;
      }
    }
  } else {
    throw error;
  }
};
