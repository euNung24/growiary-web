import withTokenPost from '@/shared/utils/withToken';
import {
  ReservationType,
  ResReservationType,
} from '@/user/features/report/types/reservation';
import { ApiSuccessResponse } from '@/shared/types/response';

const reserveApiUrl = process.env.NEXT_PUBLIC_API + '/reserve';

export const createReserve = (body: ReservationType) =>
  withTokenPost(reserveApiUrl + '/create', { body }) as Promise<
    ApiSuccessResponse<ResReservationType>
  >;
