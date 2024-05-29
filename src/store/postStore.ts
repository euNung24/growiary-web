import { atom } from 'recoil';
import { ReqPostType } from '@/types/postTypes';
import { sessionStorageEffect } from '@/store/index';

export type PostStoreType = {
  key: 'post';
  default: ReqPostType;
};

export const PostState = atom(<PostStoreType>{
  key: 'post',
  default: {} as ReqPostType,
  effects: [sessionStorageEffect('post')],
});
