import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';

import { DailyCheckerType } from '@/user/features/home/models/dailyChecker';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

export const getDailyCheckerPost = () =>
  withToken(postApiUrl + '/continue-range') as Promise<
    ApiSuccessResponse<DailyCheckerType>
  >;
