/* eslint-disable @typescript-eslint/no-unused-vars */

export type TopicCategory = '회고' | '하루생각' | '자아탐험' | '크리에이티브';

export type TopicType = {
  id: number;
  category: TopicCategory;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PostTopicType = Pick<TopicType, 'category' | 'title' | 'content'>;

export type UpdateTopicType = {
  id: number;
  title?: string;
  icon?: string;
  content?: string;
};

export type FindTopicType = Pick<TopicType, 'id'>;
