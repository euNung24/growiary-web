import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';
import { ResPostType } from '@user/post/models/post';

const usersApiUrl = process.env.NEXT_PUBLIC_API + '/admin/post';
export const getPostsByUser = () =>
  withToken(usersApiUrl + '/all') as Promise<
    ApiSuccessResponse<{ [key: string]: ResPostType[] }>
  >;
