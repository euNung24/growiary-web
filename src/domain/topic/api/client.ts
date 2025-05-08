import {
  FindTopicType,
  PostTopicType,
  RecentTopicType,
  RecommendedTopic,
  TopicType,
  UpdateTopicType,
} from '@/domain/topic/type';
import withToken from '@/apis/withToken';
import { ApiSuccessResponse } from '@/types';

const topicApiUrl = process.env.NEXT_PUBLIC_API + '/topic';

export const getAllTopics = async (): Promise<ApiSuccessResponse<TopicType[]>> => {
  const response = await fetch(topicApiUrl + '/all');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
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
  withToken(topicApiUrl + '/recent') as Promise<ApiSuccessResponse<RecentTopicType>>;

export const getRecommendedTopic = async (): Promise<RecommendedTopic> => {
  const response = await fetch(topicApiUrl + '/recommendation', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  return (await response.json()).data;
};
