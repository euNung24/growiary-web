import withToken from '@/apis/withToken';
import { ApiSuccessResponse } from '@/types';
import { UsersType } from '@/types/admin/usersTypes';

const usersApiUrl = process.env.NEXT_PUBLIC_API + '/admin/user';
export const getAllUsers = () =>
  withToken(usersApiUrl + '/all') as Promise<ApiSuccessResponse<UsersType[]>>;
