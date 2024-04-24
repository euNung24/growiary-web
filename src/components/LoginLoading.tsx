'use client';

import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import crypto from 'crypto-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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

  const key = searchParams.get('key') ?? '';
  const value = decrypt(key) ?? '';

  const accessToken = JSON.parse(value).accessToken;
  const refreshToken = JSON.parse(value).refreshToken;

  useEffect(() => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    push('/');
  }, []);

  return <>Loading</>;
};

export default LoginLoading;
