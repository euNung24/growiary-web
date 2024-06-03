import { decrypt, encrypt } from '@/components/LoginLoading';
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

export const getNewAccessToken = async (error: Error) => {
  if (error.message === 'Expired token') {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
        method: 'POST',
        headers: {},
        body: JSON.stringify({
          key: encrypt(getCookie('refreshToken')),
        }),
      });
      const data = await res.json();
      const accessToken = decrypt(data.key.accessToken) ?? '';
      Cookies.set('accessToken', accessToken);
    } catch {
      // alert('토큰이 만료되었습니다. 다시 로그인 해주세요.');
      return;
    }
  }
};

export const UnauthorizedError = async (error: Error) => {
  if (error.message === 'Unauthorized') {
    alert('관리자만 접근가능합니다.');
  }
};
