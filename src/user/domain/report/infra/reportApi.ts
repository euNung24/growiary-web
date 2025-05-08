import { ReportType } from '@user/report/models/report';
import withToken from '@/shared/utils/withToken';
import { ApiSuccessResponse } from '@/shared/types/response';

const reportApiUrl = process.env.NEXT_PUBLIC_API + '/report';

export const getReport = (
  date: string,
  { abortController }: { abortController: AbortController | null },
) =>
  withToken(reportApiUrl, { body: { date }, abortController }) as Promise<
    ApiSuccessResponse<ReportType>
  >;
