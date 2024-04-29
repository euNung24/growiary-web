/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReqPostType, ResPostType, UpdatePostType } from '@/types/postTypes';
import { getCookie } from '@/utils';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

export const getAllPosts = async (): Promise<ApiSuccessResponse<ResPostType[]>> => {
  const accessToken = getCookie('accessToken');

  const response = await fetch(postApiUrl + '/all', {
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

export const findPost = async (id: number): Promise<ApiSuccessResponse<ResPostType>> => {
  const accessToken = getCookie('accessToken');

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
): Promise<ApiSuccessResponse<ResPostType>> => {
  const accessToken = getCookie('accessToken');

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
): Promise<ApiSuccessResponse<ResPostType>> => {
  const accessToken = getCookie('accessToken');

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
