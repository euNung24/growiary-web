import { findPost } from '@/apis/post';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import PostDetailView from '@/views/PostDetailView';

type PageProps = {
  params: { id: number };
};
export default async function Home({ params: { id } }: PageProps) {
  const token = cookies().get('accessToken')?.value;
  const res = await findPost(id, { token });

  return (
    <Suspense>
      <PostDetailView post={res.data} />
    </Suspense>
  );
}
