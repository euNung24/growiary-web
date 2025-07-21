import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';

import {
  ReqPostType,
  ResPostType,
  UpdatePostType,
} from '@/user/features/post/types/post';
import { DailyCheckerType } from '@/user/features/post/types/dailyChecker';
import { TopicCategory } from '@user/topic/types/topic';

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

export const getDailyCheckerPost = () =>
  withToken(postApiUrl + '/continue-range') as Promise<
    ApiSuccessResponse<DailyCheckerType>
  >;

export const getMonthlyPosts = (date: string) =>
  withToken(postApiUrl + '/record', { body: { date } }) as Promise<
    ApiSuccessResponse<{ posts: ResPostType[]; category: Record<TopicCategory, number> }>
  >;
