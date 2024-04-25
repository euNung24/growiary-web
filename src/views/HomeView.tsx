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

const HomeView = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const topics = useGetTopicsByCategory();

  return (
    <div className="space-y-[72px]">
      <section>
        <h2 className="title">기록 리포트</h2>
        <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
        <div className="flex gap-5">
          {[...Array(3)].map((v, i) => (
            <Card key={i} className="shrink-0">
              i
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="title">오늘의 추천 주제</h2>
        <p className={headerDescriptionStyle}>추천 주제로 기록을 쉽게 시작해보세요</p>
        <div className="flex gap-5">
          {(Object.keys(topics) as TopicCategory[]).map((v, i) => {
            const randomTopicIdx = genRandomNum(0, topics[v].length);
            const topic = topics[v][randomTopicIdx];
            const { Icon } = topicCategory[v];

            return (
              <Card key={i} className="shrink-0" variant="disabled">
                <CardHeader className="flex gap-2">
                  <Icon />
                  <CardTitle>{topic.category}</CardTitle>
                  <Image
                    src="/vercel.svg"
                    width={24}
                    height={24}
                    alt="icon"
                    className="ml-auto"
                  />
                </CardHeader>
                <CardContent>{topic.title}</CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <section>
        <h2 className="title">나의 기록</h2>
        <p className={headerDescriptionStyle}>오늘의 기록을 작성해주세요</p>
        <div className="flex gap-5">
          {[...Array(3)].map((v, i) => (
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
        </div>
      </section>
    </div>
  );
};

export default HomeView;
