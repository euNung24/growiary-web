import { decrypt, encrypt } from '@/components/LoginLoading';
import { SERVER_ERROR } from '@/utils/error';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getNewAccessToken = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      key: encrypt(cookies().get('refreshToken')?.value ?? ''),
    }),
  });

  if (!res.ok || res.status === 400) {
    return;
  }

  const data = await res.json();
  const accessToken = decrypt(data.key) ?? '';

  return accessToken;
};

export const handleError = async (error: unknown, retry: () => Promise<unknown>) => {
  if (error instanceof Error) {
    let errorType: keyof typeof SERVER_ERROR | undefined;

    switch (error.message) {
      case SERVER_ERROR.EXPIRED_TOKEN: {
        const accessToken = await getNewAccessToken();

        if (accessToken) {
          return await retry();
        }
        errorType = 'EXPIRED_TOKEN';
        break;
      }
      case SERVER_ERROR.INVALID_TOKEN:
        errorType = 'INVALID_TOKEN';

        break;
      case SERVER_ERROR.ONLY_ADMIN_ACCESS: {
        errorType = 'ONLY_ADMIN_ACCESS';

        return redirect('/');
      }
      default: {
        throw error;
      }
    }

    return redirect(`/login?error=${errorType || error.name}`);
  } else {
    throw error;
  }
};
