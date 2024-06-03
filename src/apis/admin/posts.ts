import withToken from '@/apis/withToken';
import { ApiSuccessResponse } from '@/types';
import { ResPostType } from '@/types/postTypes';

const usersApiUrl = process.env.NEXT_PUBLIC_API + '/admin/post';
export const getPostsByUser = () =>
  withToken(usersApiUrl + '/all') as Promise<
    ApiSuccessResponse<{ [key: string]: ResPostType[] }>
  >;
