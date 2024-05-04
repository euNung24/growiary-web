import {
  Card,
  CardChip,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';

type NewCardProps = {
  count: number;
};
const NewCard = ({ count }: NewCardProps) => {
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
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};

export default NewCard;
