import Image from 'next/image';

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
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} className="mb-4">
          <a
            href={item.href}
            className="flex gap-1 items-center px-3.5 py-2 text-gray-700 font-sb12 lg:justify-center"
          >
            <Image src={item.src} width={16} height={16} alt={item.alt} />
            <span className="lg:indent-[-9999px]">{item.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
const Sidebar = () => {
  const menu1 = [
    {
      src: '/assets/icons/pencil.png',
      alt: 'write a diary',
      name: '기록하기',
      href: '#',
    },
    {
      src: '/assets/icons/calendar.png',
      alt: 'history',
      name: '나의 기록들',
      href: '#',
    },
    {
      src: '/assets/icons/cards.png',
      alt: 'recommended templates',
      name: '추천 질문 둘러보기',
      href: '#',
    },
    {
      src: '/assets/icons/charts.png',
      alt: 'monthly report',
      name: '월간 리포트',
      href: '#',
    },
    {
      src: '/assets/icons/book.png',
      alt: 'retrospect tip',
      name: '회고 TIP',
      href: '#',
    },
  ];

  const menu2 = [
    {
      src: '/assets/icons/setting.png',
      alt: 'setting',
      name: '설정하기',
      href: '#',
    },
    {
      src: '/assets/icons/mail.png',
      alt: 'feedback',
      name: '의견 보내기',
      href: '#',
    },
  ];

  return (
    <aside className="lg:w-[68px] w-[200px] h-screen bg-gray-50">
      <a href="/" className="block py-[22px]">
        <picture>
          <source
            srcSet="/assets/icons/logo/squre.png"
            width={30}
            height={28.29}
            media="(max-width: 1024px)"
          />
          <Image
            src="/assets/icons/logo/wide.png"
            width={114}
            height={27.26}
            alt="Growiary"
            className="m-auto"
          />
        </picture>
      </a>
      <Menu items={menu1} />
      <hr className="my-6 border-gray-200" />
      <Menu items={menu2} />
    </aside>
  );
};

export default Sidebar;
