'use client';

import { DataTable } from '@/views/admin/users/DataTable';
import { ColumnDef } from '@tanstack/react-table';

export type UserTable = {
  id: string;
  date: string;
  content: string;
  category: string;
};

export const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: 'content',
    header: ' user collection값, profile collection값',
  },
  {
    accessorKey: 'content',
    header: '가입 당일 작성 횟수',
  },
  {
    accessorKey: 'content',
    header: '매달 평균 글 수',
  },
  {
    accessorKey: 'content',
    header: '전체 글 수',
  },
  {
    accessorKey: 'content',
    header: '매 주 작성 여부 (핵심 기능 경험을 한 이 후, 5주동안 작성한 카운트)',
  },
  {
    accessorKey: 'content',
    header: '핵심 기능 경험 유저 날짜 (첫글작성일)',
  },
];

const payments: UserTable[] = [
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
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
  {
    id: '489e1d42',
    date: new Date().toISOString(),
    content: 'example@gmail.com',
    category: '카테고리2',
  },
];
const UsersView = () => {
  return (
    <DataTable
      columns={columns}
      data={[...payments, ...payments, ...payments, ...payments, ...payments]}
    />
  );
};

export default UsersView;
