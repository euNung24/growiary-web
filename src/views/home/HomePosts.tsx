'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardChip,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Suspense, useEffect, useRef, useState } from 'react';
import { getCookie, getTwoFormatDate } from '@/utils';
import NewCard from '@/components/NewCard';
import { ResPostType } from '@/types/postTypes';
import useGetPosts from '@/hooks/posts/useGetPosts';
import '../../components/editor.css';
const HomePosts = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';

  const cardContentRefsArray = useRef<HTMLDivElement[]>([]);
  const [posts, setPosts] = useState<ResPostType[]>([]);
  const mutation = useGetPosts();

  const assignRef = (index: number) => (element: HTMLDivElement) => {
    cardContentRefsArray.current[index] = element;
  };

  useEffect(
    function setPostCardContents() {
      if (!posts.length) return;
      cardContentRefsArray.current.map(async (el, i) => {
        const Quill = await import('quill');
        const tempCont = document.createElement('div');
        await new Quill.default(tempCont).setContents(posts[i].content.ops);
        el.innerHTML = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
      });
    },
    [posts],
  );

  useEffect(function getPosts() {
    if (getCookie('accessToken')) {
      mutation.mutateAsync('').then(res => setPosts([...res.data].slice(0, 3)));
    }
  }, []);

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">나의 기록</h2>
        <Button variant="ghostGray" size="sm" asChild>
          <Link href="">전체보기</Link>
        </Button>
      </div>
      <p className={headerDescriptionStyle}>오늘의 기록을 작성해주세요</p>
      <div className="flex gap-5 flex-wrap">
        {posts.map((post, i) => (
          <Card key={post.id} className="shrink-0" size="lg">
            <CardHeader>
              <CardChip>No.{post.id}</CardChip>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent
              className="flex flex-col ql-container ql-snow"
              style={{
                border: 'none',
              }}
            >
              <Suspense>
                <div
                  className="max-h-[185.5px] ql-editor full-height"
                  style={{
                    overflowY: 'hidden',
                    padding: 0,
                  }}
                  ref={assignRef(i)}
                ></div>
              </Suspense>
              <span className="self-end mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
                {getTwoFormatDate(new Date(post.writeDate).getMonth() + 1)}월{' '}
                {getTwoFormatDate(new Date(post.writeDate).getDate())}일
              </span>
            </CardContent>
            <CardFooter>
              {post.tags.map((v, i) => (
                <CardChip key={i} position="footer">
                  {v}
                </CardChip>
              ))}
            </CardFooter>
          </Card>
        ))}
        {[...Array(3 - posts.length)].map((v, i) => (
          <NewCard key={i} />
        ))}
      </div>
    </section>
  );
};

export default HomePosts;
