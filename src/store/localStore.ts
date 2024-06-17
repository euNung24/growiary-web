import { atom } from 'recoil';
import { localStorageEffect } from '@/store/index';

export type localType = {
  key: 'local';
  default: {
    showIndicator: boolean;
  };
};

export const LocalState = atom(<localType>{
  key: 'local',
  default: {
    showIndicator: true,
  },
  effects: [localStorageEffect('user')],
});
