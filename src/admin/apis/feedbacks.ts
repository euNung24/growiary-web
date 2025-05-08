import { withTokenGet } from '@/apis/withToken';
import { ApiSuccessResponse } from '@/types';
import { ResFeedbackType } from '@/types/feedbackType';

const feedbackApiUrl = process.env.NEXT_PUBLIC_API + '/feedback';
export const getAllFeedback = () =>
  withTokenGet(feedbackApiUrl + '/all') as Promise<ApiSuccessResponse<ResFeedbackType[]>>;
