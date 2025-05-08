import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';

import { ResPostType } from '@user/post/models/post';
import { TopicCategory } from '@user/topic/models/topic';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

export const getMonthlyPosts = (
  date: string,
  { abortController }: { abortController: AbortController | null },
) =>
  withToken(postApiUrl + '/record', { body: { date }, abortController }) as Promise<
    ApiSuccessResponse<{ posts: ResPostType[]; category: Record<TopicCategory, number> }>
  >;
