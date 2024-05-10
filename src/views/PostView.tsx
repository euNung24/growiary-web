'use client';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
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
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { NO_TOPIC_ID } from '@/utils';
import Image from 'next/image';
import useProfileContext from '@/hooks/profile/useProfileContext';
import LoginDialog from '@/components/LoginDialog';
import StopMovePage from '@/components/StopMovePage';

const FormSchema = z.object({
  topicId: z.number(),
  title: z.string().min(1),
  content: z.string().or(z.object({ ops: z.array(z.any()) })),
  tags: z.array(z.string()),
  charactersCount: z.number().min(10),
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
    : post?.topicId || NO_TOPIC_ID;
  const mutation = useFindTopic((post?.topicId || topicId) ?? NO_TOPIC_ID);
  const [template, setTemplate] = useState<TopicType>({} as TopicType);
  const btnStopPostRef = useRef<HTMLButtonElement | null>(null);
  const btnSaveToastRef = useRef<HTMLButtonElement | null>(null);
  const historyFnRef = useRef<() => void | false>(() => {});
  const isSavedRef = useRef(false);
  const { toast } = useToast();
  const { profile } = useProfileContext();

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
    router.push(`/history/${post.id}`);
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

  // const isStopPost = (fn?: () => void) => {
  //   if (isSavedRef.current) {
  //     fn && (historyFnRef.current = fn);
  //     return;
  //   }
  //
  //   btnStopPostRef.current?.click();
  //   fn && (historyFnRef.current = fn);
  // };

  const movePage = () => {
    form.reset();
    historyFnRef.current && historyFnRef.current() && history.back();
  };

  useEffect(function setInitTemplate() {
    if (topicId === NO_TOPIC_ID) {
      setTemplate(v => ({
        ...v,
        content: '자유롭게 작성할 수 있어요.',
        category: '자유',
      }));
      return;
    }
    mutation.mutateAsync().then(({ data }) => {
      !data.content && (data['content'] = '자유롭게 작성할 수 있어요.');
      setTemplate(data);
    });
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'flex flex-col pb-4 gap-y-4 mx-auto',
          profile ? ' h-[90vh]' : 'h-[80vh]',
        )}
      >
        {template && (
          <div>
            <div className="border border-gray-200 rounded py-2.5 px-4 inline-flex items-center justify-center">
              <div className="flex gap-x-2.5 text-gray-400">
                {topicCategory[template.category]?.Icon({
                  width: 20,
                  height: 20,
                  color: 'currentColor',
                })}
                <span className="text-gray-900">{template.category}</span>
              </div>
            </div>
          </div>
        )}
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
                    placeholder="제목을 입력하세요"
                    defaultValue={titleField.value}
                    onChange={titleField.onChange}
                    className="font-r28 px-0 py-4 border-none"
                    minLength={1}
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
              <div className="flex space-y-0 font-r16 text-gray-500">
                <Label className="flex flex-[0_0_94px] gap-2 items-center min-h-10">
                  <List width={22} height={22} />
                  주제
                </Label>
                <div className="px-3 py-[14px] text-gray-900">
                  {template.title && template.title.replaceAll('/n ', '')}
                </div>
              </div>
              <div className="space-y-[14px]">
                <FormField
                  control={form.control}
                  name="writeDate"
                  render={({ field }) => (
                    <FormItem className="flex space-y-0 font-r16 text-gray-500">
                      <FormLabel className="flex flex-[0_0_94px] gap-2 items-center">
                        <Image
                          src="/assets/icons/calendar.png"
                          alt="date"
                          width={22}
                          height={22}
                        />
                        날짜
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'ghost'}
                              className={cn(
                                'flex-1 pl-3 py-2 font-r16 text-gray-900 justify-start hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700',
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
                    <FormItem className="flex space-y-0 font-r16 text-gray-500">
                      <FormLabel className="flex flex-[0_0_94px] gap-2 items-center">
                        <Image
                          src="/assets/icons/hashtag.png"
                          alt="tag"
                          width={22}
                          height={22}
                        />
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
                        <div className="relative flex-1 mb-4">
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
                        size="lg"
                        className={cn(!profile && 'hidden')}
                        disabled={titleField.value.length < 1 || countField.value <= 10}
                      >
                        기록완료
                      </Button>
                      <LoginDialog>
                        <Button
                          type="button"
                          size="lg"
                          className={cn(profile && 'hidden')}
                          // disabled={titleField.value.length < 1 || countField.value <= 10}
                        >
                          로그인
                        </Button>
                      </LoginDialog>
                      <StopMovePage
                        url={post ? `/history/${post.id}` : '/post'}
                        isPreventCondition={!!titleField.value || !!countField.value}
                        // fn={isStopPost}
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
            <AlertDialogTitleIcon
              src="/assets/icons/info.png"
              width={32}
              height={32}
              alt="info"
            />
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
            description: '기록이 저장되었습니다',
            onEndToast: historyFnRef.current,
          });
        }}
      >
        Show Toast
      </Button>
    </Form>
  );
};

export default PostView;
