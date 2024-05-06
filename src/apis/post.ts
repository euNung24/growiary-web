import {
  DailyCheckerType,
  DeletePostType,
  ReqPostType,
  ResPostType,
  UpdatePostType,
} from '@/types/postTypes';
import withTokenPost from '@/apis/withToken';
import { TopicCategory } from '@/types/topicTypes';

const postApiUrl = process.env.NEXT_PUBLIC_API + '/post';

type TokenType = {
  token?: string;
};
export const getAllPosts = () =>
  withTokenPost(postApiUrl + '/all') as Promise<ApiSuccessResponse<ResPostType[]>>;

export const findPost = (id: number, { token }: TokenType) =>
  withTokenPost(postApiUrl + '/find', { body: { id }, token }) as Promise<
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
export const getMonthlyPosts = (id: number) =>
  withTokenPost(postApiUrl + '/record', { body: { month: id.toString() } }) as Promise<
    ApiSuccessResponse<{ posts: ResPostType[]; category: Record<TopicCategory, number> }>
  >;

export const getDailyCheckerPost = () =>
  withTokenPost(postApiUrl + '/weekly') as Promise<ApiSuccessResponse<DailyCheckerType>>;
