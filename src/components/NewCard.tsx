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
import LoginDialog from '@/components/LoginDialog';

type NewCardProps = {
  count: number;
  isLogin?: boolean;
};

const NewCard = ({ count, isLogin = true }: NewCardProps) => {
  return isLogin ? (
    <Link href="/post">
      <NewCardContent count={count} isLogin={isLogin} />
    </Link>
  ) : (
    <LoginDialog>
      <div>
        <NewCardContent count={count} isLogin={isLogin} />
      </div>
    </LoginDialog>
  );
};

const NewCardContent = ({ count, isLogin }: NewCardProps) => {
  return (
    <Card className="shrink-0" size="lg">
      <CardHeader>
        <CardChip size="lg">No.{count}</CardChip>
        <CardTitle>{isLogin ? '새로운 기록 작성하기' : '새로운 기록 시작하기'}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 flex items-center justify-center">
        <Plus
          width={58.5}
          height={58.5}
          strokeWidth={1}
          className="text-gray-100 group-hover:text-primary-400 flex-1"
        />
      </CardContent>
      <CardFooter className="h-[29px]" />
    </Card>
  );
};

export default NewCard;
