import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';

import { ResPostType } from '@/user/features/post/types/post';
import { TopicCategory } from '@/user/features/topic/types/topic';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

export const getMonthlyPosts = (date: string) =>
  withToken(postApiUrl + '/record', { body: { date } }) as Promise<
    ApiSuccessResponse<{ posts: ResPostType[]; category: Record<TopicCategory, number> }>
  >;
