'use client';

import Chip from '@/shared/components/Chip';
import useGetProfile from '@/shared/queries/profile/useGetProfile';
import Image from 'next/image';

type TopPercentIndicatorProps = {
  nickname?: string;
  profileImage?: string;
  rate: number;
};

const TopPercentIndicator = ({ rate }: TopPercentIndicatorProps) => {
  const { data } = useGetProfile();

  return (
    <section>
      <p className="font-r16 text-gray-900">
        <span className="font-sb16 text-primary-900">{data?.nickname || '그루미'}님</span>
        은 전체 이용자중 상위
        <Chip variant="gray" className="text-primary-900 font-m16 mx-1">
          {rate || 100}%
        </Chip>
        입니다.
      </p>
      <div className="mt-6 mb-[117px]">
        <div className="font-sb16 text-primary-400">뱃지 획득 현황</div>
        <div
          className="h-3 w-full rounded-[26px] relative mt-3 z-[-1]"
          style={{
            background:
              'linear-gradient(90deg, #18355E 0%, #0B3E84 31%, #0145A3 49%, #478881 83.5%, #8ECB5E 100%)',
          }}
        >
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              data-rate={`rate${i + 1}0`}
              className="absolute h-3 border-r border-dashed data-[rate=rate50]:border-solid"
              style={{
                left: (i + 1) * 10 + '%',
              }}
            ></div>
          ))}
          <div
            className="absolute flex items-center shadow justify-center top-1/2 translate-y-[-50%] translate-x-[50%] w-9 h-9 rounded-full overflow-hidden bg-gray-100"
            style={{
              right: `${rate || 100}%`,
            }}
          >
            <Image
              src={data?.profileImage || '/assets/icons/profile.png'}
              alt="profile"
              width={data?.profileImage ? 34 : 24}
              height={data?.profileImage ? 34 : 24}
              className="rounded-full"
            />
          </div>

          <div
            style={{ right: `${rate || 100}%` }}
            className="absolute bottom-[-22px] translate-y-full translate-x-[50%] group-hover:block bg-primary-400 text-white-0 font-r12 py-[3px] px-3 rounded-[38px] text-nowrap"
          >
            <div className="absolute top-[-13px] left-1/2 translate-x-[-50%] w-4 h-4 border-8 border-b-primary-400 border-t-transparent border-l-transparent border-r-transparent"></div>
            {rate || 100}%
          </div>
          <div className="mx-2 pt-4 flex justify-between font-r14 text-gray-500">
            <span>하위</span>
            <span>상위</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPercentIndicator;
