'use client';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Dot, List } from 'lucide-react';
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
import { Hash } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ReqPostType, ResPostType } from '@/types/postTypes';
import { createPost, updatePost } from '@/apis/post';
import useFindTopic from '@/hooks/topics/useFindTopics';
import { useEffect, useState } from 'react';
import { TopicCategory, TopicType } from '@/types/topicTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { topicCategory } from '@/utils/topicCategory';

export const FormSchema = z.object({
  topicId: z.number().nullish(),
  category: z.string().nullish(),
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
  const topicId = searchParams.get('topic')
    ? parseInt(searchParams.get('topic')!, 10)
    : null;
  const mutation = useFindTopic(topicId || 0);
  const [template, setTemplate] = useState<TopicType>({} as TopicType);
  const [category, setCategory] = useState<TopicCategory | null>(
    (searchParams.get('category') as TopicCategory) || 'free',
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topicId: post ? post.topicId : topicId,
      category: post?.category || category,
      title: post?.title || '',
      tags: post ? [...post.tags] : [],
      content: post?.content || '',
      charactersCount: post?.charactersCount || 0,
      writeDate: post ? new Date(post.writeDate) : new Date(),
    },
  });

  const handleChangeCategory = (
    field: ControllerRenderProps<z.infer<typeof FormSchema>, 'category'>,
    value: TopicCategory,
  ) => {
    field.onChange(value);
    setCategory(value);
  };

  async function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    if (data.category === 'free') {
      data.category = undefined;
    }
    post
      ? await updatePost({ id: post.id, ...(data as ReqPostType) })
      : await createPost(data as ReqPostType);
  }

  useEffect(function setInitTemplate() {
    if (!topicId) {
      setTemplate(v => ({ ...v, content: '일상의 소중한 경험을 기록하세요.' }));
      return;
    }
    mutation.mutateAsync().then(({ data }) => {
      !data.content && (data['content'] = '일상의 소중한 경험을 기록하세요.');
      setTemplate(data);
      form.setValue('category', data.category);
    });
  }, []);

  // const isClickedFirst = useRef(false);
  //
  // const handlePopState = useCallback(() => {
  //   // 1. 뒤로 가기를 클릭한 순간 16라인이 바로 제거된다.
  //   // if (!isSaved) {
  //   history.pushState(null, '', ''); // 현재 경로를 다시 추가
  //   // do sth
  //   // } else {
  //   //   history.go(-1); // 뒤로 이동
  //   // }
  // }, []);
  //
  // // 최초 한 번 실행
  // useEffect(() => {
  //   if (!isClickedFirst.current) {
  //     history.pushState(null, '', ''); // 처음 렌더링될 때 추가되고 뒤로 가기 클릭 시 제거된다.
  //     isClickedFirst.current = true;
  //   }
  // }, []);
  //
  // // 이벤트
  // useEffect(() => {
  //   window.addEventListener('popstate', handlePopState);
  //   return () => {
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [handlePopState]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 flex flex-col gap-y-4 min-w-[960px] h-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder={
                    template.title?.replaceAll('/n ', '') || '제목을 입력하세요'
                  }
                  className="font-r28 px-0 py-4 border-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-[14px]">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex space-y-0">
                <FormLabel className="flex flex-[0_0_94px] gap-2 items-center font-r16 text-gray-700">
                  <List width={22} height={22} />
                  카테고리
                </FormLabel>
                <Select
                  defaultValue={field.value || 'free'}
                  onValueChange={value =>
                    handleChangeCategory(field, value as TopicCategory)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="w-[316px]">
                    <SelectItem value="free" className="group">
                      <div className="flex gap-x-2.5 text-gray-400 group-hover:text-primary-900">
                        <Dot width={20} height={20} color="currentColor" />
                        <span className="text-gray-800 group-hover:text-primary-900">
                          자유
                        </span>
                      </div>
                    </SelectItem>
                    {(Object.keys(topicCategory) as TopicCategory[]).map(category => {
                      const Icon = topicCategory[category]?.Icon;

                      return (
                        <SelectItem key={category} value={category} className="group">
                          <div className="flex gap-x-2.5 text-gray-400 group-hover:text-primary-900">
                            <Icon width={20} height={20} color="currentColor" />
                            <span className="text-gray-800 group-hover:text-primary-900">
                              {category}
                            </span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
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
                render={({ field }) => (
                  <div className="relative flex-1">
                    <Editor
                      placeholder={template.content}
                      className="flex flex-col h-full"
                      defaultValue={field.value}
                      events={{
                        handleContentChange: field.onChange,
                        handleCountChange: countField.onChange,
                      }}
                    />
                    {category && (
                      <div className="absolute bottom-0 right-0 max-w-[314px] max-h-[314px] pr-2 h-[50%]">
                        {topicCategory[category]?.Icon({
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
                <span className="text-gray-400 font-r18">{countField.value} / 2000</span>
                <Button type="submit">저장하기</Button>
              </div>
            </>
          )}
        />
      </form>
      <AlertDialog>
        <AlertDialogTrigger className="hidden">글쓰기 중단 팝업</AlertDialogTrigger>
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
            <AlertDialogAction>저장</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default PostView;
