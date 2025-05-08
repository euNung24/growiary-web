import withToken from '@/shared/apis/withToken';
import { ApiSuccessResponse } from '@/shared/types';
import { UsersType } from '@/admin/type';

const usersApiUrl = process.env.NEXT_PUBLIC_API + '/admin/user';
export const getAllUsers = () =>
  withToken(usersApiUrl + '/all') as Promise<ApiSuccessResponse<UsersType[]>>;
