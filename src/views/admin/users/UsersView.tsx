'use client';

import { DataTable } from '@/views/admin/users/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { UsersType } from '@/types/admin/usersTypes';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { ResPostType } from '@/types/postTypes';
import useGetAllUsers from '@/hooks/admin/useGetAllUsers';
import useGetPostsByUser from '@/hooks/admin/useGetPostsByUser';
import useGetProfile from '@/hooks/profile/useGetProfile';
import { getFormatDate } from '@/utils';
import Image from 'next/image';

type UserTable = Pick<UsersType, 'createdAt' | 'email' | 'social'> & {
  profile: Pick<UsersType['profile'], 'nickname' | 'userId'>;
  firstDayPostCount: number;
  avgPostOfMonth: string;
  totalPostCount: number;
  firstPostDate: string;
};

const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: 'email',
    header: ' 이메일',
  },
  {
    accessorKey: 'nickname',
    header: ' 닉네임',
    cell: ({ row }) => {
      const nickname = row.getValue('nickname') as string;
      const email = row.getValue('email') as string;

      return <div>{nickname ? nickname : email.split('@')[0]}</div>;
    },
  },
  {
    accessorKey: 'social',
    header: ' 소셜',
    cell: ({ row }) => {
      const social = row.getValue('social') as string;

      return (
        <div className="flex justify-center">
          <Image
            src={
              social === 'kakao' ? '/assets/icons/kakao.png' : '/assets/icons/google.png'
            }
            alt={
              social === 'kakao' ? '/assets/icons/kakao.png' : '/assets/icons/google.png'
            }
            width={24}
            height={24}
            className="rounded-full"
            priority
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: '가입일',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      const formatted = format(new Date(date), 'yyyy-MM-dd');

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: 'firstDayPostCount',
    header: '가입 당일 작성 횟수',
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue('firstDayPostCount') as string}</div>
      );
    },
  },
  {
    accessorKey: 'avgPostOfMonth',
    header: '매달 평균 글 수',
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue('avgPostOfMonth') as string}</div>
      );
    },
  },
  {
    accessorKey: 'totalPostCount',
    header: '전체 글 수',
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue('totalPostCount') as string}</div>
      );
    },
  },
  {
    accessorKey: 'content',
    header: '매 주 작성 여부',
    // cell: ({ row }) => {
    //   return (
    //     <div className="text-center">{row.getValue('firstDayPostCount') as string}</div>
    //   );
    // },
  },
  {
    accessorKey: 'firstPostDate',
    header: '첫 글 작성일',
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue('firstPostDate') as string}</div>;
    },
  },
];

const UsersView = () => {
  const [isClient, setIsClient] = useState(false);
  const [users, setUsers] = useState<{ [key: string]: UsersType }>(
    {} as { [key: string]: UsersType },
  );
  const [postsByUser, setPostByUser] = useState<{ [key: string]: ResPostType[] }>(
    {} as { [key: string]: ResPostType[] },
  );
  const [payments, setPayments] = useState<UserTable[]>([]);

  const { profile } = useGetProfile();
  const userMutation = useGetAllUsers();
  const postByUserMutation = useGetPostsByUser();

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);

  useEffect(
    function getAllUsers() {
      if (!profile || !isClient) return;

      userMutation.mutateAsync().then(res => {
        if (!res) return;
        const userMapById = res.data.reduce(
          (f, info) => ({ ...f, [info.profile.userId]: info }),
          {},
        );
        setUsers(userMapById);
      });
    },
    [profile, isClient],
  );

  useEffect(
    function getAllPosts() {
      if (!profile || !isClient) return;

      postByUserMutation.mutateAsync().then(res => {
        if (!res) return;
        setPostByUser(res.data);
      });
    },
    [profile, isClient],
  );

  useEffect(
    function () {
      if (!Object.keys(users).length || !Object.keys(postsByUser).length) return;

      const tempPayments = [] as UserTable[];

      for (const user of Object.keys(users)) {
        const userInfo = users[user];
        const posts = postsByUser[user] || [];

        let firstDayPostCount = 0;
        let firstPostDate;
        const postMonthMap = {} as { [key: string]: number };

        for (const post of posts) {
          const createdDate = new Date(post.createdAt);
          if (!firstPostDate) {
            firstPostDate = createdDate;
          } else if (firstPostDate > createdDate) {
            firstPostDate = createdDate;
          }
          firstDayPostCount +=
            getFormatDate(new Date(post.createdAt), 'yyyyMMdd') ===
            getFormatDate(new Date(userInfo.createdAt), 'yyyyMMdd')
              ? 1
              : 0;
          const yyyyMM = getFormatDate(new Date(post.createdAt), 'yyyy-MM');
          postMonthMap[yyyyMM] += postMonthMap[yyyyMM] ? 0 : 1;
        }
        const avgPostOfMonth = posts.length
          ? Math.round(posts.length / Object.keys(postMonthMap).length).toFixed(1)
          : '0';

        tempPayments.push({
          ...userInfo,
          firstDayPostCount,
          avgPostOfMonth,
          totalPostCount: posts.length,
          firstPostDate: firstPostDate ? getFormatDate(firstPostDate) : '-',
        });
      }
      setPayments(tempPayments);
    },
    [users, postsByUser],
  );

  return <DataTable columns={columns} data={[...payments]} />;
};

export default UsersView;
