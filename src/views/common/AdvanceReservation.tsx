'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode, useEffect, useState } from 'react';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Dot } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReqPostType } from '@/types/postTypes';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  category: z.string().nullish(),
  content: z.string(),
});

type FeedbackModalProps = {
  children?: ReactNode;
};

const FeedbackModal = ({ children }: FeedbackModalProps) => {
  const [isClient, setIsClient] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: '',
      content: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    console.log('data', data);
    // post
    //   ? await updatePost({ id: post.id, ...(data as ReqPostType) })
    //   : await createPost(data as ReqPostType);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Dialog>
          <DialogTrigger asChild>
            {children ? children : <Button className="hidden">의견 보내기 모달</Button>}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="mb-14">
              <DialogTitle className="text-primary-900 mt-10">의견 보내기</DialogTitle>
              <DialogDescription className="text-gray-500 mt-12">
                사용하시다 개선사항이나 좋은 제안이 떠오르셨나요?
                <br /> 자유롭게 이야기해주세요. 소중한 의견 고맙습니다!
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                <div className="flex flex-col space-y-[51px]">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-3 font-r14 text-gray-900">
                          컨텐츠
                        </FormLabel>
                        <Select defaultValue={field.value || undefined}>
                          <SelectTrigger className="border border-gray-200 h-[54px]">
                            <SelectValue placeholder="카테고리를 선택해 주세요" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <SelectItem value="free" className="group">
                              <div className="flex gap-x-2.5 text-gray-400 group-hover:text-primary-900">
                                <Dot width={20} height={20} color="currentColor" />
                                <span className="text-gray-800 group-hover:text-primary-900">
                                  자유
                                </span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="mb-3 font-r14 text-gray-900">
                          내용
                        </FormLabel>
                        <Textarea
                          {...field}
                          placeholder="궁금하거나 떠오르는 아이디어, 의견이 있다면 자유럽게 남겨주세요"
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-[72px] flex justify-center items-center">
                  <Button type="submit">의견 보내기</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default FeedbackModal;
