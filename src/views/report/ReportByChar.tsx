import { cn } from '@/lib/utils';
import { Triangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ResPostType } from '@/types/postTypes';
import useReportContext from '@/hooks/report/useReportContext';
import { format } from 'date-fns';

type ReportByCharProps = {
  month: number;
};
const ReportByChar = ({ month }: ReportByCharProps) => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const [topic, setTopic] = useState<[string, ResPostType[]][] | null>(null);
  const [maxChar, setMaxChar] = useState(0);
  const [posts, setPosts] = useState<ResPostType[]>([]);
  const [charsWithPrev, setCharsWithPrev] = useState<number[]>([]);

  const { data } = useReportContext();

  useEffect(() => {
    if (!data || !data?.topic?.[month] || !Object.keys(data.topic[month])) return;
    const posts = [] as ResPostType[];

    Object.values(data.topic?.[month]).forEach(monthPosts => posts.push(...monthPosts));
    const filteredByMonth = posts.filter(
      post => new Date(post.writeDate).getMonth() === month,
    );

    filteredByMonth.sort((a, b) =>
      new Date(a.charactersCount) > new Date(b.charactersCount) ? -1 : 1,
    );
    setPosts(filteredByMonth.slice(0, 3));
    setMaxChar(filteredByMonth[0]?.charactersCount);

    const reversedMonthCharData = data.charCount.slice(0, month + 1).reverse();
    const lastIndex = reversedMonthCharData.findIndex(v => !v.sum);
    const prevChars =
      lastIndex > 0 && reversedMonthCharData.slice(0, lastIndex).map(v => v.sum);
    prevChars && setCharsWithPrev(prevChars.slice(0, 4));
  }, [data?.topic]);

  return (
    data && (
      <section>
        <h2 className="title">글자수</h2>
        <p className={descriptionStyle}>
          <span className={strengthStyle}>
            {(data?.charCount?.[month].sum || 0).toLocaleString()}
          </span>{' '}
          글자를 작성했어요.
        </p>
        <div className={cn(boxStyle)}>
          <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
            <span>
              전체{' '}
              <b className="ml-[5px] text-gray-700">{data?.charCount?.[month].sum}개</b>
            </span>
            <span>
              평균{' '}
              <b className="ml-[5px] text-gray-700">{data?.charCount?.[month].avg}개</b>
            </span>
            <span>
              최대 <b className="ml-[5px] text-gray-700">{maxChar || 0}개</b>
            </span>
          </div>
          <div className="flex gap-x-3">
            {charsWithPrev.map((char, i) => (
              <div
                key={i}
                className="group flex-1 bg-primary-50 rounded-xl px-6 py-3 text-primary-900 hover:bg-primary-700 hover:text-white-0"
              >
                <div className="flex justify-between text-gray-500 group-hover:text-white-0">
                  <span className="font-r16">{month + 1 - i}월</span>
                  {i === 0 && charsWithPrev.length >= 2 && (
                    <span className="font-r12 flex items-center gap-x-0.5">
                      {(char - charsWithPrev[1] || 0).toLocaleString()}자
                      <Triangle
                        className={cn(
                          'text-primary-200',
                          char < charsWithPrev[1] && 'scale-y-[-1]',
                        )}
                        fill="#96A8CA"
                        width={6}
                        height={6}
                      />
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center font-m36 mt-2 mb-[38px] group-hover:text-white-0">
                  {(char || 0).toLocaleString()}{' '}
                  <span className="ml-2 text-gray-800 font-r16 group-hover:text-white-0">
                    자
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {posts.map((post, i) => (
            <div
              className={cn('flex items-center text-gray-800 font-r14', boxStyle)}
              key={post.id + i}
            >
              <span className="bg-primary-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div className="ml-6 mr-8">
                <div className="flex items-center gap-3">
                  <span className="font-sb16">{post.title}</span>
                  <span className="text-gray-500 font-r12 ">
                    {format(new Date(post.writeDate), 'M월 d일')}
                  </span>
                </div>
                <div
                  className="overflow-hidden text-ellipsis font-r14 mt-[3px]"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    maxHeight: '44px',
                  }}
                >
                  {posts[0].content.ops.map(op =>
                    typeof op.insert === 'string' && op.insert !== '\n' ? op.insert : '',
                  )}
                </div>
              </div>
              <div className="flex items-center gap-x-1 shrink-0">
                <span className="font-r14 text-gray-400">작성한 글자</span>
                <span className="font-r16 text-primary-500">
                  {post.charactersCount}자
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  );
};

export default ReportByChar;
