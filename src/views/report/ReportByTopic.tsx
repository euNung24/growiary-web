import { cn } from '@/lib/utils';
import DonutChart from '@/components/DonutChart';
import Chip from '@/components/Chip';
import useReportContext from '@/hooks/report/useReportContext';
import { useEffect, useRef, useState } from 'react';
import { ResPostType } from '@/types/postTypes';
import { topicCategory } from '@/utils/topicCategory';
import { ReportByTopicType } from '@/types/reportTypes';
import { TopicCategory } from '@/types/topicTypes';
import { getPercentage } from '@/utils';

function isCategoryInTopicCategory(category: string): category is TopicCategory {
  return category in topicCategory;
}

const CHART_COLOR = [
  'bg-primary-900',
  'bg-primary-700',
  'bg-primary-400',
  'bg-primary-200',
];
const ReportByTopic = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const { topic: topicData, month } = useReportContext();
  const [topic, setTopic] = useState<[string, ResPostType[]][] | null>(null);
  const totalPostRef = useRef(0);

  useEffect(() => {
    const topic = topicData?.[month];
    if (!topic) return;
    const copiedTopic: ReportByTopicType = { ...topic };
    delete copiedTopic['Uncategorized'];

    const sortedTopicByPostLengthArr = Object.entries(copiedTopic).sort((a, b) =>
      a[1].length > b[1].length ? -1 : 1,
    );

    setTopic(sortedTopicByPostLengthArr);
    sortedTopicByPostLengthArr.forEach(([, posts]) => {
      totalPostRef.current += posts.length;
    });

    return () => {};
  }, [topicData, month]);

  return (
    <section>
      <h2 className="title">주제</h2>
      <p className={descriptionStyle}>
        <span className={strengthStyle}>{topic?.[0]?.[0]}</span>로 많은 글쓰기를 했어요.
      </p>
      <div className="flex rounded-lg overflow-hidden text-center h-9 leading-9">
        {topic?.map(
          ([category, posts], i) =>
            isCategoryInTopicCategory(category) && (
              <div
                key={category + i}
                className={cn('flex justify-center items-center', CHART_COLOR[i])}
                style={{
                  width: `${getPercentage(posts.length, totalPostRef.current)}%`,
                }}
              >
                {topicCategory[category]?.Icon({
                  width: 16,
                  height: 16,
                  color: '#ffffff',
                })}
              </div>
            ),
        )}
      </div>
      <div className="flex gap-x-5 mt-5">
        <div className={cn(boxStyle, 'flex gap-x-12')}>
          <div className="flex flex-col justify-between">
            <span className="font-sb22">{topic?.[0]?.[0]}</span>
            <span className="font-r16 text-gray-800 flex items-center">
              작성한 글{' '}
              <b className="font-m36 text-primary-900 mx-2">
                {topic?.[0]?.[1]?.length || 0}
              </b>{' '}
              개
            </span>
          </div>
          <div>
            <DonutChart
              data={getPercentage(topic?.[0]?.[1]?.length || 0, totalPostRef.current)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-y-4">
          {topic?.[0]?.[1]?.map((post, i) => (
            <div
              key={post.id + i}
              className="flex p-3 rounded-lg border border-gray-100 items-center"
            >
              <div className="font-r14 text-gray-500">
                {new Date(post.writeDate).getMonth() + 1}월{' '}
                {new Date(post.writeDate).getDate()}일
              </div>
              <div className="ml-[25px] mr-3 flex-1 font-r16 text-gray-900">
                {post.title}
              </div>
              {post.category && <Chip variant="secondary">{post.category}</Chip>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportByTopic;
