import { WeeklyHotTopicType } from '@user/topic/types/topic';

const hotTopic: WeeklyHotTopicType = {
  topicId: 1,
  topic: {
    id: 0,
    category: '하루생각',
    title: '하루생각-123',
    content: '',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
  users: 3,
  count: 4,
};

export const MOCK_TOPIC = {
  HOT_TOPIC: hotTopic,
};
