import {
  BadgeCard,
  BadgeCardDescription,
  BadgeCardContent,
  BadgeCardTitle,
  BadgeWideIcon,
} from '@/user/features/challenge/components/BadgeCard';
import { BADGE_INFO } from '@user/challenge/constants/badges';

type MyRecentBadgeProps = {
  badge: keyof typeof BADGE_INFO;
};

const MyRecentBadge = ({ badge }: MyRecentBadgeProps) => {
  const recentBadge = BADGE_INFO[badge];

  return (
    <div>
      <h3 className="font-sb18 text-primary-900 block mb-3">최근 획득한 뱃지</h3>
      {recentBadge ? (
        <BadgeCard size="wide">
          <BadgeWideIcon
            src={recentBadge.acquireImgSrc}
            alt={`badge_${recentBadge.name}`}
            priority
          />
          <BadgeCardContent>
            <BadgeCardTitle>{recentBadge.name}</BadgeCardTitle>
            <BadgeCardDescription>{recentBadge.acquiredDes}</BadgeCardDescription>
          </BadgeCardContent>
        </BadgeCard>
      ) : (
        <div className="text-red-500">
          <p>최근 획득한 뱃지를 찾을 수 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyRecentBadge;
