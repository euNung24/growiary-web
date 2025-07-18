import Link from 'next/link';
import { Ellipsis } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTitleIcon,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import useProfileContext from '@/shared/hooks/useProfileContext';

type DeletePostPopoverProps = {
  postId: string;
  onDelete: () => void;
};

const DeletePostPopover = ({ postId, onDelete }: DeletePostPopoverProps) => {
  const { profile } = useProfileContext();

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          'absolute right-6 top-6',
          !profile && 'cursor-default pointer-events-none',
        )}
        aria-label="더보기"
      >
        <Ellipsis width={24} height={24} color="#747F89" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-center overflow-hidden bg-white-0 w-auto p-0 [&>*]:py-2.5 [&>*]:px-10 [&>*]:block [&>*]:font-r14">
        <Button asChild variant="ghostGrayHover">
          <Link href={`/history/${postId}/edit`}>수정하기</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghostGrayHover">삭제하기</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitleIcon
                src="/assets/icons/info.png"
                width={32}
                height={32}
                alt="info"
              />
              <AlertDialogTitle>기록을 정말 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                삭제된 글은 복원할 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onDelete}>확인</AlertDialogCancel>
              <AlertDialogAction>취소</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  );
};

export default DeletePostPopover;
