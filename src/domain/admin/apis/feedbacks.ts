import { withTokenGet } from '@/shared/apis/withToken';
import { ApiSuccessResponse } from '@/shared/types';
import { ResFeedbackType } from '@/shared/types/feedbackType';

const feedbackApiUrl = process.env.NEXT_PUBLIC_API + '/feedback';
export const getAllFeedback = () =>
  withTokenGet(feedbackApiUrl + '/all') as Promise<ApiSuccessResponse<ResFeedbackType[]>>;
