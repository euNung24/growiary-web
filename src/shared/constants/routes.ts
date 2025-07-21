import { TopicCategory } from '@user/topic/types/topic';

export const ROUTES = {
  main: '/',
  landing: '/landing',
  post: {
    new: '/post',
    newFilter: ({ topic, category }: { topic: number; category: TopicCategory }) => {
      const searchParams = new URLSearchParams();
      searchParams.set('topic', topic.toString());
      searchParams.set('category', category);

      return `/post?${searchParams.toString()}`;
    },
    detail: (id: string) => `/post/${id}`,
    edit: (id: string) => `/post/${id}/edit`,
    list: '/posts',
  },
  topics: '/topics',
  report: '/report',
  challenge: '/challenge',
  settings: '/settings',
  feedback: '/feedback',
  admin: '/admin',
};
