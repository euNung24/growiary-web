import withToken from '@/shared/apis/withToken';
import { ApiSuccessResponse } from '@/shared/types';
import { ResPostType } from '@/domain/post/types';

const usersApiUrl = process.env.NEXT_PUBLIC_API + '/admin/post';
export const getPostsByUser = () =>
  withToken(usersApiUrl + '/all') as Promise<
    ApiSuccessResponse<{ [key: string]: ResPostType[] }>
  >;
