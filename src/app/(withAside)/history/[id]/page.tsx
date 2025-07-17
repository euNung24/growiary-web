import { Suspense } from 'react';
import PostDetailView from '@/user/features/post/components/PostDetailView';
import ServerTopics from '@/shared/layouts/server/ServerTopics';

type PageProps = {
  params: { id: string };
};
export default async function Home({ params: { id } }: PageProps) {
  return (
    <Suspense>
      <ServerTopics>
        <PostDetailView postId={id} />
      </ServerTopics>
    </Suspense>
  );
}
