/* eslint-disable @typescript-eslint/no-unused-vars */

export type FeedbackType = {
  category: string;
  content: string;
};

export type ResFeedbackType = FeedbackType & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
