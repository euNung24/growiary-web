import { BADGE_INFO } from '@/utils/challenge';

export type ChallengeType = {
  titleBadge?: Partial<keyof typeof BADGE_INFO>;
  myBadge: {
    [key: string]: {
      acquiredDate: Date;
      name: string;
      acquired: boolean;
      key: string;
    };
  };
  totalUser: number; // 전체 유저 수
  myRank: number; // 나의 랭크 순위
};

export type BadgeKeyType = Partial<keyof typeof BADGE_INFO>;
