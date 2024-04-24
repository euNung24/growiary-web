import LoginLoading from '@/components/LoginLoading';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <LoginLoading />
    </Suspense>
  );
}
