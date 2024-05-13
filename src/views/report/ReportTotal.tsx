import { cn } from '@/lib/utils';
import Chip from '@/components/Chip';
import useReportContext from '@/hooks/report/useReportContext';
import { useEffect, useState } from 'react';
import { ReportByTopicType } from '@/types/reportTypes';
import useProfileContext from '@/hooks/profile/useProfileContext';

type ReportTotal = {
  year: number;
  month: string;
};

const DATE = ['일', '월', '화', '수', '목', '금', '토'];
const TIME = ['새벽', '아침', '오후', '저녁'];

const ReportTotal = ({ year, month }: ReportTotal) => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const chipStyle = 'py-1 px-2 bg-gray-50 text-primary-900 font-m16 mr-1 leading-[100%]';

  const { profile } = useProfileContext();
  const { data } = useReportContext();
  const [topTopic, setTopTopic] = useState<string | null>(null);
  const [topNewTag, setTopNewTag] = useState<string | null>(null);
  const monthIndex = +month - 1;

  useEffect(() => {
    const topic = data?.topic;
    if (!topic || !Object.keys(topic).length) return;
    const copiedTopic: ReportByTopicType = { ...topic };

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
      <h2 className="title">기록 데이터 요약</h2>
      {(!profile || !data) && (
        <ul
          className={cn(
            boxStyle,
            'flex flex-col gap-y-4 mt-5 list-outside list-disc font-r16 marker:text-gray-400 pl-10 [&>*]:pl-2.5',
          )}
        >
          <li>
            총 <Chip className={chipStyle}>38개</Chip>의 글을{' '}
            <Chip className={chipStyle}>11,310자</Chip>
            작성했어요
          </li>
          <li>
            주로 <Chip className={chipStyle}>목요일</Chip>,{' '}
            <Chip className={chipStyle}>저녁 시간</Chip>에 작성했어요
          </li>
          <li>
            <Chip className={chipStyle}>하루생각</Chip>와 관련한 글을 가장 많이 작성했어요
          </li>
          <li>
            지난 3월과 비교해 새로 등장한 태그는 <Chip className={chipStyle}>운동</Chip>
            이에요.
          </li>
        </ul>
      )}

      {data && (
        <ul
          className={cn(
            boxStyle,
            'flex flex-col gap-y-4 mt-5 list-outside list-disc font-r16 marker:text-gray-400 pl-10 [&>*]:pl-2.5',
          )}
        >
          <li>
            총 <Chip className={chipStyle}>{data.post?.user[`${year}-${month}`]}개</Chip>
            의 글을{' '}
            <Chip className={chipStyle}>
              {data.charCount?.[`${year}-${month}`]?.sum}자
            </Chip>
            작성했어요
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
            에 작성했어요
          </li>
          {topTopic && (
            <li>
              <Chip className={chipStyle}>{topTopic}</Chip>와 관련한 글을 가장 많이
              작성했어요
            </li>
          )}
          {topNewTag && (
            <li>
              지난 {monthIndex !== 0 ? monthIndex : 12}월과 비교해 새로 등장한 태그는{' '}
              <Chip className={chipStyle}>{topNewTag}</Chip>
              이에요.
            </li>
          )}
        </ul>
      )}
    </section>
  );
};

export default ReportTotal;
