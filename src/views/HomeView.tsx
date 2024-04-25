'use client';

import {
  Card,
  CardChip,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { topicCategory } from '@/utils/topicCategory';
import { TopicCategory } from '@/types/topicTypes';
import { genRandomNum } from '@/utils';
import useGetTopicsByCategory from '@/hooks/topics/useGetTopicsByCategory';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RotateCw } from 'lucide-react';
import NewCard from '@/components/NewCard';

const HomeView = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const topics = useGetTopicsByCategory();

  return (
    <div className="space-y-[72px]">
      <section>
        <div className="flex justify-between">
          <h2 className="title">기록 리포트</h2>
          <Button variant="ghostGray" size="sm" asChild>
            <Link href="">전체보기</Link>
          </Button>
        </div>
        <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
        <div className="flex gap-5 flex-wrap">
          {[...Array(3)].map((v, i) => (
            <Card key={i} className="shrink-0">
              i
            </Card>
          ))}
        </div>
      </section>
      <section>
        <div className="flex justify-between">
          <h2 className="title">오늘의 추천 주제</h2>
          <Button variant="ghostGray" size="sm" asChild>
            <Link href="/suggestion">전체보기</Link>
          </Button>
        </div>
        <p className={headerDescriptionStyle}>추천 주제로 기록을 쉽게 시작해보세요</p>
        <div className="flex gap-5 flex-wrap">
          {topics &&
            (Object.keys(topics) as TopicCategory[]).map((v, i) => {
              const randomTopicIdx = genRandomNum(0, topics[v].length);
              const topic = topics[v][randomTopicIdx];
              const Icon = topicCategory[v]?.Icon;

              return (
                <Card key={i} className="shrink-0">
                  <CardHeader className="flex gap-2 items-baseline">
                    <div className="flex gap-2 flex-1">
                      <div className="flex justify-center items-center rounded-[50%] flex-[0_0_24px] text-primary-900 group-hover:text-gray-400 w-6 h-6 bg-gray-50">
                        {Icon && <Icon width={16} height={16} color="#002861" />}
                      </div>
                      <CardTitle className="break-keep">{topic.category}</CardTitle>
                    </div>
                    <RotateCw width={20} height={20} className="text-gray-500 mt-[5px]" />
                  </CardHeader>
                  <CardContent>{topic.title}</CardContent>
                </Card>
              );
            })}
          <Card className="shrink-0" variant="disabled">
            <CardHeader className="flex gap-2 items-center">
              <Image src="/assets/icons/lock.png" width={24} height={24} alt="lock" />
              <CardTitle className="break-keep">잠겨있어요</CardTitle>
            </CardHeader>
            <CardContent>새로운 추천 주제를 준비하고있어요 나중에 만나요! 👀</CardContent>
          </Card>
        </div>
      </section>
      <section>
        <div className="flex justify-between">
          <h2 className="title">나의 기록</h2>
          <Button variant="ghostGray" size="sm" asChild>
            <Link href="">전체보기</Link>
          </Button>
        </div>
        <p className={headerDescriptionStyle}>오늘의 기록을 작성해주세요</p>
        <div className="flex gap-5 flex-wrap">
          {[...Array(2)].map((v, i) => (
            <Card key={i} className="shrink-0" size="lg">
              <CardHeader>
                <CardChip>No.{i}</CardChip>
                <CardTitle>제목 타이틀</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                내용 텍스트입니다.내용 텍스트입니다.내용 텍스트입니다.내용
                텍스트입니다.내용 텍스트입니다.내용 텍스트입니다.내용 텍스트입니다.내용
                텍스트입니다.내용 텍스트입니다.
                <span className="self-end mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
                  00월 00일
                </span>
              </CardContent>
              <CardFooter>
                {['칩1', '칩222', '칩333', '칩444'].map((v, i) => (
                  <CardChip key={i} position="footer">
                    {v}
                  </CardChip>
                ))}
              </CardFooter>
            </Card>
          ))}
          <NewCard />
        </div>
      </section>
    </div>
  );
};

export default HomeView;
