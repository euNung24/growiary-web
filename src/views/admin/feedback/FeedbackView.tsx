'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MENU_NAMES } from '@/utils';
import { DataTable } from '@/views/admin/feedback/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export type Feedback = {
  id: string;
  date: string;
  content: string;
  category: string;
};

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: 'content',
    header: '의견',
  },
  {
    accessorKey: 'date',
    header: 'Amount',
    cell: ({ row }) => {
      const date = row.getValue('date') as string;
      const formatted = format(date, 'yyyy-MM-dd');

      return <div>{formatted}</div>;
    },
  },
];

const totalColumns: ColumnDef<Feedback>[] = [
  ...columns,
  {
    accessorKey: 'category',
    header: '카테고리',
  },
];

const payments: Feedback[] = [
  {
    id: '728ed52f',
    date: new Date().toISOString(),
    content: 'm@example.com',
    category: '카테고리1',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
];

const FeedbackView = () => {
  return (
    <Tabs defaultValue="total" className="space-y-4">
      <TabsList>
        <TabsTrigger value="total">전체</TabsTrigger>
        <TabsTrigger value="topics">{MENU_NAMES['추천 주제']}</TabsTrigger>
        <TabsTrigger value="report">{MENU_NAMES['기록 데이터 보기']}</TabsTrigger>
        <TabsTrigger value="challenge">{MENU_NAMES['도전과제']}</TabsTrigger>
      </TabsList>
      <TabsContent value="total" className="space-y-4">
        total
        <DataTable columns={totalColumns} data={payments} />
      </TabsContent>
      <TabsContent value="topics" className="space-y-4">
        topics
        <DataTable columns={columns} data={payments} />
      </TabsContent>
      <TabsContent value="report" className="space-y-4">
        report
        <DataTable columns={columns} data={payments} />
      </TabsContent>
      <TabsContent value="challenge" className="space-y-4">
        challenge
        <DataTable columns={columns} data={payments} />
      </TabsContent>
    </Tabs>
  );
};

export default FeedbackView;
