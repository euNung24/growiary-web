import { BADGE_INFO } from '@user/challenge/constants/badges';
import useGetUserBadgeInfo from '@user/challenge/queries/useGetUserBadgeInfo';
import { AcquiredBadgeType } from '@user/challenge/types/challenge';

export const useUserBadge = () => {
  const { data } = useGetUserBadgeInfo();

  const userBadges = data?.myBadge ? Object.keys(data.myBadge) : [];
  const userBadgeList = data?.myBadge ? Object.values(data.myBadge) : [];
  const recentBadge = userBadgeList.reduce(
    (f: null | AcquiredBadgeType, v) =>
      f ? (new Date(v.acquiredDate) > new Date(f.acquiredDate) ? v : f) : v,
    null,
  )?.key as keyof typeof BADGE_INFO;
  const userRate = data ? +((data.myRank / data.totalUser) * 100).toFixed(1) : 100;

  return {
    userBadges,
    userRate,
    titleBadge: data?.titleBadge || 'first',
    recentBadge: recentBadge || 'first',
  };
};
