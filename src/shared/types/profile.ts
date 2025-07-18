import { BadgeKeyType } from '@user/challenge/constants/badges';

export type ProfileType = {
  userId: string;
  nickname: string;
  social: 'kakao' | 'google';
  email: string;
  profileImage: string;
  create: string;
  createdAt: string;
  titleBadge: BadgeKeyType;
};
