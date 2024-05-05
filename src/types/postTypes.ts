/* eslint-disable @typescript-eslint/no-unused-vars */
import { Op } from 'quill-delta';
import { TopicCategory } from '@/types/topicTypes';

type PostType = {
  index: number;
  topicId?: number;
  category?: TopicCategory;
  title: string;
  content: { ops: Op[] };
  tags: string[];
  charactersCount: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ResPostType = PostType & {
  writeDate: string;
  id: string;
};

export type ReqPostType = PostType & {
  writeDate: Date;
};

export type UpdatePostType = { id: string } & ReqPostType;

export type DailyCheckerType = number[];
