import { Suspense } from 'react';
import Preview from '@/views/common/Preview';
import PostView from '@/post/components/PostView';

export default function Home() {
  return (
    <Suspense>
      <PostView />
      <Preview />
    </Suspense>
  );
}
