'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LoginDialog from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';

type MenuType = {
  src: string;
  alt: string;
  name: string;
  href: string;
};

type MenuProps = {
  items: MenuType[];
};

const Menu = ({ items }: MenuProps) => {
  const active =
    'rounded bg-primary-900 text-white-0 hover:bg-primary-900 hover:text-white-0';
  const pathname = usePathname();

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} className="mb-4">
          <Link
            href={item.href}
            className={cn(
              'flex gap-1 items-center px-3.5 py-2 mx-[10px] text-gray-700 font-sb12 lg:justify-center lg:gap-0 hover:bg-gray-50 hover:text-primary-900',
              item.href === pathname && active,
            )}
          >
            <Image
              src={item.src + (item.href === pathname ? '_white.png' : '.png')}
              width={16}
              height={16}
              alt={item.alt}
              className="min-w-[16px]"
            />
            <span className="lg:indent-[-9999px]">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
const Sidebar = () => {
  const menu1 = [
    {
      src: '/assets/icons/edit',
      alt: 'write a diary',
      name: '기록하기',
      href: '/post',
    },
    {
      src: '/assets/icons/calendar',
      alt: 'history',
      name: '나의 기록들',
      href: '/history',
    },
    {
      src: '/assets/icons/multi-window',
      alt: 'recommended questions',
      name: '추천 주제',
      href: '/topics',
    },
    {
      src: '/assets/icons/report',
      alt: 'monthly report',
      name: '월간 리포트',
      href: '/report',
    },
    // {
    //   src: '/assets/icons/book',
    //   alt: 'retrospect tip',
    //   name: '회고 TIP',
    //   href: '#',
    // },
    {
      src: '/assets/icons/challenge',
      alt: 'challenge',
      name: '도전과제',
      href: '/challenge',
    },
  ];

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
    <aside className="lg:flex-[0_0_68px] flex-[0_0_200px] bg-[#F7F7F7] min-h-screen">
      <Link href="/" className="block py-[22px]">
        <picture>
          <source
            srcSet="/assets/icons/logo/square.png"
            width={30}
            height={28.29}
            media="(max-width: 1024px)"
          />
          <source
            srcSet="/assets/icons/logo/wide.png"
            width={114}
            height={27.26}
            media="(min-width: 1024px)"
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
      <div className="mt-0.5 mb-8 lg:mb-5 text-center">
        <div className="mx-auto flex justify-center items-center w-[74px] h-[74px] rounded-full bg-gray-100 lg:hidden">
          <Image src="/assets/icons/profile.png" alt="profile" width={42} height={42} />
        </div>
        <span className="lg:hidden block mt-3 mb-2 font-r12 text-gray-900">
          회고하며 성장하는 일기장
        </span>
        <LoginDialog>
          <div>
            <Button variant="outline" size="sm" className="rounded-[20px] lg:hidden">
              그루어리 로그인
            </Button>
            <div className="w-[36px] h-[36px] mx-auto rounded-full bg-gray-100 hidden lg:flex lg:justify-center lg:items-center cursor-pointer">
              <Image
                src="/assets/icons/profile.png"
                alt="profile"
                width={24}
                height={24}
                className="lg:block hidden"
              />
            </div>
          </div>
        </LoginDialog>
      </div>
      <Menu items={menu1} />
      <hr className="my-6 border-gray-200" />
      <Menu items={menu2} />
    </aside>
  );
};

export default Sidebar;
