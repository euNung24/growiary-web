'use client';

import TopPercentIndicator from '@user/challenge/components/TopPercentIndicator';
import { useUserBadge } from '@user/challenge/hooks/useUserBadge';
import MyTitleBadge from '@user/challenge/components/MyTitleBadge';
import MyRecentBadge from '@user/challenge/components/MyRecentBadge';
import BadgeList from '@user/challenge/components/BadgeList';

const ChallengeView = () => {
  const { userBadges, userRate, titleBadge, recentBadge } = useUserBadge();

  return (
    <>
      <div>
        <h2 className="title">뱃지</h2>
        <p className="font-r28 text-gray-900 mt-4 mb-6">
          지금까지 획득한 뱃지는 총{' '}
          <span className="font-b28 text-primary-900">{userBadges.length}개</span> 입니다.
        </p>
      </div>
      <TopPercentIndicator rate={userRate} />
      <section>
        <div className="flex flex-wrap gap-2.5 px-[5px] py-6 [&>*]:flex-[1_1_460px]">
          <MyTitleBadge badge={titleBadge} />
          <MyRecentBadge badge={recentBadge} />
        </div>
        <BadgeList userBadges={userBadges} titleBadge={titleBadge} />
      </section>
    </>
  );
};

export default ChallengeView;
