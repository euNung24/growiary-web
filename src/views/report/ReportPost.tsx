import { cn } from '@/lib/utils';
import BarChart from '@/components/BarChart';
import useReportContext from '@/hooks/report/useReportContext';
import Image from 'next/image';

type ReportPostProps = {
  month: number;
};

const MAX_BAR_HEIGHT = 147;
const getLowBarHeight = (all: number, user: number) => {
  const max = Math.max(all, user);
  const multiple = MAX_BAR_HEIGHT / max;

  return Math.min(all, user) * multiple;
};

const ReportPost = ({ month }: ReportPostProps) => {
  const boxStyle = 'rounded-xl border border-gray-100 p-6';
  const strengthStyle = 'font-b28 text-primary-900';
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';

  const { data: report } = useReportContext();

  return (
    report && (
      <section>
        <div>
          <h2 className="title">기록한 글</h2>
          <p className={descriptionStyle}>
            <span className={strengthStyle}>{report?.post?.user[month]}개</span>의 글을
            작성했어요.
          </p>
          <div className="flex gap-x-5">
            <div className={cn(boxStyle, 'flex-1')}>
              <div className="flex gap-x-7 text-gray-400 font-r14 mb-5">
                <span>
                  전체 <b className="ml-[5px] text-gray-700">00개</b>
                </span>
                <span>
                  평균 <b className="ml-[5px] text-gray-700">00개</b>
                </span>
                <span>
                  최대 <b className="ml-[5px] text-gray-700">00개</b>
                </span>
              </div>
              <BarChart
                height=""
                data={[12, 19, 3, 5, 2, 3, 3, 4]}
                labels={['1', '2', '3', '4', '5', '6', '7', '8']}
                backgroundColor={['#BFCADF', '#204C90']}
              />
            </div>
            <div className={boxStyle}>
              <p className={descriptionStyle}>
                전체 이용자보다
                <br />
                <span className={strengthStyle}>
                  {report?.post?.user[month] - report?.post?.all[month] ? '+' : '-'}{' '}
                  {Math.abs(report?.post?.user[month] - report?.post?.all[month])}개
                </span>{' '}
                더 기록했어요
              </p>
              <div className="flex justify-around [&>*]:flex [&>*]:flex-col [&>*]:justify-end [&>*]:items-center">
                <div>
                  <div className="relative mb-2">
                    <Image
                      src="/assets/images/speech_bubble.png"
                      alt="all"
                      width={49}
                      height={29}
                    />
                    <span className="absolute top-1 inset-0 text-center font-r12">
                      {report?.post?.all[month]}개
                    </span>
                  </div>
                  <div
                    className="bg-gray-200 rounded max-h-[147px] w-[62px] mb-2.5"
                    style={{
                      height:
                        report?.post?.all[month] > report?.post?.user[month]
                          ? MAX_BAR_HEIGHT + 'px'
                          : getLowBarHeight(
                              report?.post?.all[month],
                              report?.post?.user[month],
                            ),
                    }}
                  />
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
                      {report?.post?.user[month]}개
                    </span>
                  </div>
                  <div
                    className="bg-primary-700 rounded max-h-[147px] w-[62px] mb-2.5"
                    style={{
                      height:
                        report?.post?.all[month] < report?.post?.user[month]
                          ? MAX_BAR_HEIGHT + 'px'
                          : getLowBarHeight(
                              report?.post?.all[month],
                              report?.post?.user[month],
                            ) + 'px',
                    }}
                  />
                  <span className="text-gray-500 font-r16">그루미님</span>
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
