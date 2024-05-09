import { cn } from '@/lib/utils';
import BarChart from '@/components/BarChart';
import useReportContext from '@/hooks/report/useReportContext';
import Image from 'next/image';
import { format } from 'date-fns';
import { Context } from 'chartjs-plugin-datalabels';
import useProfileContext from '@/hooks/profile/useProfileContext';

type ReportPostProps = {
  year: number;
  month: string;
};

const MAX_BAR_HEIGHT = 147;
const getLowBarHeight = (all: number, user: number) => {
  if (isNaN(all) || isNaN(user)) return 0;

  const max = Math.max(all, user);
  const multiple = MAX_BAR_HEIGHT / max;

  return Math.min(all, user) * multiple;
};

const ReportPost = ({ year, month }: ReportPostProps) => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';

  const { profile } = useProfileContext();
  const { data: report } = useReportContext();
  const userData = report?.post?.user[`${year}-${month}`];
  const allData = report?.post?.all[`${year}-${month}`];

  return (
    report &&
    year && (
      <section>
        <div>
          <h2 className="title">기록 추이</h2>
          <p className={descriptionStyle}>
            <span className={strengthStyle}>이번 달에 {userData}개</span>의 기록을
            작성하고 있어요
          </p>
          <div className="flex gap-x-5">
            <div className={cn(boxStyle, 'flex-1')}>
              {report?.post?.user && (
                <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
                  <span>
                    총 누적{' '}
                    <b className="ml-[5px] text-gray-500 font-normal">
                      {Object.values(report.post.user).reduce((f, v) => f + v, 0)}개
                    </b>
                  </span>
                  <span>
                    월 평균{' '}
                    <b className="ml-[5px] text-gray-500 font-normal">
                      {report?.post?.user &&
                        (
                          Object.values(report.post.user).reduce((f, v) => f + v, 0) / 8
                        ).toFixed(1)}
                      개
                    </b>
                  </span>
                  <span>
                    월 최대{' '}
                    <b className="ml-[5px] text-gray-500 font-normal">
                      {Math.max(...Object.values(report.post.user))}개
                    </b>
                  </span>
                </div>
              )}
              <div className="h-[266px]">
                {userData && (
                  <BarChart
                    height=""
                    data={[...Object.values(report.post.user).reverse(), 0]}
                    labels={[
                      ...Object.keys(report.post.user)
                        .reverse()
                        .map(v => +v.slice(-2) + '월'),
                      format(new Date(year, +month - 1 + 1, 1, 0, 0, 0), 'M월'),
                    ]}
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
                      scales: {
                        x: {
                          grid: {
                            display: false,
                          },
                          border: {
                            color: '#BEBFBF',
                            width: 0,
                          },
                        },
                        y: {
                          max:
                            Math.max(...Object.values(report.post.user)) +
                            (Math.max(...Object.values(report.post.user)) > 10 ? 10 : 1),
                          ticks: {
                            stepSize:
                              Math.max(...Object.values(report.post.user)) > 10 ? 10 : 1,
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
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
            <div className={cn(boxStyle, 'w-[300px] px-8')}>
              {userData && allData && (
                <p className="font-r22">
                  이번 달에 전체 이용자보다
                  <br />
                  <span className="font-sb22 text-primary-900">
                    {userData - allData > 0 ? '+' : '-'} {Math.abs(userData - allData)}개
                  </span>{' '}
                  기록했어요
                </p>
              )}
              <div className="flex mt-7 justify-around [&>*]:flex [&>*]:flex-col [&>*]:justify-end [&>*]:items-center">
                <div>
                  <div className="relative mb-2">
                    <Image
                      src="/assets/images/speech_bubble.png"
                      alt="all"
                      width={49}
                      height={29}
                    />
                    <span className="absolute top-1 inset-0 text-center font-r12">
                      {allData}개
                    </span>
                  </div>
                  {allData && userData && (
                    <div
                      className="bg-primary-100 rounded max-h-[147px] w-[62px] mb-2.5"
                      style={{
                        height:
                          allData > userData
                            ? MAX_BAR_HEIGHT + 'px'
                            : getLowBarHeight(allData, userData),
                      }}
                    />
                  )}
                  <span className="text-gray-500 font-r16">그루어리 평균</span>
                </div>
                <div>
                  <div className="relative mb-2">
                    <Image
                      src="/assets/images/speech_bubble.png"
                      alt="all"
                      width={49}
                      height={29}
                    />
                    <span className="absolute top-1 inset-0 text-center font-r12">
                      {userData}개
                    </span>
                  </div>
                  {allData && userData && (
                    <div
                      className="bg-primary-700 rounded max-h-[147px] w-[62px] mb-2.5"
                      style={{
                        height:
                          allData < userData
                            ? MAX_BAR_HEIGHT + 'px'
                            : getLowBarHeight(allData, userData) + 'px',
                      }}
                    />
                  )}
                  <span className="text-gray-500 font-r16">
                    {profile?.nickname || '그루미'}님
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default ReportPost;
