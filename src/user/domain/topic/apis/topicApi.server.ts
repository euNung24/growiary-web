import { ApiSuccessResponse } from '@/shared/types/response';
import { TopicType } from '@user/topic/types/topic';

const topicApiUrl = process.env.NEXT_PUBLIC_API + '/topic';

export const getAllTopics = async (): Promise<ApiSuccessResponse<TopicType[]>> => {
  const response = await fetch(topicApiUrl + '/all', {
    next: { revalidate: 60 * 60 * 1000 },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};
