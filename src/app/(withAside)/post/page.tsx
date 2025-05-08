import { Suspense } from 'react';
import Preview from '@/shared/components/Preview';
import PostView from '@user/post/components/PostView';

export default function Home() {
  return (
    <Suspense>
      <PostView />
      <Preview />
    </Suspense>
  );
}
