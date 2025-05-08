import Image from 'next/image';
import useReportContext from '@/domain/report/hooks/useReportContext';
import useProfileContext from '@/profile/hooks/useProfileContext';

const MAX_BAR_HEIGHT = 147;
type ReportByPostWithAllProps = {
  date: string;
};

const ReportByPostWithAll = ({ date }: ReportByPostWithAllProps) => {
  const historyDescriptionStyle = 'font-r22 text-gray-900 mt-5 mb-3';
  const historyStrengthStyle = 'font-sb22 text-primary-900';
  const { data: report } = useReportContext();
  const { profile } = useProfileContext();

  const getLowBarHeight = (all: number, user: number) => {
    if (isNaN(all) || isNaN(user)) return 0;

    const max = Math.max(all, user);
    const multiple = MAX_BAR_HEIGHT / max;

    return Math.min(all, user) * multiple;
  };

  return (
    <div className="p-6 border border-gray-200 rounded-xl w-[300px]">
      <div className="flex justify-between items-center text-gray-800 font-r16">
        <span>작성한 글</span>

        {/*<span className="text-gray-400 font-r12">변경 시점 06:00</span>*/}
      </div>
      {report && (
        <>
          <p className={historyDescriptionStyle}>
            다른 이용자보다
            <br />
            <span className={historyStrengthStyle}>
              {report?.post.user[date] - report?.post.all[date] > 0 ? '+' : '-'}{' '}
              {Math.abs(report?.post.user[date] - report?.post.all[date])}개
            </span>{' '}
            기록했어요
          </p>
          <div className="flex justify-around [&>*]:flex [&>*]:flex-col [&>*]:justify-end [&>*]:items-center">
            <div>
              <div className="relative mb-2">
                <Image
                  src="/assets/images/speech_bubble.png"
                  alt="all"
                  width={49}
                  height={29}
                  className="w-auto h-auto"
                />
                <span className="absolute top-1 inset-0 text-center font-r12">
                  {report?.post.all[date]}개
                </span>
              </div>
              <div
                className="bg-gray-200 rounded max-h-[147px] w-[62px] mb-2.5"
                style={{
                  height:
                    report?.post.all[date] > report?.post.user[date]
                      ? MAX_BAR_HEIGHT + 'px'
                      : getLowBarHeight(report?.post.all[date], report?.post.user[date]),
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
                  className="w-auto h-auto"
                />
                <span className="absolute top-1 inset-0 text-center font-r12">
                  {report?.post.user[date]}개
                </span>
              </div>
              <div
                className="bg-primary-300 rounded max-h-[147px] w-[62px] mb-2.5"
                style={{
                  height:
                    report?.post.all[date] < report?.post.user[date]
                      ? MAX_BAR_HEIGHT + 'px'
                      : getLowBarHeight(report?.post.all[date], report?.post.user[date]) +
                        'px',
                }}
              />
              <span className="text-gray-500 font-r16">
                {profile?.nickname || '그루미'}님
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportByPostWithAll;
