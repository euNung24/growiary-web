'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Braces, List } from 'lucide-react';
import { sendGAEvent } from '@next/third-parties/google';

import '@user/post/components/post/editor.css';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import { getStringDateAndTime } from '@/shared/utils';
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
import { toast } from '@/shared/components/ui/use-toast';
import { Label } from '@/shared/components/ui/label';
import { topicCategory } from '@/shared/types/topicCategory';
import { tracking } from '@/shared/utils/mixPanel';

import { ResPostType } from '@/user/features/post/types/post';
import Tag from '@/user/features/post/components/post/Tag';
import useDeletePost from '@/user/features/post/queries/useDeletePosts';
import Editor from '@/user/features/post/components/post/Editor';
import useFindPost from '@/user/features/post/queries/useFindPost';
import { ROUTES } from '@/shared/constants/routes';

type PostDetailViewProps = {
  postId: string;
};
const PostDetailView = ({ postId }: PostDetailViewProps) => {
  const labelStyle =
    'flex flex-[0_0_100px] gap-2 items-center pl-3 min-h-[34px] text-gray-500 font-r12';
  const inputStyle = 'px-6 text-gray-900 font-r12';

  const router = useRouter();
  const contentRef = useRef<HTMLDivElement | null>(null);
  // const isClickedFirst = useRef(false);
  const findMutation = useFindPost(postId);
  const deleteMutation = useDeletePost(postId);
  const [post, setPost] = useState<ResPostType | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleDeletePost = () => {
    tracking('기록 삭제');
    sendGAEvent({ event: '기록 삭제' });

    deleteMutation.mutateAsync().then(res => {
      if (!res) return;
      toast({
        description: '기록이 삭제되었습니다',
        onEndToast: () => {
          router.push(ROUTES.post.list);
        },
      });
    });
  };

  useEffect(() => {
    const resizeFn = async () => {
      const container = contentRef.current;
      // const tempDivEl = document.createElement('div');
      const editorContainer = container?.firstElementChild;
      if (editorContainer && container) {
        (editorContainer as HTMLDivElement).style.height =
          container.getBoundingClientRect().height + 'px';
      }
    };
    window.addEventListener('resize', resizeFn);

    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, []);

  useEffect(() => {
    findMutation &&
      findMutation.mutateAsync().then(res => {
        if (!res) return;
        setPost(res.data);
      });
  }, []);

  return (
    <div className={cn('flex flex-col mx-auto', 'h-[calc(100%+72px)]')} ref={formRef}>
      {post && (
        <>
          <div className="flex w-full rounded-md bg-background font-r28 px-2.5 py-4 text-gray-900">
            {post.title}
          </div>
          <div>
            {post.topic && (
              <div className="flex space-y-0 items-center">
                <Label className={labelStyle}>
                  <Braces width={14} height={14} />
                  카테고리
                </Label>
                <div className={cn(inputStyle, 'flex items-center gap-x-1')}>
                  {topicCategory[post.topic.category]?.Icon({
                    width: 14,
                    height: 14,
                    color: '#8A9299',
                  })}
                  {post.topic.category}
                </div>
              </div>
            )}
            {post.topicId && (
              <div className="flex space-y-0 items-center">
                <Label className={labelStyle}>
                  <List width={14} height={14} />
                  주제
                </Label>
                <div className={inputStyle}>
                  {post.topic && post.topic.title?.replaceAll('/n ', '')}
                </div>
              </div>
            )}
            <div className="flex space-y-0 items-center">
              <div className={labelStyle}>
                <Image
                  src="/assets/icons/calendar.png"
                  alt="date"
                  width={14}
                  height={14}
                />{' '}
                날짜
              </div>
              <Button
                variant={'ghost'}
                disabled
                className={cn(
                  'flex-1 justify-start hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700',
                  inputStyle,
                )}
              >
                {getStringDateAndTime(new Date(post.writeDate))}
              </Button>
            </div>
            <div className="flex space-y-0 items-center">
              <div className={labelStyle}>
                <Image src="/assets/icons/hashtag.png" alt="tag" width={14} height={14} />
                태그
              </div>
              <Tag tags={post.tags} />
            </div>
          </div>
          <div className="relative mt-[15px] mb-4 flex-1 overflow-hidden pointer-events-nones cursor-default border-t border-b border-[#ccc]">
            <Editor defaultValue={post.content} readonly />

            {post.topic && (
              <div className="absolute bottom-0 right-0 max-w-[314px] max-h-[314px] pr-2 h-[50%] z-[-1]">
                {topicCategory[post.topic.category]?.Icon({
                  width: '100%',
                  height: '100%',
                  color: '#EEF9E6',
                })}
              </div>
            )}
          </div>
          <div className="flex justify-end items-center gap-x-2.5 mb-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="outlineGray" size="sm">
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
            <Button type="button" variant="outlineGray" size="sm" asChild>
              <Link href={ROUTES.post.edit(post.id)}>수정하기</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailView;
