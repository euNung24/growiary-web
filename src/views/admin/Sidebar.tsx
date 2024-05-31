'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const items = [
  {
    href: '/admin',
    title: '전체',
  },
  {
    href: '/admin/feedback',
    title: '의견',
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className={cn('flex space-x-2 flex-col space-x-0 space-y-1')}>
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start',
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
