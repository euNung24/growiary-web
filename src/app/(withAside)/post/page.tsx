import PostView from '@/views/PostView';
import { Suspense } from 'react';
import Preview from '@/views/common/Preview';
export default function Home() {
  return (
    <Suspense>
      <PostView />
      <Preview />
    </Suspense>
  );
}
