import {
  RecentTopicType,
  RecommendedTopicType,
  TopicCategory,
  TopicType,
  WeeklyHotTopicType,
} from '@user/topic/types/topic';

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

const allTopics: TopicType[] = [
  {
    createdAt: '2025-07-17T11:36:33.844Z',
    id: 0,
    category: '하루생각',
    title: '하루생각-0',
    content: '',
    updatedAt: '2025-07-17T11:36:42.298Z',
  },
  {
    createdAt: '2025-07-17T11:38:01.787Z',
    id: 1,
    category: '회고',
    title: '회고-0',
    content: '',
    updatedAt: '2025-07-17T11:38:11.998Z',
  },
  {
    createdAt: '2025-07-17T11:38:32.831Z',
    id: 2,
    category: '자아탐험',
    title: '자아탐험-0',
    content: '',
    updatedAt: '2025-07-17T11:38:38.816Z',
  },
  {
    createdAt: '2025-07-17T11:46:34.593Z',
    id: 3,
    category: '하루생각',
    title: '하루생각-222',
    content: '',
    updatedAt: '2025-07-17T11:46:39.274Z',
  },
  {
    createdAt: '2025-07-17T11:39:06.942Z',
    id: 4,
    category: '크리에이티브',
    title: '크리에이티브-0',
    content: '',
    updatedAt: '2025-07-17T11:39:11.092Z',
  },
  {
    createdAt: '2025-07-17T11:39:48.282Z',
    id: 65,
    category: '자유',
    title: '자유!!',
    content: '',
    updatedAt: '2025-07-17T11:39:53.167Z',
  },
];

const topicsByCategory: Record<TopicCategory, TopicType[]> = allTopics.reduce(
  (f, v) => ({
    ...f,
    [v.category]: [...(f[v.category] || []), v],
  }),
  {} as Record<TopicCategory, TopicType[]>,
);

const recommendTopicByCategory: Omit<RecommendedTopicType['category'], '자유'> = {
  하루생각: {
    createdAt: '2025-07-17T11:36:33.844Z',
    id: 0,
    category: '하루생각',
    title: '하루생각-0',
    content: '',
    updatedAt: '2025-07-17T11:36:42.298Z',
  },
  회고: {
    createdAt: '2025-07-17T11:38:01.787Z',
    id: 1,
    category: '회고',
    title: '회고-0',
    content: '',
    updatedAt: '2025-07-17T11:38:11.998Z',
  },
  자아탐험: {} as TopicType,
  크리에이티브: {} as TopicType,
};

export const MOCK_TOPIC = {
  HOT_TOPIC: hotTopic,
  RECENT_TOPIC: recentTopic,
  ALL_TOPICS: allTopics,
  TOPICS_BY_CATEGORY: topicsByCategory,
  RECOMMENDATION_TOPIC_BY_CATEGORY: recommendTopicByCategory,
};
