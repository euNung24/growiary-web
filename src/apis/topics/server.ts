import { ApiSuccessResponse } from '@/types';
import { TopicType } from '@/types/topicTypes';

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
