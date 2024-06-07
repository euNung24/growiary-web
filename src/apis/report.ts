import { ReportType } from '@/types/reportTypes';
import withToken from '@/apis/withToken';
import { ApiSuccessResponse } from '@/types';

const reportApiUrl = process.env.NEXT_PUBLIC_API + '/report';

export const getReport = (
  date: string,
  { abortController }: { abortController: AbortController | null },
) =>
  withToken(reportApiUrl, { body: { date }, abortController }) as Promise<
    ApiSuccessResponse<ReportType>
  >;
