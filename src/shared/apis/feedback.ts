import withTokenPost from '@/shared/apis/withToken';
import { FeedbackType, ResFeedbackType } from '@/types/feedbackType';
import { ApiSuccessResponse } from '@/types';

const reserveApiUrl = process.env.NEXT_PUBLIC_API + '/feedback';

export const createFeedback = (body: FeedbackType) =>
  withTokenPost(reserveApiUrl + '/create', { body }) as Promise<
    ApiSuccessResponse<ResFeedbackType>
  >;
