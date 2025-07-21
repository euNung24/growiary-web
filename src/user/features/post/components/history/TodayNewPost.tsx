import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Chip from '@/shared/components/Chip';
import { format } from 'date-fns';
import { ROUTES } from '@/shared/constants/routes';

type TodayNewPostProps = {
  assignRef: (index: string) => (element: HTMLDivElement) => void;
};

const TodayNewPost = ({ assignRef }: TodayNewPostProps) => {
  const [curretDate] = useState(() => new Date());

  return (
    <div ref={assignRef(`${format(curretDate, 'yyyy-MM-dd')}`)}>
      <div className="mb-3">
        <span className="mr-2">{format(curretDate, 'M월 d일')}</span>
        <Chip variant="gray">오늘</Chip>
      </div>
      <div className="bg-gray-50o flex flex-col gap-y-[13px] justify-center items-center h-[149px] rounded-2xl text-gray-900 font-r16	">
        <p>오늘 작성한 글이 없어요</p>
        <Link href={ROUTES.post.new} className="flex gap-x-2.5 text-gray-500 font-r14">
          <Image src="/assets/icons/edit.png" alt="post" width={20} height={20} />
          새로운 기록하기
        </Link>
      </div>
    </div>
  );
};

export default TodayNewPost;
