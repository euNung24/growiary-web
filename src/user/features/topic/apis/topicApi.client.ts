import {
  FindTopicType,
  PostTopicType,
  RecentTopicType,
  RecommendedTopicType,
  TopicType,
  UpdateTopicType,
} from '@/user/features/topic/types/topic';
import withToken, { withTokenGet } from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';

const topicApiUrl = process.env.NEXT_PUBLIC_API + '/topic';

export const getAllTopics = async (): Promise<ApiSuccessResponse<TopicType[]>> => {
  const response = await fetch(topicApiUrl + '/all');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

export const createTopic = async (body: PostTopicType) =>
  withToken(topicApiUrl + '/create', { body: JSON.stringify(body) }) as Promise<
    ApiSuccessResponse<TopicType>
  >;

export const updateTopic = async (body: UpdateTopicType) =>
  withToken(topicApiUrl + '/create', {
    body: JSON.stringify(body),
  }) as Promise<ApiSuccessResponse<TopicType>>;

export const findTopic = async (id: FindTopicType['id']) =>
  withToken(topicApiUrl + '/find', {
    body: JSON.stringify({
      id,
    }),
  }) as Promise<ApiSuccessResponse<TopicType>>;

export const getUserRecentTopic = () =>
  withTokenGet(topicApiUrl + '/recent') as Promise<ApiSuccessResponse<RecentTopicType>>;

export const getRecommendedTopic = async (): Promise<RecommendedTopicType> => {
  const response = await fetch(topicApiUrl + '/recommendation', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  return (await response.json()).data;
};
