import withToken from '@/shared/apis/withToken';
import { ApiSuccessResponse } from '@/shared/types';

import { ReqPostType, ResPostType, UpdatePostType } from '@user/post/models/post';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

export const getAllPosts = () =>
  withToken(postApiUrl + '/all') as Promise<ApiSuccessResponse<ResPostType[]>>;

export const findPost = (id: string) =>
  withToken(postApiUrl + '/find', { body: { id } }) as Promise<
    ApiSuccessResponse<ResPostType>
  >;

export const createPost = (postData: ReqPostType) =>
  withToken(postApiUrl + '/create', { body: postData }) as Promise<
    ApiSuccessResponse<ResPostType[]>
  >;

export const updatePost = (postData: UpdatePostType) =>
  withToken(postApiUrl + '/update', { body: postData }) as Promise<
    ApiSuccessResponse<ResPostType>
  >;

export const deletePost = (id: string) =>
  withToken(postApiUrl + '/update', { body: { status: false, id } }) as Promise<
    ApiSuccessResponse<ResPostType>
  >;
