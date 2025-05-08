import LinkOrLogin from '@/shared/components/LinkOrLogin';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { toast } from '@/shared/components/ui/use-toast';
import { TopicCategory, TopicType } from '@user/topic/models/topic';
import { genRandomNum } from '@/shared/utils';
import { topicCategory } from '@/shared/utils/topicCategory';
import { onTrackingHandler, trackingAnalytics } from '@/shared/utils/trackingAnalytics';
import { RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';

type HomeTopicCardProps = {
  category: TopicCategory;
  topics: TopicType[];
};

const HomeTopicCard = ({ category, topics }: HomeTopicCardProps) => {
  const [randomTopicIdx, setRandomTopicIdx] = useState<number | null>(null);

  useEffect(() => {
    setRandomTopicIdx(genRandomNum(0, topics.length));
  }, []);
  if (randomTopicIdx === null) {
    return (
      <Card className="shrink-0" variant="disabled">
        <CardHeader className="flex gap-2 items-center">
          <Skeleton className="w-6 h-6" />
          <CardTitle className="break-keep">
            <Skeleton />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full mt-2" />
          <Skeleton className="w-full mt-2" />
        </CardContent>
      </Card>
    );
  }

  const selectedTopic = topics[randomTopicIdx];
  const Icon = topicCategory[category]?.Icon;

  const changeTopicTitle = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();

    let newRandomTopicIdx;

    if (topics.length <= 1) {
      trackingAnalytics(`오늘의 추천 주제_새로고침(${category})`);
      toast({
        description: '이 카테고리에 더 이상 주제가 없습니다.',
      });

      return;
    }

    while (newRandomTopicIdx === undefined || newRandomTopicIdx === randomTopicIdx) {
      newRandomTopicIdx = genRandomNum(0, topics.length);
    }

    setRandomTopicIdx(newRandomTopicIdx);

    trackingAnalytics(`오늘의 추천 주제_새로고침(${category})`);
  };

  return (
    <LinkOrLogin
      href={`/post?topic=${selectedTopic.id}&category=${category}`}
      handleClick={onTrackingHandler('기록하기')}
    >
      <Card className="shrink-0">
        <CardHeader className="flex gap-2 items-center">
          <div className="flex gap-2 flex-1">
            <div className="flex justify-center items-center rounded-[50%] flex-[0_0_24px] text-primary-900 group-hover:text-gray-400 w-6 h-6 bg-gray-50">
              {Icon && <Icon width={16} height={16} color="#002861" />}
            </div>
            <CardTitle className="break-keep">{selectedTopic?.category}</CardTitle>
          </div>
          {category !== '자유' && (
            <RotateCw
              width={20}
              height={20}
              className="text-gray-500 mt-[5px] cursor-pointer group-hover:text-white-0"
              onClick={changeTopicTitle}
            />
          )}
        </CardHeader>
        <CardContent className="overflow-hidden">
          {selectedTopic.title.split('/n').map((text, i) => (
            <p key={i} className="overflow-hidden whitespace-nowrap text-ellipsis">
              {text}
              <br />
            </p>
          ))}
        </CardContent>
      </Card>
    </LinkOrLogin>
  );
};

export default HomeTopicCard;
