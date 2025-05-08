import withTokenPost from '@/shared/apis/withToken';
import { FeedbackType, ResFeedbackType } from '@/shared/types/feedbackType';
import { ApiSuccessResponse } from '@/shared/types';

const reserveApiUrl = process.env.NEXT_PUBLIC_API + '/feedback';

export const createFeedback = (body: FeedbackType) =>
  withTokenPost(reserveApiUrl + '/create', { body }) as Promise<
    ApiSuccessResponse<ResFeedbackType>
  >;
