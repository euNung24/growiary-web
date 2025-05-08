/* eslint-disable @typescript-eslint/no-unused-vars */

import { MENU_NAMES } from '@/shared/utils';

export type ApiSuccessResponse<T> = {
  message: string;
  data: T;
};

export type MenuType = keyof typeof MENU_NAMES;
