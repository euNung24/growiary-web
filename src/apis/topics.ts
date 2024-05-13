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

export const createTopic = async (
  body: PostTopicType,
): Promise<ApiSuccessResponse<TopicType>> => {
  const response = await fetch(topicApiUrl + '/create', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const updateTopic = async (
  body: UpdateTopicType,
): Promise<ApiSuccessResponse<TopicType>> => {
  const response = await fetch(topicApiUrl + '/create', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const findTopic = async (
  id: FindTopicType['id'],
): Promise<ApiSuccessResponse<TopicType>> => {
  const response = await fetch(topicApiUrl + '/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      id,
    }),
  });

  if (!response.ok) {
    throw await setError(response);
  }

  return response.json();
};
export const getUserRecentTopic = () =>
  withToken(topicApiUrl + '/recent') as Promise<ApiSuccessResponse<RecentTopicType>>;

export const getRecommendedTopic = async (): Promise<
  ApiSuccessResponse<RecommendedTopic>
> => {
  const response = await fetch(topicApiUrl + '/recommendation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  if (!response.ok) {
    throw await setError(response);
  }

  return response.json();
};
