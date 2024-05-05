'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReqPostType } from '@/types/postTypes';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  q1: z.string(),
  q2: z.string().min(1),
  q3: z.string(),
  q4: z.string(),
  q5: z.string().min(1),
});

type AdvanceReservationProps = {
  children?: ReactNode;
};

const AdvanceReservation = ({ children }: AdvanceReservationProps) => {
  const [isClient, setIsClient] = useState(false);
  const btnToastRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
    },
    mode: 'onChange',
  });

  const { getFieldState } = form;
  const fieldQ1State = getFieldState('q1');
  const fieldQ2State = getFieldState('q2');
  const fieldQ5State = getFieldState('q5');

  async function onSubmit(data: z.infer<typeof FormSchema> | ReqPostType) {
    console.log('data', data);
    btnToastRef.current?.click();
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
            {children ? (
              children
            ) : (
              <Button className="hidden">사전 예약 신청 모달</Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[80vh] flex flex-col">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-primary-900 mt-10">사전 예약 신청</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col flex-1 overflow-hidden gap-y-6 text-gray-500"
              >
                <div className="flex flex-col relative h-[50%] overflow-y-scroll">
                  <div className="rounded-xl p-6 mb-10 bg-gray-50/50">
                    <h4 className="font-sb14 mb-2.5">AI와 함께하는 자아발견 인터뷰</h4>
                    <p className="font-r12">
                      내가 쓴 기록들을 기반으로 나를 더 잘 알기 위한 질문들을 생성해요.
                      <br />
                      총 30가지의 질문과 답변들을 모아 4-Points(성장, 건강, 취향, 관계)의
                      <br />
                      성향 진단과 개선점 제안 리포트를 제공합니다.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-8 text-gray-500 font-r14">
                    <FormField
                      control={form.control}
                      name="q1"
                      render={({ field: fieldQ1 }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Q1. 자아발견 인터뷰와 리포트를 어떤 용도로 활용할 예정인가요?
                          </FormLabel>
                          <Input {...fieldQ1} maxLength={50} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="q2"
                      render={({ field: fieldQ2 }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Q2. 가장 기대되는, 가장 얻고 싶은 정보는 무엇인가요?
                          </FormLabel>
                          <Input {...fieldQ2} maxLength={50} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="q3"
                      render={({ field: fieldQ3 }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Q3. 그루어리 외 다른 리포트 혹은 기록 기반의 테스트를 이용해
                            본 경험이 있으신가요?
                          </FormLabel>
                          <Input defaultValue={fieldQ3.value} maxLength={50} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="q4"
                      render={({ field: fieldQ4 }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Q3-1. 다른리포트 혹은 기록 기반의 테스트에서 어떤 부분이 가장
                            마음에 들었나요?
                          </FormLabel>
                          <Input defaultValue={fieldQ4.value} maxLength={50} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="q5"
                      render={({ field: fieldQ5 }) => (
                        <>
                          <FormItem className="space-y-3">
                            <FormLabel>
                              Q5. 다른리포트 혹은 기록 기반의 테스트에서 어떤 부분이 가장
                              마음에 들었나요?
                            </FormLabel>
                            <Input {...fieldQ5} />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-6 justify-center items-center">
                  <p className="text-center">
                    위의 질문에 대한 답변을 제출하면 사전 예약 신청하기 완료!
                    <br />
                    AI 기능이 출시되면 50% 할인 쿠폰과 함께 가장 먼저 알림을 드려요.
                  </p>
                  <Button
                    type="submit"
                    disabled={
                      !fieldQ1State.isDirty ||
                      !fieldQ2State.isDirty ||
                      !fieldQ5State.isDirty
                    }
                  >
                    신청하기
                  </Button>
                </div>
              </form>
            </Form>
            <Button
              ref={btnToastRef}
              variant="hidden"
              onClick={() => {
                toast({
                  description: (
                    <p className="text-center">
                      5월 coming soon!
                      <br /> 사전 신청해주셔서 감사합니다
                    </p>
                  ),
                });
              }}
            >
              Show Toast
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AdvanceReservation;
