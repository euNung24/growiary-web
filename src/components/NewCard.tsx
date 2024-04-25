import {
  Card,
  CardChip,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { TodayState } from '@/store/todayStore';
import { getTwoFormatDate } from '@/utils';
import Link from 'next/link';

const NewCard = () => {
  const {
    date: { month, date },
  } = useRecoilValue(TodayState);

  return (
    <Card className="shrink-0" size="lg">
      <CardHeader>
        <CardChip>No.32</CardChip>
        <CardTitle>새로운 기록 작성하기</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col pb-5">
        <Link href="/post" className="flex-1 flex items-center justify-center">
          <Plus
            width={88}
            height={88}
            className="text-gray-100 group-hover:text-primary-400"
          />
        </Link>
        <span className="self-end mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
          {getTwoFormatDate(month)}월 {getTwoFormatDate(date)}일
        </span>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default NewCard;
