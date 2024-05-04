'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BarChart from '@/components/BarChart';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useGetReport from '@/hooks/report/useGetReport';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { color, getBoxImageSize, getImage } from '@/utils/report';
import { ReportType } from '@/types/reportTypes';

const DATE = ['일', '월', '화', '수', '목', '금', '토'];
const TIME = ['새벽', '아침', '점심', '저녁'];

const firstDataOptions = (data: number[]) => ({
  responsive: true,
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      max: Math.max(data[0], data[1]) * 1.4,
    },
  },
  plugins: {
    datalabels: {
      display: true,
      backgroundColor: '#D8D8D8',
      borderRadius: 38,
      padding: {
        top: 3,
        bottom: 3,
        right: 12,
        left: 12,
      },
      anchor: 'end',
      align: 'end',
      color: '#747F89',
      clamp: true,
    },
  },
});

const secondDataOptions = (data: number[]) => ({
  responsive: true,
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
    },
    y: {
      display: false,
    },
  },
  plugins: {
    datalabels: {
      display: false,
      anchor: 'end',
      offset: 20,
      align: 'end',
      color: '#747F89',
    },
    annotation: {
      annotations: {
        box1: {
          type: 'box',
          xMin: -0.3,
          xMax: 0.3,
          yMin: getBoxImageSize(data[0], data[0]).yMin,
          yMax: getBoxImageSize(data[0], data[0]).yMax,
          backgroundColor: color.first,
          borderWidth: 0,
          borderRadius: 12,
          label: {
            display: true,
            content: 'MON',
            position: 'center',
            font: {
              size: 16,
            },
          },
        },
        box2: {
          type: 'box',
          xMin: 0.7,
          xMax: 1.3,
          yMin: getBoxImageSize(data[0], data[1]).yMin,
          yMax: getBoxImageSize(data[0], data[1]).yMax,
          backgroundColor: color.second,
          borderWidth: 0,
          borderRadius: 12,
          label: {
            display: true,
            content: 'MON',
            position: 'center',
            font: {
              size: 16,
            },
          },
        },
        box3: {
          type: 'box',
          xMin: 1.7,
          xMax: 2.3,
          yMin: getBoxImageSize(data[0], data[2]).yMin,
          yMax: getBoxImageSize(data[0], data[2]).yMax,
          backgroundColor: color.third,
          borderWidth: 0,
          borderRadius: 12,
          label: {
            display: true,
            content: 'MON',
            position: 'center',
            font: {
              size: 16,
            },
          },
        },
      },
    },
  },
});

const thirdDataOptions = (data: number[]) => ({
  responsive: true,
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
    },
    y: {
      display: false,
    },
  },
  plugins: {
    datalabels: {
      display: false,
      anchor: 'end',
      offset: 20,
      align: 'end',
      color: '#747F89',
    },
    annotation: {
      annotations: {
        box1: {
          type: 'box',
          xMin: -0.3,
          xMax: 0.3,
          yMin: getBoxImageSize(data[0], data[0]).yMin,
          yMax: getBoxImageSize(data[0], data[0]).yMax,
          borderRadius: 12,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
          label: {
            display: true,
            content: getImage('/assets/images/morning.png'),
            width: 40,
            height: 40,
            position: 'center',
          },
        },
        box2: {
          type: 'box',
          xMin: 0.7,
          xMax: 1.3,
          yMin: getBoxImageSize(data[0], data[1]).yMin,
          yMax: getBoxImageSize(data[0], data[1]).yMax,
          borderRadius: 12,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
          label: {
            display: true,
            content: getImage('/assets/images/lunch.png'),
            width: 40,
            height: 40,
            position: 'center',
          },
        },
        box3: {
          type: 'box',
          xMin: 1.7,
          xMax: 2.3,
          yMin: getBoxImageSize(data[0], data[2]).yMin,
          yMax: getBoxImageSize(data[0], data[2]).yMax,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
          borderRadius: 12,
          label: {
            display: true,
            content: getImage('/assets/images/night.png'),
            width: 40,
            height: 40,
            position: 'center',
          },
        },
      },
    },
  },
});

const HomeReport = () => {
  const headerDescriptionStyle = 'font-r16 text-gray-700 mt-1 mb-6';
  const historyDescriptionStyle = 'font-r22 text-gray-900 mt-5 mb-[43px]';
  const historyStrengthStyle = 'font-sb22 text-primary-900';

  const mutation = useGetReport();
  const [report, setReport] = useState<ReportType | null>(null);
  const [weekData, setWeekData] = useState<[string, number][] | null>(null);
  const totalWeekRef = useRef(0);
  const [timeData, setTimeData] = useState<[string, number][] | null>(null);
  const totalTimeRef = useRef(0);
  const {
    date: { month: monthPlusOne },
  } = useRecoilValue(TodayState);
  const month = monthPlusOne - 1;

  useEffect(() => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      setReport(res.data);
    });
  }, []);

  useEffect(() => {
    const monthWeek = report?.week?.[month];
    if (!report || !monthWeek) return;

    const mappingWithDate = monthWeek.map((count, i) => {
      totalWeekRef.current += count;
      return [DATE[i], count] as [string, number];
    });
    const sortedData = mappingWithDate.sort((a, b) => (a[1] > b[1] ? -1 : 1));

    setWeekData([sortedData[1], sortedData[0], sortedData[2]]);

    return () => {};
  }, [report]);

  useEffect(() => {
    const monthTime = report?.time?.[month];
    if (!report || !monthTime) return;

    const mappingWithDate = monthTime.map((count, i) => {
      totalTimeRef.current += count;
      return [TIME[i], count] as [string, number];
    });
    const sortedData = mappingWithDate.sort((a, b) => (a[1] > b[1] ? -1 : 1));

    setTimeData([sortedData[0], sortedData[2], sortedData[1]]);

    return () => {};
  }, [report]);

  useEffect(() => {
    const monthTime = report?.time?.[month];
    if (!report || !monthTime) return;

    const mappingWithDate = monthTime.map((count, i) => {
      totalTimeRef.current += count;
      return [TIME[i], count] as [string, number];
    });
    const sortedData = mappingWithDate.sort((a, b) => (a[1] > b[1] ? -1 : 1));

    setTimeData([sortedData[0], sortedData[2], sortedData[1]]);

    return () => {};
  }, [report]);

  return (
    <section>
      <div className="flex justify-between">
        <h2 className="title">기록 데이터</h2>
        <Button variant="ghostGray" size="sm" asChild>
          <Link href="/history">전체보기</Link>
        </Button>
      </div>
      <p className={headerDescriptionStyle}>작성해주신 기록을 그루어리가 분석했어요</p>
      <div className="flex gap-2.5">
        {/* 로그인 된 경우 */}
        {report?.post &&
          (report?.post?.user[month] > 3 ? (
            <>
              <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
                <div className="flex justify-between items-center text-gray-800 font-r16">
                  <span>작성한 글</span>
                  <span className="text-gray-400 font-r12">변경 시점 06:00</span>
                </div>
                {report && (
                  <>
                    {' '}
                    <p className={historyDescriptionStyle}>
                      다른 이용자보다
                      <br />
                      <span className={historyStrengthStyle}>
                        {report?.post.user[month] - report?.post.all[month] ? '+' : '-'}{' '}
                        {Math.abs(report?.post.user[month] - report?.post.all[month])}개
                      </span>{' '}
                      더 기록했어요
                    </p>
                    <div
                      style={{
                        width: '242px',
                        height: '185px',
                      }}
                    >
                      <BarChart
                        className="mt-auto"
                        height={200}
                        data={[report?.post.user[month], report?.post.all[month]]}
                        labels={['그루어리 평균', '그루미님']}
                        backgroundColor={['#BEBFBF', '#204C90']}
                        options={firstDataOptions([
                          report?.post.user[month],
                          report?.post.all[month],
                        ])}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
                <div className="flex justify-between text-gray-800 font-r16">
                  <span>요일</span>
                </div>
                {weekData && (
                  <>
                    <p className={historyDescriptionStyle}>
                      <span className={historyStrengthStyle}>{weekData[0][0]}요일</span>
                      에 주로
                      <br />
                      글을 작성했어요
                    </p>
                    <div
                      style={{
                        width: '242px',
                        height: '185px',
                        position: 'relative',
                      }}
                    >
                      <BarChart
                        className="mt-auto"
                        height={200}
                        data={weekData.map(
                          ([, count]) => (count / totalWeekRef.current) * 100,
                        )}
                        labels={weekData.map(([week]) => week + '요일')}
                        backgroundColor={['#EFEFEF', '#EFEFEF', '#EFEFEF']}
                        options={secondDataOptions(
                          weekData.map(
                            ([, count]) => (count / totalWeekRef.current) * 100,
                          ),
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
                <div className="flex justify-between text-gray-800 font-r16">
                  <span>시간</span>
                </div>
                {timeData && (
                  <>
                    <p className={historyDescriptionStyle}>
                      <span className={historyStrengthStyle}>{timeData[0][0]}</span>
                      에 주로
                      <br />
                      글을 작성했어요
                    </p>
                    <BarChart
                      className="mt-auto"
                      height={200}
                      data={timeData.map(
                        ([, count]) => (count / totalTimeRef.current) * 100,
                      )}
                      labels={timeData.map(([time]) => time)}
                      backgroundColor={['#EFEFEF', '#EFEFEF', '#EFEFEF']}
                      options={thirdDataOptions(
                        timeData.map(([, count]) => (count / totalTimeRef.current) * 100),
                      )}
                    />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="group relative">
                <Image
                  src="/assets/images/report-disabled-example1.png"
                  alt="report-disabled-example1"
                  width={300}
                  height={386}
                />
              </div>
              <Image
                src="/assets/images/report-disabled-example2.png"
                alt="report-disabled-example2"
                width={300}
                height={386}
              />
              <Image
                src="/assets/images/report-disabled-example3.png"
                alt="report-disabled-example3"
                width={300}
                height={386}
              />
            </>
          ))}
        {/* 로그인 안된 경우 */}
        {!report?.post && (
          <>
            <Image
              src="/assets/images/report-example1.png"
              alt="report-example1"
              width={300}
              height={386}
            />
            <Image
              src="/assets/images/report-example2.png"
              alt="report-example2"
              width={300}
              height={386}
            />
            <Image
              src="/assets/images/report-example3.png"
              alt="report-example3"
              width={300}
              height={386}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default HomeReport;
