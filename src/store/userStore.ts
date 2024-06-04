import { atom } from 'recoil';
import { sessionStorageEffect } from '@/store/index';

export type UserType = {
  key: 'user';
  default: {
    isNotLoginAndFirst: boolean;
    isAdminLogin: boolean;
  };
};

export const UserState = atom(<UserType>{
  key: 'user',
  default: {
    isNotLoginAndFirst: true,
    isAdminLogin: false,
  },
  effects: [sessionStorageEffect('user')],
});
