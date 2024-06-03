import { ProfileType } from '@/types/profileTypes';
import { ChallengeType } from '@/types/challengeTypes';

export type UsersType = Pick<ProfileType, 'userId' | 'social' | 'email' | 'createdAt'> & {
  uid: string;
  updatedAt: string;
  refreshToken: string;
  role: 'admin' | 'user';
  profile: Pick<ProfileType, 'nickname' | 'profileImage' | 'email' | 'userId'> & {
    titleBadge: 'first';
  };
  badge: ChallengeType['myBadge'];
};
