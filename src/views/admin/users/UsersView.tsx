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
import { UnauthorizedError } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import * as React from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { DatePickerWithRange } from '@/views/admin/users/DatePickerWithRange';
import FilterBox from '@/views/admin/users/FilterBox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type UserTable = Pick<UsersType, 'createdAt' | 'email' | 'social'> & {
  profile: Pick<UsersType['profile'], 'nickname' | 'userId'>;
  firstDayPostCount: number;
  avgPostOfMonth: string;
  totalPostCount: number;
  firstPostDate: Date | undefined;
};

const columns: ColumnDef<UserTable>[] = [
  {
    accessorKey: 'email',
    header: ' 이메일',
    cell: ({ row }) => {
      const [email, userId] = (row.getValue('email') as string).split(' ');

      return (
        <div className="text-left">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{email}</TooltipTrigger>
              <TooltipContent className="left-[42%] bottom-2">
                <p>{userId}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: 'nickname',
    header: ' 닉네임',
    cell: ({ row }) => {
      const nickname = row.getValue('nickname') as string;

      return <div className="text-left">{nickname}</div>;
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
  },
  {
    accessorKey: 'avgPostOfMonth',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#000000] font-medium focus:text-primary-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          매달 평균 글 수
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'totalPostCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[#000000] font-medium focus:text-primary-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          전체 글 수
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'content',
    header: '매주 작성 여부',
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
      const date = row.getValue('firstPostDate') as Date | undefined;
      const formatted = date && getFormatDate(date);

      return <div className="text-center">{formatted || '-'}</div>;
    },
  },
];

const UsersView = () => {
  const router = useRouter();
  const { profile } = useGetProfile();
  const userMutation = useGetAllUsers();
  const postByUserMutation = useGetPostsByUser();

  const [isClient, setIsClient] = useState(false);
  const [users, setUsers] = useState<{ [key: string]: UsersType }>(
    {} as { [key: string]: UsersType },
  );
  const [postsByUser, setPostByUser] = useState<{ [key: string]: ResPostType[] }>(
    {} as { [key: string]: ResPostType[] },
  );
  const [payments, setPayments] = useState<UserTable[]>([]);
  const [processedPayments, setProcessedPayments] = useState<UserTable[]>([]);
  const [firstPostDate, setFirstPostDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [createdDate, setCreatedDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleRangeFirstPostDate: SelectRangeEventHandler = range => {
    setFirstPostDate(range);
    const originArr = [...payments];
    setProcessedPayments(
      originArr.filter(
        v =>
          v.firstPostDate &&
          v.firstPostDate >= (range?.from || new Date('1900-01-01')) &&
          v.firstPostDate <= (range?.to || new Date()),
      ),
    );
  };

  const handleRangeCreatedDate: SelectRangeEventHandler = range => {
    setCreatedDate(range);
    const originArr = [...payments];
    setProcessedPayments(
      originArr.filter(v => {
        const createdDate = new Date(v.createdAt);

        return (
          createdDate >= (range?.from || new Date('1900-01-01')) &&
          createdDate <= (range?.to || new Date())
        );
      }),
    );
  };

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);

  useEffect(
    function getAllUsers() {
      if (!profile || !isClient) return;

      userMutation
        .mutateAsync()
        .then(res => {
          if (!res) return;
          const userMapById = res.data.reduce(
            (f, info) => ({
              ...f,
              [info.profile.userId]: {
                ...info,
                email: `${info.email} ${info.profile.userId}`,
                nickname: info.profile.nickname || info.email.split('@')[0],
              },
            }),
            {},
          );
          setUsers(userMapById);
        })
        .catch(error => {
          UnauthorizedError(error).then(() => router.push('/'));
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

        // 기록한 월만 계산
        // const avgPostOfMonth = posts.length
        //   ? Math.round(posts.length / Object.keys(postMonthMap).length).toFixed(1)
        //   : '0';

        // 가입 월부터 누적 계산
        const oldDate = new Date(userInfo.createdAt);
        const newDate = new Date();
        const diff =
          Math.abs(
            (newDate.getFullYear() - oldDate.getFullYear()) * 12 +
              (newDate.getMonth() - oldDate.getMonth()),
          ) + 1;
        const avgPostOfMonth = (posts.length / diff).toFixed(1);

        tempPayments.push({
          ...userInfo,
          firstDayPostCount,
          avgPostOfMonth,
          totalPostCount: posts.length,
          firstPostDate,
        });
      }
      setPayments(tempPayments);
      setProcessedPayments(tempPayments);
    },
    [users, postsByUser],
  );

  return (
    !!Object.keys(postsByUser).length && (
      <>
        <DataTable columns={columns} data={[...processedPayments]}>
          <FilterBox label="가입일">
            <DatePickerWithRange date={createdDate} setDate={handleRangeCreatedDate} />
          </FilterBox>
          <FilterBox label="첫 글 작성일">
            <DatePickerWithRange
              date={firstPostDate}
              setDate={handleRangeFirstPostDate}
            />
          </FilterBox>
        </DataTable>
      </>
    )
  );
};

export default UsersView;
