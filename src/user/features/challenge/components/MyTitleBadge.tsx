import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import Image from 'next/image';
import {
  BadgeCard,
  BadgeCardDescription,
  BadgeCardContent,
  BadgeCardTitle,
  BadgeWideIcon,
} from '@/user/features/challenge/components/BadgeCard';
import { BADGE_INFO } from '@user/challenge/constants/badges';

type MyTitleBadgeProps = {
  badge: keyof typeof BADGE_INFO;
};

const MyTitleBadge = ({ badge }: MyTitleBadgeProps) => {
  const titleBadge = BADGE_INFO[badge];

  return (
    <div>
      <div className="flex gap-x-1 items-center mb-3">
        <h3 className="font-sb18 text-primary-900 block">나의 타이틀 뱃지</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <Image
                src="/assets/icons/question.png"
                alt="tooltip"
                width={24}
                height={24}
              />
            </TooltipTrigger>
            <TooltipContent className="left-[42%] bottom-2">
              <p>획득한 뱃지 중 1개를 타이틀 칭호로 선택해보세요</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {titleBadge ? (
        <BadgeCard variant="primary" size="wide">
          <BadgeWideIcon src={titleBadge.acquireImgSrc} alt="badge" priority />
          <BadgeCardContent>
            <BadgeCardTitle>{titleBadge.name}</BadgeCardTitle>
            <BadgeCardDescription>{titleBadge.acquiredDes}</BadgeCardDescription>
          </BadgeCardContent>
        </BadgeCard>
      ) : (
        <div className="text-red-500">
          <p>타이틀 뱃지를 찾을 수 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyTitleBadge;
