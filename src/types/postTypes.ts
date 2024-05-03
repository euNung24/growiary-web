/* eslint-disable @typescript-eslint/no-unused-vars */
import { Op } from 'quill-delta';

type PostType = {
  topicId?: number;
  category?: string;
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

export type DailyCheckerType = {
  post: boolean[];
  count: number;
};
