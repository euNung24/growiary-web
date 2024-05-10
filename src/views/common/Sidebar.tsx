'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LoginDialog from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import { menu } from '@/utils';
import useProfileContext from '@/hooks/profile/useProfileContext';
import { ProfileType } from '@/types/profileTypes';
import { BADGE_INFO } from '@/utils/challenge';

type MenuType = {
  src: string;
  alt: string;
  name: string;
  href: string;
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

  const handlePreventMoveLin = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} className="mb-4">
          <Link
            href={item.href}
            className={cn(
              'group flex gap-1 items-center px-3.5 py-2 mx-[10px] text-gray-500 font-sb12 lg:justify-center lg:gap-0 hover:bg-primary-50 hover:text-primary-900 rounded-md',
              item.href.split('/')[1] === pathname.split('/')[1] && active,
              checkLogin && !profile && 'text-gray-200 pointer-events-none',
            )}
            {...(checkLogin && !profile ? { onClick: handlePreventMoveLin } : {})}
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
            />
            <span className="lg:indent-[-9999px]">{item.name}</span>
          </Link>
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

  return (
    <aside className="fixed w-[200px] h-screen top-0 bg-[#F7F7F7] min-h-screen lg:w-[68px]">
      {/* 로고 */}
      <Link href="/" className="block py-[22px]">
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
            'mt-0.5 mb-8 lg:mb-5 text-center',
            profile ? 'pointer-events-none' : 'cursor-pointer',
          )}
        >
          {/* 프로필 이미지 */}
          <div className="mx-auto flex justify-center items-center w-[74px] h-[74px] rounded-full bg-gray-100 overflow-hidden lg:w-9 lg:h-9">
            <Image
              src={(profile && profile.profileImage) || '/assets/icons/profile.png'}
              alt="profile"
              width={profile && profile.profileImage ? 74 : 42}
              height={profile && profile.profileImage ? 74 : 42}
              className="lg:hidden"
            />
            <Image
              src={(profile && profile.profileImage) || '/assets/icons/profile.png'}
              alt="profile"
              width={profile && profile.profileImage ? 36 : 24}
              height={profile && profile.profileImage ? 36 : 24}
              className="hidden lg:block"
            />
          </div>
          {/* 뱃지 타이틀 */}
          <span className="lg:hidden block mt-3 mb-2 font-r12 text-gray-900">
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
              <Button variant="outline" size="sm" className="rounded-[20px] lg:hidden">
                그루어리 로그인
              </Button>
            </div>
          )}
        </div>
      </LoginDialog>

      <Menu items={menu} />
      <hr className="my-6 border-gray-200" />
      <Menu items={menu2} checkLogin={true} profile={profile} />
    </aside>
  );
};

export default Sidebar;
