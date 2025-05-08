'use client';

import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import crypto from 'crypto-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PostState } from '@/domain/user/post/store';
import { createPost } from '@/domain/user/post/api';
import { ReqPostType } from '@/domain/user/post/types';
import { UserState } from '@/shared/store/userStore';
import useGetProfile from '@/domain/profile/hooks/useGetProfile';
import { ALERT_ERROR_MESSAGE } from '@/shared/utils/error';
import LoginDialog from '@/shared/components/LoginDialog';
import { useAvoidHydration } from '@/shared/hooks/useAvoidHydration';
import { useQueryClient } from '@tanstack/react-query';

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
  const { data: profile, refetch } = useGetProfile();
  const [firstPost, setFirstPost] = useRecoilState(PostState);
  const isClient = useAvoidHydration();
  const queryClient = useQueryClient();
  const userState = useRecoilValue(UserState);

  const key = searchParams.get('key') ?? '';
  const value = decrypt(key) ?? '';
  const accessToken = value ? JSON.parse(value).accessToken : '';
  const refreshToken = value ? JSON.parse(value).refreshToken : '';

  const error = searchParams.get('error') ?? '';
  const isServerError = Object.keys(ALERT_ERROR_MESSAGE).includes(error);

  const createPostByPostValue = async () =>
    await createPost(firstPost).then(res => {
      console.log('Success Create First Post');
      return res;
    });

  useEffect(() => {
    if (!isClient) return;

    if (accessToken) {
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      refetch();
    }

    if (error) {
      alert(
        isServerError
          ? ALERT_ERROR_MESSAGE[error as keyof typeof ALERT_ERROR_MESSAGE]
          : '오류가 발생했습니다. 다시 로그인 해주세요.',
      );
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      queryClient.clear();
    }
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !profile || error) return;

    if (profile.social) {
      tracking(`SNS 로그인 ${profile.social}`);
      sendGAEvent({ event: `SNS 로그인 ${profile.social}` });
    }

    if (firstPost.title) {
      createPostByPostValue().then(res => {
        setFirstPost({} as ReqPostType);
        push(`/history/${res.data[0].id}`);
      });
    } else {
      if (userState.isAdminLogin) {
        push('/admin');
      } else {
        push('/');
      }
    }
  }, [profile, error, isClient]);

  if (!isClient) {
    return null;
  }

  if (error) {
    return <LoginDialog open />;
  }

  return <>Loading</>;
};

export default LoginLoading;
