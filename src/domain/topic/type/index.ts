export type TopicCategory = '회고' | '하루생각' | '자아탐험' | '크리에이티브' | '자유';

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

export type RecentTopicType = {
  topicId: number;
  topic: TopicType;
  day: number;
};

export type RecommendedTopic = {
  top: {
    topicId: number;
    topic: TopicType;
    users: number; // 해당 topicId를 사용한 유저수
    count: number; // 전체 유저가 해당 topicId를 사용한 수
  };
  category: Record<TopicCategory, TopicType>;
};
