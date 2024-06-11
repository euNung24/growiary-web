'use client';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Braces, List } from 'lucide-react';
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
import { useEffect, useRef, useState } from 'react';
import { TopicCategory, TopicType } from '@/types/topicTypes';
import { checkIsTopicCategory, topicCategory } from '@/utils/topicCategory';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { NO_TOPIC_ID } from '@/utils';
import Image from 'next/image';
import useProfileContext from '@/hooks/profile/useProfileContext';
import LoginDialog from '@/components/LoginDialog';
import StopMovePage from '@/components/StopMovePage';
import useFindPost from '@/hooks/posts/useFindPost';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';
import { useSetRecoilState } from 'recoil';
import { PostState } from '@/store/postStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useGetTopicsByCategory from '@/hooks/topics/useGetTopicsByCategory';

const FormSchema = z.object({
  topicId: z.string().min(1),
  title: z.string().min(1),
  content: z.string().or(z.object({ ops: z.array(z.any()) })),
  tags: z.array(z.string()),
  charactersCount: z.number().min(10),
  writeDate: z.date(),
});

type PostViewProps = {
  postId?: string;
};
const PostView = ({ postId }: PostViewProps) => {
  const labelStyle =
    'flex flex-[0_0_100px] gap-2 items-center pl-3 min-h-[34px] text-gray-500 font-r12';
  const inputStyle = 'font-r12 text-gray-900 h-[34px]';

  const searchParams = useSearchParams();
  const router = useRouter();
  const topicId = searchParams.get('topic')
    ? parseInt(searchParams.get('topic')!, 10)
    : NO_TOPIC_ID;
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || '자유',
  );

  const [post, setPost] = useState<ResPostType | null>(null);
  const [template, setTemplate] = useState<TopicType>({} as TopicType);
  const [modalOpen, setModalOpen] = useState(false);
  const [changeCategoryModalOpen, setChangeCategoryModalOpen] = useState(false);
  const [moveResolveFn, setMoveResolveFn] = useState<((choice: boolean) => void) | null>(
    null,
  );
  const categoryRef = useRef('');
  const btnSaveToastRef = useRef<HTMLButtonElement | null>(null);
  const historyFnRef = useRef<() => void | false>(() => {});
  const isSavedRef = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const { toast } = useToast();
  const { profile } = useProfileContext();
  const setPostState = useSetRecoilState(PostState);
  const postMutation = useFindPost(postId);
  const topics = useGetTopicsByCategory();
  const checkModalTopicIds = topics && topics['회고'].map(v => v.id);

  const getSelectedTopics = (category: TopicCategory) => {
    return topics && topics[category];
  };
  const selectedTopicsByCategory = checkIsTopicCategory(
    selectedCategory,
    getSelectedTopics,
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topicId: post ? post.topicId?.toString() : topicId?.toString(),
      title: post?.title || '',
      tags: post ? [...post.tags] : [],
      content: post?.content || undefined,
      charactersCount: post?.charactersCount || 0,
      writeDate: post ? new Date(post.writeDate) : new Date(),
    },
  });

  const handleSelectDate = (
    date: Date | undefined,
    field: ControllerRenderProps<z.infer<typeof FormSchema>, 'writeDate'>,
  ) => {
    if (!date) return;

    const nowDate = new Date();
    const writeDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      nowDate.getHours(),
      nowDate.getMinutes(),
      nowDate.getSeconds(),
    );

    field.onChange(writeDate);
  };

  const movePageAfterSubmit = (post: ResPostType) => {
    form.reset();
    router.push(`/history/${post.id}`);
    btnSaveToastRef.current?.click();
  };

  async function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    isSavedRef.current = true;

    if (!profile) {
      setPostState(data as ReqPostType);
    } else {
      post
        ? await updatePost({ id: post.id, ...(data as ReqPostType) })
            .then(res => {
              tracking('기록 수정');
              sendGAEvent({ event: '기록 수정' });
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
  }

  const openModalAndWaiteForChoice = () => {
    return new Promise<boolean>(resolve => {
      setModalOpen(true);
      setMoveResolveFn(() => resolve);
    });
  };
  const handleOpenStopModal = async () => {
    return await openModalAndWaiteForChoice();
  };

  const handleMoveModal = () => {
    form.reset();
    if (moveResolveFn) {
      setModalOpen(false);
      moveResolveFn(true);
    }
  };

  const handleNotMoveModal = () => {
    if (moveResolveFn) {
      setModalOpen(false);
      moveResolveFn(false);
    }
  };

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    form.setValue('topicId', '');
    setTemplate({} as TopicType);
  };

  const handleChangeTopic = (
    value: string,
    field: ControllerRenderProps<z.infer<typeof FormSchema>, 'topicId'>,
  ) => {
    // 회고 카테고리 내에서 주제를 선택한 경우
    if (value && checkModalTopicIds?.includes(+value)) {
      setChangeCategoryModalOpen(true);
      categoryRef.current = value;
    } else {
      const selectedTopic = selectedTopicsByCategory?.find(
        v => v.id.toString() === value,
      );
      selectedTopic && setTemplate(selectedTopic);
      field?.onChange(value);
    }
  };

  const handleNotChangeCategoryModal = () => {
    setChangeCategoryModalOpen(false);
  };

  const handleChangeCategoryModal = () => {
    setChangeCategoryModalOpen(false);
    const selectedTopic = selectedTopicsByCategory?.find(
      v => v.id.toString() === categoryRef.current,
    );
    selectedTopic && setTemplate(selectedTopic);
    form.setValue('topicId', categoryRef.current);
    form.setValue('content', '');
  };

  useEffect(function getPost() {
    postMutation &&
      postMutation.mutateAsync().then(res => {
        if (!res) return;
        setPost(res.data);
        setSelectedCategory(res.data.topic.category);

        form.reset({
          topicId: res.data.topicId?.toString(),
          title: res.data.title,
          tags: [...res.data.tags],
          content: { ...res.data.content },
          writeDate: new Date(res.data.writeDate),
          charactersCount: res.data.charactersCount,
        });
        res.data.topic && setTemplate(res.data.topic);
      });
  }, []);

  useEffect(
    function setInitPostTopic() {
      if (!post) return;
      form.setValue('topicId', post?.topicId?.toString() || '');
    },
    [post],
  );

  useEffect(
    function setInitTemplate() {
      if (postId || !topics || !selectedTopicsByCategory) return;
      const selectedTopic =
        selectedTopicsByCategory.find(topic => topic.id === topicId) || ({} as TopicType);

      if (selectedTopic.content) {
        form.setValue('content', selectedTopic.content);
      }

      setTemplate(selectedTopic);
    },
    [topics],
  );

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col pb-4 mx-auto', 'h-[calc(100%+72px)]')}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field: titleField }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    ref={titleRef}
                    required
                    type="text"
                    placeholder="제목을 입력하세요"
                    defaultValue={titleField.value}
                    onChange={titleField.onChange}
                    className="font-r28 px-2.5 py-4 border-none"
                    minLength={1}
                    maxLength={50}
                  />
                </FormControl>
              </FormItem>
              <div className="flex space-y-0 items-center">
                <Label className={labelStyle}>
                  <Braces width={14} height={14} />
                  카테고리
                </Label>
                {template && topics && (
                  <Select
                    value={selectedCategory}
                    onValueChange={value => handleChangeCategory(value)}
                  >
                    <SelectTrigger
                      aria-label="select category"
                      className={cn(inputStyle, 'py-2 px-5')}
                      icon={false}
                    >
                      <SelectValue placeholder={'카테고리를 선택해 주세요'} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(topics).map(category => (
                        <SelectItem key={category} value={category} className="group">
                          <div className="flex items-center gap-x-1 font-r12 text-gray-400 group-hover:text-primary-900">
                            {topicCategory[category as TopicCategory]?.Icon({
                              width: 14,
                              height: 14,
                              color: 'currentColor',
                            })}
                            <span className="text-gray-900 group-hover:text-primary-900">
                              {category}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <FormField
                control={form.control}
                name="topicId"
                render={({ field: topicIdField }) => (
                  <FormItem className="flex space-y-0 items-center">
                    <FormLabel className={labelStyle}>
                      <List width={14} height={14} />
                      주제
                    </FormLabel>
                    {template && topics && (
                      <Select
                        required
                        value={topicIdField.value}
                        onValueChange={value => handleChangeTopic(value, topicIdField)}
                      >
                        <SelectTrigger
                          aria-label="select subject"
                          className={cn(inputStyle, 'py-2')}
                          icon={false}
                        >
                          <SelectValue
                            className={inputStyle}
                            placeholder={'주제를 선택해 주세요'}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedTopicsByCategory?.map(topic => (
                            <SelectItem
                              key={topic.id}
                              value={topic.id.toString()}
                              className="group"
                            >
                              <div className="flex items-center gap-x-2.5 font-r12 text-gray-400 group-hover:text-primary-900">
                                <span className="text-gray-900 group-hover:text-primary-900">
                                  {topic?.title?.replaceAll('/n ', '')}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="writeDate"
                render={({ field }) => (
                  <FormItem className="flex space-y-0 items-center">
                    <FormLabel className={labelStyle}>
                      <Image
                        src="/assets/icons/calendar.png"
                        alt="date"
                        width={14}
                        height={14}
                      />
                      날짜
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'ghost'}
                            className={cn(
                              'flex-1 py-2 justify-start hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700',
                              !field.value && 'text-muted-foreground',
                              inputStyle,
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
                          onSelect={date => handleSelectDate(date, field)}
                          disabled={date =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          defaultMonth={field.value}
                          initialFocus
                          className="m-0 p-3"
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
                  <FormItem className="flex space-y-0 items-center">
                    <FormLabel className={labelStyle}>
                      <Image
                        src="/assets/icons/hashtag.png"
                        alt="tag"
                        width={14}
                        height={14}
                      />
                      태그
                    </FormLabel>
                    <Tag setTags={field.onChange} tags={field.value} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="charactersCount"
                render={({ field: countField }) => (
                  <>
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field: contentField }) => (
                        <div className="relative flex-1 mb-4 border border-[#ccc] rounded-xl overflow-hidden mt-[15px]">
                          <Editor
                            placeholder={template.content}
                            className="flex flex-col h-full"
                            defaultValue={contentField.value}
                            events={{
                              handleContentChange: contentField.onChange,
                              handleCountChange: countField.onChange,
                              handleMount: () => {
                                titleRef.current?.focus();
                              },
                            }}
                          />
                          {template?.category && (
                            <div className="absolute bottom-0 right-0 max-w-[314px] max-h-[314px] pr-2 h-[50%] z-[-1]">
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
                      <div className="mr-auto font-r12 text-error-900">
                        {titleField.value.length < 1
                          ? '제목을 작성해주세요'
                          : form.getValues('topicId') === ''
                            ? '주제를 선택해주세요'
                            : countField.value < 10
                              ? '10자 이상의 기록을 작성해주세요'
                              : ''}
                      </div>
                      <span className="text-gray-400 font-r12">
                        <span className={cn(countField.value < 10 && 'text-error-900')}>
                          {countField.value}
                        </span>{' '}
                        / 2000
                      </span>
                      <Button
                        type="submit"
                        size="sm"
                        className={cn(!profile && 'hidden')}
                        disabled={
                          titleField.value.length < 1 ||
                          countField.value < 10 ||
                          form.getValues('topicId') === ''
                        }
                      >
                        기록완료
                      </Button>
                      <LoginDialog>
                        <Button
                          type="submit"
                          size="sm"
                          className={cn(profile && 'hidden')}
                          disabled={
                            titleField.value.length < 1 ||
                            countField.value < 10 ||
                            form.getValues('topicId') === ''
                          }
                        >
                          로그인
                        </Button>
                      </LoginDialog>
                      <StopMovePage
                        url={post ? `/history/${post.id}` : '/post'}
                        isPreventCondition={
                          (!!titleField.value || !!countField.value) &&
                          !isSavedRef.current
                        }
                        isPageMove={handleOpenStopModal}
                      />
                    </div>
                  </>
                )}
              />
            </>
          )}
        />
      </form>
      <AlertDialog open={modalOpen}>
        <AlertDialogTrigger className="hidden">글쓰기 중단 팝업</AlertDialogTrigger>
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
            <AlertDialogCancel onClick={handleNotMoveModal}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleMoveModal}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={changeCategoryModalOpen}>
        <AlertDialogTrigger className="hidden">카테고리 변경 팝업</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitleIcon
              src="/assets/icons/info.png"
              width={32}
              height={32}
              alt="info"
            />
            <AlertDialogTitle>카테고리를 변경하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              변경사항이 저장되지 않을 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleNotChangeCategoryModal}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleChangeCategoryModal}>
              확인
            </AlertDialogAction>
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
