import { Suspense } from 'react';
import Preview from '@/shared/components/Preview';
import PostView from '@/user/features/post/components/post/PostView';
import ServerTopics from '@/shared/layouts/server/ServerTopics';

export default function Home() {
  return (
    <Suspense>
      <ServerTopics>
        <PostView />
      </ServerTopics>
      <Preview />
    </Suspense>
  );
}
