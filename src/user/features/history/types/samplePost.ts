import { ResPostType } from '@user/history/types/post';
import { TopicCategory } from '@user/topic/types/topic';

export type SamplePostType = Pick<ResPostType, 'title' | 'tags' | 'id' | 'writeDate'> & {
  content: string;
  topic: {
    category: TopicCategory;
  };
};
