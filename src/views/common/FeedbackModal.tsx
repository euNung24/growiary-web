'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode, useRef, useState } from 'react';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Dot } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { menu } from '@/utils';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { FeedbackType } from '@/types/feedbackType';
import { createFeedback } from '@/apis/feedback';
import { usePathname } from 'next/navigation';

const FormSchema = z.object({
  category: z.string(),
  content: z.string().min(1),
});

type FeedbackModalProps = {
  children?: ReactNode;
  defaultOpen?: boolean;
};

const FeedbackModal = ({ children, defaultOpen = false }: FeedbackModalProps) => {
  const btnToastRef = useRef<HTMLButtonElement | null>(null);
  const bntCloseModalRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const menuIdx = menu.findIndex(v => v.href === pathname);
  const [placeholder, setPlaceholder] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: menu[menuIdx]?.name || '',
      content: '',
    },
  });

  const { getFieldState } = form;
  const fieldContentState = getFieldState('content');

  async function onSubmit(data: z.infer<typeof FormSchema> | FeedbackType) {
    await createFeedback(data)
      .then(() => {
        btnToastRef.current?.click();
        bntCloseModalRef.current?.click();
      })
      .catch(() => {
        alert('의견 보내기를 실패했습니다.');
      });
  }

  const handleChangeCategory = (
    category: string,
    field: ControllerRenderProps<z.infer<typeof FormSchema>, 'category'>,
  ) => {
    const target = menu.find(v => v.name === category);
    setPlaceholder(target?.placeholder || '');
    field.onChange(category);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      menu[menuIdx]?.placeholder && setPlaceholder(menu[menuIdx].placeholder!);
      form.setValue('category', menu[menuIdx].name);
      form.setValue('content', '');
    } else if (pathname === '/feedback' && !open) {
      history.back();
    }
  };

  return (
    <>
      <Dialog defaultOpen={defaultOpen} onOpenChange={open => handleOpenChange(open)}>
        <DialogTrigger asChild>
          {children ? children : <Button className="hidden">의견 보내기 모달</Button>}
        </DialogTrigger>
        <DialogContent className=" max-h-[758px] px-20 w-[780px] max-w-none md:w-[425px] md:max-w-[425px] md:px-6">
          <DialogHeader className="mb-[38px]">
            <DialogTitle className="text-primary-900 mt-10">의견 보내기</DialogTitle>
            <DialogDescription className="text-gray-500 pt-4">
              사용하시다 개선사항이나 좋은 제안이 떠오르셨나요?
              <br /> 자유롭게 이야기해주세요. 소중한 의견 고맙습니다!
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
              <div className="flex flex-col space-y-[46px]">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3 font-r14 text-gray-900">
                        컨텐츠
                      </FormLabel>
                      <Select
                        defaultValue={menu[menuIdx]?.name || '그루어리'}
                        onValueChange={value => handleChangeCategory(value, field)}
                      >
                        <SelectTrigger className="border border-gray-200 font-r16 h-[54px]">
                          <SelectValue placeholder={'카테고리를 선택해 주세요'} />
                        </SelectTrigger>
                        <SelectContent className="">
                          <SelectItem value="그루어리" className="group">
                            <div className="flex gap-x-2.5 items-center text-gray-400 group-hover:text-primary-900">
                              <Dot width={20} height={20} color="currentColor" />
                              <span className="text-gray-800 group-hover:text-primary-900">
                                그루어리 이용
                              </span>
                            </div>
                          </SelectItem>
                          {menu.slice(2).map(v => (
                            <SelectItem key={v.name} value={v.name} className="group">
                              <div className="flex items-center gap-x-2.5 text-gray-400 group-hover:text-primary-900">
                                <Image
                                  src={`${v.src}.png`}
                                  width={20}
                                  height={20}
                                  alt={v.name}
                                  className="group-hover:hidden"
                                />
                                <Image
                                  src={`${v.src}_primary.png`}
                                  width={20}
                                  height={20}
                                  alt={v.name}
                                  className="group-hover:block hidden"
                                />
                                <span className="text-gray-800 group-hover:text-primary-900">
                                  {v.name}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
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
                      <FormLabel className="mb-3 font-r14 text-gray-900">내용</FormLabel>
                      <Textarea
                        {...field}
                        placeholder={
                          placeholder ||
                          '궁금하거나 떠오르는 아이디어, 의견이 있다면 자유롭게 남겨주세요'
                        }
                        maxLength={300}
                        className="h-[200px] resize-none"
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-[72px] flex justify-center items-center">
                <Button type="submit" disabled={!fieldContentState.isDirty}>
                  의견 보내기
                </Button>
              </div>
            </form>
          </Form>
          <DialogClose className="hidden" ref={bntCloseModalRef}>
            확인
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Button
        ref={btnToastRef}
        variant="hidden"
        onClick={() => {
          toast({
            description: '소중한 의견 감사합니다',
          });
        }}
      >
        Show Toast
      </Button>
    </>
  );
};

export default FeedbackModal;
