import { ReportType } from '@/types/reportTypes';
import withToken from '@/apis/withToken';
import { ApiSuccessResponse } from '@/types';

const reportApiUrl = process.env.NEXT_PUBLIC_API + '/report';

export const getReport = (date: string) =>
  withToken(reportApiUrl, { body: { date } }) as Promise<ApiSuccessResponse<ReportType>>;
