import useReportContext from '@user/report/hooks/useReportContext';
import { useEffect, useState } from 'react';
import { ResPostType } from '@user/post/types/post';
import Chip from '@/shared/components/Chip';
import { cn } from '@/shared/utils/cn';

const SAMPLE_TAG = [
  {
    count: '22',
    tag: '성장',
  },
  {
    count: '15',
    tag: '운동',
  },
  {
    count: '12',
    tag: '계획',
  },

  {
    count: '11',
    tag: '건강',
  },
  {
    count: '7',
    tag: '생각',
  },
];

const SAMPLE_NEW_TAG = [
  {
    date: '04월 29일',
    tag: '운동',
  },
  {
    date: '04월 25일',
    tag: '계획',
  },
  {
    date: '04월 29일',
    tag: '걱정',
  },
  {
    date: '04월 29일',
    tag: '투정',
  },
  {
    date: '04월 28일',
    tag: '부상',
  },
];
const ReportByTag = () => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';

  const { data, monthIndex } = useReportContext();
  const [sortedTags, setSortedTags] = useState<[string, number][] | null>();
  const [sortedNewTags, setSortedNewTags] = useState<[string, ResPostType][] | null>();

  useEffect(() => {
    const monthTag = data?.tags?.[monthIndex];
    if (!monthTag) return;

    const sortedMonthTag = Object.entries(monthTag)
      .sort((a, b) => (a[1] > b[1] ? -1 : 1))
      .slice(0, 5);
    setSortedTags(sortedMonthTag);
  }, [data?.tags, monthIndex]);

  useEffect(() => {
    const monthNewTag = data?.newTags?.[monthIndex];
    if (!monthNewTag) return;

    const sortedNewMonthTag = Object.entries(monthNewTag)
      .map(([tag, posts]) => {
        const sortedPostByWriteDate = posts.toSorted((a, b) =>
          new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1,
        );
        return [tag, sortedPostByWriteDate[0]] as [string, ResPostType];
      })
      .toSorted((a, b) => (a[1].writeDate > b[1].writeDate ? -1 : 1));

    setSortedNewTags(sortedNewMonthTag);
  }, [data?.newTags, monthIndex]);

  return (
    <section>
      <h2 className="title">기록 태그</h2>
      {data?.tags && !Object.keys(data.tags[monthIndex]).length && (
        <div className="[&+*]:hidden bg-primary-50 rounded-2xl flex flex-col items-center justify-center font-r16 text-gray-800 mt-4 py-16">
          <p>아직 충분한 양의 태그를 수집하지 못했어요.</p>
          <p>
            기록과 태그를 풍부하게 작성할수록 더욱 명확한 데이터 결과를 보여드릴 수 있어요
          </p>
        </div>
      )}
      <div className="flex gap-[22px] flex-wrap">
        <div className="flex-1">
          <p className={descriptionStyle}>
            <span className={strengthStyle}>
              {sortedTags ? sortedTags?.[0]?.[0] : '성장'}
            </span>{' '}
            태그가 가장 많아요
          </p>
          <div className="space-y-4 group/parent">
            {!sortedTags &&
              SAMPLE_TAG.map(({ tag, count }, i) => (
                <div
                  key={tag + count}
                  className={cn(
                    'group flex gap-x-3 pl-7 pr-4 py-5 border border-gray-100 rounded-xl font-r22 items-center transition-colors duration-150',
                    i === 0
                      ? 'bg-primary-900 text-white-0 group-hover/parent:bg-white-0 hover:!bg-primary-900 hover:!text-white-0'
                      : 'text-gray-900 hover:bg-primary-900 hover:text-white-0',
                  )}
                >
                  <i className="bg-primary-50 rounded-full w-6 h-6 inline-block flex justify-center items-center not-italic	font-r10-5 text-gray-900">
                    {i + 1}
                  </i>
                  <span
                    className={cn(
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-900 group-hover:!text-white-0',
                    )}
                  >
                    {tag}
                  </span>
                  {SAMPLE_NEW_TAG.map(v => v.tag).includes(tag) && (
                    <Chip variant="gray" className="self-auto">
                      New
                    </Chip>
                  )}
                  <span
                    className={cn(
                      'ml-auto font-r18 text-gray-500 group-hover:text-white-0',
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-500 group-hover:!text-white-0',
                    )}
                  >
                    {count}개
                  </span>
                </div>
              ))}
            {sortedTags &&
              sortedTags?.map(([tag, count], i) => (
                <div
                  key={tag + count}
                  className={cn(
                    'group flex gap-x-3 pl-7 pr-4 py-5 border border-gray-100 rounded-xl font-r22 items-center transition-colors duration-150',
                    i === 0
                      ? 'bg-primary-900 text-white-0 group-hover/parent:bg-white-0 hover:!bg-primary-900 hover:!text-white-0'
                      : 'text-gray-900 hover:bg-primary-900 hover:text-white-0',
                  )}
                >
                  <i className="bg-primary-50 rounded-full w-6 h-6 inline-block flex justify-center items-center not-italic	font-r10-5 text-gray-900">
                    {i + 1}
                  </i>
                  <span
                    className={cn(
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-900 group-hover:!text-white-0',
                    )}
                  >
                    {tag}
                  </span>
                  {Object.keys(data?.newTags[monthIndex] || []).includes(tag) && (
                    <Chip variant="gray" className="self-auto">
                      New
                    </Chip>
                  )}
                  <span
                    className={cn(
                      'ml-auto font-r18 text-gray-500 group-hover:text-white-0',
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-500 group-hover:!text-white-0',
                    )}
                  >
                    {count}개
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex-1">
          <p className={descriptionStyle}>
            <span className={strengthStyle}>
              {sortedNewTags ? sortedNewTags?.length : 8}개
            </span>
            의 태그가 새롭게 등장했어요
          </p>
          <div className="space-y-4 group/parent">
            {sortedNewTags &&
              sortedNewTags?.slice(0, 5).map(([tag, post], i) => (
                <div
                  key={tag + i}
                  className={cn(
                    'group flex gap-x-3 pl-7 pr-4 py-5 border border-gray-100 rounded-xl font-r22 items-center transition-colors duration-150',
                    i === 0
                      ? 'bg-primary-900 text-white-0 group-hover/parent:bg-white-0 hover:!bg-primary-900 hover:!text-white-0'
                      : 'text-gray-900 hover:bg-primary-900 hover:text-white-0',
                  )}
                >
                  <span
                    className={cn(
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-900 group-hover:!text-white-0',
                    )}
                  >
                    {tag}
                  </span>
                  <span
                    className={cn(
                      'ml-auto font-r18 text-gray-500 group-hover:text-white-0',
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-500 group-hover:!text-white-0',
                    )}
                  >
                    {new Date(post.writeDate).getMonth() + 1}월{' '}
                    {new Date(post.writeDate).getDate()}일
                  </span>
                </div>
              ))}
            {!sortedNewTags &&
              SAMPLE_NEW_TAG.map(({ date, tag }, i) => (
                <div
                  key={tag + i}
                  className={cn(
                    'group flex gap-x-3 pl-7 pr-4 py-5 border border-gray-100 rounded-xl font-r22 items-center transition-colors duration-150',
                    i === 0
                      ? 'bg-primary-900 text-white-0 group-hover/parent:bg-white-0 hover:!bg-primary-900 hover:!text-white-0'
                      : 'text-gray-900 hover:bg-primary-900 hover:text-white-0',
                  )}
                >
                  <span
                    className={cn(
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-900 group-hover:!text-white-0',
                    )}
                  >
                    {tag}
                  </span>
                  <span
                    className={cn(
                      'ml-auto font-r18 text-gray-500 group-hover:text-white-0',
                      i === 0 &&
                        'text-white-0 group-hover/parent:text-gray-500 group-hover:!text-white-0',
                    )}
                  >
                    {date}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportByTag;
