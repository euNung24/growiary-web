import { atom } from 'recoil';
import { sessionStorageEffect } from '@/store/index';

export type UserType = {
  key: 'user';
  default: {
    isNotLoginAndFirst: boolean;
  };
};

export const UserState = atom(<UserType>{
  key: 'user',
  default: {
    isNotLoginAndFirst: true,
  },
  effects: [sessionStorageEffect('user')],
});
