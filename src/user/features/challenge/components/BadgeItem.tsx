import { useQueryClient } from '@tanstack/react-query';

import { trackingAnalytics } from '@/shared/utils/trackingAnalytics';
import {
  BadgeCard,
  BadgeCardDescription,
  BadgeCardContent,
  BadgeCardTitle,
  BadgeIcon,
  BadgeCardHeader,
} from '@user/challenge/components/BadgeCard';
import { BADGE_INFO, BadgeKeyType } from '@user/challenge/constants/badges';
import { challengeKeys } from '@user/challenge/queries/challengeKeys';
import useChangeUserTitleBadge from '@user/challenge/queries/useChangeUserTitleBadge';
import { memo } from 'react';

type BadgeItemProps = {
  hasBadge: boolean;
  isTitle: boolean;
  badge: (typeof BADGE_INFO)[keyof typeof BADGE_INFO];
};

const BadgeItem = ({ hasBadge, isTitle, badge }: BadgeItemProps) => {
  const queryClient = useQueryClient();
  const mutation = useChangeUserTitleBadge();

  const handleChangeTitleBadge = () => {
    trackingAnalytics('뱃지 타이틀별 선택');

    mutation
      .mutateAsync(badge.key as BadgeKeyType)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
      })
      .catch(() => {
        alert('뱃지 변경에 실패했습니다.');
      });
  };

  return (
    <BadgeCard
      variant={hasBadge ? (isTitle ? 'selected' : 'default') : 'disabled'}
      onClick={handleChangeTitleBadge}
    >
      <BadgeCardHeader />
      <BadgeCardContent>
        <BadgeIcon
          src={!hasBadge ? badge.nonAcquireImgSrc : badge.acquireImgSrc}
          alt={`badge_${badge.name}`}
        />
        <BadgeCardTitle>{badge.name}</BadgeCardTitle>
        <BadgeCardDescription className="min-h-[26px] break-keep">
          {!hasBadge ? badge.nonAcquiredDes : badge.acquiredDes}
        </BadgeCardDescription>
      </BadgeCardContent>
    </BadgeCard>
  );
};

export default memo(BadgeItem);
