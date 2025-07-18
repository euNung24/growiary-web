'use client';

import { Suspense } from 'react';

import { z } from 'zod';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Input } from '@/shared/components/ui/input';
import { TopicCategory } from '@/user/features/topic/types/topic';
import useGetTopicsByCategory from '@/user/features/topic/queries/useGetTopicsByCategory';
import { ReqPostType } from '@/user/features/post/types/post';
import StopMovePage from '@/user/features/post/components/StopMovePage';
import FormFooter from '@/user/features/post/components/FormFooter';
import FormContent from '@/user/features/post/components/FormContent';
import FormOptions from '@/user/features/post/components/FormOptions';
import { FormSchema } from '@user/post/constant/FormSchema';

interface PostFormProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  onSubmit: (data: z.infer<typeof FormSchema> | ReqPostType) => void;
}

const PostForm = ({ form, onSubmit }: PostFormProps) => {
  const { data: topics } = useGetTopicsByCategory();

  const [category, topicIdValue] = form.watch(['category', 'topicId']);
  const { isSubmitSuccessful } = form.formState;

  const selectedTopic = topics?.[category as TopicCategory]?.find(
    topic => topic.id === +topicIdValue,
  );

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

export default PostForm;
