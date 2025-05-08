import { ProfileType } from '@/shared/types/profile';
import { ChallengeType } from '@user/challenge/models/challenge';

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
