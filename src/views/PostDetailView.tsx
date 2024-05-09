'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import { ResPostType } from '@/types/postTypes';
import Tag from '@/components/Tag';
import { useEffect, useRef, useState } from 'react';
import '@/components/editor.css';
import { topicCategory } from '@/utils/topicCategory';
import Link from 'next/link';
import { getStringDateAndTime, NO_TOPIC_ID } from '@/utils';
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
import { Label } from '@/components/ui/label';
import { TopicType } from '@/types/topicTypes';
import useFindTopic from '@/hooks/topics/useFindTopics';
import Image from 'next/image';
import Editor from '@/components/Editor';

type PostViewProps = {
  post: ResPostType;
};
const PostView = ({ post }: PostViewProps) => {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement | null>(null);
  // const isClickedFirst = useRef(false);
  const mutation = useDeletePost(post.id);
  const [template, setTemplate] = useState<TopicType>({} as TopicType);
  const topicMutation = useFindTopic(post.topicId || NO_TOPIC_ID);

  const handleDeletePost = () => {
    mutation.mutateAsync().then(res => {
      if (!res) return;
      toast({
        description: '기록이 삭제되었습니다',
        onEndToast: () => {
          router.push('/history');
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

  useEffect(
    function setInitTemplate() {
      if (!post) return;
      topicMutation.mutateAsync().then(res => {
        if (!res) return;
        setTemplate(res.data);
      });
    },
    [post],
  );

  return (
    <div className="w-2/3 mt-[72px] flex flex-col gap-y-4 w-[960px] min-h-[80vh] mx-auto">
      {post.topicId && (
        <div>
          <div className="border border-gray-200 rounded py-2.5 px-4 inline-flex items-center justify-center">
            <div className="flex gap-x-2.5 text-gray-400">
              {topicCategory[template.category]?.Icon({
                width: 20,
                height: 20,
                color: 'currentColor',
              })}
              <span className="text-gray-800">{template.category}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full rounded-md bg-background px-0 py-2 font-r28 px-0 py-4 text-gray-900">
        {post.title}
      </div>
      <div className="space-y-[14px]">
        {post.topicId && (
          <div className="flex space-y-0">
            <Label className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-500">
              <List width={22} height={22} />
              주제
            </Label>
            <div className="px-3 py-[14px]">{template.title?.replaceAll('/n ', '')}</div>
          </div>
        )}
        <div className="flex space-y-0">
          <div className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-500">
            <Image src="/assets/icons/calendar.png" alt="date" width={22} height={22} />{' '}
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
        <div className="flex space-y-0 py-[11px]">
          <div className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-500">
            <Image src="/assets/icons/hashtag.png" alt="tag" width={22} height={22} />
            태그
          </div>
          <Tag tags={post.tags} />
        </div>
      </div>
      <div className="relative flex-1 pointer-events-nones cursor-default flex-1">
        <Editor defaultValue={post.content} readonly className="" />

        {template && (
          <div className="absolute bottom-0 right-0 max-w-[314px] max-h-[314px] pr-2 h-[50%]">
            {topicCategory[template.category]?.Icon({
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
        <Button type="button" variant="outlineGray" size="lg" asChild>
          <Link href={`/history/${post.id}/edit`}>수정하기</Link>
        </Button>
      </div>
    </div>
  );
};

export default PostView;
