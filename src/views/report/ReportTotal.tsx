import { cn } from '@/lib/utils';
import Chip from '@/components/Chip';
import useReportContext from '@/hooks/report/useReportContext';
import { useEffect, useState } from 'react';
import { ReportByTopicType } from '@/types/reportTypes';

type ReportTotal = {
  year: number;
  month: string;
};

const DATE = ['일', '월', '화', '수', '목', '금', '토'];
const TIME = ['아침', '점심', '낮', '저녁'];

const ReportTotal = ({ year, month }: ReportTotal) => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const chipStyle = 'py-1 bg-gray-50 text-primary-900 font-medium mr-1';
  const { data } = useReportContext();
  const [topTopic, setTopTopic] = useState<string | null>(null);
  const [topNewTag, setTopNewTag] = useState<string | null>(null);
  const monthIndex = +month - 1;

  useEffect(() => {
    const topic = data?.topic?.[monthIndex];
    if (!topic || !Object.keys(topic).length) return;
    const copiedTopic: ReportByTopicType = { ...topic };
    delete copiedTopic['Uncategorized'];

    const sortedTopicByPostLengthArr = Object.entries(copiedTopic).sort((a, b) =>
      a[1].length > b[1].length ? -1 : 1,
    );

    setTopTopic(sortedTopicByPostLengthArr[0][0]);
  }, [data?.topic, month]);

  useEffect(() => {
    const monthNewTag = data?.newTags?.[monthIndex];
    if (!monthNewTag || !Object.keys(monthNewTag).length) return;

    let sortedNewMonthTag = Object.entries(monthNewTag).sort((a, b) =>
      a[1].length > b[1].length ? -1 : 1,
    );
    sortedNewMonthTag = sortedNewMonthTag.map(([tag, posts]) => [
      tag,
      [...posts].sort((a, b) => (new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1)),
    ]);
    setTopNewTag(sortedNewMonthTag[0][0]);
  }, [data?.newTags, month]);

  return (
    <section>
      <h2 className="title">리포트 요약</h2>
      <ul
        className={cn(
          boxStyle,
          'flex flex-col gap-y-4 mt-5 list-disc marker:text-gray-400 pl-10',
        )}
      >
        {data && (
          <>
            <li>
              총{' '}
              <Chip className={chipStyle}>{data.post?.user[`${year}-${month}`]}개</Chip>의
              글을{' '}
              <Chip className={chipStyle}>
                {data.charCount?.[`${year}-${month}`].sum}자
              </Chip>
              로 작성했어요.
            </li>
            <li>
              주로{' '}
              <Chip className={chipStyle}>
                {data.week?.[monthIndex] &&
                  DATE[
                    data.week[monthIndex].findIndex(
                      v => v === Math.max(...data.week[monthIndex]),
                    )
                  ]}
                요일
              </Chip>
              ,{' '}
              <Chip className={chipStyle}>
                {data.time?.[monthIndex] &&
                  TIME[
                    data.time[monthIndex].findIndex(
                      v => v === Math.max(...data.time[monthIndex]),
                    )
                  ]}
                시간
              </Chip>
              에 글 작성했어요.
            </li>
          </>
        )}
        {data && topTopic && (
          <li>
            <Chip className={chipStyle}>{topTopic}</Chip>와 관련한 글을 가장 많이
            작성했어요.
          </li>
        )}
        {data && topNewTag && (
          <li>
            지난 {monthIndex !== 0 ? +month : 12}월과 비교해 새로 등장한 태그는{' '}
            <Chip className={chipStyle}>{topNewTag}</Chip>
            이에요.
          </li>
        )}
      </ul>
    </section>
  );
};

export default ReportTotal;
