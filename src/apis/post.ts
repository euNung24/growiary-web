import {
  DailyCheckerType,
  ReqPostType,
  ResPostType,
  UpdatePostType,
} from '@/types/postTypes';
import withTokenPost from '@/apis/withToken';
import { TopicCategory } from '@/types/topicTypes';
import { ApiSuccessResponse } from '@/types';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

export const getAllPosts = () =>
  withTokenPost(postApiUrl + '/all') as Promise<ApiSuccessResponse<ResPostType[]>>;

export const findPost = (id: string) =>
  withTokenPost(postApiUrl + '/find', { body: { id } }) as Promise<
    ApiSuccessResponse<ResPostType>
  >;

export const createPost = (postData: ReqPostType) =>
  withTokenPost(postApiUrl + '/create', { body: postData }) as Promise<
    ApiSuccessResponse<ResPostType[]>
  >;

export const updatePost = (postData: UpdatePostType) =>
  withTokenPost(postApiUrl + '/update', { body: postData }) as Promise<
    ApiSuccessResponse<ResPostType>
  >;

export const deletePost = (id: string) =>
  withTokenPost(postApiUrl + '/update', { body: { status: false, id } }) as Promise<
    ApiSuccessResponse<ResPostType>
  >;
export const getMonthlyPosts = (
  date: string,
  { abortController }: { abortController: AbortController | null },
) =>
  withTokenPost(postApiUrl + '/record', { body: { date }, abortController }) as Promise<
    ApiSuccessResponse<{ posts: ResPostType[]; category: Record<TopicCategory, number> }>
  >;

export const getDailyCheckerPost = () =>
  withTokenPost(postApiUrl + '/continue-range') as Promise<
    ApiSuccessResponse<DailyCheckerType>
  >;
