import PostView from '@/views/PostView';
import { findPost } from '@/apis/post';
import { cookies } from 'next/headers';

type PageProps = {
  params: { id: number };
};
export default async function Home({ params: { id } }: PageProps) {
  const token = cookies().get('accessToken')?.value;
  const res = await findPost(id, token);

  return <PostView post={res.data} />;
}
