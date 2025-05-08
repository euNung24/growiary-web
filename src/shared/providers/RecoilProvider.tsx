'use client';

import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';
const RecoilProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
