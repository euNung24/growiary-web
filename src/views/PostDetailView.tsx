'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Hash } from 'lucide-react';
import { ResPostType } from '@/types/postTypes';
import Tag from '@/components/Tag';
import { useEffect, useRef } from 'react';
import '@/components/editor.css';
import { topicCategory } from '@/utils/topicCategory';
import Link from 'next/link';
import { getStringDateAndTime } from '@/utils';
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
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import useDeletePost from '@/hooks/posts/useDeletePosts';

type PostViewProps = {
  post: ResPostType;
};
const PostView = ({ post }: PostViewProps) => {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isClickedFirst = useRef(false);
  const mutation = useDeletePost(post.id);

  const handleDeletePost = () => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      toast({
        description: '일기가 삭제되었습니다',
        onEndToast: () => {
          router.push('/history');
        },
      });
    });
  };

  useEffect(() => {
    if (!isClickedFirst.current) {
      isClickedFirst.current = true;
      return;
    }
    if (!contentRef.current) return;
    const fn = async () => {
      const Quill = await import('quill');
      const container = contentRef.current;
      // const tempDivEl = document.createElement('div');
      const editorContainer = container!.appendChild(
        container!.ownerDocument.createElement('div'),
      );
      const quill = new Quill.default(editorContainer, {
        theme: 'snow',
        readOnly: true,
      });
      const toolbarEl = container!.querySelector('.ql-toolbar');

      quill.setContents(post.content.ops);
      toolbarEl && ((toolbarEl as HTMLDivElement).style.display = 'none');
      editorContainer.style.borderTop = '1px solid #ccc';
      editorContainer.style.borderLeftWidth = '0';
      editorContainer.style.borderRightWidth = '0';
    };
    fn().then();

    return () => {};
  }, []);

  return (
    <div className="w-2/3 mt-[72px] flex flex-col gap-y-4 w-[960px] h-full mx-auto">
      <div className="flex w-full rounded-md bg-background px-0 py-2 font-r28 px-0 py-4 text-gray-900">
        {post.title}
      </div>
      <div className="space-y-[14px]">
        <div className="flex space-y-0">
          <div className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-700">
            <CalendarIcon width={22} height={22} />
            날짜
          </div>
          <Button
            variant={'ghost'}
            disabled
            className={cn(
              'flex-1 pl-3 py-2 font-r16 text-gray-700 justify-start hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700',
            )}
          >
            {getStringDateAndTime(new Date(post.writeDate))}
          </Button>
        </div>
        <div className="flex space-y-0">
          <div className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-700">
            <Hash width={22} height={22} />
            태그
          </div>
          <Tag tags={post.tags} />
        </div>
      </div>
      <div
        className="relative flex-1 pointer-events-nones cursor-default"
        ref={contentRef}
      >
        {post.category && (
          <div className="absolute bottom-0 right-0 max-w-[314px] max-h-[314px] pr-2 h-[50%]">
            {topicCategory[post.category]?.Icon({
              width: '100%',
              height: '100%',
              color: '#EEF9E6',
            })}
          </div>
        )}
      </div>
      <div className="flex justify-end items-center gap-x-2.5">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="outlineGray" size="lg">
              삭제하기
            </Button>
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
              <AlertDialogCancel onClick={handleDeletePost}>확인</AlertDialogCancel>
              <AlertDialogAction>취소</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button type="button" size="lg" asChild>
          <Link href={`/history/${post.id}/edit`}>수정하기</Link>
        </Button>
      </div>
    </div>
  );
};

export default PostView;
