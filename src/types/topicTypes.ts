/* eslint-disable @typescript-eslint/no-unused-vars */

type TopicType = {
  id: number;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
type PostTopicType = Pick<TopicType, 'category' | 'title' | 'content'>;
type UpdateTopicType = {
  id: number;
  title?: string;
  icon?: string;
  content?: string;
};
type FindTopicType = Pick<TopicType, 'id'>;
