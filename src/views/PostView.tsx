'use client';

import { useRef } from 'react';
import Editor from '@/components/Editor';
import { Delta } from 'quill/core';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import Image from 'next/image';
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

const FormSchema = z.object({
  title: z.string(),
  date: z.date(),
  // username: z.string().min(2, {
  //   message: 'Username must be at least 2 characters.',
  // }),
});
const PostView = () => {
  const quillRef = useRef(null);
  const ops = [
    { insert: 'Keep', attributes: { bold: true } },
    { insert: '\n', attributes: { header: 2 } },
    { insert: '현재 만족하고 있는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
    { insert: '계속 이어갔으면 하는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
    { insert: 'Problem', attributes: { bold: true } },
    { insert: '\n', attributes: { header: 2 } },
    { insert: '현재 만족하고 있는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
    { insert: '계속 이어갔으면 하는 부분' },
    { insert: '\n', attributes: { list: 'bullet' } },
  ];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      date: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-4 min-w-[960px]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="font-r28 px-0 py-4 border-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-1">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex space-y-0">
                <FormLabel className="flex gap-0.5 items-center">
                  <Image
                    src="/assets/icons/calendar.png"
                    width={22}
                    height={22}
                    alt="date"
                  />
                  날짜
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {format(field.value, 'yyyy년 M월 d일')}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <div>태그</div>
        </div>
        <Editor ref={quillRef} defaultValue={new Delta(ops)} />
        <div className="text-end">
          <Button type="submit">저장하기</Button>
        </div>
      </form>
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
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
