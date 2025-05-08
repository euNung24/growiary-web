import { Op } from 'quill-delta';

import { TopicType } from '@user/topic/type';

type PostType = {
  index?: number;
  topicId?: number;
  title: string;
  content: { ops: Op[] };
  tags: string[];
  charactersCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ResPostType = PostType & {
  writeDate: string;
  id: string;
  topic: TopicType;
};

export type ReqPostType = PostType & {
  writeDate: Date;
};

export type DailyCheckerType = {
  today: number;
  continue: number[];
};
