'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { trackingAnalytics } from '@/shared/utils/trackingAnalytics';
import { useToast } from '@/shared/components/ui/use-toast';
import { updatePost } from '@/user/features/post/apis/postApi';
import { ReqPostType } from '@/user/features/post/types/post';
import useFindPost from '@/user/features/post/queries/useFindPost';
import PostForm from '@user/post/components/post/PostForm';
import { FormSchema } from '@user/post/constant/FormSchema';

type PostEditViewProps = {
  postId: string;
};

const PostEditView = ({ postId }: PostEditViewProps) => {
  const router = useRouter();

  const { toast } = useToast();
  const postMutation = useFindPost(postId);

  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const movePageAfterSubmit = (id: string) => {
    router.push(`/post/${id}`);
    toast({
      description: '기록이 저장되었습니다',
    });
  };

  function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    updatePost({ id: postId, ...(data as ReqPostType) })
      .then(() => {
        trackingAnalytics('기록 수정');
        movePageAfterSubmit(postId);
      })
      .catch(() => {
        toast({
          description: '기록 수정에 실패했습니다',
          variant: 'destructive',
        });
      });
  }

  useEffect(function getPost() {
    postMutation
      .mutateAsync()
      .then(res => {
        if (!res) return;

        const history = res.data;

        form.reset({
          topicId: history.topicId?.toString() || '',
          title: history.title,
          category: history.topic.category,
          tags: [...history.tags],
          content: { ...history.content },
          writeDate: new Date(history.writeDate),
          charactersCount: history.charactersCount,
        });

        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        toast({
          description: '기록을 불러오는 데 실패했습니다',
          variant: 'destructive',
        });
      });
  }, []);

  if (isLoading) {
    return null;
  }

  return <PostForm form={form} onSubmit={onSubmit} />;
};

export default PostEditView;
