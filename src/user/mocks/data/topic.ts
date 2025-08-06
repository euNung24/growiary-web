import { RecentTopicType, TopicType, WeeklyHotTopicType } from '@user/topic/types/topic';

const topicId = 0;
const topic: TopicType = {
  id: topicId,
  category: '하루생각',
  title: '하루생각-123',
  content: '',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
};

const hotTopic: WeeklyHotTopicType = {
  topicId: 1,
  topic,
  users: 3,
  count: 4,
};

const recentTopic: RecentTopicType = {
  topicId,
  topic,
  day: 3,
};

export const MOCK_TOPIC = {
  HOT_TOPIC: hotTopic,
  RECENT_TOPIC: recentTopic,
};
