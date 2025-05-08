'use client';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { createPost, updatePost } from '@/post/api';
import { ReqPostType, ResPostType } from '@/post/types';
import { TopicCategory } from '@/topic/type';
import { NO_TOPIC_ID } from '@/utils';
import { trackingAnalytics } from '@/utils/trackingAnalytics';
import useFindPost from '@/post/hooks/useFindPost';
import useGetTopicsByCategory from '@/topic/hooks/useGetTopicsByCategory';
import useProfileContext from '@/hooks/profile/useProfileContext';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import StopMovePage from '@/components/StopMovePage';
import FormFooter from '@/post/components/FormFooter';
import FormContent from '@/post/components/FormContent';
import FormOptions from '@/post/components/FormOptions';
import { PostState } from '@/post/store';

export const FormSchema = z.object({
  topicId: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  content: z.string().or(z.object({ ops: z.array(z.any()) })),
  tags: z.array(z.string()),
  charactersCount: z.number().min(10),
  writeDate: z.date(),
});

type PostViewProps = {
  postId?: string;
};

const PostView = ({ postId }: PostViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const { profile } = useProfileContext();
  const { data: topics } = useGetTopicsByCategory();
  const postMutation = useFindPost(postId);
  const setPostState = useSetRecoilState(PostState);

  const [post, setPost] = useState<ResPostType | null>(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const topicId = searchParams.get('topic')
    ? parseInt(searchParams.get('topic')!, 10)
    : NO_TOPIC_ID;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topicId: post ? post.topicId?.toString() : topicId?.toString(),
      title: post?.title || '',
      category: post ? post.topic.category : searchParams.get('category') || '자유',
      tags: post ? [...post.tags] : [],
      content: post?.content || undefined,
      charactersCount: post?.charactersCount || 0,
      writeDate: post ? new Date(post.writeDate) : new Date(),
    },
  });

  const [category, topicIdValue] = form.watch(['category', 'topicId']);

  const selectedTopic = topics?.[category as TopicCategory]?.find(
    topic => topic.id === +topicIdValue,
  );

  const movePageAfterSubmit = (post: ResPostType) => {
    router.push(`/history/${post.id}`);
    toast({
      description: '기록이 저장되었습니다',
    });
  };

  async function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    setIsSubmitSuccessful(true);
    if (!profile) {
      setPostState(data as ReqPostType);
    } else {
      post
        ? await updatePost({ id: post.id, ...(data as ReqPostType) })
            .then(res => {
              trackingAnalytics('기록 수정');
              movePageAfterSubmit(res.data);
            })
            .catch(() => {
              setIsSubmitSuccessful(false);
              toast({
                description: '기록 수정에 실패했습니다',
                variant: 'destructive',
              });
            })
        : await createPost(data as ReqPostType)
            .then(res => {
              movePageAfterSubmit(res.data[0]);
            })
            .catch(() => {
              setIsSubmitSuccessful(false);
              toast({
                description: '기록 작성에 실패했습니다',
                variant: 'destructive',
              });
            });
    }
  }

  useEffect(function getPost() {
    postMutation &&
      postMutation.mutateAsync().then(res => {
        if (!res) return;
        setPost(res.data);

        form.reset({
          topicId: res.data.topicId?.toString() || '',
          title: res.data.title,
          category: res.data.topic.category,
          tags: [...res.data.tags],
          content: { ...res.data.content },
          writeDate: new Date(res.data.writeDate),
          charactersCount: res.data.charactersCount,
        });
      });
  }, []);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col pb-4 mx-auto h-[calc(100%+72px)]"
      >
        <Input
          required
          type="text"
          placeholder="제목을 입력하세요"
          className="font-r28 px-2.5 py-4 border-none"
          minLength={1}
          maxLength={50}
          {...form.register('title', {
            required: true,
            minLength: 1,
            maxLength: 50,
          })}
        />
        <FormOptions />
        <Suspense>
          <FormContent selectedTopic={selectedTopic} />
        </Suspense>
        <FormFooter />
      </form>
      <StopMovePage isPreventCondition={form.formState.isDirty && !isSubmitSuccessful} />
    </FormProvider>
  );
};

export default PostView;
