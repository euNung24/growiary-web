import { cn } from '@/shared/utils/cn';
import DonutChart from '@user/report/components/DonutChart';
import Chip from '@/shared/components/Chip';
import useReportContext from '@user/report/hooks/useReportContext';
import { useEffect, useState } from 'react';
import { ResPostType } from '@user/post/models/post';
import { topicCategory } from '@/shared/utils/topicCategory';
import { TopicCategory } from '@user/topic/models/topic';
import { getPercentage } from '@/shared/utils';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const CHART_COLOR = ['bg-gray-600', 'bg-gray-400', 'bg-gray-200', 'bg-gray-100'];

const SAMPLE_POST_DATA: (Pick<ResPostType, 'title' | 'tags'> & {
  date: string;
  percent: number;
  topic: {
    category: TopicCategory;
  };
})[] = [
  {
    title: '요즘 나의 최대 걱정거리',
    date: '04월 25일',
    tags: ['걱정'],
    percent: 35,
    topic: {
      category: '하루생각',
    },
  },
  {
    title: '새벽 운동과 부상',
    date: '04월 24일',
    tags: ['성장'],
    percent: 25,
    topic: {
      category: '회고',
    },
  },
  {
    title: '쉬어야 해 진짜',
    date: '04월 22일',
    tags: ['감사'],
    percent: 20,
    topic: {
      category: '크리에이티브',
    },
  },
  {
    title: '쉬어야 해 진짜',
    date: '04월 22일',
    tags: ['감사'],
    percent: 20,
    topic: {
      category: '자아탐험',
    },
  },
];

const ReportByTopic = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const { data, month } = useReportContext();
  const [rankedTopic, setRankedTopic] = useState<[TopicCategory, ResPostType[]][] | null>(
    null,
  );
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [clickedCategory, setClickedCategory] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | null>(null);

  const handleClickCategoryBar = (category: TopicCategory, idx: number) => {
    setSelectedCategory(category);
    setClickedCategory(idx);
    tracking('기록 카테고리_카테고리별 선택');
    sendGAEvent({ event: '기록 카테고리_카테고리별 선택' });
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
        <span className={strengthStyle}>{rankedTopic?.[0][0] || '하루생각'}</span>{' '}
        카테고리를 가장 많이 작성했어요
      </p>
      <div className="flex rounded-lg overflow-hidden text-center h-9 leading-9">
        {rankedTopic
          ? rankedTopic.map(([category, posts], i) => (
              <div
                key={category + i}
                className={cn(
                  'flex justify-center items-center cursor-pointer',
                  i === rankedTopic?.length - 1 && 'flex-1',
                  i < clickedCategory && CHART_COLOR[i],
                  i > clickedCategory && CHART_COLOR[i - 1],
                  i === clickedCategory && 'bg-primary-900',
                )}
                style={{
                  width: `${getPercentage(posts.length, totalPostCount)}%`,
                }}
                onClick={() => handleClickCategoryBar(category, i)}
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
                key={data.topic?.category || '0' + i}
                className={cn(
                  'flex justify-center items-center',
                  i === 0 ? 'bg-primary-900' : CHART_COLOR[i - 1],
                )}
                style={{
                  width: `${data.percent}%`,
                }}
              >
                {data.topic?.category &&
                  topicCategory[data.topic?.category]?.Icon({
                    width: 16,
                    height: 16,
                    color: '#ffffff',
                  })}
              </div>
            ))}
      </div>
      <div className="flex flex-wrap gap-5 mt-5">
        <div className={cn(boxStyle, 'flex gap-x-12 h-[188px] grow-0 w-[378px]')}>
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
            <span className="font-r16 text-gray-800 flex items-center flex-wrap">
              작성한 글{' '}
              <b className="font-m36 text-primary-900 mx-2">
                {selectedCategory ? data?.topic[selectedCategory]?.length : 12}
              </b>{' '}
              개
            </span>
          </div>
          <div className="ml-auto">
            <DonutChart
              data={
                rankedTopic
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
