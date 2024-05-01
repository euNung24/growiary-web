import PostView from '@/views/PostView';
import { Suspense } from 'react';
export default function Home() {
  return (
    <Suspense>
      <PostView />
    </Suspense>
  );
}
