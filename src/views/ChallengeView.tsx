'use client';

import Chip from '@/components/Chip';
import {
  BadgeCard,
  BadgeCardDescription,
  BadgeCardContent,
  BadgeCardTitle,
  BadgeIcon,
  BadgeWideIcon,
  BadgeCardHeader,
  badgeCardVariants,
} from '@/components/BadgeCard';
import * as React from 'react';
import { BADGE_INFO } from '@/utils/challenge';
import useGetUserBadgeInfo from '@/hooks/challenge/useGetUserBadgeInfo';
import { useEffect, useState } from 'react';
import { BadgeKeyType } from '@/types/challengeTypes';
import { VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useChangeUserTitleBadge from '@/hooks/challenge/useChangeUserTitleBadge';
import FooterFeedbackView from '@/views/common/FooterFeedbackView';

const ChallengeView = () => {
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const strengthStyle = 'font-b28 text-primary-900';

  const mutation = useChangeUserTitleBadge();
  const userBadgeInfo = useGetUserBadgeInfo();
  const [myBadges, setMyBadges] = useState<string[]>([]);
  const [titleBadge, setTitleBadge] = useState<BadgeKeyType>('first');
  const [userPercent, setUserPercent] = useState(0);
  const [recentGotBadge, setRecentGotBadge] = useState<Partial<
    keyof typeof BADGE_INFO
  > | null>(null);

  const getBadgeType = (
    badge: BadgeKeyType,
  ): VariantProps<typeof badgeCardVariants>['variant'] => {
    if (!myBadges.includes(badge)) {
      return 'disabled';
    }
    return badge === titleBadge ? 'selected' : 'default';
  };

  const handleChangeTitleBadge = (badgeKey: BadgeKeyType) => {
    mutation
      .mutateAsync(badgeKey)
      .then(res => {
        setTitleBadge(res.data);
      })
      .catch(() => {
        alert('뱃지 변경에 실패했습니다.');
      });
  };

  useEffect(() => {
    if (!userBadgeInfo) return;

    const sortedBadgeByAcquiredDate = Object.values(userBadgeInfo.data.myBadge).sort(
      (a, b) => (new Date(a.acquiredDate) > new Date(b.acquiredDate) ? -1 : 1),
    );

    setTitleBadge(userBadgeInfo.data.titleBadge || 'first');
    setMyBadges(Object.keys(userBadgeInfo.data.myBadge));
    setRecentGotBadge(sortedBadgeByAcquiredDate[0].key as BadgeKeyType);
    setUserPercent(
      +((userBadgeInfo.data.myRank / userBadgeInfo.data.totalUser) * 100).toFixed(1),
    );
  }, [userBadgeInfo]);

  return (
    <>
      <div className="w-[960px] mx-auto my-[72px]">
        <h2 className="title">뱃지</h2>
        <p className={descriptionStyle}>
          지금까지 획득한 뱃지는 총{' '}
          <span className={strengthStyle}>{myBadges.length}개</span> 입니다.
        </p>
        <div className="font-r16 text-gray-900">
          <span className="font-sb16 text-primary-900">그루미님</span>은 전체 이용자중
          상위{' '}
          <Chip variant="gray" className="font-m16">
            {userPercent}%
          </Chip>{' '}
          입니다.
        </div>
        {userBadgeInfo && (
          <div className="mt-6 mb-[72px]">
            <h3 className="font-sb16 text-primary-400">뱃지 획득 현황</h3>
            <div
              className="h-3 w-full rounded-[26px] relative mt-3"
              style={{
                background:
                  'linear-gradient(90deg, #18355E 0%, #0B3E84 31%, #0145A3 49%, #478881 83.5%, #8ECB5E 100%)',
              }}
            >
              <div
                className="absolute flex items-center shadow justify-center top-1/2 translate-y-[-50%] translate-x-[50%] w-9 h-9 rounded-full overflow-hidden bg-gray-100"
                style={{
                  right: `${userPercent}%`,
                }}
              >
                <Image
                  src="/assets/images/lunch.png"
                  alt="user"
                  width={34}
                  height={34}
                  className="rounded-full"
                />
              </div>
              <div
                className="absolute top-[-20px]  translate-x-[50%]"
                style={{ right: `${userPercent}%` }}
              >
                <Image
                  src="/assets/icons/speech_bubble_blue.png"
                  alt="user"
                  width={58 * 2 + 30}
                  height={29 * 2}
                  className="rotate-180"
                />
                <span className="absolute inset-0 flex justify-center top-[53%] font-r12 text-white-0">
                  {userPercent + '%'}
                </span>
              </div>
              <div className="mx-2 pt-4 flex justify-between font-r14 text-gray-500">
                <span>하위</span>
                <span>상위</span>
              </div>
            </div>
          </div>
        )}
        <section>
          <div className="flex gap-2.5 py-6">
            <div>
              <div className="flex gap-x-1 items-center mb-3">
                <span className="font-sb18 text-primary-900 block">나의 타이틀 뱃지</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
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
              {userBadgeInfo && (
                <BadgeCard variant="primary" size="wide">
                  <BadgeWideIcon
                    src={BADGE_INFO[titleBadge || 'first']?.acquireImgSrc}
                    alt="badge"
                  />
                  <BadgeCardContent>
                    <BadgeCardTitle>
                      {BADGE_INFO[titleBadge || 'first']?.name}
                    </BadgeCardTitle>
                    <BadgeCardDescription>
                      {BADGE_INFO[titleBadge || 'first']?.acquiredDes}
                    </BadgeCardDescription>
                  </BadgeCardContent>
                </BadgeCard>
              )}
            </div>
            <div>
              <span className="font-sb18 text-primary-900 block mb-3">
                최근 획득한 뱃지
              </span>
              {recentGotBadge && (
                <BadgeCard size="wide">
                  <BadgeWideIcon
                    src={BADGE_INFO[recentGotBadge].acquireImgSrc}
                    alt={`badge_${BADGE_INFO[recentGotBadge].name}`}
                  />
                  <BadgeCardContent>
                    <BadgeCardTitle>{BADGE_INFO[recentGotBadge].name}</BadgeCardTitle>
                    <BadgeCardDescription>
                      {BADGE_INFO[recentGotBadge].acquiredDes}
                    </BadgeCardDescription>
                  </BadgeCardContent>
                </BadgeCard>
              )}
            </div>
          </div>
          <div className="py-6 flex flex-wrap gap-5">
            {Object.values(BADGE_INFO).map(badge => (
              <BadgeCard
                key={badge.name}
                variant={getBadgeType(badge.key as BadgeKeyType)}
                onClick={() => handleChangeTitleBadge(badge.key as BadgeKeyType)}
              >
                {/*<BadgeCardHeader>*/}
                {/*  <BadgeCardChip>123123 </BadgeCardChip>*/}
                {/*</BadgeCardHeader>*/}
                <BadgeCardHeader />
                <BadgeCardContent>
                  <BadgeIcon src={badge.nonAcquireImgSrc} alt={`badge_${badge.name}`} />
                  <BadgeCardTitle>{badge.name}</BadgeCardTitle>
                  <BadgeCardDescription className="min-h-[26px] break-keep">
                    {!myBadges.includes(badge.key)
                      ? badge.nonAcquiredDes
                      : badge.acquiredDes}
                  </BadgeCardDescription>
                </BadgeCardContent>
              </BadgeCard>
            ))}
          </div>
        </section>
      </div>
      <FooterFeedbackView
        category="도전과제"
        description="궁금하거나 떠오르는 아이디어, 의견이 있다면 자유롭게 남겨주세요"
      />
    </>
  );
};

export default ChallengeView;
