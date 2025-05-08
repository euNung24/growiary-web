import { cn } from '@/shared/utils/cn';
import Chip from '@/shared/components/Chip';
import useReportContext from '@/domain/user/report/hooks/useReportContext';
import { useEffect, useState } from 'react';
import { ReportByTopicType } from '@/domain/user/report/type';
import useProfileContext from '@/domain/profile/hooks/useProfileContext';
import { TIME, WEEK } from '@/shared/utils';
import { SAMPLE_REPORT } from '@/domain/user/report/utils/sample';

const ReportTotal = () => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const chipStyle = 'py-1 px-2 bg-gray-50 text-primary-900 font-m16 mr-1 leading-[100%]';

  const { isLogin } = useProfileContext();
  const { data, year, month: selectedMonth, monthIndex } = useReportContext();
  const [topTopic, setTopTopic] = useState<string | null>(null);
  const [topNewTag, setTopNewTag] = useState<string | null>(null);
  const month = selectedMonth.toString().padStart(2, '0');

  useEffect(() => {
    if (isLogin === 'NOT_LOGIN') {
      setTopTopic(SAMPLE_REPORT.topTopic);
      setTopNewTag(SAMPLE_REPORT.topNewTag);
    }
  }, [isLogin]);

  useEffect(() => {
    const topic = data?.topic;
    if (!topic || !Object.keys(topic).length) return;
    const copiedTopic: ReportByTopicType = { ...topic };

    const sortedTopicByPostLengthArr = Object.entries(copiedTopic).sort((a, b) =>
      a[1].length > b[1].length ? -1 : 1,
    );

    setTopTopic(sortedTopicByPostLengthArr[0][0]);
  }, [data?.topic, monthIndex]);

  useEffect(() => {
    const monthNewTag = data?.newTags?.[monthIndex];
    if (!monthNewTag) return;
    if (!Object.keys(monthNewTag).length) {
      setTopNewTag(null);
      return;
    }

    let sortedNewMonthTag = Object.entries(monthNewTag).sort((a, b) =>
      a[1].length > b[1].length ? -1 : 1,
    );
    sortedNewMonthTag = sortedNewMonthTag.map(([tag, posts]) => [
      tag,
      [...posts].sort((a, b) => (new Date(a.writeDate) > new Date(b.writeDate) ? -1 : 1)),
    ]);
    setTopNewTag(sortedNewMonthTag[0][0]);
  }, [data?.newTags, monthIndex]);

  return (
    <section>
      <h2 className="title">기록 데이터 요약</h2>
      <ul
        className={cn(
          boxStyle,
          'flex flex-col gap-y-4 mt-5 list-outside list-disc font-r16 marker:text-gray-400 pl-10 [&>*]:pl-2.5',
        )}
      >
        <li>
          총{' '}
          <Chip className={chipStyle}>
            {isLogin === 'LOGIN'
              ? data?.post?.user[`${year}-${month}`] || 0
              : SAMPLE_REPORT.totalPost}
            개
          </Chip>
          의 글을{' '}
          <Chip className={chipStyle}>
            {(isLogin === 'LOGIN'
              ? data?.charCount?.[`${year}-${month}`]?.sum || 0
              : SAMPLE_REPORT.totalReport
            ).toLocaleString()}
            자
          </Chip>
          작성했어요
        </li>
        <li>
          주로{' '}
          <Chip className={chipStyle}>
            {isLogin === 'LOGIN'
              ? data?.week?.[monthIndex] &&
                WEEK[
                  data.week[monthIndex].findIndex(
                    v => v === Math.max(...data.week[monthIndex]),
                  )
                ]
              : SAMPLE_REPORT.week}
            요일
          </Chip>
          ,{' '}
          <Chip className={chipStyle}>
            {isLogin === 'LOGIN'
              ? data?.time?.[monthIndex] &&
                TIME[
                  data.time[monthIndex].findIndex(
                    v => v === Math.max(...data.time[monthIndex]),
                  )
                ]
              : SAMPLE_REPORT.time}
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
    </section>
  );
};

export default ReportTotal;
