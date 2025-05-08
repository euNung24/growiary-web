import { atom } from 'recoil';
import { sessionStorageEffect } from '@/shared/store/index';

export type UserType = {
  key: 'user';
  default: {
    hasVisited: boolean;
    isAdminLogin: boolean;
  };
};

export const UserState = atom(<UserType>{
  key: 'user',
  default: {
    hasVisited: false,
    isAdminLogin: false,
  },
  effects: [sessionStorageEffect('user')],
});
