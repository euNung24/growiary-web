import {
  DailyCheckerType,
  ReqPostType,
  ResPostType,
  UpdatePostType,
} from '@/domain/user/post/types';
import withToken from '@/shared/apis/withToken';
import { TopicCategory } from '@/domain/user/topic/type';
import { ApiSuccessResponse } from '@/shared/types';

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
export const getMonthlyPosts = (
  date: string,
  { abortController }: { abortController: AbortController | null },
) =>
  withToken(postApiUrl + '/record', { body: { date }, abortController }) as Promise<
    ApiSuccessResponse<{ posts: ResPostType[]; category: Record<TopicCategory, number> }>
  >;

export const getDailyCheckerPost = () =>
  withToken(postApiUrl + '/continue-range') as Promise<
    ApiSuccessResponse<DailyCheckerType>
  >;
