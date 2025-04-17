import { atom } from 'recoil';
import { sessionStorageEffect } from '@/store/index';
import { ProfileType } from '@/types/profileTypes';

export type UserType = {
  key: 'user';
  default: {
    hasVisited: boolean;
    profile: ProfileType | undefined;
    isAdminLogin: boolean;
  };
};

export const UserState = atom(<UserType>{
  key: 'user',
  default: {
    hasVisited: false,
    profile: undefined,
    isAdminLogin: false,
  },
  effects: [sessionStorageEffect('user')],
});
