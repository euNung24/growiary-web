import ServerTopics from '@/shared/layouts/server/ServerTopics';
import PostView from '@/user/features/post/components/PostView';
import { Suspense } from 'react';

type PageProps = {
  params: { id: string };
};

export default async function Home({ params: { id } }: PageProps) {
  return (
    <Suspense>
      <ServerTopics>
        <PostView postId={id} />
      </ServerTopics>
    </Suspense>
  );
}
