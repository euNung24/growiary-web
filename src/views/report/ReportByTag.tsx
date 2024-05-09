import useReportContext from '@/hooks/report/useReportContext';
import { useEffect, useState } from 'react';
import { ResPostType } from '@/types/postTypes';

type ReportByTagProps = {
  month: number;
};

// const SAMPLE_NEW_TAG = [
//   {
//     date: '04월 29일',
//     tag: '운동',
//   },
//   {
//     date: '04월 25일',
//     tag: '계획',
//   },
//   {
//     date: '04월 29일',
//     tag: '걱정',
//   },
//   {
//     date: '04월 29일',
//     tag: '투정',
//   },
//   {
//     date: '04월 28일',
//     tag: '부상',
//   },
// ];
const ReportByTag = ({ month }: ReportByTagProps) => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const { data } = useReportContext();
  const [sortedTags, setSortedTags] = useState<[string, number][] | null>();
  const [sortedNewTags, setSortedNewTags] = useState<[string, ResPostType[]][] | null>();

  useEffect(() => {
    const monthTag = data?.tags?.[month];
    if (!monthTag) return;

    const sortedMonthTag = Object.entries(monthTag)
      .sort((a, b) => (a[1] > b[1] ? -1 : 1))
      .slice(0, 5);
    setSortedTags(sortedMonthTag);
  }, [data?.tags, month]);

  useEffect(() => {
    const monthNewTag = data?.newTags?.[month];
    if (!monthNewTag) return;

    let sortedNewMonthTag = Object.entries(monthNewTag).sort((a, b) =>
      a[1].length > b[1].length ? -1 : 1,
    );
    sortedNewMonthTag = sortedNewMonthTag.map(([tag, posts]) => [
      tag,
      [...posts].sort((a, b) => (new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1)),
    ]);
    setSortedNewTags(sortedNewMonthTag);
  }, [data?.newTags, month]);

  return (
    <section>
      <h2 className="title">태그</h2>
      <div className="flex gap-x-[22px]">
        <div className="flex-1">
          <p className={descriptionStyle}>
            <span className={strengthStyle}>{sortedTags?.[0]?.[1]}개</span>의 태그를
            사용했어요
          </p>
          <div className="space-y-4">
            {sortedTags?.map(([tag, count], i) => (
              <div
                key={tag + count}
                className="flex gap-x-3 pl-7 pr-4 py-5 border border-gray-100 rounded-xl font-r22 text-gray-900 items-center"
              >
                <i className="bg-primary-50 rounded-full w-6 h-6 inline-block flex justify-center items-center not-italic	font-r10-5">
                  {i + 1}
                </i>
                <span>{tag}</span>
                {/*<Chip variant="gray" className="self-auto">*/}
                {/*  New*/}
                {/*</Chip>*/}
                <span className="ml-auto text-gray-700">{count}개</span>
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
          <div className="space-y-4">
            {sortedNewTags?.[0] && (
              <div className="flex flex-col gap-x-3 gap-y-2.5 pl-10 pr-4 py-5 bg-primary-900 border border-gray-100 rounded-xl font-r22 text-white-0">
                <div className="flex justify-between">
                  <span>{sortedNewTags[0][0]}</span>
                  <span>
                    {new Date(sortedNewTags[0][1][0].writeDate).getMonth() + 1}월{' '}
                    {new Date(sortedNewTags[0][1][0].writeDate).getDate()}일
                  </span>
                </div>
                <p className="text-gray-100 font-r18">
                  이 태그가 사용된 글 {sortedNewTags?.[0]?.[1]?.length}개
                </p>
              </div>
            )}

            {sortedNewTags?.slice(0, 5).map(([tag, posts], i) => (
              <div
                key={tag + i}
                className="flex gap-x-3 pl-10 pr-4 py-5 border border-gray-100 rounded-xl font-r22 text-gray-900 items-center"
              >
                <span>{tag}</span>
                <span className="ml-auto text-gray-700">
                  {new Date(posts[0].writeDate).getMonth() + 1}월{' '}
                  {new Date(posts[0].writeDate).getDate()}일
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
