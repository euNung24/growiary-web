import { atom, AtomEffect } from 'recoil';
import { TopicCategory, TopicType } from '@/types/topicTypes';
import { sessionStorageEffect } from '@/store/index';

export type TopicsByCategory<T> = {
  key: 'topicsByCategory';
  default: T;
  effects: [AtomEffect<T>];
};

export const TopicsByCategoryState = atom(<
  TopicsByCategory<Record<TopicCategory, TopicType[]>>
>{
  key: 'topicsByCategory',
  default: {},
  effects: [sessionStorageEffect('topicsByCategory')],
});
