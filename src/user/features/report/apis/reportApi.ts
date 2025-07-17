import { ReportType } from '@/user/features/report/types/report';
import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';

const reportApiUrl = process.env.NEXT_PUBLIC_API + '/report';

export const getReport = (date: string) =>
  withToken(reportApiUrl, { body: { date } }) as Promise<ApiSuccessResponse<ReportType>>;
