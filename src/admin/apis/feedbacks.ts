import { withTokenGet } from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';
import { ResFeedbackType } from '@/shared/types/feedback';

const feedbackApiUrl = process.env.NEXT_PUBLIC_API + '/feedback';
export const getAllFeedback = () =>
  withTokenGet(feedbackApiUrl + '/all') as Promise<ApiSuccessResponse<ResFeedbackType[]>>;
