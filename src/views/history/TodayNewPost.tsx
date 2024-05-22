import Chip from '@/components/Chip';
import Link from 'next/link';
import Image from 'next/image';

type TodayNewPostProps = {
  condition: boolean;
  assignRef: (index: string) => (element: HTMLDivElement) => void;
  year: number;
  month: number;
  date: number;
};
const TodayNewPost = ({ condition, assignRef, year, month, date }: TodayNewPostProps) => {
  return (
    condition && (
      <div
        ref={assignRef(
          `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`,
        )}
      >
        <div className="mb-3">
          <span className="mr-2">
            {month}월 {date}일
          </span>
          <Chip variant="gray">오늘</Chip>
        </div>
        <div className="bg-gray-50o flex flex-col gap-y-[13px] justify-center items-center h-[149px] rounded-2xl text-gray-900 font-r16	">
          <p>오늘 작성한 글이 없어요</p>
          <Link href="/post" className="flex gap-x-2.5 text-gray-500 font-r14">
            <Image src="/assets/icons/edit.png" alt="post" width={20} height={20} />
            새로운 기록하기
          </Link>
        </div>
      </div>
    )
  );
};

export default TodayNewPost;
