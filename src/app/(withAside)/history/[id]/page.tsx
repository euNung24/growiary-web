import { Suspense } from 'react';
import PostDetailView from '@user/post/components/PostDetailView';

type PageProps = {
  params: { id: string };
};
export default async function Home({ params: { id } }: PageProps) {
  return (
    <Suspense>
      <PostDetailView postId={id} />
    </Suspense>
  );
}
