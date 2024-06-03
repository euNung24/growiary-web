import { ProfileType } from '@/types/profileTypes';
import { ChallengeType } from '@/types/challengeTypes';

export type UsersType = Pick<ProfileType, 'userId' | 'social' | 'email' | 'createdAt'> & {
  uid: string;
  updatedAt: string;
  refreshToken: string;
  role: 'admin' | 'user';
  profile: ProfileType & {
    titleBadge: 'first';
  };
  badge: ChallengeType['myBadge'];
};
