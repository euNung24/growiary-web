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
import { BADGE_INFO } from '@/shared/utils/challenge';
import useGetUserBadgeInfo from '@/domain/challenge/hooks/useGetUserBadgeInfo';
import { useEffect, useState } from 'react';
import { BadgeKeyType } from '@/domain/challenge/type';
import { VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useChangeUserTitleBadge from '@/domain/challenge/hooks/useChangeUserTitleBadge';
import useProfileContext from '@/profile/hooks/useProfileContext';
import { cn } from '@/lib/utils';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { useQueryClient } from '@tanstack/react-query';

const ChallengeView = () => {
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const strengthStyle = 'font-b28 text-primary-900';

  const queryClient = useQueryClient();
  const { profile, titleBadge } = useProfileContext();
  const mutation = useChangeUserTitleBadge();
  const userBadgeInfo = useGetUserBadgeInfo();
  const [myBadges, setMyBadges] = useState<string[]>([]);
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
    tracking(`뱃지 타이틀별 선택`);
    sendGAEvent({ event: '뱃지 타이틀별 선택' });

    mutation
      .mutateAsync(badgeKey)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.invalidateQueries({ queryKey: ['badge'] });
      })
      .catch(() => {
        alert('뱃지 변경에 실패했습니다.');
      });
  };

  useEffect(() => {
    if (!userBadgeInfo) return;

    if (!('data' in userBadgeInfo)) {
      setMyBadges([]);
      setUserPercent(0);
      setRecentGotBadge(null);
      return;
    }

    const sortedBadgeByAcquiredDate = Object.values(userBadgeInfo.data.myBadge).sort(
      (a, b) => (new Date(a.acquiredDate) > new Date(b.acquiredDate) ? -1 : 1),
    );

    setMyBadges(Object.keys(userBadgeInfo.data.myBadge));
    setRecentGotBadge(sortedBadgeByAcquiredDate[0].key as BadgeKeyType);
    setUserPercent(
      +((userBadgeInfo.data.myRank / userBadgeInfo.data.totalUser) * 100).toFixed(1),
    );
  }, [profile, userBadgeInfo]);

  return (
    <>
      <div>
        <h2 className="title">뱃지</h2>
        <p className={descriptionStyle}>
          지금까지 획득한 뱃지는 총{' '}
          <span className={strengthStyle}>{myBadges.length}개</span> 입니다.
        </p>
        <div className="font-r16 text-gray-900">
          <span className="font-sb16 text-primary-900">
            {profile?.nickname || '그루미'}님
          </span>
          은 전체 이용자중 상위{' '}
          <Chip variant="gray" className="text-primary-900 font-m16">
            {userPercent || 100}%
          </Chip>{' '}
          입니다.
        </div>
        <div className="mt-6 mb-[117px]">
          <h3 className="font-sb16 text-primary-400">뱃지 획득 현황</h3>
          <div
            className="h-3 w-full rounded-[26px] relative mt-3 z-[-1]"
            style={{
              background:
                'linear-gradient(90deg, #18355E 0%, #0B3E84 31%, #0145A3 49%, #478881 83.5%, #8ECB5E 100%)',
            }}
          >
            {[...Array(9)].map((v, i) => (
              <div
                key={i}
                className={cn(
                  'absolute h-3 border-r border-dashed',
                  i === 4 && 'border-solid',
                )}
                style={{
                  left: (i + 1) * 10 + '%',
                }}
              ></div>
            ))}
            <div
              className="absolute flex items-center shadow justify-center top-1/2 translate-y-[-50%] translate-x-[50%] w-9 h-9 rounded-full overflow-hidden bg-gray-100"
              style={{
                right: `${userPercent || 100}%`,
              }}
            >
              <Image
                src={(profile && profile.profileImage) || '/assets/icons/profile.png'}
                alt="profile"
                width={profile && profile.profileImage ? 34 : 24}
                height={profile && profile.profileImage ? 34 : 24}
                className="rounded-full"
              />
            </div>

            <div
              style={{ right: `${userPercent || 100}%` }}
              className={cn(
                'absolute bottom-[-22px] translate-y-full translate-x-[50%] group-hover:block bg-primary-400 text-white-0 font-r12 py-[3px] px-3 rounded-[38px] text-nowrap',
              )}
            >
              <div className="absolute top-[-13px] left-1/2 translate-x-[-50%] w-4 h-4 border border-8 border-b-primary-400 border-t-transparent border-l-transparent border-r-transparent"></div>
              {userPercent || 100}%
            </div>
            <div className="mx-2 pt-4 flex justify-between font-r14 text-gray-500">
              <span>하위</span>
              <span>상위</span>
            </div>
          </div>
        </div>
        <section>
          <div className="flex flex-wrap gap-2.5 px-[5px] py-6 [&>*]:flex-[1_1_460px]">
            <div>
              <div className="flex gap-x-1 items-center mb-3">
                <span className="font-sb18 text-primary-900 block">나의 타이틀 뱃지</span>
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
              <BadgeCard variant="primary" size="wide">
                <BadgeWideIcon
                  src={BADGE_INFO[titleBadge || 'first']?.acquireImgSrc}
                  alt="badge"
                  priority
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
            </div>
            <div>
              <span className="font-sb18 text-primary-900 block mb-3">
                최근 획득한 뱃지
              </span>
              <BadgeCard size="wide">
                <BadgeWideIcon
                  src={BADGE_INFO[recentGotBadge || 'first'].acquireImgSrc}
                  alt={`badge_${BADGE_INFO[recentGotBadge || 'first'].name}`}
                  priority
                />
                <BadgeCardContent>
                  <BadgeCardTitle>
                    {BADGE_INFO[recentGotBadge || 'first'].name}
                  </BadgeCardTitle>
                  <BadgeCardDescription>
                    {BADGE_INFO[recentGotBadge || 'first'].acquiredDes}
                  </BadgeCardDescription>
                </BadgeCardContent>
              </BadgeCard>
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
                  <BadgeIcon
                    src={
                      !myBadges.includes(badge.key)
                        ? badge.nonAcquireImgSrc
                        : badge.acquireImgSrc
                    }
                    alt={`badge_${badge.name}`}
                  />
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
    </>
  );
};

export default ChallengeView;
