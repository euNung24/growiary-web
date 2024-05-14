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
import LinkOrLogin from '@/components/LinkOrLogin';
import { topicCategory } from '@/utils/topicCategory';
import { TopicCategory } from '@/types/topicTypes';
import useProfileContext from '@/hooks/profile/useProfileContext';

const SAMPLE_POSTS: (Pick<ResPostType, 'title' | 'tags'> & {
  topic: {
    category: TopicCategory;
  };
  content: string;
  writeDate: string;
})[] = [
  {
    topic: {
      category: '회고',
    },
    title: '요즘 나의 최대 걱정거리',
    content:
      '요즘 내 마음이 너무 뒤숭숭하다. 가족들에게도 투정을 많이 부리고 있다. 일단 투정부터 부린 다음 뒤늦게 후회하고 사과를 드리는 일이 많아졌는데, 그래도 개선',
    tags: ['걱정', '생각', '개선', '투정'],
    writeDate: '04월 29일',
  },
  {
    topic: {
      category: '회고',
    },
    title: '새벽 운동과 부상',
    content:
      '감기에서 적당히 회복된 것 같고 마침 기온도 조금 오른 것 같아서 새벽 운동을 나갔다. 그리고 뭔가 호흡이 평소보다 가빴는데, 그냥 감기가 덜 나은 탓이려니 하고',
    tags: ['운동', '부상', '건강', '일상'],
    writeDate: '04월 28일',
  },
];

const HomePosts = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const {
    date: { month, date },
  } = useRecoilValue(TodayState);
  const { profile } = useProfileContext();
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
        <Button variant="ghostGray" size="sm" className="text-gray-500 font-sb12" asChild>
          <LinkOrLogin href="/history" isLogin={!!posts}>
            <Button
              variant="ghostGray"
              size="sm"
              className="text-gray-500 font-sb12 p-0 cursor-pointer"
              asChild
            >
              <span>전체보기</span>
            </Button>
          </LinkOrLogin>
        </Button>
      </div>
      <p className={headerDescriptionStyle}>오늘의 기록을 작성해주세요</p>
      <div className="flex gap-5 flex-wrap">
        {profile && posts && (
          <>
            <NewCard />
            {posts.map(post => (
              <Link key={post.id} href={`/history/${post.id}`}>
                <Card className="shrink-0" size="lg">
                  <CardHeader>
                    <CardChip size="lg">
                      {topicCategory[post.topic?.category || '자유'].Icon({
                        width: 12,
                        height: 12,
                        color: 'currentColor',
                      })}
                      {post.topic?.category || '자유'}
                    </CardChip>
                    <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap	">
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
                    <div className="flex mt-auto flex-wrap max-w-full h-[22px] overflow-hidden">
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
            {posts.length === 0 && (
              <Card className="shrink-0 bg-primary-50 border-none" size="lg">
                <CardHeader>
                  <CardChip size="lg">
                    {topicCategory['자유'].Icon({
                      width: 12,
                      height: 12,
                      color: 'currentColor',
                    })}
                    자유
                  </CardChip>
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
        {!profile && (
          <>
            <NewCard isLogin={false} />
            {SAMPLE_POSTS.map((post, i) => (
              <Card key={i} className="shrink-0" size="lg">
                <CardHeader>
                  <CardChip size="lg">
                    {topicCategory[post.topic?.category || '자유'].Icon({
                      width: 12,
                      height: 12,
                      color: 'currentColor',
                    })}
                    {post.topic?.category || '자유'}
                  </CardChip>
                  <CardTitle className="overflow-hidden">{post.title}</CardTitle>
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
                    {post.content}
                  </div>
                  <div className="flex mt-auto">
                    {post.tags.map((v, i) => (
                      <CardChip key={i} position="footer">
                        {v}
                      </CardChip>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <span className="mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
                    {post.writeDate}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default HomePosts;
