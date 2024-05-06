/* eslint-disable @typescript-eslint/no-unused-vars */

import { ResPostType } from '@/types/postTypes';
import { TopicCategory } from '@/types/topicTypes';

type ReportByPostType = {
  user: number[];
  all: number[];
};

type ReportByCharCountType = {
  sum: number;
  avg: number;
  top3: ResPostType[];
};

export type ReportByTopicType = Partial<
  Record<TopicCategory | 'Uncategorized', ResPostType[]>
>;

type ReportByTagType = { [key: string]: number };

type ReportByNewTagType = { [key: string]: ResPostType[] };

export type ReportType = {
  post: ReportByPostType;
  week: [number, number, number, number, number, number, number][];
  time: [number, number, number, number][];
  charCount: ReportByCharCountType[];
  topic: ReportByTopicType[];
  tags: ReportByTagType[];
  newTags: ReportByNewTagType[];
};
