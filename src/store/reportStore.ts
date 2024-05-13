import { atom } from 'recoil';
import { ReportType } from '@/types/reportTypes';

export type ReportStoreType = {
  key: 'report';
  default: ReportType['all'];
};

export const ReportState = atom(<ReportStoreType>{
  key: 'report',
  default: {},
});
