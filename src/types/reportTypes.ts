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
  week: number[][];
  time: [number, number, number, number][];
  charCount: ReportByCharCountType[];
  topic: ReportByTopicType[];
  tags: ReportByTagType[];
  newTags: ReportByNewTagType[];
};

export const REPORT_DATA: ApiSuccessResponse<ReportType> = {
  message: 'Success report',
  data: {
    post: {
      user: [1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      all: [1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    week: [
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    time: [
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [4, 0, 2, 0],
      [1, 1, 0, 1],
      [0, 2, 0, 1],
      [1, 4, 0, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    charCount: [
      {
        sum: 1000,
        avg: 500,
        top3: [
          {
            id: '039afda0-0d39-40c0-bc13-6bd242ffe647',
            content: 'post test content',
            tags: ['Hello', 'World'],
            title: 'update test',
            updatedAt: '2024-04-26T01:21:09.756Z',
            createdAt: '2024-01-01T09:37:06.202Z',
            writeDate: 'Wed Jan 24 2024 18:30:43 GMT+0900 (한국 표준시)',
            charactersCount: 1000,
          },
        ],
      },
      {} as ReportByCharCountType,
      {} as ReportByCharCountType,
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 1600,
        avg: 600,
        top3: [
          {
            createdAt: '2024-04-26T01:21:44.517Z',
            writeDate: 'Wed Apr 24 2024 18:30:43 GMT+0900 (한국 표준시)',
            id: '3c4d64dc-f9fe-448e-bb2a-e90b8f79c9f7',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:21:44.517Z',
            charactersCount: 200,
          },
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
          {
            id: 'f8b5ad04-497a-4c3c-8975-c53a3b8e7055',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:20:39.038Z',
            charactersCount: 900,
            createdAt: '2024-04-26T13:20:39.483Z',
            writeDate: 'Wed Apr 24 2024 03:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
          },
        ],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
      {
        sum: 0,
        avg: 0,
        top3: [],
      },
    ],
    tags: [
      {
        Hello: 1,
        World: 1,
      },
      {},
      {},
      {
        Hello: 3,
        World: 3,
        GOOD: 1,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    newTags: [
      {},
      {},
      {},
      {
        Hello: [
          {
            createdAt: '2024-04-26T01:21:44.517Z',
            writeDate: 'Wed Apr 24 2024 18:30:43 GMT+0900 (한국 표준시)',
            id: '3c4d64dc-f9fe-448e-bb2a-e90b8f79c9f7',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:21:44.517Z',
            charactersCount: 200,
          },
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
          {
            id: 'f8b5ad04-497a-4c3c-8975-c53a3b8e7055',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:20:39.038Z',
            charactersCount: 900,
            createdAt: '2024-04-26T13:20:39.483Z',
            writeDate: 'Wed Apr 24 2024 03:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
          },
        ],
        World: [
          {
            createdAt: '2024-04-26T01:21:44.517Z',
            writeDate: 'Wed Apr 24 2024 18:30:43 GMT+0900 (한국 표준시)',
            id: '3c4d64dc-f9fe-448e-bb2a-e90b8f79c9f7',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:21:44.517Z',
            charactersCount: 200,
          },
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
          {
            id: 'f8b5ad04-497a-4c3c-8975-c53a3b8e7055',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:20:39.038Z',
            charactersCount: 900,
            createdAt: '2024-04-26T13:20:39.483Z',
            writeDate: 'Wed Apr 24 2024 03:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
          },
        ],
        GOOD: [
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
        ],
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    topic: [
      {
        Uncategorized: [
          {
            id: '039afda0-0d39-40c0-bc13-6bd242ffe647',
            content: 'post test content',
            tags: ['Hello', 'World'],
            title: 'update test',
            updatedAt: '2024-04-26T01:21:09.756Z',
            createdAt: '2024-01-01T09:37:06.202Z',
            writeDate: 'Wed Jan 24 2024 18:30:43 GMT+0900 (한국 표준시)',
            charactersCount: 1000,
          },
        ],
      },
      {
        Uncategorized: [
          {
            createdAt: '2024-04-26T01:21:44.517Z',
            writeDate: 'Wed Apr 24 2024 18:30:43 GMT+0900 (한국 표준시)',
            id: '3c4d64dc-f9fe-448e-bb2a-e90b8f79c9f7',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:21:44.517Z',
            charactersCount: 200,
          },
        ],
        하루생각: [
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
          {
            id: 'f8b5ad04-497a-4c3c-8975-c53a3b8e7055',
            title: 'post test 2',
            content: 'post test content',
            tags: ['Hello', 'World'],
            updatedAt: '2024-04-26T01:20:39.038Z',
            charactersCount: 900,
            createdAt: '2024-04-26T13:20:39.483Z',
            writeDate: 'Wed Apr 24 2024 03:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
          },
        ],
        회고: [
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
          {
            createdAt: '2024-04-24T09:37:15.199Z',
            id: '9c6376ed-b558-4cee-9a97-039c03a44a2a',
            title: 'post test 2',
            content: 'post test content',
            updatedAt: '2024-04-24T09:37:15.199Z',
            charactersCount: 500,
            writeDate: 'Wed Apr 24 2024 12:30:43 GMT+0900 (한국 표준시)',
            topicId: '1',
            tags: ['Hello', 'World', 'GOOD'],
          },
        ],
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  },
};
