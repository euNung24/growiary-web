import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Braces, List } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import useGetTopicsByCategory from '@/domain/topic/hooks/useGetTopicsByCategory';
import { checkIsTopicCategory, topicCategory } from '@/utils/topicCategory';
import { TopicCategory } from '@/domain/topic/type';
import { useRef, useState } from 'react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Tag from '@/components/Tag';

const FormOptions = () => {
  const labelStyle =
    'flex flex-[0_0_100px] gap-2 items-center pl-3 min-h-[34px] text-gray-500 font-r12';
  const inputStyle = 'font-r12 text-gray-900 h-[34px]';

  const methods = useFormContext();

  const { data: topics } = useGetTopicsByCategory();
  const checkModalTopicIds = topics?.['회고']?.map(v => v.id);

  const categoryRef = useRef('');
  const [changeCategoryModalOpen, setChangeCategoryModalOpen] = useState(false);

  const [category] = methods.watch(['category']);

  const handleChangeCategory = (category: string) => {
    methods.setValue('category', category);
    methods.setValue('topicId', '');
  };

  const getSelectedTopics = (category: TopicCategory) => {
    return topics && topics[category];
  };

  const selectedTopicsByCategory = checkIsTopicCategory(
    category || '자유',
    getSelectedTopics,
  );

  const handleChangeTopic = (value: string) => {
    // 회고 카테고리 내에서 주제를 선택한 경우
    if (value && checkModalTopicIds?.includes(+value)) {
      setChangeCategoryModalOpen(true);
      categoryRef.current = value;
    } else {
      methods.setValue('topicId', value);
    }
  };

  const handleNotChangeCategoryModal = () => {
    setChangeCategoryModalOpen(false);
  };

  const handleChangeCategoryModal = () => {
    setChangeCategoryModalOpen(false);
    methods.setValue('topicId', categoryRef.current);
    methods.setValue('content', '');
  };

  const handleSelectDate = (date: Date | undefined) => {
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

    methods.setValue('writeDate', writeDate);
  };

  return (
    <>
      {/* 카테고리 */}
      <div className="flex space-y-0 items-center">
        <Label className={labelStyle}>
          <Braces width={14} height={14} />
          카테고리
        </Label>
        <Controller
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={handleChangeCategory}>
              <SelectTrigger
                aria-label="select category"
                className={cn(inputStyle, 'py-2 px-5')}
                icon={false}
              >
                <SelectValue placeholder="카테고리를 선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(topics || []) as TopicCategory[]).map(category => (
                  <SelectItem key={category} value={category} className="group">
                    <div className="flex items-center gap-x-1 font-r12 text-gray-400 group-hover:text-primary-900">
                      {topicCategory[category]?.Icon({
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
        />
      </div>

      {/* 주제 */}
      <div className="flex space-y-0 items-center">
        <Label className={labelStyle}>
          <List width={14} height={14} />
          주제
        </Label>
        <Controller
          name="topicId"
          render={({ field }) => (
            <Select required value={field.value} onValueChange={handleChangeTopic}>
              <SelectTrigger
                aria-label="select subject"
                className={cn(inputStyle, 'py-2')}
                icon={false}
              >
                <SelectValue className={inputStyle} placeholder="주제를 선택해 주세요" />
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
        />
      </div>

      {/* 날짜 */}
      <div className="flex space-y-0 items-center">
        <Label className={labelStyle}>
          <Image src="/assets/icons/calendar.png" alt="date" width={14} height={14} />
          날짜
        </Label>
        <Controller
          name="writeDate"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
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
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={handleSelectDate}
                  disabled={date => date > new Date() || date < new Date('1900-01-01')}
                  defaultMonth={field.value}
                  initialFocus
                  className="m-0 p-3"
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      {/* 태그 */}
      <div className="flex space-y-0 items-center">
        <Label className={labelStyle}>
          <Image src="/assets/icons/hashtag.png" alt="tag" width={14} height={14} />
          태그
        </Label>
        <Controller
          name="tags"
          render={({ field }) => <Tag setTags={field.onChange} tags={field.value} />}
        />
      </div>

      {/* 카테고리 변경 팝업 안내 모달 */}
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
    </>
  );
};

export default FormOptions;
