import { REPORT_DATA, ReportType } from '@/types/reportTypes';
// import { getCookie } from '@/utils';

// const reportApiUrl = process.env.NEXT_PUBLIC_API + '/report';

export const getReport = async () // token?: string,
: Promise<ApiSuccessResponse<ReportType>> => {
  // const accessToken = token || getCookie('accessToken');
  //
  // const response = await fetch(reportApiUrl , {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8',
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });
  //
  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }
  // return response.json();
  return Promise.resolve(REPORT_DATA);
};
