'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetRecoilState } from 'recoil';

import { useToast } from '@/shared/components/ui/use-toast';
import useProfileContext from '@/shared/hooks/useProfileContext';
import { NO_TOPIC_ID } from '@/shared/utils';
import PostForm from '@user/post/components/PostForm';
import { FormSchema } from '@user/post/constant/FormSchema';
import { PostState } from '@user/post/store';
import { ReqPostType, ResPostType } from '@user/post/types/post';
import { createPost } from '@user/post/apis/postApi';

const PostView = () => {
  const router = useRouter();

  const { profile } = useProfileContext();
  const { toast } = useToast();

  const setPostState = useSetRecoilState(PostState);

  const searchParams = useSearchParams();

  const topicId = searchParams.get('topic')
    ? parseInt(searchParams.get('topic')!, 10)
    : NO_TOPIC_ID;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topicId: topicId?.toString(),
      title: '',
      category: searchParams.get('category') || '자유',
      tags: [],
      content: undefined,
      charactersCount: 0,
      writeDate: new Date(),
    },
  });

  const movePageAfterSubmit = (post: ResPostType) => {
    router.push(`/history/${post.id}`);
    toast({
      description: '기록이 저장되었습니다',
    });
  };

  function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    if (!profile) {
      setPostState(data as ReqPostType);
    } else {
      createPost(data as ReqPostType)
        .then(res => {
          movePageAfterSubmit(res.data[0]);
        })
        .catch(error => {
          console.error(error);
          toast({
            description: '기록 작성에 실패했습니다',
            variant: 'destructive',
          });
        });
    }
  }

  return <PostForm form={form} onSubmit={onSubmit} />;
};

export default PostView;
