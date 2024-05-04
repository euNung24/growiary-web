import { ReportType } from '@/types/reportTypes';
import withToken from '@/apis/withToken';

const reportApiUrl = process.env.NEXT_PUBLIC_API + '/report';

export const getReport = () =>
  withToken(reportApiUrl) as Promise<ApiSuccessResponse<ReportType>>;
