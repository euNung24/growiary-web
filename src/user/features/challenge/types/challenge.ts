import { BADGE_INFO } from '@/user/features/challenge/constants/badges';

export type AcquiredBadgeType = {
  acquiredDate: Date;
  name: string;
  acquired: boolean;
  key: string;
};

export type ChallengeType = {
  titleBadge?: keyof typeof BADGE_INFO;
  myBadge: Record<keyof typeof BADGE_INFO, AcquiredBadgeType>;
  totalUser: number; // 전체 유저 수
  myRank: number; // 나의 랭크 순위
};
