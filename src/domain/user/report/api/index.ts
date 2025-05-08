import { ReportType } from '@/domain/user/report/type';
import withToken from '@/shared/apis/withToken';
import { ApiSuccessResponse } from '@/shared/types';

const reportApiUrl = process.env.NEXT_PUBLIC_API + '/report';

export const getReport = (
  date: string,
  { abortController }: { abortController: AbortController | null },
) =>
  withToken(reportApiUrl, { body: { date }, abortController }) as Promise<
    ApiSuccessResponse<ReportType>
  >;
