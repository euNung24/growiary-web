'use client';

import Image from 'next/image';
import { cn } from '@/shared/utils/cn';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LoginDialog from '@/shared/components/LoginDialog';
import { Button } from '@/shared/components/ui/button';
import { menu } from '@/shared/utils';
import useProfileContext from '@/user/profile/hooks/useProfileContext';
import { ProfileType } from '@/user/profile/type';
import { BADGE_INFO } from '@user/challenge/utils/badges';
import { tracking } from '@/shared/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { useEffect, useState } from 'react';
import { requestPermission } from '@/shared/utils/firebase';
import { X } from 'lucide-react';
import * as React from 'react';
import { useRecoilState } from 'recoil';
import { LocalState } from '@/shared/store/localStore';

type MenuType = {
  src: string;
  alt: string;
  name: string;
  href: string;
  indicator?: string;
  indicatorLeft?: string;
};

type MenuProps = {
  items: MenuType[];
  checkLogin?: boolean;
  profile?: ProfileType;
};

const Menu = ({ items, checkLogin = false, profile }: MenuProps) => {
  const active =
    'rounded bg-primary-900 text-white-0 hover:bg-primary-900 hover:text-white-0';
  const pathname = usePathname();
  const indicators = menu
    .filter(v => v.indicator)
    .map((v, i) => ({ index: i, name: v.name }));

  const [localState, setLocalState] = useRecoilState(LocalState);
  const [indicator, setIndicator] = useState<{
    index: number;
    name: string;
  } | null>(indicators[0]);

  const handleClickMenu = (e: React.MouseEvent, name: string, isLogin: boolean) => {
    tracking(name);
    sendGAEvent({ event: name });

    if (isLogin) {
      e.preventDefault();
    }
  };

  const changeIndicator = () => {
    indicator &&
      setIndicator(
        indicator.index < indicators.length - 1 ? indicators[indicator.index + 1] : null,
      );
    indicator?.index === indicators.length - 1 &&
      setLocalState(v => ({ ...v, showIndicator: false }));
  };

  useEffect(() => {
    window.addEventListener('click', changeIndicator);

    return () => {
      window.removeEventListener('click', changeIndicator);
    };
  }, [indicator]);

  useEffect(
    function setIndicatorCookie() {
      !localState.showIndicator && setIndicator(null);
    },
    [profile],
  );

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} className="mb-4 relative">
          <Link
            href={item.href}
            className={cn(
              'group flex gap-1 items-center px-3.5 py-2 mx-[10px] text-gray-500 font-sb12 lg:justify-center lg:gap-0 hover:bg-primary-50 hover:text-primary-900 rounded-md transition-colors duration-150',
              item.href.split('/')[1] === pathname.split('/')[1] && active,
              checkLogin && !profile && 'text-gray-200 pointer-events-none',
            )}
            onClick={e => handleClickMenu(e, item.name, checkLogin && !profile)}
          >
            <Image
              src={
                !checkLogin || profile
                  ? item.src +
                    (item.href.split('/')[1] === pathname.split('/')[1]
                      ? '_white.png'
                      : '.png')
                  : item.src + '_disabled.png'
              }
              width={16}
              height={16}
              alt={item.alt}
              className="min-w-[16px] group-hover:hidden"
              priority
            />
            <Image
              src={
                item.src +
                (item.href.split('/')[1] !== pathname.split('/')[1]
                  ? '_primary.png'
                  : '_white.png')
              }
              width={16}
              height={16}
              alt={item.alt}
              className="hidden min-w-[16px] group-hover:block"
              priority
            />
            <div className="lg:indent-[-9999px]">{item.name}</div>
          </Link>
          {profile && indicator?.name === item.name && item.indicator && (
            <>
              <div className="fixed bg-black/20 inset-0 z-10"></div>
              <div
                className={
                  'z-20 absolute left-full top-[calc(50%-3px)] -translate-y-1/2 flex gap-2 items-center font-r12 text-nowrap bg-primary-900 pl-2.5 pr-1 py-1.5 rounded text-white-0 lg:!left-[58px]'
                }
                style={{
                  left: item.indicatorLeft,
                }}
              >
                {item.indicator}
                <X className="text-gray-200 cursor-pointer" width={16} height={16} />
                <div className="absolute top-1/2 left-[-14px] -translate-y-1/2 w-4 h-4 border border-secondary-900 border-8 border-r-primary-900 border-t-transparent border-b-transparent border-l-transparent"></div>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

const Sidebar = () => {
  const { profile, titleBadge } = useProfileContext();

  const menu2 = [
    {
      src: '/assets/icons/settings',
      alt: 'setting',
      name: '설정하기',
      href: '/settings',
    },
    {
      src: '/assets/icons/forward-message',
      alt: 'feedback',
      name: '의견 보내기',
      href: '/feedback',
    },
  ];

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <aside className="fixed w-[200px] h-screen top-0 bg-[#F7F7F7] min-h-screen lg:w-[68px] z-10 mt-safeTop">
      {/* 로고 */}
      <Link
        href="/"
        className="block py-[22px]"
        onClick={() => {
          tracking('메인 페이지');
          sendGAEvent({ event: '메인 페이지' });
        }}
      >
        <picture>
          <source
            srcSet="/assets/icons/logo/square.png"
            width={30}
            height={28.29}
            media="(max-width: 1160px)"
          />
          <source
            srcSet="/assets/icons/logo/wide.png"
            width={114}
            height={27.26}
            media="(min-width: 1160px)"
          />
          <Image
            src="/assets/icons/logo/square.png"
            width={30}
            height={28.29}
            alt="Growiary"
            className="m-auto"
            priority
          />
        </picture>
      </Link>
      <LoginDialog>
        <div
          className={cn(
            'mt-0.5 lg:mb-5 text-center',
            profile ? 'pointer-events-none mb-6' : 'cursor-pointer mb-8',
          )}
        >
          {/* 프로필 이미지 */}
          <div className="mx-auto flex justify-center items-center w-[74px] h-[74px] rounded-full bg-gray-100 overflow-hidden lg:w-9 lg:h-9">
            <Image
              src={profile?.profileImage || '/assets/icons/profile.png'}
              alt="profile"
              width={profile?.profileImage ? 74 : 42}
              height={profile?.profileImage ? 74 : 42}
              className="lg:hidden"
              priority
            />
            <Image
              src={profile?.profileImage || '/assets/icons/profile.png'}
              alt="profile"
              width={profile?.profileImage ? 36 : 24}
              height={profile?.profileImage ? 36 : 24}
              className="hidden lg:block"
              priority
            />
          </div>
          {/* 뱃지 타이틀 */}
          <span className="lg:hidden block mt-3 font-r12 text-gray-500">
            {profile
              ? BADGE_INFO[titleBadge || 'first'].name
              : '회고하며 성장하는 일기장'}
          </span>
          {/* 닉네임 */}
          {profile ? (
            <span className="font-sb16 text-gray-900 lg:hidden">
              {profile.nickname || '그루미'}
            </span>
          ) : (
            <div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-[20px] lg:hidden mt-3"
              >
                그루어리 로그인
              </Button>
            </div>
          )}
        </div>
      </LoginDialog>
      <Menu items={menu} profile={profile} />
      <hr className="my-6 border-gray-200" />
      <Menu items={menu2} checkLogin={true} profile={profile} />
    </aside>
  );
};

export default Sidebar;
