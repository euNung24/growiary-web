import { useQueryClient } from '@tanstack/react-query';
import { VariantProps } from 'class-variance-authority';

import { trackingAnalytics } from '@/shared/utils/trackingAnalytics';
import {
  BadgeCard,
  BadgeCardDescription,
  BadgeCardContent,
  BadgeCardTitle,
  BadgeIcon,
  BadgeCardHeader,
  badgeCardVariants,
} from '@user/challenge/components/BadgeCard';
import { BADGE_INFO, BadgeKeyType } from '@user/challenge/constants/badges';
import { challengeKeys } from '@user/challenge/queries/challengeKeys';
import useChangeUserTitleBadge from '@user/challenge/queries/useChangeUserTitleBadge';

type BadgeListProps = {
  titleBadge: BadgeKeyType;
  userBadges: string[];
};

const BadgeList = ({ titleBadge, userBadges }: BadgeListProps) => {
  const queryClient = useQueryClient();
  const mutation = useChangeUserTitleBadge();

  const getBadgeType = (
    badge: BadgeKeyType,
  ): VariantProps<typeof badgeCardVariants>['variant'] => {
    if (!userBadges.includes(badge)) {
      return 'disabled';
    }
    return badge === titleBadge ? 'selected' : 'default';
  };

  const handleChangeTitleBadge = (badgeKey: BadgeKeyType) => {
    trackingAnalytics('뱃지 타이틀별 선택');

    mutation
      .mutateAsync(badgeKey)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
      })
      .catch(() => {
        alert('뱃지 변경에 실패했습니다.');
      });
  };

  return (
    <div className="py-6 flex flex-wrap gap-5">
      {Object.values(BADGE_INFO).map(badge => (
        <BadgeCard
          key={badge.name}
          variant={getBadgeType(badge.key as BadgeKeyType)}
          onClick={() => handleChangeTitleBadge(badge.key as BadgeKeyType)}
        >
          <BadgeCardHeader />
          <BadgeCardContent>
            <BadgeIcon
              src={
                !userBadges.includes(badge.key)
                  ? badge.nonAcquireImgSrc
                  : badge.acquireImgSrc
              }
              alt={`badge_${badge.name}`}
            />
            <BadgeCardTitle>{badge.name}</BadgeCardTitle>
            <BadgeCardDescription className="min-h-[26px] break-keep">
              {!userBadges.includes(badge.key) ? badge.nonAcquiredDes : badge.acquiredDes}
            </BadgeCardDescription>
          </BadgeCardContent>
        </BadgeCard>
      ))}
    </div>
  );
};

export default BadgeList;
