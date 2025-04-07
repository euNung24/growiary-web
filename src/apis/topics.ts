/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  FindTopicType,
  PostTopicType,
  RecentTopicType,
  RecommendedTopic,
  TopicType,
  UpdateTopicType,
} from '@/types/topicTypes';
import withToken from '@/apis/withToken';
import { ApiSuccessResponse } from '@/types';
import { getCookie } from '@/utils';
import { setError } from '@/utils/api';

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

export const getRecommendedTopic = async () =>
  withToken(topicApiUrl + '/recommendation') as Promise<
    ApiSuccessResponse<RecommendedTopic>
  >;
