import { Suspense } from 'react';
import Preview from '@/shared/views/common/Preview';
import PostView from '@/domain/user/post/components/PostView';

export default function Home() {
  return (
    <Suspense>
      <PostView />
      <Preview />
    </Suspense>
  );
}
