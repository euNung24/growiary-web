import { atom } from 'recoil';

export type TodayType = {
  key: 'today';
  default: {
    date: {
      year: number;
      month: number;
      date: number;
      day: number;
    };
  };
};

export const TodayState = atom(<TodayType>{
  key: 'today',
  default: {
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      day: new Date().getDay(),
    },
  },
});
