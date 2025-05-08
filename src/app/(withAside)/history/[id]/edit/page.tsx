import PostView from '@/domain/post/components/PostView';
import { Suspense } from 'react';

type PageProps = {
  params: { id: string };
};

export default async function Home({ params: { id } }: PageProps) {
  return (
    <Suspense>
      <PostView postId={id} />
    </Suspense>
  );
}
