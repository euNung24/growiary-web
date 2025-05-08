import { ProfileType } from '@/domain/profile/type';
import { ChallengeType } from '@user/challenge/type';

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
