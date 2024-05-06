import withTokenPost from '@/apis/withToken';
import { ReservationType, ResReservationType } from '@/types/reservation';

const reserveApiUrl = process.env.NEXT_PUBLIC_API + '/reserve';

export const createReserve = (body: ReservationType) =>
  withTokenPost(reserveApiUrl + '/create', { body }) as Promise<
    ApiSuccessResponse<ResReservationType>
  >;
