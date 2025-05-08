'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MENU_NAMES } from '@/utils';
import { DataTable } from '@/views/admin/feedback/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ResFeedbackType } from '@/types/feedbackType';
import useGetAllFeedback from '@/admin/hooks/useGetAllFeedback';

export const columns: ColumnDef<ResFeedbackType>[] = [
  {
    accessorKey: 'content',
    header: '의견',
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      const formatted = format(new Date(date), 'yyyy-MM-dd');

      return <div>{formatted}</div>;
    },
  },
];

const totalColumns: ColumnDef<ResFeedbackType>[] = [
  ...columns,
  {
    accessorKey: 'category',
    header: '카테고리',
  },
];

const FeedbackView = () => {
  const { data: payments, isSuccess } = useGetAllFeedback();

  return (
    isSuccess && (
      <Tabs defaultValue="total" className="space-y-4">
        <TabsList>
          <TabsTrigger value="total">전체</TabsTrigger>
          <TabsTrigger value="default">그루어리 이용</TabsTrigger>
          <TabsTrigger value="topics">{MENU_NAMES['추천 주제']}</TabsTrigger>
          <TabsTrigger value="report">{MENU_NAMES['기록 데이터 보기']}</TabsTrigger>
          <TabsTrigger value="challenge">{MENU_NAMES['도전과제']}</TabsTrigger>
        </TabsList>
        <TabsContent value="total" className="space-y-4">
          <DataTable columns={totalColumns} data={payments || []} />
        </TabsContent>
        <TabsContent value="default" className="space-y-4">
          <DataTable
            columns={columns}
            data={payments ? payments.filter(v => v.category === '그루어리 이용') : []}
          />
        </TabsContent>
        <TabsContent value="topics" className="space-y-4">
          <DataTable
            columns={columns}
            data={
              payments ? payments.filter(v => v.category === MENU_NAMES['추천 주제']) : []
            }
          />
        </TabsContent>
        <TabsContent value="report" className="space-y-4">
          <DataTable
            columns={columns}
            data={
              payments
                ? payments.filter(v => v.category === MENU_NAMES['기록 데이터 보기'])
                : []
            }
          />
        </TabsContent>
        <TabsContent value="challenge" className="space-y-4">
          <DataTable
            columns={columns}
            data={
              payments ? payments.filter(v => v.category === MENU_NAMES['도전과제']) : []
            }
          />
        </TabsContent>
      </Tabs>
    )
  );
};

export default FeedbackView;
