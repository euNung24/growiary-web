import { atom } from 'recoil';

import { sessionStorageEffect } from '@/shared/store/index';

import { ReqPostType } from '@/user/features/post/types/post';

export type PostStoreType = {
  key: 'post';
  default: ReqPostType;
};

export const PostState = atom(<PostStoreType>{
  key: 'post',
  default: {} as ReqPostType,
  effects: [sessionStorageEffect('post')],
});
