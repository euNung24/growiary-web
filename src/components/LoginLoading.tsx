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
import { useRecoilState } from 'recoil';
import { PostState } from '@/store/postStore';
import { createPost } from '@/apis/post';
import { ReqPostType } from '@/types/postTypes';
import { UserState } from '@/store/userStore';
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
  const [firstPost, setFirstPost] = useRecoilState(PostState);
  const [userState, setUserState] = useRecoilState(UserState);

  const key = searchParams.get('key') ?? '';
  const value = decrypt(key) ?? '';

  const accessToken = JSON.parse(value).accessToken;
  const refreshToken = JSON.parse(value).refreshToken;

  const createPostByPostValue = async () =>
    await createPost(firstPost).then(res => {
      console.log('Success Create First Post');
      return res;
    });

  useEffect(() => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    setIsLogin(true);
    console.log(userState);

    if (isLogin && profile && !Object.keys(profile).length) {
      queryClient.invalidateQueries({ queryKey: ['profile'] });

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
          setUserState(v => ({
            ...v,
            isAdminLogin: false,
          }));
        } else {
          push('/');
        }
      }
    }
  }, [isLogin, profile]);

  return <>Loading</>;
};

export default LoginLoading;
