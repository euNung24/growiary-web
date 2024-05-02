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

type NewCardProps = {
  count: number;
};
const NewCard = ({ count }: NewCardProps) => {
  const {
    date: { month, date },
  } = useRecoilValue(TodayState);

  return (
    <Link href="/post">
      <Card className="shrink-0" size="lg">
        <CardHeader>
          <CardChip>No.{count}</CardChip>
          <CardTitle>새로운 기록 작성하기</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 flex items-center justify-center">
          <Plus
            width={88}
            height={88}
            className="text-gray-100 group-hover:text-primary-400 flex-1"
          />
          <span className="self-end mt-auto font-r14 text-gray-500 group-hover:text-gray-50">
            {getTwoFormatDate(month)}월 {getTwoFormatDate(date)}일
          </span>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};

export default NewCard;
