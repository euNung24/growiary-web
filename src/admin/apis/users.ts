import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';
import { UserType } from '@admin/types/user';

const usersApiUrl = process.env.NEXT_PUBLIC_API + '/admin/user';
export const getAllUsers = () =>
  withToken(usersApiUrl + '/all') as Promise<ApiSuccessResponse<UserType[]>>;
