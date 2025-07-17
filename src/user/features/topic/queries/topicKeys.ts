export const topicKeys = {
  all: ['topics'] as const,
  recommendation: ['recommendedTopic'] as const,
  recent: ['recentTopic'] as const,
  lists: () => [...topicKeys.all, 'list'] as const,
  details: () => [...topicKeys.all, 'detail'] as const,
  detail: (id: number) => [...topicKeys.details(), id] as const,
};
