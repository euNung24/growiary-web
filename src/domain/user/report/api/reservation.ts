import withTokenPost from '@/shared/apis/withToken';
import { ReservationType, ResReservationType } from '@user/report/type/reservationType';
import { ApiSuccessResponse } from '@/shared/types';

const reserveApiUrl = process.env.NEXT_PUBLIC_API + '/reserve';

export const createReserve = (body: ReservationType) =>
  withTokenPost(reserveApiUrl + '/create', { body }) as Promise<
    ApiSuccessResponse<ResReservationType>
  >;
