import { ApiSuccessResponse } from '@/shared/types';
import { TopicType } from '@/domain/topic/type';

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
