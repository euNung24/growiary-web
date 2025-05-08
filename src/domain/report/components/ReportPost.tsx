import { cn } from '@/shared/utils/cn';
import BarChart from '@/shared/components/BarChart';
import useReportContext from '@/domain/report/hooks/useReportContext';
import Image from 'next/image';
import { Context } from 'chartjs-plugin-datalabels';
import useProfileContext from '@/domain/profile/hooks/useProfileContext';
import { SAMPLE_REPORT } from '@/shared/utils/report';
import { useEffect, useState } from 'react';
import { debounce } from '@/shared/utils/utilFns';

const MAX_BAR_HEIGHT = 147;
const MEDIUM_WINDOW_WIDTH = 708;

const getLowBarHeight = (all: number, user: number) => {
  if (isNaN(all) || isNaN(user)) return 0;

  const max = Math.max(all, user);
  const multiple = MAX_BAR_HEIGHT / max;

  return Math.min(all, user) * multiple;
};

const ReportPost = () => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';

  const { profile } = useProfileContext();
  const { data: report, year, month: selectedMonth } = useReportContext();
  const month = selectedMonth.toString().padStart(2, '0');
  const userData = report?.post?.user[`${year}-${month}`];
  const allData = report?.post?.all[`${year}-${month}`];
  const [isWidthSmall, setIsWidthSmall] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= MEDIUM_WINDOW_WIDTH) {
      setIsWidthSmall(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsWidthSmall(window.innerWidth <= MEDIUM_WINDOW_WIDTH);
    };

    const debouncedHandleResize = debounce(handleResize);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <section>
      <div>
        <h2 className="title">기록 추이</h2>
        <p className={descriptionStyle}>
          <span className={strengthStyle}>
            {report ? userData || 0 : SAMPLE_REPORT.totalPost}개
          </span>
          의 기록을 작성했어요
        </p>
        <div className="flex gap-5 flex-wrap">
          <div className={cn(boxStyle, 'flex-[1_0_0%] sm:w-full')}>
            <div className="flex gap-x-7 sm:flex-col text-gray-400 font-r14 mb-5">
              <span>
                총 누적{' '}
                <b className="ml-[5px] text-gray-500 font-normal">
                  {report
                    ? Object.values(report.post.user).reduce((f, v) => f + v, 0)
                    : 218}
                  개
                </b>
              </span>
              <span>
                월 평균{' '}
                <b className="ml-[5px] text-gray-500 font-normal">
                  {report
                    ? report?.post?.user &&
                      (
                        Object.values(report.post.user).reduce((f, v) => f + v, 0) / 8
                      ).toFixed(1)
                    : 31}
                  개
                </b>
              </span>
              <span>
                월 최대{' '}
                <b className="ml-[5px] text-gray-500 font-normal">
                  {report ? Math.max(...Object.values(report.post.user)) : 47}개
                </b>
              </span>
            </div>
            <div className="h-[266px] w-full">
              <BarChart
                data={
                  profile && report
                    ? [...Object.values(report.post.user).reverse()]
                    : [18, 33, 28, 47, 28, 30, 37, 0]
                }
                labels={
                  report
                    ? [
                        ...Object.keys(report.post.user)
                          .reverse()
                          .map(v => +v.slice(-2) + '월'),
                      ]
                    : ['10월', '11월', '12월', '1월', '2월', '3월', '4월', '5월']
                }
                backgroundColor={[
                  '#BFCADF',
                  '#BFCADF',
                  '#BFCADF',
                  '#BFCADF',
                  '#BFCADF',
                  '#BFCADF',
                  '#204C90',
                  '#BFCADF',
                ]}
                options={{
                  responsive: true,
                  aspectRatio: 2,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      border: {
                        color: '#BEBFBF',
                        width: 0,
                      },
                      ticks: {
                        font: {
                          size: isWidthSmall ? 10 : 16,
                        },
                      },
                    },
                    y: {
                      max: report
                        ? Math.max(...Object.values(report.post.user)) < 10
                          ? 10
                          : Math.max(...Object.values(report.post.user)) +
                            Math.ceil(Math.max(...Object.values(report.post.user)) / 10)
                        : 60,
                      ticks: {
                        stepSize: report
                          ? Math.ceil(Math.max(...Object.values(report.post.user)) / 10)
                          : 10,
                        color: '#BEBFBF',
                        font: {
                          size: 12,
                        },
                      },
                    },
                  },
                  plugins: {
                    datalabels: {
                      display: true,
                      anchor: 'end',
                      offset: 4,
                      align: 'end',
                      color: '#002861',
                      formatter: function (value: string, context: Context) {
                        return context.active ? value : '';
                      },
                      font: {
                        size: isWidthSmall ? 10 : 16,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={cn(boxStyle, 'w-[300px] px-8')}>
            <p className="font-r22">
              이번 달에 전체 이용자보다
              <br />
              <span className="font-sb22 text-primary-900">
                {userData && allData ? (userData - allData > 0 ? '+' : '-') : '+'}{' '}
                {userData && allData ? Math.abs(userData - allData) : 12}개
              </span>{' '}
              기록했어요
            </p>

            <div className="flex mt-7 justify-around [&>*]:flex [&>*]:flex-col [&>*]:justify-end [&>*]:items-center">
              <div>
                <div className="relative mb-2 z-[-1]">
                  <Image
                    src="/assets/images/speech_bubble.png"
                    alt="all"
                    width={49}
                    height={29}
                    className="w-auto h-auto"
                  />
                  <span className="absolute top-1 inset-0 text-center font-r12">
                    {report ? allData : 26}개
                  </span>
                </div>
                <div
                  className="bg-primary-100 rounded max-h-[147px] w-[62px] mb-2.5"
                  style={{
                    height:
                      allData && userData
                        ? allData > userData
                          ? MAX_BAR_HEIGHT + 'px'
                          : getLowBarHeight(allData, userData) + 'px'
                        : getLowBarHeight(26, 38) + 'px',
                  }}
                />
                <span className="text-gray-500 font-r16">그루어리 평균</span>
              </div>
              <div>
                <div className="relative mb-2 z-[-1]">
                  <Image
                    src="/assets/images/speech_bubble.png"
                    alt="all"
                    width={49}
                    height={29}
                    className="w-auto h-auto"
                  />
                  <span className="absolute top-1 inset-0 text-center font-r12">
                    {report ? userData : 38}개
                  </span>
                </div>
                <div
                  className="bg-primary-700 rounded max-h-[147px] w-[62px] mb-2.5"
                  style={{
                    height:
                      allData && userData
                        ? allData < userData
                          ? MAX_BAR_HEIGHT + 'px'
                          : getLowBarHeight(allData, userData) + 'px'
                        : MAX_BAR_HEIGHT + 'px',
                  }}
                />
                <span className="text-gray-500 font-r16">
                  {report ? profile?.nickname : '그루미'}님
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportPost;
