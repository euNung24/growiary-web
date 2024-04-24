import {
  TopicCard,
  TopicCardChip,
  TopicCardContent,
  TopicCardFooter,
  TopicCardHeader,
  TopicCardTitle,
} from '@/components/TopicCard';
import { Button, ButtonIcon } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SuggestionView = () => {
  const topics = [
    {
      category: '하루를 돌아보는 소소한',
      questions: ['하루를 돌아보는 소소한1', '하루를 돌아보는 소소한2'],
      description: '그루어리 사용자 000명이 평균 0.0회 작성한 주제',
    },
    {
      category: '하루를 돌아보는 소소한',
      questions: [
        '하루를 돌아보는 소소한1',
        '하루를 돌아보는 소소한2',
        '하루를 돌아보는 소소한1',
        '하루를 돌아보는 소소한2',
      ],
      description: '그루어리 사용자 000명이 평균 0.0회 작성한 주제',
    },
  ];

  const categories = [
    '성장을 위한 회고 프레임워크',
    '몰랐던 나를 발견하는',
    '하루를 돌아보는 소소한',
    '하루를 돌아보는 소소한',
  ];

  return (
    <>
      <section>
        <h2 className="title">다채로운 질문들을 만나보세요</h2>
        <div className="flex gap-5 mt-6">
          {topics.map((v, i) => (
            <div key={i}>
              <TopicCard className="shrink-0">
                <TopicCardHeader>
                  <TopicCardChip>주간 인기</TopicCardChip>
                  <TopicCardTitle>{v.category}</TopicCardTitle>
                </TopicCardHeader>
                <TopicCardContent>
                  <ul className="list-disc ml-5">
                    {v.questions.map((w, j) => (
                      <li key={j}>{w}</li>
                    ))}
                  </ul>
                </TopicCardContent>
                <TopicCardFooter>
                  <Button
                    size="full"
                    className={cn(
                      'bg-primary-50 text-primary-900/90 group-hover:bg-white-0',
                    )}
                  >
                    <ButtonIcon src="/assets/icons/edit.png" alt="write" />이 주제로
                    글쓰기
                  </Button>
                </TopicCardFooter>
              </TopicCard>
              <p className="text-gray-400 font-r16 ml-3 mt-3">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
      <hr className="border-gray-100 mt-[46px] mb-6" />
      <section>
        <ul className="flex justify-between">
          {categories.map((v, i) => (
            <li
              key={i}
              className={cn(
                'flex font-sb16 p-3 gap-2',
                i === 0
                  ? 'text-primary-900 border-b-2 border-primary-900'
                  : 'text-gray-500',
              )}
            >
              <Image src="/assets/icons/edit.png" alt="" width={24} height={24} />
              {v}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-6 text-gray-700 mt-9">
          {[...new Array(8)].map((v, i) => (
            <li
              key={i}
              className={cn(
                'px-6 py-4 rounded-md',
                'hover:bg-primary-900 hover:text-white-0',
                'border border-gray-100',
              )}
            >
              정말 하고 싶었는데 못했던 일이 있나요? 원했던 그 일을 할 수 없었던 이유는
              무엇인가요?
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SuggestionView;
