import withTokenPost from '@/shared/utils/withToken';
import { FeedbackType, ResFeedbackType } from '@/shared/types/feedback';
import { ApiSuccessResponse } from '@/shared/types/response';

const reserveApiUrl = process.env.NEXT_PUBLIC_API + '/feedback';

export const createFeedback = (body: FeedbackType) =>
  withTokenPost(reserveApiUrl + '/create', { body }) as Promise<
    ApiSuccessResponse<ResFeedbackType>
  >;
