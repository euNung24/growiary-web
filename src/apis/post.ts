import {
  DailyCheckerType,
  ReqPostType,
  ResPostType,
  UpdatePostType,
} from '@/types/postTypes';
import withTokenPost from '@/apis/withToken';

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
    ApiSuccessResponse<ResPostType[]>
  >;
export const getDailyCheckerPost = () =>
  withTokenPost(postApiUrl + '/continue-range') as Promise<
    ApiSuccessResponse<DailyCheckerType>
  >;
