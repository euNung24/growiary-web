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
import { useEffect, useState } from 'react';
import { getTwoFormatDate } from '@/utils';
import NewCard from '@/components/NewCard';
import { ResPostType } from '@/types/postTypes';
import useGetPosts from '@/hooks/posts/useGetPosts';
import '../../components/editor.css';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';

const HomePosts = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const {
    date: { month, date },
  } = useRecoilValue(TodayState);
  const [posts, setPosts] = useState<(ResPostType & { count: number })[] | null>(null);
  const mutation = useGetPosts();

  useEffect(function getPosts() {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      const recentTwoPosts = [...res.data]
        .reverse()
        .slice(0, 2)
        .reverse()
        .map((post, i) => ({ ...post, count: res.data.length - i }));
      setPosts(recentTwoPosts);
    });
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
        {posts && (
          <>
            <NewCard count={(posts?.[0]?.count || 0) + 1} />
            {posts?.map(post => (
              <Link key={post.id} href="/history">
                <Card className="shrink-0" size="lg">
                  <CardHeader>
                    <CardChip>No.{post.index}</CardChip>
                    <CardTitle className="overflow-hidden text-ellipsis">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className="flex flex-col"
                    style={{
                      border: 'none',
                    }}
                  >
                    <div
                      className="overflow-hidden text-ellipsis font-r16"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                        maxHeight: '104px',
                      }}
                    >
                      {posts[0].content.ops.map(op =>
                        typeof op.insert === 'string' && op.insert !== '\n'
                          ? op.insert
                          : '',
                      )}
                    </div>
                    <div className="flex gap-x-2.5 mt-auto">
                      {post.tags?.map((v, i) => (
                        <CardChip key={i} position="footer">
                          {v}
                        </CardChip>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <span className="mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
                      {getTwoFormatDate(new Date(post.writeDate).getMonth() + 1)}월{' '}
                      {getTwoFormatDate(new Date(post.writeDate).getDate())}일
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
            {posts?.length === 0 && (
              <Card className="shrink-0 bg-primary-50 border-none" size="lg">
                <CardHeader>
                  <CardChip>No.0</CardChip>
                  <CardTitle className="overflow-hidden text-ellipsis">
                    제목 타이틀
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className="flex flex-col"
                  style={{
                    border: 'none',
                  }}
                >
                  <div
                    className="overflow-hidden text-ellipsis font-r16"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 4,
                      maxHeight: '104px',
                    }}
                  >
                    그루어리에 오신걸 환영합니다!
                    <br />
                    아직 작성된 글이 없어요
                    <br />
                    그루어리에서 더 많은 기록을 남겨주세요
                  </div>
                  <div className="flex gap-x-2.5 mt-auto">
                    {['태그1', '태그2'].map((v, i) => (
                      <CardChip key={i} position="footer">
                        {v}
                      </CardChip>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <span className="mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
                    {getTwoFormatDate(+month)}월 {getTwoFormatDate(+date)}일
                  </span>
                </CardFooter>
              </Card>
            )}
          </>
        )}
        {!posts &&
          [...Array(3)].map((v, i) => (
            <Card key={i} className="shrink-0" size="lg">
              <CardHeader>
                <CardChip>No.0</CardChip>
                <CardTitle className="overflow-hidden">제목 타이틀</CardTitle>
              </CardHeader>
              <CardContent
                className="flex flex-col"
                style={{
                  border: 'none',
                }}
              >
                <div
                  className="overflow-hidden text-ellipsis font-r16"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                    maxHeight: '104px',
                  }}
                >
                  그루어리에 오신걸 환영합니다!
                  <br />
                  아직 작성된 글이 없어요
                  <br />
                  그루어리에서 더 많은 기록을 남겨주세요
                </div>
                <div className="flex gap-x-2.5 mt-auto">
                  {['태그1', '태그2'].map((v, i) => (
                    <CardChip key={i} position="footer">
                      {v}
                    </CardChip>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <span className="mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
                  {getTwoFormatDate(+month)}월 {getTwoFormatDate(+date)}일
                </span>
              </CardFooter>
            </Card>
          ))}
      </div>
    </section>
  );
};

export default HomePosts;
