'use client';

import { DataTable } from '@/admin/components/users/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { UserType } from '@admin/types/user';
import { addDays, format, set, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { ResPostType } from '@admin/types/post';
import useGetAllUsers from '@admin/queries/useGetAllUsers';
import useGetPostsByUser from '@admin/queries/useGetPostsByUser';
import { getFormatDate } from '@/shared/utils';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import * as React from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { DatePickerWithRange } from '@/admin/components/users/DatePickerWithRange';
import FilterBox from '@/admin/components/users/FilterBox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/ui/hover-card';
import { handleError } from '@/shared/apis/token/client';
import useGetProfile from '@/shared/queries/profile/useGetProfile';

type UserTable = Pick<UserType, 'createdAt' | 'email' | 'social'> & {
  profile: Pick<UserType['profile'], 'nickname' | 'userId'>;
  firstDayPostCount: number;
  avgPostOfMonth: string;
  totalPostCount: number;
  firstPostDate: Date | undefined;
  isPostEveryWeek: { [key: number]: number };
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
    accessorKey: 'isPostEveryWeek',
    header: () => {
      return (
        <div>
          매주 작성 여부
          <br />
          (첫글 작성주 이후 최대 5주)
        </div>
      );
    },
    cell: ({ row }) => {
      const postEveryWeekMap = row.getValue('isPostEveryWeek') as {
        [key: number]: number;
      };
      const values = Object.values(postEveryWeekMap);

      return values.length ? (
        <HoverCard>
          <HoverCardTrigger className="cursor-default">
            {values.length && values.every(v => v > 0) ? 'O' : 'X'}
          </HoverCardTrigger>
          <HoverCardContent className="bg-white-0">
            <div className="flex flex-col items-center [&:last]:border-r">
              {[...new Array(values.length)].map((v, i) => (
                <div key={i}>
                  {i + 1}주 후 : {postEveryWeekMap[i + 1]}개
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <div>-</div>
      );
    },
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
  const { data: profile } = useGetProfile();
  const userMutation = useGetAllUsers();
  const postByUserMutation = useGetPostsByUser();

  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<{ [key: string]: UserType }>(
    {} as { [key: string]: UserType },
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
    function getAllInitUsers() {
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
          setIsAdmin(true);
        })
        .catch(error => {
          handleError(error);
        });
    },
    [profile, isClient],
  );

  useEffect(
    function getAllInitPosts() {
      if (!profile || !isClient) return;

      postByUserMutation.mutateAsync().then(res => {
        if (!res) return;
        setPostByUser(res.data);
      });
    },
    [profile, isClient],
  );

  useEffect(
    function setTableData() {
      if (!Object.keys(users).length || !Object.keys(postsByUser).length) return;

      const tempPayments = [] as UserTable[];

      for (const user of Object.keys(users)) {
        const userInfo = users[user];
        const posts = postsByUser[user] || [];

        let firstDayPostCount = 0;
        let firstPostDate;
        const postMonthMap = {} as { [key: string]: number };
        const isPostEveryWeek = {} as { [key: number]: number };

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

        if (firstPostDate) {
          const currentDate = new Date();
          const firstDay = new Date(firstPostDate).getDay();
          const firstWeek =
            firstDay === 0
              ? set(subDays(firstPostDate, 6), { hours: 0, minutes: 0, seconds: 0 })
              : set(subDays(firstPostDate, firstDay - 1), {
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                });
          const lastWeek = Math.floor(
            Math.abs(
              (currentDate.getTime() - firstWeek.getTime()) / (60 * 60 * 24 * 7 * 1000),
            ),
          );
          for (let i = 1; i <= (lastWeek > 5 ? 5 : lastWeek); i++) {
            const targetStart = addDays(firstWeek, i * 7);
            const targetEnd = addDays(firstWeek, i * 14);
            const filteredPost = posts.filter(v => {
              const createdPostDate = new Date(v.createdAt);
              return createdPostDate >= targetStart && createdPostDate < targetEnd;
            });
            isPostEveryWeek[i] = filteredPost.length;
          }
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
          isPostEveryWeek,
          firstPostDate,
        });
      }
      const sortByCreatedAtPayments = tempPayments.sort((a, b) =>
        a.createdAt > b.createdAt ? -1 : 1,
      );
      setPayments(sortByCreatedAtPayments);
      setProcessedPayments(sortByCreatedAtPayments);
    },
    [users, postsByUser],
  );

  return (
    isAdmin && (
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
