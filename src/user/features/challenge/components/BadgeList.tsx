import { BADGE_INFO, BadgeKeyType } from '@user/challenge/constants/badges';
import BadgeItem from '@user/challenge/components/BadgeItem';

type BadgeListProps = {
  titleBadge: BadgeKeyType;
  userBadges: string[];
};

const BadgeList = ({ titleBadge, userBadges }: BadgeListProps) => {
  return (
    <div className="py-6 flex flex-wrap gap-5">
      {Object.values(BADGE_INFO).map(badge => (
        <BadgeItem
          key={badge.key}
          badge={badge}
          hasBadge={userBadges.includes(badge.key)}
          isTitle={badge.key === titleBadge}
        />
      ))}
    </div>
  );
};

export default BadgeList;
