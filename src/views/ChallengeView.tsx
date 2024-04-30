import Chip from '@/components/Chip';
import {
  BadgeCard,
  BadgeCardDescription,
  BadgeCardContent,
  BadgeCardTitle,
  BadgeIcon,
  BadgeWideIcon,
  BadgeCardHeader,
  BadgeCardChip,
} from '@/components/BadgeCard';
import * as React from 'react';

const ChallengeView = () => {
  const descriptionStyle = 'font-r28 text-gray-900 mt-4 mb-6';
  const strengthStyle = 'font-b28 text-primary-900';

  return (
    <>
      <h2 className="title">뱃지</h2>
      <p className={descriptionStyle}>
        지금까지 획득한 뱃지는 총 <span className={strengthStyle}>14개</span> 입니다.
      </p>
      <div className="font-r16 text-gray-900">
        <span className="font-sb16 text-primary-900">그루미님</span>은 전체 이용자중 상위{' '}
        <Chip variant="gray" className="font-m16">
          12.2%
        </Chip>{' '}
        입니다.
      </div>
      <div className="mt-6 mb-[72px]">
        <h3 className="font-sb16 text-primary-400">뱃지 획득 현황</h3>
      </div>
      <section>
        <div className="flex gap-2.5 py-6">
          <div>
            <span className="font-sb18 text-primary-900 block mb-3">
              나의 타이틀 뱃지
            </span>
            <BadgeCard variant="primary" size="wide">
              <BadgeWideIcon src="/assets/icons/badge/welcome.png" alt="badge" />
              <BadgeCardContent>
                <BadgeCardTitle>첫 만남</BadgeCardTitle>
                <BadgeCardDescription>그루어리에 오신것을 환영해요</BadgeCardDescription>
              </BadgeCardContent>
            </BadgeCard>
          </div>
          <div>
            <span className="font-sb18 text-primary-900 block mb-3">
              최근 획득한 뱃지
            </span>
            <BadgeCard size="wide">
              <BadgeWideIcon src="/assets/icons/badge/welcome.png" alt="badge" />
              <BadgeCardContent>
                <BadgeCardTitle>첫 만남</BadgeCardTitle>
                <BadgeCardDescription>그루어리에 오신것을 환영해요</BadgeCardDescription>
              </BadgeCardContent>
            </BadgeCard>
          </div>
        </div>
        <div className="py-6 flex flex-wrap gap-5">
          <BadgeCard>
            <BadgeCardHeader>
              <BadgeCardChip>123123 </BadgeCardChip>
            </BadgeCardHeader>
            <BadgeCardContent>
              <BadgeIcon src="/assets/icons/badge/welcome.png" alt="badge" />
              <BadgeCardTitle>첫 만남</BadgeCardTitle>
              <BadgeCardDescription>그루어리에 오신것을 환영해요</BadgeCardDescription>
            </BadgeCardContent>
          </BadgeCard>
          <BadgeCard variant="selected">
            <BadgeCardHeader>
              <BadgeCardChip>123123 </BadgeCardChip>
            </BadgeCardHeader>
            <BadgeCardContent>
              <BadgeIcon src="/assets/icons/badge/welcome.png" alt="badge" />
              <BadgeCardTitle>첫 만남</BadgeCardTitle>
              <BadgeCardDescription>그루어리에 오신것을 환영해요</BadgeCardDescription>
            </BadgeCardContent>
          </BadgeCard>
          <BadgeCard variant="disabled">
            <BadgeCardHeader>
              <BadgeCardChip>123123 </BadgeCardChip>
            </BadgeCardHeader>
            <BadgeCardContent>
              <BadgeIcon src="/assets/icons/badge/welcome.png" alt="badge" />
              <BadgeCardTitle>첫 만남</BadgeCardTitle>
              <BadgeCardDescription>그루어리에 오신것을 환영해요</BadgeCardDescription>
            </BadgeCardContent>
          </BadgeCard>
          <BadgeCard>
            <BadgeCardHeader>
              {/*<BadgeCardChip>123123 </BadgeCardChip>*/}
            </BadgeCardHeader>
            <BadgeCardContent>
              <BadgeIcon src="/assets/icons/badge/welcome.png" alt="badge" />
              <BadgeCardTitle>첫 만남</BadgeCardTitle>
              <BadgeCardDescription>그루어리에 오신것을 환영해요</BadgeCardDescription>
            </BadgeCardContent>
          </BadgeCard>
        </div>
      </section>
    </>
  );
};

export default ChallengeView;
