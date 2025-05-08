import {
  Card,
  CardChip,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import LoginDialog from '@/shared/components/LoginDialog';
import { topicCategory } from '@/shared/types/topicCategory';
import { tracking } from '@/shared/utils/mixPanel';
import { MENU_NAMES } from '@/shared/utils';
import { sendGAEvent } from '@next/third-parties/google';

type NewCardProps = {
  isLogin?: boolean;
};

const NewCard = ({ isLogin = true }: NewCardProps) => {
  const handleClickNewPost = () => {
    tracking(MENU_NAMES.기록하기);
    sendGAEvent({ event: MENU_NAMES.기록하기 });
  };

  return isLogin ? (
    <Link href="/post" onClick={handleClickNewPost}>
      <NewCardContent isLogin={isLogin} />
    </Link>
  ) : (
    <LoginDialog>
      <div>
        <NewCardContent isLogin={isLogin} />
      </div>
    </LoginDialog>
  );
};

const NewCardContent = ({ isLogin }: NewCardProps) => {
  return (
    <Card className="shrink-0" size="lg">
      <CardHeader>
        <CardChip size="lg">
          {topicCategory['자유'].Icon({ width: 12, height: 12, color: 'currentColor' })}
          자유
        </CardChip>
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
