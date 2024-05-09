import { cn } from '@/lib/utils';
import DonutChart from '@/components/DonutChart';
import Chip from '@/components/Chip';
import useReportContext from '@/hooks/report/useReportContext';
import { useEffect, useState } from 'react';
import { ResPostType } from '@/types/postTypes';
import { topicCategory } from '@/utils/topicCategory';
import { TopicCategory } from '@/types/topicTypes';
import { getPercentage } from '@/utils';

const CHART_COLOR = [
  'bg-primary-900',
  'bg-primary-700',
  'bg-primary-400',
  'bg-primary-200',
];

const SAMPLE_POST_DATA: (Pick<ResPostType, 'title' | 'tags' | 'category'> & {
  date: string;
  percent: number;
})[] = [
  {
    title: '요즘 나의 최대 걱정거리',
    date: '04월 25일',
    tags: ['걱정'],
    percent: 35,
    category: '하루생각',
  },
  {
    title: '새벽 운동과 부상',
    date: '04월 24일',
    tags: ['성장'],
    percent: 25,
    category: '회고',
  },
  {
    title: '쉬어야 해 진짜',
    date: '04월 22일',
    tags: ['감사'],
    percent: 20,
    category: '크리에이티브',
  },
  {
    title: '쉬어야 해 진짜',
    date: '04월 22일',
    tags: ['감사'],
    percent: 20,
    category: '자아탐험',
  },
];

type ReportByTopicProps = {
  month: number;
};
const ReportByTopic = ({ month }: ReportByTopicProps) => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const { data } = useReportContext();
  const [RankdedTopic, setRankedTopic] = useState<
    [TopicCategory, ResPostType[]][] | null
  >(null);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | null>(null);

  const handleClickCategoryBar = (category: TopicCategory) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (!data) return;
    let total = 0;

    const sortedTopicByPostLengthArr = Object.entries(data.topic).sort((a, b) =>
      a[1].length > b[1].length ? -1 : 1,
    ) as [TopicCategory, ResPostType[]][];

    setRankedTopic(sortedTopicByPostLengthArr);

    sortedTopicByPostLengthArr.forEach(([, posts]) => {
      total += posts.length;
    });

    setTotalPostCount(total);
    setSelectedCategory(sortedTopicByPostLengthArr[0][0]);
  }, [data?.topic, month]);

  return (
    <section>
      <h2 className="title">기록 카테고리</h2>
      <p className={descriptionStyle}>
        <span className={strengthStyle}>
          {selectedCategory ? selectedCategory : '하루생각'}
        </span>{' '}
        카테고리를 가장 많이 작성했어요
      </p>
      <div className="flex rounded-lg overflow-hidden text-center h-9 leading-9">
        {RankdedTopic
          ? RankdedTopic.map(([category, posts], i) => (
              <div
                key={category + i}
                className={cn(
                  'flex justify-center items-center cursor-pointer',
                  CHART_COLOR[i],
                  i === RankdedTopic?.length - 1 && 'flex-1',
                )}
                style={{
                  width: `${getPercentage(posts.length, totalPostCount)}%`,
                }}
                onClick={() => handleClickCategoryBar(category)}
              >
                {topicCategory[category]?.Icon({
                  width: 16,
                  height: 16,
                  color: '#ffffff',
                })}
              </div>
            ))
          : SAMPLE_POST_DATA.map((data, i) => (
              <div
                key={data.category || '0' + i}
                className={cn('flex justify-center items-center', CHART_COLOR[i])}
                style={{
                  width: `${data.percent}%`,
                }}
              >
                {data.category &&
                  topicCategory[data.category]?.Icon({
                    width: 16,
                    height: 16,
                    color: '#ffffff',
                  })}
              </div>
            ))}
      </div>
      <div className="flex gap-x-5 mt-5">
        <div className={cn(boxStyle, 'flex gap-x-12')}>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-x-2">
              {topicCategory[selectedCategory || '하루생각'].Icon({
                width: 24,
                height: 24,
                color: '#002861',
              })}
              <span className="font-sb22 text-primary-900">
                {selectedCategory || '하루생각'}
              </span>
            </div>
            <span className="font-r16 text-gray-800 flex items-center">
              작성한 글{' '}
              <b className="font-m36 text-primary-900 mx-2">
                {selectedCategory ? data?.topic[selectedCategory]?.length : 12}
              </b>{' '}
              개
            </span>
          </div>
          <div>
            <DonutChart
              data={
                RankdedTopic
                  ? getPercentage(
                      selectedCategory ? (data?.topic[selectedCategory] || []).length : 0,
                      totalPostCount,
                    )
                  : 32
              }
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-y-4">
          {(selectedCategory ? data?.topic[selectedCategory] || [] : SAMPLE_POST_DATA)
            .slice(0, 3)
            .map((post, i) => (
              <div
                key={i}
                className="flex p-3 rounded-lg border border-gray-100 items-center"
              >
                <div className="font-r14 text-gray-500">
                  {'writeDate' in post
                    ? `${new Date(post.writeDate).getMonth() + 1}월 ${new Date(post.writeDate).getDate()}일`
                    : post.date}
                </div>
                <div className="ml-[25px] mr-3 flex-1 font-r16 text-gray-900">
                  {post.title}
                </div>
                {!!post.tags.length && <Chip variant="gray">{post.tags[0]}</Chip>}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ReportByTopic;
