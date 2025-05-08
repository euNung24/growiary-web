import { Suspense } from 'react';
import PostDetailView from '@/domain/history/components/PostDetailView';

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
