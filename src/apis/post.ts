/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DailyCheckerType,
  ReqPostType,
  ResPostType,
  UpdatePostType,
} from '@/types/postTypes';
import { getCookie } from '@/utils';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

export const getAllPosts = async (token?: string) => {
  const accessToken = token || getCookie('accessToken');

  return await fetch(postApiUrl + '/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const findPost = async (
  id: number,
  token?: string,
): Promise<ApiSuccessResponse<ResPostType>> => {
  const accessToken = token || getCookie('accessToken');

  const response = await fetch(postApiUrl + '/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const createPost = async (
  postData: ReqPostType,
  token?: string,
): Promise<ApiSuccessResponse<ResPostType>> => {
  const accessToken = token || getCookie('accessToken');

  const response = await fetch(postApiUrl + '/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updatePost = async (
  postData: UpdatePostType,
  token?: string,
): Promise<ApiSuccessResponse<ResPostType>> => {
  const accessToken = token || getCookie('accessToken');

  const response = await fetch(postApiUrl + '/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getDailyCheckerPost = async (
  token?: string,
): Promise<ApiSuccessResponse<DailyCheckerType>> => {
  const accessToken = token || getCookie('accessToken');

  const response = await fetch(postApiUrl + '/continue-range', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
