import { cn } from '@/lib/utils';
import { Triangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ResPostType } from '@/types/postTypes';
import useReportContext from '@/hooks/report/useReportContext';
import { format } from 'date-fns';
import { ReportByCharCountType } from '@/types/reportTypes';

type ReportByCharProps = {
  year: number;
  month: string;
};
const ReportByChar = ({ year, month }: ReportByCharProps) => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const [maxChar, setMaxChar] = useState(0);
  const [posts, setPosts] = useState<ResPostType[]>([]);
  const [slicedData, setSlicedData] = useState<[string, ReportByCharCountType][]>([]);

  const { data } = useReportContext();
  const userData = data?.charCount?.[`${year}-${month}`];

  useEffect(() => {
    const monthIndex = +month - 1;
    if (!data || !data?.topic || !Object.keys(data.topic[monthIndex])) return;
    const posts = [] as ResPostType[];

    Object.values(data.topic?.[monthIndex]).forEach(monthPosts =>
      posts.push(...monthPosts),
    );
    const filteredByMonth = posts.filter(
      post => new Date(post.writeDate).getMonth() === monthIndex,
    );

    filteredByMonth.sort((a, b) =>
      new Date(a.charactersCount) > new Date(b.charactersCount) ? -1 : 1,
    );

    let prevCharDataLength = Object.keys(data.charCount).length;
    for (const charData of Object.values(data.charCount)) {
      if (charData.sum !== 0) {
        break;
      }
      prevCharDataLength--;
    }

    const slicedData = Object.entries(data.charCount)
      .reverse()
      .slice(0, prevCharDataLength);
    setSlicedData(slicedData);
    setPosts(filteredByMonth.slice(0, 3));
    setMaxChar(filteredByMonth[0]?.charactersCount);
  }, [data?.topic]);

  return (
    userData && (
      <section>
        <h2 className="title">기록 분량</h2>
        <p className={descriptionStyle}>
          <span className={strengthStyle}>{(userData.sum || 0).toLocaleString()}자</span>
          를 작성했어요
        </p>
        <div className={cn(boxStyle)}>
          <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
            <span>
              전체 <b className="ml-[5px] text-gray-700">{userData.sum}자</b>
            </span>
            <span>
              평균 <b className="ml-[5px] text-gray-700">{Math.round(userData.avg)}자</b>
            </span>
            <span>
              최대 <b className="ml-[5px] text-gray-700">{maxChar || 0}자</b>
            </span>
          </div>
          <div className="flex gap-x-3">
            {slicedData.map(
              ([date, data], i) =>
                data.sum > 0 && (
                  <div
                    key={i}
                    className="group flex-1 bg-primary-50 rounded-xl px-6 py-3 text-primary-900 hover:bg-primary-700 hover:text-white-0"
                  >
                    <div className="flex justify-between text-gray-500 group-hover:text-white-0">
                      <span className="font-r16">{+date.slice(-2)}월</span>
                      {i === 0 && slicedData.length >= 2 && (
                        <span className="font-r12 flex items-center gap-x-0.5">
                          {(data.sum - slicedData[1][1].sum || 0).toLocaleString()}자
                          <Triangle
                            className={cn(
                              'text-primary-200',
                              data.sum < slicedData[1][1].sum && 'scale-y-[-1]',
                            )}
                            fill="#96A8CA"
                            width={6}
                            height={6}
                          />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center font-m36 mt-2 mb-[38px] group-hover:text-white-0">
                      {(data.sum || 0).toLocaleString()}{' '}
                      <span className="ml-2 text-gray-800 font-r16 group-hover:text-white-0">
                        자
                      </span>
                    </div>
                  </div>
                ),
            )}
            {slicedData.length === 1 && (
              <div className="group flex-1 bg-primary-50 rounded-xl px-6 py-3 text-primary-900 hover:bg-primary-700 hover:text-white-0">
                <div className="flex justify-between text-gray-500 group-hover:text-white-0">
                  <span className="font-r16">
                    {+Object.keys(data?.charCount).reverse()[1].slice(-2)}월
                  </span>
                </div>
                <div className="flex items-center justify-center font-m36 mt-2 mb-[38px] group-hover:text-white-0">
                  0
                  <span className="ml-2 text-gray-800 font-r16 group-hover:text-white-0">
                    자
                  </span>
                </div>
              </div>
            )}
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
                  {typeof post.content === 'string'
                    ? post.content
                    : post.content.ops.map(op =>
                        typeof op.insert === 'string' && op.insert !== '\n'
                          ? op.insert
                          : '',
                      )}
                </div>
              </div>
              <div className="flex items-center gap-x-1 ml-auto shrink-0">
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
