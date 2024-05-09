/* eslint-disable @typescript-eslint/no-unused-vars */

import { ResPostType } from '@/types/postTypes';
import { TopicCategory } from '@/types/topicTypes';

type ReportByPostType = {
  user: { [key: string]: number };
  all: { [key: string]: number };
};

export type ReportByCharCountType = {
  sum: number;
  avg: number;
  top3: ResPostType[];
};

export type ReportByTopicType = Partial<Record<TopicCategory, ResPostType[]>>;

type ReportByTagType = { [key: string]: number };

type ReportByNewTagType = { [key: string]: ResPostType[] };

export type ReportType = {
  post: ReportByPostType;
  week: [number, number, number, number, number, number, number][];
  time: [number, number, number, number][];
  charCount: { [key: string]: ReportByCharCountType };
  topic: ReportByTopicType;
  tags: ReportByTagType[];
  newTags: ReportByNewTagType[];
};
