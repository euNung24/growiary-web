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

const SAMPLE_CHAR_DATA: [string, Pick<ReportByCharCountType, 'sum'>][] = [
  ['2023-04', { sum: 11310 }],
  ['2023-03', { sum: 8725 }],
  ['2023-02', { sum: 10423 }],
  ['2023-01', { sum: 5806 }],
];

const SAMPLE_POST_DATA: (Pick<ResPostType, 'title' | 'charactersCount'> & {
  date: string;
  content: string;
  id: number;
})[] = [
  {
    id: 0,
    title: '요즘 나의 최대 걱정거리',
    content:
      '요즘 내 마음이 너무 뒤숭숭하다. 가족들에게도 투정을 많이 부리고 있다. 일단 투정부터 부린 다음 뒤늦게 후회하고 사과를 드리는 일이 많아졌는데, 그래도 개선된 모습을 만들어나가고 싶어서 짜증이 날 때면 참거나 다른 생각을 하며 리프레시하는 연습을 한다.',
    date: '04월 30일',
    charactersCount: 108,
  },
  {
    id: 1,
    title: '새벽 운동과 부상',
    content:
      '감기에서 적당히 회복된 것 같고 마침 기온도 조금 오른 것 같아서 새벽 운동을 나갔다. 그리고 뭔가 호흡이 평소보다 가빴는데, 그냥 감기가 덜 나은 탓이려니 하고 계속 뛰었고 그게 탈이 났다. 운동을 다녀오고 난 오전부터 명치가 너무 아프고 오후쯤 되니 호흡이',
    date: '04월 29일',
    charactersCount: 1906,
  },
  {
    id: 2,
    title: '쉬어야 해 진짜',
    content:
      '쉰다고 해놓고 또 일을 했다. 산책하려고 했던 것도 다 까먹고 계속 모니터 앞에 앉아만 있었다. 나의 휴식 계획은 어디로 간거야? 그럴거면 캘린더에 왜 산책시간, 멍때리는 시간 넣어둔거야?',
    date: '04월 28일',
    charactersCount: 79,
  },
];
const ReportByChar = ({ year, month }: ReportByCharProps) => {
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const boxStyle = 'rounded-xl border border-gray-100 p-6';

  const [slicedDataLength, setSlicedDataLength] = useState(0);
  const [slicedData, setSlicedData] = useState<[string, ReportByCharCountType][] | null>(
    null,
  );
  const [clicedIndex, setClicedIndex] = useState(0);
  const { data } = useReportContext();
  const userData = data?.charCount?.[`${year}-${month}`];

  const handleChangeClickedIndex = (idx: number) => {
    setClicedIndex(idx);
  };

  useEffect(() => {
    if (!data) return;
    const fourDataArr = Object.values(data.charCount).map(v => v.sum);

    let prevCharDataLength = fourDataArr.length;
    for (const charData of fourDataArr) {
      if (charData !== 0) {
        break;
      }
      prevCharDataLength--;
    }

    setSlicedDataLength(prevCharDataLength);
    const neededData = Object.keys(data.charCount)
      .reverse()
      .slice(0, prevCharDataLength)
      .map(date => [date, data.charCount[date]]) as [string, ReportByCharCountType][];
    setSlicedData(neededData);
  }, [data?.topic]);

  return (
    <section>
      <h2 className="title">기록 분량</h2>
      <p className={descriptionStyle}>
        <span className={strengthStyle}>
          {(userData ? userData.sum : 11310).toLocaleString()}자
        </span>
        를 작성했어요
      </p>
      <div className={cn(boxStyle)}>
        <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
          <span>
            전체{' '}
            <b className="ml-[5px] text-gray-500 font-normal">
              {(userData ? userData.sum : 264330).toLocaleString()}자
            </b>
          </span>
          <span>
            평균{' '}
            <b className="ml-[5px] text-gray-500 font-normal">
              {(userData ? Math.round(userData.avg) : 7030).toLocaleString()}자
            </b>
          </span>
          <span>
            최대{' '}
            <b className="ml-[5px] text-gray-500 font-normal">
              {(userData
                ? Math.max(...userData.top3.map(v => v.charactersCount))
                : 11310
              ).toLocaleString()}
              자
            </b>
          </span>
        </div>
        <div className="flex gap-x-3">
          {(slicedData || SAMPLE_CHAR_DATA).map(
            ([date, data], i) =>
              data.sum > 0 && (
                <div
                  key={i}
                  className={cn(
                    'group flex-1 bg-primary-50 rounded-xl px-6 py-3 text-primary-900 hover:bg-primary-900 hover:text-white-0',
                    // i === clicedIndex &&
                    //   'bg-primary-900 text-primary-900 hover:bg-primary-50 hover:text-primary-900',
                    i === clicedIndex && 'bg-primary-900 text-primary-900',
                  )}
                  onClick={() => handleChangeClickedIndex(i)}
                >
                  <div
                    className={cn(
                      'flex justify-between text-gray-500 group-hover:text-white-0',
                      // i === clicedIndex && 'text-white-0 group-hover:text-gray-500',
                      i === clicedIndex && 'text-white-0',
                    )}
                  >
                    <span className="font-r16">{+date.slice(-2)}월</span>
                    {i === 0 && (slicedData || SAMPLE_CHAR_DATA).length >= 2 && (
                      <span className="font-r12 flex items-center gap-x-0.5">
                        {(
                          data.sum - (slicedData || SAMPLE_CHAR_DATA)[1][1].sum || 0
                        ).toLocaleString()}
                        자
                        <Triangle
                          className={cn(
                            'text-primary-200',
                            data.sum < (slicedData || SAMPLE_CHAR_DATA)[1][1].sum &&
                              'scale-y-[-1]',
                          )}
                          fill="#96A8CA"
                          width={6}
                          height={6}
                        />
                      </span>
                    )}
                  </div>
                  <div
                    className={cn(
                      'flex items-center justify-center font-m36 mt-2 mb-[38px] group-hover:text-white-0',
                      // i === clicedIndex && 'text-white-0  group-hover:text-primary-900',
                      i === clicedIndex && 'text-white-0',
                    )}
                  >
                    {(data.sum || 0).toLocaleString()}{' '}
                    <span
                      className={cn(
                        'ml-2 text-gray-800 font-r16 group-hover:text-white-0',
                        // i === clicedIndex && 'text-white-0 group-hover:text-gray-800',
                        i === clicedIndex && 'text-white-0',
                      )}
                    >
                      자
                    </span>
                  </div>
                </div>
              ),
          )}
          {slicedDataLength === 1 && (
            <div className="group flex-1 bg-primary-50 rounded-xl px-6 py-3 text-primary-900 hover:bg-primary-900 hover:text-white-0">
              <div className="flex justify-between text-gray-500 group-hover:text-white-0">
                <span className="font-r16">
                  {data && +Object.keys(data?.charCount).reverse()[1].slice(-2)}월
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
        {(userData?.top3 || SAMPLE_POST_DATA).map((post, i) => (
          <div
            className={cn('flex items-center text-gray-800 font-r14', boxStyle)}
            key={i}
          >
            <span className="bg-primary-50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <div className="ml-6 mr-8">
              <div className="flex items-center gap-3">
                <span className="font-sb16">{post.title}</span>
                <span className="text-gray-500 font-r12 ">
                  {'writeDate' in post
                    ? format(new Date(post.writeDate), 'MM월 dd일')
                    : post?.date}
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
                {post.charactersCount.toLocaleString()}자
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportByChar;
