import ServerTopics from '@/shared/layouts/server/ServerTopics';
import PostEditView from '@user/post/components/PostEditView';
import { Suspense } from 'react';

type PageProps = {
  params: { id: string };
};

export default async function Home({ params: { id } }: PageProps) {
  return (
    <Suspense>
      <ServerTopics>
        <PostEditView postId={id} />
      </ServerTopics>
    </Suspense>
  );
}
