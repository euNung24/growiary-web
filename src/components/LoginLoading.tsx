'use client';

import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import crypto from 'crypto-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useGetProfile from '@/hooks/profile/useGetProfile';
import { useQueryClient } from '@tanstack/react-query';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
const secretKey = process.env.NEXT_PUBLIC_LOGIN_SECRET_KEY || '';

function encodeUrlSafe(text: string): string {
  return text.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function encrypt(text: string) {
  const encrypted = crypto.AES.encrypt(text, secretKey).toString();

  return encodeUrlSafe(encrypted);
}

export function decrypt(encryptedText: string) {
  try {
    const urlUnsafeEncrypted = encryptedText.replace(/-/g, '+').replace(/_/g, '/');
    const paddedEncrypted = urlUnsafeEncrypted + '==';
    const bytes = crypto.AES.decrypt(paddedEncrypted, secretKey);

    return bytes.toString(crypto.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);

    return null;
  }
}
const LoginLoading = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(false);
  const { profile } = useGetProfile();
  const queryClient = useQueryClient();

  const key = searchParams.get('key') ?? '';
  const value = decrypt(key) ?? '';

  const accessToken = JSON.parse(value).accessToken;
  const refreshToken = JSON.parse(value).refreshToken;

  useEffect(() => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    setIsLogin(true);

    if (isLogin && profile && !Object.keys(profile).length) {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      tracking(`SNS 로그인 ${profile.social}`);
      sendGAEvent({ event: `SNS 로그인 ${profile.social}` });
      push('/');
    }
  }, [isLogin, profile]);

  return <>Loading</>;
};

export default LoginLoading;
