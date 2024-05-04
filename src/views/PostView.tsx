'use client';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Hash } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
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
import Editor from '@/components/Editor';
import Tag from '@/components/Tag';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReqPostType, ResPostType } from '@/types/postTypes';
import { createPost, updatePost } from '@/apis/post';
import useFindTopic from '@/hooks/topics/useFindTopics';
import { useEffect, useRef, useState } from 'react';
import { TopicType } from '@/types/topicTypes';
import { topicCategory } from '@/utils/topicCategory';
import StopMovePage from '@/components/StopMovePage';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const FormSchema = z.object({
  topicId: z.number().nullish(),
  title: z.string(),
  content: z.string().or(z.object({ ops: z.array(z.any()) })),
  tags: z.array(z.string()),
  charactersCount: z.number(),
  writeDate: z.date(),
});

type PostViewProps = {
  post?: ResPostType;
};
const PostView = ({ post }: PostViewProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicId = searchParams.get('topic')
    ? parseInt(searchParams.get('topic')!, 10)
    : null;
  const mutation = useFindTopic(topicId || 0);
  const [template, setTemplate] = useState<TopicType>({} as TopicType);
  const btnStopPostRef = useRef<HTMLButtonElement | null>(null);
  const btnSaveToastRef = useRef<HTMLButtonElement | null>(null);
  const historyFnRef = useRef(() => {});
  const isSavedRef = useRef(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topicId: post ? post.topicId : topicId,
      title: post?.title || '',
      tags: post ? [...post.tags] : [],
      content: post?.content || '',
      charactersCount: post?.charactersCount || 0,
      writeDate: post ? new Date(post.writeDate) : new Date(),
    },
  });

  // const validateTextLength = (e: FormEvent) => {
  //   const target = e.currentTarget as HTMLInputElement;
  //   if (target.type === 'text' && target.value.length >= 10) return;
  //   if (target.type === 'number' && +target.value >= 10) return;
  //   target.setCustomValidity('10자 이상 작성해주세요');
  // };

  const movePageAfterSubmit = (post: ResPostType) => {
    form.reset();
    router.push(`/post/${post.id}`);
    btnSaveToastRef.current?.click();
  };

  async function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    isSavedRef.current = true;

    post
      ? await updatePost({ id: post.id, ...(data as ReqPostType) })
          .then(res => {
            movePageAfterSubmit(res.data);
          })
          .catch(() => {
            isSavedRef.current = false;
          })
      : await createPost(data as ReqPostType)
          .then(res => {
            movePageAfterSubmit(res.data[0]);
          })
          .catch(() => {
            isSavedRef.current = false;
          });
  }

  const isStopPost = (fn?: () => void) => {
    if (isSavedRef.current) {
      fn && (historyFnRef.current = fn);
      return;
    }

    btnStopPostRef.current?.click();
    fn && (historyFnRef.current = fn);
  };

  const movePage = () => {
    form.reset();
    historyFnRef.current && historyFnRef.current();
  };

  useEffect(function setInitTemplate() {
    if (!topicId) {
      setTemplate(v => ({ ...v, content: '일상의 소중한 경험을 기록하세요.' }));
      return;
    }
    mutation.mutateAsync().then(({ data }) => {
      !data.content && (data['content'] = '일상의 소중한 경험을 기록하세요.');
      setTemplate(data);
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 flex flex-col gap-y-4 w-[960px] h-full mx-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field: titleField }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder={
                      template.title?.replaceAll('/n ', '') || '제목을 입력하세요'
                    }
                    onChange={titleField.onChange}
                    className="font-r28 px-0 py-4 border-none"
                    minLength={10}
                    maxLength={50}
                    // onInvalid={validateTextLength}
                    // onChange={e => {
                    //   const target = e.target as HTMLInputElement;
                    //   titleField.onChange(target.value);
                    //   target.setCustomValidity('');
                    // }}
                  />
                </FormControl>
              </FormItem>
              <div className="space-y-[14px]">
                <FormField
                  control={form.control}
                  name="writeDate"
                  render={({ field }) => (
                    <FormItem className="flex space-y-0">
                      <FormLabel className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-700">
                        <CalendarIcon width={22} height={22} />
                        날짜
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'ghost'}
                              className={cn(
                                'flex-1 pl-3 py-2 font-r16 text-gray-700 justify-start hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {format(field.value, 'yyyy년 M월 d일')}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            defaultMonth={field.value}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex space-y-0">
                      <FormLabel className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-700">
                        <Hash width={22} height={22} />
                        태그
                      </FormLabel>
                      <Tag setTags={field.onChange} tags={field.value} />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="charactersCount"
                render={({ field: countField }) => (
                  <>
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field: contentField }) => (
                        <div className="relative flex-1">
                          <Editor
                            placeholder={template.content}
                            className="flex flex-col h-full"
                            defaultValue={contentField.value}
                            events={{
                              handleContentChange: contentField.onChange,
                              handleCountChange: countField.onChange,
                            }}
                          />
                          {template?.category && (
                            <div className="absolute bottom-0 right-0 max-w-[314px] max-h-[314px] pr-2 h-[50%]">
                              {topicCategory[template.category]?.Icon({
                                width: '100%',
                                height: '100%',
                                color: '#EEF9E6',
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    />
                    <div className="flex justify-end items-center gap-x-[29px]">
                      <span className="text-gray-400 font-r18">
                        {countField.value} / 2000
                      </span>
                      <Button
                        type="submit"
                        disabled={titleField.value.length <= 10 || countField.value <= 10}
                      >
                        저장하기
                      </Button>
                      <StopMovePage
                        url="/post"
                        isPreventCondition={!!titleField.value || !!countField.value}
                        fn={isStopPost}
                      />
                    </div>
                  </>
                )}
              />
            </>
          )}
        />
      </form>
      <AlertDialog>
        <AlertDialogTrigger className="hidden" ref={btnStopPostRef}>
          글쓰기 중단 팝업
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitleIcon src="/next.svg" width={32} height={32} alt="temp" />
            <AlertDialogTitle>글쓰기를 중단하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              변경사항이 저장되지 않을 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={movePage}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        ref={btnSaveToastRef}
        variant="hidden"
        onClick={() => {
          toast({
            description: '일기가 저장되었습니다',
            onEndToast: historyFnRef.current,
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </Form>
  );
};

export default PostView;
