'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { createReserve } from '@/report/api/reservation';
import { ReservationType } from '@/report/type/reservationType';
import { tracking } from '@/utils/mixPanel';
import { sendGAEvent } from '@next/third-parties/google';

const FormSchema = z.object({
  q1: z.string(),
  q2: z.string(),
  q3: z.string(),
  q3_1: z.string(),
  q4: z.string(),
});

type AdvanceReservationProps = {
  children?: ReactNode;
};

const AdvanceReservationModal = ({ children }: AdvanceReservationProps) => {
  const [isClient, setIsClient] = useState(false);
  const btnToastRef = useRef<HTMLButtonElement | null>(null);
  const bntCloseModalRef = useRef<HTMLButtonElement | null>(null);
  const [isShowRelativeQ3, setIsShowRelativeQ3] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      q1: '',
      q2: '',
      q3: '',
      q3_1: '',
      q4: '',
    },
    mode: 'onChange',
  });

  const { getFieldState } = form;
  const fieldQ1State = getFieldState('q1');
  const fieldQ2State = getFieldState('q2');
  const fieldQ4State = getFieldState('q4');

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    } else {
      tracking(`사전 예약 신청`);
      sendGAEvent({ event: `사전 예약 신청` });
    }
  };

  const handleFieldQ3 = (
    value: string,
    field: ControllerRenderProps<z.infer<typeof FormSchema>, 'q3'>,
  ) => {
    field.onChange(value);
    setIsShowRelativeQ3(value === 'Y');
  };
  async function onSubmit(data: z.infer<typeof FormSchema> | ReservationType) {
    await createReserve(data)
      .then(() => {
        btnToastRef.current?.click();
        bntCloseModalRef.current?.click();
      })
      .catch(() => {
        alert('사전 예약 신청에 실패했습니다.');
      });
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <Dialog onOpenChange={open => handleOpenChange(open)}>
          <DialogTrigger asChild>
            {children ? (
              children
            ) : (
              <Button className="hidden">사전 예약 신청 모달</Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-[780px] h-[758px] max-h-[758px] max-w-none flex flex-col px-20">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-primary-900 mt-10">사전 예약 신청</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col flex-1 overflow-hidden gap-y-6 text-gray-500"
              >
                <div className="flex flex-1 flex-col relative h-[50%] overflow-y-scroll">
                  <div className="rounded-xl p-6 mb-10 bg-gray-50/50">
                    <h4 className="font-sb14 mb-2.5">AI와 함께하는 자아발견 인터뷰</h4>
                    <p className="font-r12">
                      내가 쓴 기록들을 기반으로 나를 더 잘 알기 위한 질문들을 생성해요. 총
                      30가지의 질문과 답변들을 모아 4-Points(성장, 건강, 취향, 관계)의
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
                        <>
                          <FormItem className="space-y-3">
                            <FormLabel>
                              Q3. 그루어리 외 다른 리포트 혹은 기록 기반의 테스트를 이용해
                              본 경험이 있으신가요?
                            </FormLabel>
                            <RadioGroup
                              className="flex gap-x-6"
                              onValueChange={value => handleFieldQ3(value, fieldQ3)}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Y" id="q3_Y" />
                                <Label htmlFor="q3_Y">있다</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="N" id="q3_N" />
                                <Label htmlFor="q3_N">없다</Label>
                              </div>
                            </RadioGroup>
                          </FormItem>
                          {isShowRelativeQ3 && (
                            <FormField
                              control={form.control}
                              name="q3_1"
                              render={({ field: fieldQ3_1 }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>
                                    Q3-1. 다른리포트 혹은 기록 기반의 테스트에서 어떤
                                    부분이 가장 마음에 들었나요?
                                  </FormLabel>
                                  <Input defaultValue={fieldQ3_1.value} maxLength={50} />
                                </FormItem>
                              )}
                            />
                          )}
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="q4"
                      render={({ field: fieldQ4 }) => (
                        <>
                          <FormItem className="space-y-3">
                            <FormLabel>
                              Q4. 그 리포트 혹은 테스트의 이용하면서 마음에 들었던 점,
                              불편했던 점을 공유해주세요.
                            </FormLabel>
                            <Input {...fieldQ4} />
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-6 justify-center items-center">
                  <p className="text-center font-r14">
                    위의 질문에 대한 답변을 제출하면 사전 예약 신청하기 완료!
                    <br />
                    AI 기능이 출시되면 50% 할인 쿠폰과 함께 가장 먼저 알림을 드려요.
                  </p>
                  <Button
                    type="submit"
                    className="px-[65px]"
                    disabled={
                      !fieldQ1State.isDirty ||
                      !fieldQ2State.isDirty ||
                      !fieldQ4State.isDirty
                    }
                  >
                    신청하기
                  </Button>
                </div>
              </form>
            </Form>
            <DialogClose className="hidden" ref={bntCloseModalRef}>
              확인
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
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
    </>
  );
};

export default AdvanceReservationModal;
