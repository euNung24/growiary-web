import { atom } from 'recoil';
import { ReportType } from '@/user/features/report/types/report';

export type ReportStoreType = {
  key: 'report';
  default: ReportType['all'];
};

export const ReportState = atom(<ReportStoreType>{
  key: 'report',
  default: {},
});
